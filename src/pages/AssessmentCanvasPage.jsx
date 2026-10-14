import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { nexusApi } from '../services/api';
import { 
  PenTool, 
  RotateCcw, 
  Trash2, 
  Download, 
  Activity, 
  Sparkles, 
  ArrowRight, 
  Grid, 
  Info,
  CheckCircle2
} from 'lucide-react';

export default function AssessmentCanvasPage() {
  const { childId } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeCount, setStrokeCount] = useState(0);
  const [penLifts, setPenLifts] = useState(0);
  const [lastVelocity, setLastVelocity] = useState(0);
  const [jerkIndex, setJerkIndex] = useState(0.042);
  const [activeTask, setActiveTask] = useState('spiral');
  const [color, setColor] = useState('#1e293b');
  const [brushSize, setBrushSize] = useState(3);
  const [showGrid, setShowGrid] = useState(true);

  // Raw telemetry buffer for ML pipeline: array of { x, y, time, pressure, strokeId }
  const strokesBuffer = useRef([]);
  const currentStrokeId = useRef(0);
  const lastPoint = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Scale for high DPI
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    drawBackground(ctx, rect.width, rect.height);
  }, [showGrid, activeTask]);

  const drawBackground = (ctx, width, height) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    if (showGrid) {
      ctx.strokeStyle = '#f1f5f9';
      ctx.lineWidth = 1;
      const step = 25;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    // Guide template overlay
    if (activeTask === 'spiral') {
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      const cx = width / 2;
      const cy = height / 2;
      for (let angle = 0; angle < 8 * Math.PI; angle += 0.1) {
        const r = 4 * angle;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (angle === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (activeTask === 'writing') {
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 6]);
      const lineY = height / 2;
      ctx.beginPath();
      ctx.moveTo(50, lineY);
      ctx.lineTo(width - 50, lineY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'italic 16px sans-serif';
      ctx.fillText('Copy sentence: "The quick brown fox jumps"', 50, lineY - 40);
    }
  };

  const handlePointerDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pressure = e.pressure !== undefined && e.pressure > 0 ? e.pressure : 0.6;
    const time = Date.now();

    setIsDrawing(true);
    currentStrokeId.current += 1;
    setStrokeCount(prev => prev + 1);

    lastPoint.current = { x, y, time };
    strokesBuffer.current.push({ x, y, time, pressure, strokeId: currentStrokeId.current });

    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize * pressure * 1.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handlePointerMove = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pressure = e.pressure !== undefined && e.pressure > 0 ? e.pressure : 0.6;
    const time = Date.now();

    if (lastPoint.current) {
      const dx = x - lastPoint.current.x;
      const dy = y - lastPoint.current.y;
      const dt = time - lastPoint.current.time || 1;
      const velocity = Math.sqrt(dx * dx + dy * dy) / dt; // px/ms
      setLastVelocity(Math.round(velocity * 100) / 100);
      
      // Real-time jerk estimation
      const jerk = Math.abs(velocity - (lastPoint.current.v || 0)) / dt;
      setJerkIndex(prev => Math.round((prev * 0.9 + jerk * 0.1) * 1000) / 1000);
      lastPoint.current.v = velocity;
    }

    lastPoint.current = { x, y, time };
    strokesBuffer.current.push({ x, y, time, pressure, strokeId: currentStrokeId.current });

    const ctx = canvas.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    setPenLifts(prev => prev + 1);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    drawBackground(ctx, rect.width, rect.height);
    strokesBuffer.current = [];
    setStrokeCount(0);
    setPenLifts(0);
    setLastVelocity(0);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(strokesBuffer.current, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `stroke_telemetry_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleSubmitToML = async () => {
    await nexusApi.submitTaskResult({
      childId: childId || 'ch_1',
      taskType: 'handwriting_canvas',
      taskSubtype: activeTask,
      strokePoints: strokesBuffer.current.length,
      kinematicFeatures: {
        strokeCount,
        penLifts,
        jerkIndex,
        avgVelocity: lastVelocity
      }
    });
    navigate('/reports/asm_mock_001');
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Digital Assessment Canvas</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
            High-frequency stylus stroke digitizer capturing real-time kinematics $(x, y, t, p)$ for dysgraphia screening.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => setActiveTask('spiral')} 
            className={`btn btn-sm ${activeTask === 'spiral' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Archimedes Spiral
          </button>
          <button 
            onClick={() => setActiveTask('writing')} 
            className={`btn btn-sm ${activeTask === 'writing' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Sentence Copying
          </button>
          <button 
            onClick={() => setActiveTask('freehand')} 
            className={`btn btn-sm ${activeTask === 'freehand' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Freehand Drawing
          </button>
        </div>
      </div>

      {/* Real-time Telemetry Bar */}
      <div className="grid grid-cols-4" style={{ marginBottom: '1rem' }}>
        <div className="card" style={{ padding: '0.75rem 1rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Captured Points</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#818cf8' }}>
            {strokesBuffer.current.length}
          </div>
        </div>
        <div className="card" style={{ padding: '0.75rem 1rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pen Lifts / Pauses</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f59e0b' }}>
            {penLifts}
          </div>
        </div>
        <div className="card" style={{ padding: '0.75rem 1rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Velocity (px/ms)</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#06b6d4' }}>
            {lastVelocity}
          </div>
        </div>
        <div className="card" style={{ padding: '0.75rem 1rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Jerk Index (d³x/dt³)</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: jerkIndex > 0.08 ? '#ef4444' : '#10b981' }}>
            {jerkIndex}
          </div>
        </div>
      </div>

      {/* Canvas Toolbar */}
      <div className="canvas-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>Stroke Color:</span>
          {['#1e293b', '#6366f1', '#06b6d4', '#ef4444'].map(c => (
            <button 
              key={c}
              onClick={() => setColor(c)}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: c,
                border: color === c ? '2px solid #ffffff' : 'none',
                cursor: 'pointer'
              }}
            />
          ))}
          <div style={{ width: '1px', height: '24px', background: 'var(--border-subtle)', margin: '0 0.5rem' }} />
          <button onClick={() => setShowGrid(!showGrid)} className={`btn btn-secondary btn-sm ${showGrid ? 'active' : ''}`}>
            <Grid size={14} /> Grid
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={handleClear} className="btn btn-secondary btn-sm">
            <Trash2 size={14} /> Clear Canvas
          </button>
          <button onClick={handleExportJSON} className="btn btn-secondary btn-sm">
            <Download size={14} /> Export Stroke JSON
          </button>
          <button onClick={handleSubmitToML} className="btn btn-primary btn-sm">
            Submit Kinematics & Analyze <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* HTML5 Canvas Drawing Area */}
      <div className="canvas-wrapper" style={{ height: '480px', touchAction: 'none' }}>
        <canvas 
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{ width: '100%', height: '100%', cursor: 'crosshair' }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', color: 'var(--text-dim)', fontSize: '0.8125rem' }}>
        <Info size={14} /> 
        <span>Supports iPad/Apple Pencil, Wacom tablets, or standard mouse interactions with simulated pressure sensitivity.</span>
      </div>
    </div>
  );
}

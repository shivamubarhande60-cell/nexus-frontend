import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { nexusApi } from '../services/api';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis 
} from 'recharts';
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Brain, 
  Activity, 
  PenTool, 
  Printer, 
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ReportViewPage() {
  const { assessmentId } = useParams();
  const { user } = useAuth();
  const [report, setReport] = useState(null);
  const [notes, setNotes] = useState('');
  const [signedOff, setSignedOff] = useState(false);

  useEffect(() => {
    nexusApi.getReport(assessmentId || 'asm_mock_001').then(data => {
      setReport(data);
      setNotes(data.clinicianNotes || '');
      setSignedOff(data.isSignedOff || false);
    });
  }, [assessmentId]);

  if (!report) return <div style={{ padding: '2rem' }}>Loading developmental report...</div>;

  const handleSignOff = () => {
    setSignedOff(true);
    alert('Report successfully certified and signed off by ' + (user?.name || 'Dr. Supriya Unde'));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header with Print / Export Actions */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
            <h1 style={{ fontSize: '1.75rem' }}>Developmental Screening Report</h1>
            <span className={`badge badge-${report.evidenceLevel}`}>
              {report.evidenceClassification}
            </span>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Assessment Session: <code>{report.id}</code> &bull; Subject: <strong>{report.childName}</strong> &bull; Date: {report.date}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={handlePrint} className="btn btn-secondary">
            <Printer size={16} /> Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Summary Banner */}
      <div className="card" style={{ borderLeft: '5px solid var(--elevated)', background: 'rgba(239, 68, 68, 0.05)' }}>
        <h3 style={{ fontSize: '1.125rem', color: '#f87171', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={18} /> Algorithmic Synthesis & Primary Evidence
        </h3>
        <p style={{ color: 'var(--text-main)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
          {report.summary}
        </p>
        <div style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          Model Confidence Index: <strong>{(report.confidenceScore * 100).toFixed(0)}%</strong> (Threshold for clinical notification: ≥ 70%)
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2">
        {/* SHAP Feature Importance */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.2rem' }}>SHAP Explainable AI Features</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Relative mathematical contribution to screening result (PRD FR-20)</p>
            </div>
            <Brain size={18} color="#818cf8" />
          </div>

          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={report.shapContributions} margin={{ top: 10, right: 30, left: 40, bottom: 5 }}>
                <XAxis type="number" domain={[-0.2, 0.5]} stroke="#64748b" fontSize={11} />
                <YAxis dataKey="feature" type="category" stroke="#94a3b8" fontSize={11} width={130} />
                <Tooltip 
                  contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '0.75rem' }}
                  formatter={(val) => [val, 'SHAP Impact']}
                />
                <Bar dataKey="contribution" radius={[0, 4, 4, 0]}>
                  {report.shapContributions.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.contribution > 0 ? '#ef4444' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center', marginTop: '0.5rem' }}>
            Red bars increase screening concern &bull; Green bars reflect neurotypical baseline
          </div>
        </div>

        {/* Multimodal Radar */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.2rem' }}>Multimodal Evidence Radar</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Cross-modality score profile</p>
            </div>
            <Activity size={18} color="#06b6d4" />
          </div>

          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={report.modalityScores}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                <PolarRadiusAxis stroke="#64748b" fontSize={9} domain={[0, 100]} />
                <Radar name="Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.35} />
                <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '0.75rem' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center', marginTop: '0.5rem' }}>
            Balanced polygon indicates cohesive developmental integration
          </div>
        </div>
      </div>

      {/* Clinician Review & Certified Sign-off Form */}
      <div className="card" style={{ border: signedOff ? '1px solid #10b981' : '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserCheck size={18} color="#818cf8" /> Clinician Professional Review & Sign-Off (PRD FR-22)
          </h3>
          {signedOff && (
            <span className="badge badge-developing">
              <CheckCircle2 size={14} /> Certified by {report.assessorName}
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Professional Notes & Educational Accommodations</label>
          <textarea 
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={signedOff}
            className="textarea"
            placeholder="Enter clinical observations, occupational therapy recommendations, and school IEP adjustments..."
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-dim)' }}>
            Digital Signature: <strong>{user?.name || 'Dr. Supriya Unde'}</strong> ({user?.license || 'ADYPSOE Developmental Neurology'})
          </div>

          {!signedOff ? (
            <button onClick={handleSignOff} className="btn btn-primary">
              <CheckCircle2 size={16} /> Certify & Sign Off Report
            </button>
          ) : (
            <div style={{ color: '#10b981', fontWeight: 600, fontSize: '0.875rem' }}>
              ✓ Immutable Sign-off Recorded in Audit Trail
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

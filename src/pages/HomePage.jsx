import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PenTool, 
  Brain, 
  BarChart3, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Activity,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { user, switchRole } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '3rem 1rem 1rem', maxWidth: '850px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.3)', padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.8125rem', color: '#818cf8', marginBottom: '1.5rem', fontWeight: 600 }}>
          <Sparkles size={14} /> ADYPSOE Capstone 2026-27 &bull; AI Screening Support Platform
        </div>
        
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.25rem' }}>
          Multimodal AI Screening for <br/>
          <span style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Autism & Learning Disabilities
          </span>
        </h1>

        <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
          An objective, transparent developmental screening engine capturing digital handwriting kinematics, phonological retrieval latencies, and adaptive cognitive tasks to support earlier professional diagnosis.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
          <Link to="/assessment/canvas/ch_1" className="btn btn-primary" style={{ padding: '0.875rem 1.75rem', fontSize: '1rem' }}>
            <PenTool size={18} /> Launch Drawing Canvas <ArrowRight size={16} />
          </Link>
          <Link to="/dashboard" className="btn btn-secondary" style={{ padding: '0.875rem 1.75rem', fontSize: '1rem' }}>
            <Layers size={18} /> Open Role Dashboard
          </Link>
          <Link to="/reports/asm_mock_001" className="btn btn-outline" style={{ padding: '0.875rem 1.75rem', fontSize: '1rem' }}>
            <BarChart3 size={18} /> View Sample Report
          </Link>
        </div>
      </section>

      {/* 4 Multimodal Screening Pillars */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Multimodal Evidence Architecture</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
            Combining high-frequency sensor telemetry with cognitive task performance
          </p>
        </div>

        <div className="grid grid-cols-4">
          <div className="card">
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8', marginBottom: '1rem' }}>
              <PenTool size={22} />
            </div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>1. Handwriting Kinematics</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
              Captures real-time stroke coordinates (x, y, t, p) measuring pen lifts, acceleration, jerk, and micro-tremors indicating dysgraphia.
            </p>
          </div>

          <div className="card">
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', marginBottom: '1rem' }}>
              <Brain size={22} />
            </div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>2. Phonological Latency</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
              Quantifies audio pseudoword decoding times and auditory-visual association delays characteristic of developmental dyslexia.
            </p>
          </div>

          <div className="card">
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7', marginBottom: '1rem' }}>
              <Activity size={22} />
            </div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>3. Adaptive Task Engine</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
              Automatically configures tasks matched to child age bands (5-7, 6-8, 8-10, 10-12 yrs) with dynamic step-down scaffolding.
            </p>
          </div>

          <div className="card">
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', marginBottom: '1rem' }}>
              <BarChart3 size={22} />
            </div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>4. Explainable AI (SHAP)</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
              No black-box decisions. Generates transparent feature importance charts and clinician sign-off audit trails.
            </p>
          </div>
        </div>
      </section>

      {/* Role Switcher Demo Bar */}
      <section className="card" style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.6) 100%)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Demo Role Personas (PRD Feature FR-03)</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Switch seamlessly between personas to evaluate customized workflows:
            </p>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <button onClick={() => switchRole('parent')} className={`btn ${user?.role === 'parent' ? 'btn-primary' : 'btn-secondary'}`}>
              Parent View
            </button>
            <button onClick={() => switchRole('teacher')} className={`btn ${user?.role === 'teacher' ? 'btn-primary' : 'btn-secondary'}`}>
              Teacher View
            </button>
            <button onClick={() => switchRole('clinician')} className={`btn ${user?.role === 'clinician' ? 'btn-primary' : 'btn-secondary'}`}>
              Clinician View
            </button>
            <button onClick={() => switchRole('admin')} className={`btn ${user?.role === 'admin' ? 'btn-primary' : 'btn-secondary'}`}>
              Admin View
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

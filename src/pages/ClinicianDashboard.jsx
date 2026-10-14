import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { nexusApi } from '../services/api';
import { 
  Stethoscope, 
  FileCheck, 
  BarChart3, 
  AlertTriangle, 
  CheckCircle, 
  Filter, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export default function ClinicianDashboard() {
  const [filter, setFilter] = useState('all');
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Populate clinician review queue
    setReports([
      {
        id: 'asm_mock_001',
        childName: 'Aarav Sharma',
        age: 7,
        evidenceLevel: 'elevated',
        category: 'Elevated Concern (Motor & Phonology)',
        confidence: '88%',
        shapHighlights: 'High jerk variance, pen-lift frequency',
        status: 'Pending Review',
        date: '2026-10-14'
      },
      {
        id: 'asm_mock_002',
        childName: 'Riya Patel',
        age: 9,
        evidenceLevel: 'monitor',
        category: 'Supporting Evidence (Dysgraphia)',
        confidence: '74%',
        shapHighlights: 'Irregular stroke spacing, pause ratio',
        status: 'Signed Off',
        date: '2026-10-12'
      }
    ]);
  }, []);

  const filtered = filter === 'all' ? reports : reports.filter(r => r.evidenceLevel === filter);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Clinician & Diagnostic Review Hub</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
            Verify algorithmic outputs, inspect SHAP feature importance vectors, and append professional clinical annotations.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setFilter('all')} className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}>
            All ({reports.length})
          </button>
          <button onClick={() => setFilter('elevated')} className={`btn btn-sm ${filter === 'elevated' ? 'btn-primary' : 'btn-secondary'}`}>
            Elevated Concern
          </button>
          <button onClick={() => setFilter('monitor')} className={`btn btn-sm ${filter === 'monitor' ? 'btn-primary' : 'btn-secondary'}`}>
            Monitor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ borderLeft: '4px solid var(--elevated)' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Elevated Concern Priority</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--elevated)' }}>1</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>Requires immediate consultation notes</div>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--monitor)' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Supporting / In Review</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--monitor)' }}>1</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>Longitudinal tracking suggested</div>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--developing)' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Certified Sign-Offs</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--developing)' }}>1</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>Completed reports archived</div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Pending Assessment Queue</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.map((rep) => (
          <div key={rep.id} className="card">
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                  <h3 style={{ fontSize: '1.2rem' }}>{rep.childName} ({rep.age} yrs)</h3>
                  <span className={`badge badge-${rep.evidenceLevel}`}>
                    {rep.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{rep.date}</span>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  Primary ML Predictors: <strong>{rep.shapHighlights}</strong> &bull; Model Confidence: <strong style={{ color: '#818cf8' }}>{rep.confidence}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Link to={`/reports/${rep.id}`} className="btn btn-primary btn-sm">
                  Inspect SHAP & Certify <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

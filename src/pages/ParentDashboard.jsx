import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { nexusApi } from '../services/api';
import { 
  Users, 
  PlusCircle, 
  PenTool, 
  FileText, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function ParentDashboard() {
  const [childrenList, setChildrenList] = useState([]);

  useEffect(() => {
    nexusApi.getChildren().then(setChildrenList);
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Parent Portal</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
            Manage your registered children, grant digital screening consent, and view developmental summaries.
          </p>
        </div>
        <Link to="/children/new" className="btn btn-primary">
          <PlusCircle size={16} /> Register Child Profile
        </Link>
      </div>

      <div className="grid grid-cols-3" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Registered Children</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#818cf8' }}>{childrenList.length}</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Active Consents</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>
            {childrenList.filter(c => c.consentGiven).length}
          </div>
        </div>
        <div className="card">
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Reports Available</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4' }}>2</div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Children Under Your Care</h2>
      
      <div className="grid grid-cols-2">
        {childrenList.map((child) => (
          <div key={child.id} className="card">
            <div className="card-header">
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{child.name}</h3>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                  Age: <strong>{child.ageYears} yrs</strong> &bull; {child.grade} &bull; {child.schoolType}
                </div>
              </div>
              <span className={`badge badge-${child.evidenceLevel || 'info'}`}>
                {child.assessmentStatus}
              </span>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem 1rem', borderRadius: '8px', margin: '1rem 0', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Digital Consent:</span>
                <span style={{ fontWeight: 600, color: child.consentGiven ? '#10b981' : '#f59e0b' }}>
                  {child.consentGiven ? 'Signed & Verified' : 'Action Required'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Latest Finding:</span>
                <span style={{ fontWeight: 600 }}>{child.lastScore}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {!child.consentGiven ? (
                <Link to={`/assessment/consent/${child.id}`} className="btn btn-primary btn-sm">
                  <ShieldCheck size={14} /> Review & Sign Consent
                </Link>
              ) : (
                <Link to={`/assessment/canvas/${child.id}`} className="btn btn-primary btn-sm">
                  <PenTool size={14} /> Start Assessment
                </Link>
              )}
              <Link to={`/reports/asm_mock_001`} className="btn btn-secondary btn-sm">
                <FileText size={14} /> View Report
              </Link>
              <Link to={`/children/${child.id}`} className="btn btn-outline btn-sm">
                Profile Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

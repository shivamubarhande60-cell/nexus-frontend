import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { nexusApi } from '../services/api';
import { User, Calendar, BookOpen, Globe, ShieldCheck, PenTool, FileText, ArrowLeft } from 'lucide-react';

export default function ChildProfilePage() {
  const { id } = useParams();
  const [child, setChild] = useState(null);

  useEffect(() => {
    nexusApi.getChildById(id || 'ch_1').then(setChild);
  }, [id]);

  if (!child) return <div style={{ padding: '2rem' }}>Loading child profile...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/dashboard" className="btn btn-secondary btn-sm" style={{ marginBottom: '1.5rem' }}>
        <ArrowLeft size={14} /> Back to Dashboard
      </Link>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{child.name}</h1>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Profile ID: <code>{child.id}</code> &bull; Registered Guardian: <strong>{child.guardianName}</strong>
            </div>
          </div>
          <span className={`badge badge-${child.evidenceLevel || 'info'}`}>
            {child.assessmentStatus}
          </span>
        </div>

        <div className="grid grid-cols-2" style={{ marginTop: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Date of Birth & Age</div>
            <div style={{ fontWeight: 600 }}>{child.dob} ({child.ageYears} years old)</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Grade & Education</div>
            <div style={{ fontWeight: 600 }}>{child.grade} ({child.schoolType})</div>
          </div>
          <div style={{ marginTop: '0.75rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Primary Languages</div>
            <div style={{ fontWeight: 600 }}>{child.primaryLanguage}</div>
          </div>
          <div style={{ marginTop: '0.75rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Consent Status</div>
            <div style={{ fontWeight: 600, color: child.consentGiven ? '#10b981' : '#f59e0b' }}>
              {child.consentGiven ? `Signed on ${child.consentDate}` : 'Pending Digital Signature'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          {child.consentGiven ? (
            <Link to={`/assessment/canvas/${child.id}`} className="btn btn-primary">
              <PenTool size={16} /> Open Screening Canvas
            </Link>
          ) : (
            <Link to={`/assessment/consent/${child.id}`} className="btn btn-primary">
              <ShieldCheck size={16} /> Complete Consent Form
            </Link>
          )}
          <Link to="/reports/asm_mock_001" className="btn btn-secondary">
            <FileText size={16} /> View Developmental Report
          </Link>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { nexusApi } from '../services/api';
import { ShieldCheck, AlertCircle, ArrowRight, CheckSquare, Square } from 'lucide-react';

export default function ConsentPage() {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [guardianName, setGuardianName] = useState('Rajesh Sharma');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) return;
    setIsSubmitting(true);
    await nexusApi.submitConsent({ childId, guardianName, timestamp: new Date().toISOString() });
    setIsSubmitting(false);
    navigate(`/assessment/canvas/${childId || 'ch_1'}`);
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>Digital Parental Consent Protocol</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
              PRD Compliance Requirement FR-09 & FR-11 &bull; SPPU Ethics Framework
            </p>
          </div>
        </div>

        <div style={{ maxHeight: '280px', overflowY: 'auto', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>1. Scope of Screening</h4>
          <p style={{ marginBottom: '1rem' }}>
            I understand that NexusScreen is an algorithmic screening support tool designed to capture handwriting stroke kinematics, reaction times, and cognitive task responses. It <strong>does NOT provide a clinical diagnosis</strong>.
          </p>

          <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>2. Data Collection & Privacy</h4>
          <p style={{ marginBottom: '1rem' }}>
            The platform will record digital pen trajectories (position, time, pressure) and response choices. No raw video or unauthorized audio is collected. Data is stored under strict encryption standards adhering to the Digital Personal Data Protection (DPDP) Act.
          </p>

          <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>3. Voluntary Participation</h4>
          <p>
            Participation is voluntary. You or the child may pause or terminate the assessment session at any point without prejudice.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Parent / Legal Guardian Legal Name</label>
            <input 
              type="text" 
              required
              value={guardianName}
              onChange={(e) => setGuardianName(e.target.value)}
              className="input" 
            />
          </div>

          <div 
            onClick={() => setAgreed(!agreed)}
            style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '0.75rem', 
              cursor: 'pointer', 
              padding: '1rem', 
              borderRadius: '8px', 
              background: agreed ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.02)',
              border: agreed ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
              marginBottom: '1.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ color: agreed ? 'var(--primary)' : 'var(--text-muted)', marginTop: '2px' }}>
              {agreed ? <CheckSquare size={20} /> : <Square size={20} />}
            </div>
            <div style={{ fontSize: '0.875rem' }}>
              <strong>I legally consent</strong> to the administration of the NexusScreen multimodal digital assessment for my child and acknowledge the non-diagnostic nature of this screening tool.
            </div>
          </div>

          <button 
            type="submit" 
            disabled={!agreed || isSubmitting} 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '0.75rem', opacity: agreed ? 1 : 0.5 }}
          >
            {isSubmitting ? 'Recording Consent...' : 'Sign Digital Consent & Proceed to Canvas'} <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

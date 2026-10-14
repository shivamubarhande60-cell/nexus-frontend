import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Brain, Lock, Mail, UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('clinician');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleQuickLogin = (role) => {
    login(role);
    navigate('/dashboard');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(selectedRole, { email, role: selectedRole, name: email.split('@')[0] });
    navigate('/dashboard');
  };

  return (
    <div style={{ maxWidth: '480px', margin: '2rem auto' }}>
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="nav-logo-icon" style={{ width: '48px', height: '48px', margin: '0 auto 1rem', borderRadius: '12px' }}>
            <Brain size={28} />
          </div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Welcome to NexusScreen</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Sign in to access your role-specific screening workspace
          </p>
        </div>

        {/* Quick Demo Selector */}
        <div style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            ⚡ 1-Click Evaluator Quick Login:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            <button type="button" onClick={() => handleQuickLogin('clinician')} className="btn btn-secondary btn-sm" style={{ fontSize: '0.75rem' }}>
              🩺 Dr. Supriya (Clinician)
            </button>
            <button type="button" onClick={() => handleQuickLogin('teacher')} className="btn btn-secondary btn-sm" style={{ fontSize: '0.75rem' }}>
              👩‍🏫 Anita (Teacher)
            </button>
            <button type="button" onClick={() => handleQuickLogin('parent')} className="btn btn-secondary btn-sm" style={{ fontSize: '0.75rem' }}>
              👨‍👦 Rajesh (Parent)
            </button>
            <button type="button" onClick={() => handleQuickLogin('admin')} className="btn btn-secondary btn-sm" style={{ fontSize: '0.75rem' }}>
              🛡️ Shivam (Admin)
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Assigned Role</label>
            <select 
              value={selectedRole} 
              onChange={(e) => setSelectedRole(e.target.value)} 
              className="select"
            >
              <option value="clinician">Clinician / Developmental Psychologist</option>
              <option value="teacher">Special Educator / Teacher</option>
              <option value="parent">Parent / Guardian</option>
              <option value="admin">System Administrator</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Work Email Address</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="email" 
                required 
                placeholder="name@nexus-institution.org" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="input" 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              required 
              placeholder="••••••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="input" 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}>
            Sign In with Role <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          Don't have an account yet? <Link to="/register" style={{ color: '#818cf8', fontWeight: 600 }}>Create an account</Link>
        </div>
      </div>
    </div>
  );
}

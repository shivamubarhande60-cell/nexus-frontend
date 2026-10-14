import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Brain, ArrowRight, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'parent',
    institution: ''
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.role, {
      id: `usr_${Date.now()}`,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      institution: formData.institution
    });
    navigate('/dashboard');
  };

  return (
    <div style={{ maxWidth: '480px', margin: '2rem auto' }}>
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="nav-logo-icon" style={{ width: '48px', height: '48px', margin: '0 auto 1rem', borderRadius: '12px' }}>
            <Brain size={28} />
          </div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Create Nexus Account</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Join the multimodal screening platform
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Legal Name</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. Supriya Unde" 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              required 
              placeholder="supriya@example.com" 
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">User Role (PRD Feature FR-01)</label>
            <select 
              value={formData.role} 
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="select"
            >
              <option value="parent">Parent / Legal Guardian</option>
              <option value="teacher">Special Educator / School Teacher</option>
              <option value="clinician">Clinician / Developmental Psychologist</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Organization / School (Optional)</label>
            <input 
              type="text" 
              placeholder="e.g. ADYPSOE Child Development Center" 
              value={formData.institution} 
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              className="input" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password (Min. 8 characters)</label>
            <input 
              type="password" 
              required 
              minLength={8}
              placeholder="••••••••••••" 
              value={formData.password} 
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="input" 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}>
            Register & Continue <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: '#818cf8', fontWeight: 600 }}>Sign in</Link>
        </div>
      </div>
    </div>
  );
}

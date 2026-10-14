import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Activity, 
  Brain, 
  Layers, 
  FileText, 
  PenTool, 
  Users, 
  LogOut, 
  ShieldCheck, 
  UserCheck 
} from 'lucide-react';

export default function Navbar() {
  const { user, logout, switchRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    switchRole(e.target.value);
    navigate('/dashboard');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <div className="nav-logo-icon">
            <Brain size={20} />
          </div>
          <span>NexusScreen <small style={{ fontSize: '0.65rem', opacity: 0.8, color: '#818cf8', fontWeight: 600 }}>AI</small></span>
        </Link>

        <nav className="nav-links">
          <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
            <Activity size={16} /> Overview
          </Link>
          <Link to="/dashboard" className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
            <Layers size={16} /> Dashboard
          </Link>
          <Link to="/assessment/canvas/ch_1" className={`nav-item ${location.pathname.includes('/canvas') ? 'active' : ''}`}>
            <PenTool size={16} /> Drawing Canvas
          </Link>
          <Link to="/assessment/tasks/ch_1" className={`nav-item ${location.pathname.includes('/tasks') ? 'active' : ''}`}>
            <Brain size={16} /> Adaptive Tasks
          </Link>
          <Link to="/reports/asm_mock_001" className={`nav-item ${location.pathname.includes('/reports') ? 'active' : ''}`}>
            <FileText size={16} /> Reports
          </Link>
        </nav>

        <div className="nav-actions">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.06)', padding: '0.35rem 0.65rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <UserCheck size={14} color="#818cf8" />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Role:</span>
                <select 
                  value={user.role} 
                  onChange={handleRoleChange}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#818cf8',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    outline: 'none',
                    textTransform: 'capitalize'
                  }}
                >
                  <option value="clinician" style={{ background: '#0f172a' }}>Clinician</option>
                  <option value="teacher" style={{ background: '#0f172a' }}>Teacher</option>
                  <option value="parent" style={{ background: '#0f172a' }}>Parent</option>
                  <option value="admin" style={{ background: '#0f172a' }}>Admin</option>
                </select>
              </div>

              <div style={{ textAlign: 'right', display: 'none', md: 'block' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{user.name}</div>
              </div>

              <button 
                onClick={logout} 
                className="btn btn-secondary btn-sm" 
                title="Logout"
                style={{ padding: '0.4rem 0.6rem' }}
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

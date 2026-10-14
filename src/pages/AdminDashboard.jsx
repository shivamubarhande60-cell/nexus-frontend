import React from 'react';
import { 
  ShieldAlert, 
  Users, 
  Server, 
  Database, 
  CheckCircle2, 
  Activity,
  Layers
} from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Platform Administration & System Health</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
          Overview of platform users, active role mappings, and interconnected service microservices.
        </p>
      </div>

      <div className="grid grid-cols-4" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Active Users</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>48</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Screening Sessions</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#818cf8' }}>142</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Kinematic Records</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#06b6d4' }}>1,840</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Uptime</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#10b981' }}>99.9%</div>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="card">
          <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Server size={18} color="#818cf8" /> Microservice Topology
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
              <span>React Client (Vite 8, Port 5173)</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>● Online</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
              <span>Spring Boot Backend (Port 8080)</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>● Ready</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
              <span>Flask AI Inference Service (Port 5000)</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>● Ready</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Database size={18} color="#06b6d4" /> Data Protection & Compliance
          </h3>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            <p style={{ marginBottom: '0.75rem' }}>
              &bull; <strong>Consent Enforced:</strong> No assessment or raw sensor data is ingested without an explicit digitally signed parental consent record.
            </p>
            <p style={{ marginBottom: '0.75rem' }}>
              &bull; <strong>DPDP Compliance:</strong> All minor identifiers are masked in exported research packages.
            </p>
            <p>
              &bull; <strong>Audit Log:</strong> All report alterations and clinician reviews generate immutable timestamps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

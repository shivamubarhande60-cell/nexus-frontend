import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { nexusApi } from '../services/api';
import { 
  Users, 
  GraduationCap, 
  Play, 
  Brain, 
  PenTool, 
  CheckCircle2, 
  Sparkles,
  Search
} from 'lucide-react';

export default function TeacherDashboard() {
  const [childrenList, setChildrenList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    nexusApi.getChildren().then(setChildrenList);
  }, []);

  const filtered = childrenList.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Teacher & Special Educator Workspace</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
            Classroom assessment roster with age-adaptive screening modules and real-time observation capture.
          </p>
        </div>
        <Link to="/children/new" className="btn btn-primary">
          <Users size={16} /> Add Student to Roster
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input 
            type="text" 
            placeholder="Search student by name or grade..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>

      <div className="card">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Student Name</th>
                <th style={{ padding: '0.75rem 1rem' }}>Age Band</th>
                <th style={{ padding: '0.75rem 1rem' }}>Grade</th>
                <th style={{ padding: '0.75rem 1rem' }}>Consent</th>
                <th style={{ padding: '0.75rem 1rem' }}>Screening Status</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => (
                <tr key={student.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{student.name}</td>
                  <td style={{ padding: '1rem' }}>{student.ageYears} yrs (Band {student.ageYears <= 7 ? '5-7' : '8-10'})</td>
                  <td style={{ padding: '1rem' }}>{student.grade}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ color: student.consentGiven ? '#10b981' : '#f59e0b', fontWeight: 600, fontSize: '0.8125rem' }}>
                      {student.consentGiven ? '✓ Verified' : '⚠ Required'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span className={`badge badge-${student.evidenceLevel || 'info'}`}>
                      {student.assessmentStatus}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <Link to={`/assessment/canvas/${student.id}`} className="btn btn-primary btn-sm">
                        <PenTool size={14} /> Run Canvas
                      </Link>
                      <Link to={`/assessment/tasks/${student.id}`} className="btn btn-secondary btn-sm">
                        <Brain size={14} /> Cognitive Tasks
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

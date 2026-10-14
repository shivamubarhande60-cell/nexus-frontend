import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { nexusApi } from '../services/api';
import { 
  User, 
  Calendar, 
  BookOpen, 
  Globe, 
  ShieldCheck, 
  PenTool, 
  FileText, 
  ArrowLeft, 
  PlusCircle, 
  CheckCircle2, 
  School,
  Activity
} from 'lucide-react';

export default function ChildProfilePage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isNew = location.pathname.includes('/new') || id === 'new';

  const [child, setChild] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: 'Male',
    grade: 'Grade 2',
    primaryLanguage: 'English / Marathi',
    schoolType: 'Inclusive Regular School',
    yearsInSchool: '2',
    guardianName: 'Rajesh Sharma',
    guardianEmail: 'parent@example.com',
    priorAssessments: 'None'
  });
  const [calculatedAge, setCalculatedAge] = useState(null);

  useEffect(() => {
    if (!isNew) {
      nexusApi.getChildById(id || 'ch_1').then(setChild);
    }
  }, [id, isNew]);

  const handleDobChange = (e) => {
    const val = e.target.value;
    setFormData({ ...formData, dob: val });
    if (val) {
      const birthDate = new Date(val);
      const diff = Date.now() - birthDate.getTime();
      const ageDate = new Date(diff);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      setCalculatedAge(age);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const newRecord = await nexusApi.createChild({
      ...formData,
      ageYears: calculatedAge || 7
    });
    navigate(`/assessment/consent/${newRecord.id}`);
  };

  if (isNew) {
    return (
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <Link to="/dashboard" className="btn btn-secondary btn-sm" style={{ marginBottom: '1.5rem' }}>
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8' }}>
              <PlusCircle size={24} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>Register New Child Profile</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                PRD Feature FR-05 &bull; Demographic baseline & auto-age calculation for adaptive testing
              </p>
            </div>
          </div>

          <form onSubmit={handleCreateSubmit}>
            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="form-label">Child Full Legal Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Date of Birth {calculatedAge !== null && <span style={{ color: '#818cf8', fontWeight: 700 }}>(Age: {calculatedAge} yrs)</span>}
                </label>
                <input 
                  type="date" 
                  required
                  value={formData.dob}
                  onChange={handleDobChange}
                  className="input"
                />
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="form-label">Assigned Grade</label>
                <select 
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="select"
                >
                  <option value="Kindergarten">Kindergarten (Age 5)</option>
                  <option value="Grade 1">Grade 1 (Age 6)</option>
                  <option value="Grade 2">Grade 2 (Age 7)</option>
                  <option value="Grade 3">Grade 3 (Age 8)</option>
                  <option value="Grade 4">Grade 4 (Age 9)</option>
                  <option value="Grade 5">Grade 5 (Age 10)</option>
                  <option value="Grade 6">Grade 6 (Age 11-12)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Gender</label>
                <select 
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="select"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary / Other">Other / Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="form-label">Primary Languages Spoken</label>
                <input 
                  type="text" 
                  placeholder="e.g. English, Marathi, Hindi"
                  value={formData.primaryLanguage}
                  onChange={(e) => setFormData({ ...formData, primaryLanguage: e.target.value })}
                  className="input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">School Environment</label>
                <select 
                  value={formData.schoolType}
                  onChange={(e) => setFormData({ ...formData, schoolType: e.target.value })}
                  className="select"
                >
                  <option value="Inclusive Regular School">Inclusive Regular School</option>
                  <option value="Public Elementary">Public Elementary</option>
                  <option value="Specialized Learning Center">Specialized Learning Center</option>
                  <option value="Homeschooled">Homeschooled</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="form-label">Parent / Guardian Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.guardianName}
                  onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                  className="input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Guardian Contact Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.guardianEmail}
                  onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                  className="input"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', marginTop: '1rem' }}>
              Create Profile & Proceed to Consent <CheckCircle2 size={16} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!child) return <div style={{ padding: '2rem' }}>Loading child profile...</div>;

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
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

        <div className="grid grid-cols-2" style={{ marginTop: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '12px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Date of Birth & Age Band</div>
            <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{child.dob} ({child.ageYears} yrs - Band {child.ageYears <= 7 ? '5-7' : '8-10'})</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Grade & Education</div>
            <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{child.grade} ({child.schoolType})</div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Primary Languages</div>
            <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{child.primaryLanguage}</div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Digital Consent Status</div>
            <div style={{ fontWeight: 600, color: child.consentGiven ? '#10b981' : '#f59e0b', fontSize: '0.9375rem' }}>
              {child.consentGiven ? `Signed on ${child.consentDate}` : 'Pending Digital Signature'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem' }}>
          {child.consentGiven ? (
            <Link to={`/assessment/canvas/${child.id}`} className="btn btn-primary">
              <PenTool size={16} /> Open Screening Canvas
            </Link>
          ) : (
            <Link to={`/assessment/consent/${child.id}`} className="btn btn-primary">
              <ShieldCheck size={16} /> Complete Consent Form
            </Link>
          )}
          <Link to={`/assessment/tasks/${child.id}`} className="btn btn-secondary">
            <Activity size={16} /> Adaptive Tasks
          </Link>
          <Link to="/reports/asm_mock_001" className="btn btn-outline">
            <FileText size={16} /> View Developmental Report
          </Link>
        </div>
      </div>

      {/* Historical Assessment Timeline */}
      <div className="card">
        <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Screening Session History (PRD FR-08)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Multimodal Battery #3 (Current)</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>2026-10-14 &bull; Assessor: Dr. Supriya Unde</div>
            </div>
            <span className="badge badge-elevated">Elevated Concern</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Multimodal Battery #2</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>2026-06-18 &bull; Assessor: Anita Deshmukh</div>
            </div>
            <span className="badge badge-monitor">Monitor</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Baseline Intake Battery #1</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>2026-01-12 &bull; Assessor: Dr. Supriya Unde</div>
            </div>
            <span className="badge badge-monitor">Monitor</span>
          </div>
        </div>
      </div>
    </div>
  );
}

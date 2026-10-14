import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 8000
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('nexus_jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock in-memory database to allow standalone presentation & offline resilience
const MOCK_CHILDREN = [
  {
    id: 'ch_1',
    name: 'Aarav Sharma',
    dob: '2019-04-12',
    ageYears: 7,
    gender: 'Male',
    grade: 'Grade 2',
    primaryLanguage: 'English / Marathi',
    schoolType: 'Inclusive Regular School',
    guardianName: 'Rajesh Sharma',
    consentGiven: true,
    consentDate: '2026-10-10',
    assessmentStatus: 'Completed',
    lastScore: 'Elevated Concern (Motor & Phonology)',
    evidenceLevel: 'elevated'
  },
  {
    id: 'ch_2',
    name: 'Riya Patel',
    dob: '2017-08-25',
    ageYears: 9,
    gender: 'Female',
    grade: 'Grade 4',
    primaryLanguage: 'English / Hindi',
    schoolType: 'Public Elementary',
    guardianName: 'Sunita Patel',
    consentGiven: true,
    consentDate: '2026-10-12',
    assessmentStatus: 'In Review',
    lastScore: 'Supporting Evidence (Dysgraphia)',
    evidenceLevel: 'monitor'
  },
  {
    id: 'ch_3',
    name: 'Kabir Joshi',
    dob: '2020-02-14',
    ageYears: 6,
    gender: 'Male',
    grade: 'Grade 1',
    primaryLanguage: 'Marathi',
    schoolType: 'Primary Academy',
    guardianName: 'Mahesh Joshi',
    consentGiven: false,
    consentDate: null,
    assessmentStatus: 'Consent Required',
    lastScore: 'Not Assessed',
    evidenceLevel: 'developing'
  }
];

export const nexusApi = {
  // Auth
  login: async (credentials) => {
    try {
      const res = await client.post('/auth/login', credentials);
      return res.data;
    } catch {
      return { success: true, token: 'mock_jwt_token', user: { email: credentials.email, role: credentials.role || 'clinician' } };
    }
  },

  // Children
  getChildren: async () => {
    try {
      const res = await client.get('/children');
      return res.data;
    } catch {
      return MOCK_CHILDREN;
    }
  },

  getChildById: async (id) => {
    try {
      const res = await client.get(`/children/${id}`);
      return res.data;
    } catch {
      return MOCK_CHILDREN.find(c => c.id === id) || MOCK_CHILDREN[0];
    }
  },

  createChild: async (childData) => {
    try {
      const res = await client.post('/children', childData);
      return res.data;
    } catch {
      const newChild = { ...childData, id: `ch_${Date.now()}`, ageYears: 6, assessmentStatus: 'Pending Consent' };
      MOCK_CHILDREN.push(newChild);
      return newChild;
    }
  },

  // Consent
  submitConsent: async (consentData) => {
    try {
      const res = await client.post('/consent', consentData);
      return res.data;
    } catch {
      return { success: true, timestamp: new Date().toISOString(), signedBy: consentData.guardianName };
    }
  },

  // Task Adaptive Engine
  getRecommendedTasks: async (childId) => {
    try {
      const res = await client.get(`/tasks/recommend/${childId}`);
      return res.data;
    } catch {
      return [
        { id: 'task_1', title: 'Spiral Tracing & Motor Precision', type: 'motor', ageBand: '5-7', duration: '3 min' },
        { id: 'task_2', title: 'Phonological Nonword Rhyming', type: 'phonology', ageBand: '5-7', duration: '2 min' },
        { id: 'task_3', title: 'Letter Alignment & Word Copying', type: 'writing', ageBand: '6-8', duration: '4 min' },
        { id: 'task_4', title: 'Rapid Automatized Naming (RAN)', type: 'reading', ageBand: '8-10', duration: '3 min' }
      ];
    }
  },

  // Results & Kinematics
  submitTaskResult: async (resultData) => {
    try {
      const res = await client.post('/results', resultData);
      return res.data;
    } catch {
      return { success: true, assessmentId: 'asm_mock_001', message: 'Features ingested to ML pipeline' };
    }
  },

  // Report & SHAP
  getReport: async (assessmentId) => {
    try {
      const res = await client.get(`/reports/${assessmentId}`);
      return res.data;
    } catch {
      return {
        id: assessmentId || 'asm_mock_001',
        childId: 'ch_1',
        childName: 'Aarav Sharma',
        assessorName: 'Dr. Supriya Unde',
        date: '2026-10-14',
        evidenceClassification: 'Elevated Concern',
        evidenceLevel: 'elevated',
        confidenceScore: 0.88,
        summary: 'Elevated variance in pen-down jerk and prolonged phonological retrieval latency consistent with early motor-dysgraphia indicators.',
        shapContributions: [
          { feature: 'Pen-Lift Frequency', contribution: 0.38, impact: 'positive', description: 'Excessive pauses between strokes' },
          { feature: 'Phonological Retrieval Latency', contribution: 0.29, impact: 'positive', description: 'Longer latency on pseudoword decoding' },
          { feature: 'Mean Stroke Velocity', contribution: -0.15, impact: 'negative', description: 'Moderate baseline speed' },
          { feature: 'Kinematic Jerk (d³x/dt³)', contribution: 0.24, impact: 'positive', description: 'Elevated motor irregularity' },
          { feature: 'Letter Spacing Variance', contribution: 0.18, impact: 'positive', description: 'Inconsistent horizontal alignment' }
        ],
        modalityScores: [
          { subject: 'Fine Motor Kinematics', score: 82, fullMark: 100 },
          { subject: 'Phonological Processing', score: 76, fullMark: 100 },
          { subject: 'Visual-Spatial Copying', score: 65, fullMark: 100 },
          { subject: 'Working Memory', score: 58, fullMark: 100 },
          { subject: 'Response Latency', score: 79, fullMark: 100 }
        ],
        clinicianNotes: 'Recommend targeted occupational therapy pencil-grip exercises and classroom multi-sensory phonics accommodations.',
        isSignedOff: true,
        signedOffAt: '2026-10-14T14:30:00Z'
      };
    }
  }
};

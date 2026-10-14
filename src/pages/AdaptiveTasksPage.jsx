import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Clock, 
  Volume2, 
  CheckCircle, 
  ArrowRight, 
  AlertCircle, 
  RotateCcw,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export default function AdaptiveTasksPage() {
  const { childId } = useParams();
  const navigate = useNavigate();

  const [selectedAgeBand, setSelectedAgeBand] = useState('5-7');
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [sessionResults, setSessionResults] = useState([]);

  const TASKS_BY_BAND = {
    '5-7': [
      {
        id: 'ph_1',
        title: 'Phonological Rhyme Matching',
        category: 'Auditory-Visual Association',
        instructions: 'Which word rhymes with "CAT"?',
        audioPrompt: 'Playing sound: /kæt/ ... Select the rhyming card',
        options: ['HAT', 'DOG', 'SUN', 'CUP'],
        correctIndex: 0,
        hint: 'Listen for the ending sound: -at'
      },
      {
        id: 'ph_2',
        title: 'Initial Phoneme Discrimination',
        category: 'Phonological Processing',
        instructions: 'Which word starts with the sound /b/ as in "BALL"?',
        audioPrompt: 'Listen carefully to the first sound: /b/',
        options: ['BAT', 'FISH', 'TREE', 'MOON'],
        correctIndex: 0,
        hint: 'Look at the lips shape for /b/'
      }
    ],
    '6-8': [
      {
        id: 'dec_1',
        title: 'Pseudoword Decoding (Dyslexia Metric)',
        category: 'Phonological Decoding Latency',
        instructions: 'Read this made-up word: "PLOM". Does it sound like a real animal?',
        audioPrompt: 'Pronounce phonetically: /plɒm/',
        options: ['No, made-up word', 'Yes, it is real'],
        correctIndex: 0,
        hint: 'Notice letter blends: P + L'
      }
    ],
    '8-10': [
      {
        id: 'ran_1',
        title: 'Rapid Automatized Naming (RAN)',
        category: 'Cognitive Processing Speed',
        instructions: 'Name the sequence of shapes as fast as possible without error.',
        audioPrompt: 'Timer active. Name: Square, Circle, Triangle, Star',
        options: ['Sequence Completed with 0 errors', '1-2 self-corrections', '3+ hesitations'],
        correctIndex: 0,
        hint: 'Maintain steady pacing'
      }
    ],
    '10-12': [
      {
        id: 'comp_1',
        title: 'Syntactic Working Memory',
        category: 'Executive Function & Comprehension',
        instructions: 'Follow the multi-step instruction: "Touch the red circle only after touching the blue square twice."',
        audioPrompt: 'Auditory multi-step command playback active',
        options: ['Correct sequence executed', 'Partial sequence (1 error)', 'Inverted sequence'],
        correctIndex: 0,
        hint: 'Remember the conditional: only AFTER'
      }
    ]
  };

  const tasks = TASKS_BY_BAND[selectedAgeBand] || TASKS_BY_BAND['5-7'];
  const activeTask = tasks[currentTaskIndex] || tasks[0];

  useEffect(() => {
    setTimeLeft(45);
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [currentTaskIndex, selectedAgeBand]);

  const handleSelectOption = (index) => {
    setSelectedOption(index);
    const isCorrect = index === activeTask.correctIndex;
    setFeedback({
      isCorrect,
      latencyMs: (45 - timeLeft) * 1000
    });
  };

  const handleNextTask = () => {
    if (currentTaskIndex + 1 < tasks.length) {
      setCurrentTaskIndex(prev => prev + 1);
      setSelectedOption(null);
      setFeedback(null);
    } else {
      navigate('/reports/asm_mock_001');
    }
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Adaptive Cognitive & Phonology Tasks</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
            Auto-scales task difficulty to the child's developmental band (PRD FR-12).
          </p>
        </div>

        {/* Age Band Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.04)', padding: '0.35rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
          {['5-7', '6-8', '8-10', '10-12'].map(band => (
            <button 
              key={band}
              onClick={() => { setSelectedAgeBand(band); setCurrentTaskIndex(0); setSelectedOption(null); setFeedback(null); }}
              className={`btn btn-sm ${selectedAgeBand === band ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.75rem' }}
            >
              Age {band}
            </button>
          ))}
        </div>
      </div>

      {/* Progress & Timer Banner */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8', fontWeight: 700 }}>
            {currentTaskIndex + 1}/{tasks.length}
          </div>
          <div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{activeTask.category}</div>
            <div style={{ fontWeight: 600 }}>{activeTask.title}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: timeLeft <= 10 ? '#ef4444' : '#818cf8', fontWeight: 700, fontSize: '1.1rem' }}>
          <Clock size={18} /> {timeLeft}s remaining
        </div>
      </div>

      {/* Interactive Task Container */}
      <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{activeTask.instructions}</h2>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '0.5rem 1rem', borderRadius: '8px', color: '#06b6d4', fontSize: '0.875rem', marginBottom: '2rem' }}>
          <Volume2 size={16} /> {activeTask.audioPrompt}
        </div>

        {/* Options */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          {activeTask.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                style={{
                  padding: '1.25rem 1rem',
                  borderRadius: '12px',
                  background: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.03)',
                  border: isSelected ? '2px solid #818cf8' : '1px solid var(--border-subtle)',
                  color: isSelected ? '#ffffff' : 'var(--text-main)',
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Real-time Feedback & Latency Telemetry */}
        {feedback && (
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', maxWidth: '500px', margin: '0 auto 1.5rem', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 600, color: feedback.isCorrect ? '#10b981' : '#f59e0b', marginBottom: '0.25rem' }}>
              {feedback.isCorrect ? '✓ Choice Recorded' : '⚠ Scaffolding Assistance Noted'}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Response Latency: <strong>{feedback.latencyMs} ms</strong> &bull; Telemetry saved to session vector
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button 
            onClick={handleNextTask} 
            disabled={selectedOption === null}
            className="btn btn-primary" 
            style={{ padding: '0.75rem 2rem', opacity: selectedOption === null ? 0.5 : 1 }}
          >
            {currentTaskIndex + 1 < tasks.length ? 'Next Adaptive Task' : 'Complete Assessment & View Report'} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

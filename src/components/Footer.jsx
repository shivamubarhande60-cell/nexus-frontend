import React from 'react';
import { AlertTriangle, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="disclaimer-banner">
          <AlertTriangle size={20} style={{ flexShrink: 0 }} />
          <div>
            <strong>Mandatory Clinical Screening Notice:</strong> This AI system provides early multimodal developmental screening support only and <u>does not constitute a medical or psychological diagnosis</u>. All algorithmic outputs and SHAP scores must be independently reviewed and certified by a certified child clinician or clinical psychologist.
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', color: 'var(--text-dim)', fontSize: '0.8125rem' }}>
          <div>
            <strong>NexusScreen AI</strong> - SPPU Capstone Project (2026-27) | Dept. of Computer Engineering, ADYPSOE
          </div>
          <div>
            Project Team: <strong>Shivam Ubarhande</strong> (Lead) &bull; <strong>Supriya Unde</strong> (Frontend) &bull; <strong>Aarohi Wagh</strong> (ML)
          </div>
        </div>
      </div>
    </footer>
  );
}

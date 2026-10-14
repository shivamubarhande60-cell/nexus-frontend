import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardRouter from './pages/DashboardRouter';
import ChildProfilePage from './pages/ChildProfilePage';
import ConsentPage from './pages/ConsentPage';
import AssessmentCanvasPage from './pages/AssessmentCanvasPage';
import AdaptiveTasksPage from './pages/AdaptiveTasksPage';
import ReportViewPage from './pages/ReportViewPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-layout">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardRouter />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/children/new" 
                element={
                  <ProtectedRoute>
                    <ChildProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/children/:id" 
                element={
                  <ProtectedRoute>
                    <ChildProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/assessment/consent/:childId" 
                element={
                  <ProtectedRoute>
                    <ConsentPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/assessment/canvas/:childId" 
                element={
                  <ProtectedRoute>
                    <AssessmentCanvasPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/assessment/tasks/:childId" 
                element={
                  <ProtectedRoute>
                    <AdaptiveTasksPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reports/:assessmentId" 
                element={
                  <ProtectedRoute>
                    <ReportViewPage />
                  </ProtectedRoute>
                } 
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

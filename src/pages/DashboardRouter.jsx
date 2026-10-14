import React from 'react';
import { useAuth } from '../context/AuthContext';
import ParentDashboard from './ParentDashboard';
import TeacherDashboard from './TeacherDashboard';
import ClinicianDashboard from './ClinicianDashboard';
import AdminDashboard from './AdminDashboard';

export default function DashboardRouter() {
  const { user } = useAuth();

  switch (user?.role) {
    case 'parent':
      return <ParentDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'clinician':
    default:
      return <ClinicianDashboard />;
  }
}

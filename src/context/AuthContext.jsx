import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEMO_USERS = {
  clinician: {
    id: 'usr_c1',
    name: 'Dr. Supriya Unde',
    email: 'dr.supriya@nexus-health.org',
    role: 'clinician',
    affiliation: 'ADYPSOE Developmental Neurology Clinic',
    license: 'REG-2026-9812'
  },
  teacher: {
    id: 'usr_t1',
    name: 'Anita Deshmukh',
    email: 'anita.teacher@sppu-school.edu',
    role: 'teacher',
    school: 'Pune Central Model School',
    gradeSpecialization: 'Grade 2 - 4'
  },
  parent: {
    id: 'usr_p1',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@gmail.com',
    role: 'parent',
    childrenIds: ['ch_1', 'ch_2']
  },
  admin: {
    id: 'usr_a1',
    name: 'Shivam Ubarhande',
    email: 'admin@nexus-screening.org',
    role: 'admin',
    department: 'System Architecture & Operations'
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nexus_user');
    return saved ? JSON.parse(saved) : DEMO_USERS.clinician;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('nexus_jwt') || 'mock_jwt_token_nexus_2026';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('nexus_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nexus_user');
    }
  }, [user]);

  const login = (role = 'clinician', customData = null) => {
    const selectedUser = customData || DEMO_USERS[role] || DEMO_USERS.clinician;
    const dummyJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(selectedUser))}.signature`;
    setUser(selectedUser);
    setToken(dummyJwt);
    localStorage.setItem('nexus_jwt', dummyJwt);
    return selectedUser;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('nexus_user');
    localStorage.removeItem('nexus_jwt');
  };

  const switchRole = (newRole) => {
    return login(newRole);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, switchRole, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

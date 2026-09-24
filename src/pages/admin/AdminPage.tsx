import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { AdminLayout } from './AdminLayout';
import { AdminLoginPage } from './AdminLoginPage';

export const AdminPage: React.FC = () => {
  const { user } = useAuth();

  // If authenticated as Nagata or Admin role
  const isAdminAuthenticated = user && (user.username === 'Nagata' || user.role === 'admin');

  if (!isAdminAuthenticated) {
    return <AdminLoginPage />;
  }

  return <AdminLayout />;
};

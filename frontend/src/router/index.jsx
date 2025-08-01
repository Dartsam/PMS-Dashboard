import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../auth/LoginPage';
import AppLayout from '@/layouts/AppLayout';
import DashboardPage from '@/features/dashboard/DashboardPage';
import NominalRoll from '@/features/staff/nominalRoll/NominalRoll';


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="staff/nominal-roll" element={<NominalRoll />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
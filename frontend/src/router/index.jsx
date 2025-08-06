import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../auth/LoginPage';
import AppLayout from '@/layouts/AppLayout';
import DashboardPage from '@/features/dashboard/DashboardPage';
import NominalRoll from '@/features/employee/nominalRoll/NominalRoll';
import EmployeeForm from '@/features/employee/newEmployee/EmployeeForm';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* The protected Routes under layout */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="employee/nominalRoll" element={<NominalRoll />} />
          <Route path="employee/newEmployee" element={<EmployeeForm />} />
        </Route>

        {/* The Fallback */}
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

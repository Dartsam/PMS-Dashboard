import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../auth/LoginPage';
import AppLayout from '@/layouts/AppLayout';
import DashboardPage from '@/features/dashboard/DashboardPage';
import NominalRoll from '@/features/employee/nominalRoll/NominalRoll';
import EmployeeForm from '../features/employee/newEmployee/EmployeeForm';


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="employee/nominalRoll" element={<NominalRoll />} />
          <Route path="employee/newEmployee" element={<EmployeeForm />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../auth/LoginPage';
import AppLayout from '@/layouts/AppLayout';
import DashboardPage from '@/features/dashboard/DashboardPage';
import NominalRoll from '@/features/employee/nominalRoll/NominalRoll';
import EmployeeForm from '../features/employee/newEmployee/EmployeeForm';
import Archive from '@/features/employee/archive/Archive';
import Profile from '@/features/profile/Profile';
import CareerAdvancement from '@/features/careerAdvancement/CareerAdvancement';


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
          <Route path="employee/archive" element={<Archive />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="careeradvancement" element={<CareerAdvancement />} />

          <Route path="employee/:id/profile" element={<Profile />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
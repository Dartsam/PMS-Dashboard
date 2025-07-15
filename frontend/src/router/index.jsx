import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../auth/loginpage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="staff/nominal-roll" element={<NominalRollPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
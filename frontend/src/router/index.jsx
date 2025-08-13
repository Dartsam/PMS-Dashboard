import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../auth/LoginPage';
import AppLayout from '@/layouts/AppLayout';
import DashboardPage from '@/features/dashboard/DashboardPage';
// import NominalRoll from '@/features/staff/nominalRoll/NominalRoll';
// import CareerAdvancement from "@/features/CareerAdvancement/CareerAdvancement";
import EducationQualificationForm from "@/features/CareerAdvancement/EducationalQualification/EducationalQualification";
import ProfessionalQualification from "@/features/CareerAdvancement/ProfessionalQualification/ProfessionalQualification";
import PromotionEligibility from "@/features/careerAdvancement/PromotionEligibility/PromotionEligibility";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          {/* <Route path="staff/nominal-roll" element={<NominalRoll />} />
          <Route path="career-advancement" element={<CareerAdvancement />} /> */}
          <Route path="career-advancement/educational-qualification" element={<EducationQualificationForm />} />
           <Route path="career-advancement/professional-qualification" element={<ProfessionalQualification />} /> 
           <Route path="career-advancement/PromotionEligibility" element={<PromotionEligibility />}/>
           
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
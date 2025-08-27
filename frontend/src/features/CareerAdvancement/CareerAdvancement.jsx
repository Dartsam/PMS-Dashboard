import EducationQualificationForm from "./EducationalQualification/EducationalQualification";
import PromotionEligibility from "./PromotionEligibility/PromotionEligiblity";
 import PromotionList from "./PromotionList/PromotionList";
 import ProfessionalQualification from "./ProfessionalQualification/ProfessionalQualification";

const CareerAdvancement = () => {
  return (
    <section className="career-advancement py-5">
      <div className="container">
        <h2 className="text-center mb-4">Career Advancement</h2>
        <p className="text-center mb-5">
          Discover all you need to know about advancing your career within the organization.
        </p>

        <div className="row">
          <div className="col-md-6 mb-4">
           <PromotionEligibility /> 
          </div>
          <div className="col-md-6 mb-4">
            <PromotionList /> 
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-4">
            <EducationQualificationForm />
          </div>
          <div className="col-md-6 mb-4">
             <ProfessionalQualification />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerAdvancement;

import axios from 'axios';
import { useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Paper,
} from "@mui/material";

import PersonalDetails from "./steps/PersonalDetails";
import EmploymentDetails from "./steps/EmploymentDetails";
import PayrollPensionInfo from "./steps/PayrollPensionInfo";
import ProfessionalDetails from "./steps/ProfessionalDetails";
import EducationalDetails from "./steps/EducationalDetails";

const steps = [
  "Personal Details",
  "Employment Details",
  "Payroll & Pension Details",
  "Professional Certifications",
  "Educational Details",
];

const EmployeeForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    certificates: [{}], // Start with one certificate
    education: {
      Primary: [{}],
      Secondary: [{}],
      Tertiary: [{}],
    },
  });

  const [fileData, setFileData] = useState({}); // For general files (photo, docs, etc.)

  // 🔹 Handles text field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // --- Handle certificates nested fields ---
    if (name.startsWith("certificates")) {
      const match = name.match(/certificates\[(\d+)\]\.(.+)/);
      if (match) {
        const index = parseInt(match[1], 10);
        const field = match[2];
        setFormData((prev) => {
          const updatedCertificates = [...prev.certificates];
          updatedCertificates[index] = {
            ...updatedCertificates[index],
            [field]: value,
          };
          return { ...prev, certificates: updatedCertificates };
        });
        return;
      }
    }

    // --- Handle education nested fields ---
    if (name.startsWith("education")) {
      const match = name.match(/education\.(\w+)\[(\d+)\]\.(.+)/);
      if (match) {
        const level = match[1]; // Primary / Secondary / Tertiary
        const index = parseInt(match[2], 10);
        const field = match[3];
        setFormData((prev) => {
          const updatedLevel = [...(prev.education[level] || [])];
          updatedLevel[index] = {
            ...updatedLevel[index],
            [field]: value,
          };
          return {
            ...prev,
            education: { ...prev.education, [level]: updatedLevel },
          };
        });
        return;
      }
    }

    // --- Normal top-level fields ---
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handles file input changes
  const handleFileChange = (e, index = null) => {
    const { name, files } = e.target;

    if (index !== null) {
      // File belongs to a certificate
      setFormData((prev) => {
        const updatedCertificates = [...prev.certificates];
        updatedCertificates[index] = {
          ...updatedCertificates[index],
          certificateFile: files[0],
        };
        return { ...prev, certificates: updatedCertificates };
      });
    } else {
      // General files
      setFileData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  // 🔹 Certificate add/remove
  const handleAddCertificate = () => {
    setFormData((prev) => ({
      ...prev,
      certificates: [...prev.certificates, {}],
    }));
  };

  const handleRemoveCertificate = (index) => {
    setFormData((prev) => {
      const updatedCertificates = [...prev.certificates];
      updatedCertificates.splice(index, 1);
      return { ...prev, certificates: updatedCertificates };
    });
  };

  // 🔹 Education add/remove
  const handleAddEducation = (level) => {
    setFormData((prev) => {
      const updatedLevel = [...(prev.education[level] || [])];
      updatedLevel.push({});
      return { ...prev, education: { ...prev.education, [level]: updatedLevel } };
    });
  };

  const handleRemoveEducation = (level, index) => {
    setFormData((prev) => {
      const updatedLevel = [...(prev.education[level] || [])];
      updatedLevel.splice(index, 1);
      return { ...prev, education: { ...prev.education, [level]: updatedLevel } };
    });
  };

  // 🔹 Step Navigation
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // 🔹 Submit (JSON payload to StaffCreateSerializer)
  const handleSubmit = async () => {
    // Helper to safely pick values from different possible keys
    const pick = (...keys) => {
      for (const k of keys) {
        if (formData[k] !== undefined && formData[k] !== null && formData[k] !== "") return formData[k];
      }
      return "";
    };

    // Build personal object (try several common key names to be resilient)
    const personal = {
      first_name: pick("firstname", "f_name", "firstName", "first_name"),
      last_name: pick("lastname", "l_name", "lastName", "last_name"),
      state_of_origin: pick("state_of_origin", "state", "stateOfOrigin"),
      date_of_birth: pick("dob", "date_of_birth"),
      email: pick("email"),
      mobile_number: pick("mobileNumber", "mobile_number", "mobile"),
      home_address: pick("homeAddress", "home_address"),
      gender: pick("gender"),
    };

    // Build employee object
    const employee = {
      file_number: pick("fileNumber", "file_number"),
      designation: pick("designation"),
      employment_type: pick("employmentType", "employment_type"),
      salary_structure: pick("salaryStructure", "salary_structure"),
      grade_level: pick("gradeLevel", "grade_level"),
      step: pick("step"),
      dofa: pick("dofa"),
      dolp: pick("dolp"),
      edor: pick("edor"),
      status: pick("status"),
      office_email: pick("officeEmail", "office_email"),
    };

    // Build department object (at minimum name). The backend DepartmentSerializer expects its fields.
    const department = {
      name: pick("department", "unit", "departmentName"),
    };

    // Build account object (payroll/pension)
    const account = {
      account_number: pick("accountNumber", "account_number"),
      paypoint: pick("paypoint"),
      pfa_number: pick("pfaNumber", "pfa_number"),
      pfa_name: pick("pfaName", "pfa_name"),
      pfa_code: pick("pfaCode", "pfa_code"),
      ippis_no: pick("ippisNumber", "ippis_number"),
    };

    // Build educations array from the grouped education object
    const educations = [];
    if (formData.education) {
      Object.keys(formData.education).forEach((level) => {
        (formData.education[level] || []).forEach((entry) => {
          // only push if there's at least one non-empty field
          if (entry && (entry.name || entry.from || entry.to || entry.qualification)) {
            educations.push({
              level, // Primary/Secondary/Tertiary — backend can use or ignore
              institution_name: entry.name || "",
              start_year: entry.from || "",
              end_year: entry.to || "",
              qualification: entry.qualification || "",
            });
          }
        });
      });
    }

    // Build professional qualifications array from certificates
    const qualifications = (formData.certificates || []).map((cert) => ({
      issuing_body: cert.issuingBody || cert.issuing_body || "",
      certificate_id: cert.certificateId || cert.certificate_id || "",
      certificate_name: cert.certificateName || cert.certificate_name || "",
      issue_date: cert.issueDate || cert.issue_date || "",
      expiry_date: cert.expiryDate || cert.expiry_date || "",
      license_number: cert.licenseNumber || cert.license_number || "",
      // note: certificateFile is handled separately (file upload)
    })).filter(q => q.issuing_body || q.certificate_id || q.certificate_name || q.issue_date || q.expiry_date || q.license_number); // drop empty

    const payload = {
      department,
      personal,
      employee,
      account,
      educations,
      qualifications,
    };

    console.log("Employee create payload:", payload);

    const headers = { "Content-Type": "application/json" };
    // if you have an auth token in localStorage (or elsewhere), include it
    const token = localStorage.getItem("token") || localStorage.getItem("access_token");
    if (token) headers.Authorization = `Bearer ${token}`;

    try {
      const response = await axios.post("http://127.0.0.1:8000/nom_roll/create/", payload, { headers });

      // if backend returns created employee or some response body
      console.log("Create response:", response.data);
      alert("Employee registered successfully!");

      // Optionally: you might want to upload files now (photo, certificate files).
      // I kept file upload separate — because your StaffCreateSerializer currently expects JSON.
      // You can implement a separate endpoint to accept multipart/form-data for files.

      // Reset form
      setActiveStep(0);
      setFormData({
        certificates: [{}],
        education: { Primary: [{}], Secondary: [{}], Tertiary: [{}] },
      });
      setFileData({});
    } catch (err) {
      // axios error object handling
      console.error("Submission Error:", err.response || err.message || err);
      // Give user readable message if backend provided one
      const msg = err.response?.data || err.response?.statusText || err.message || "Submission failed.";
      alert(`Submission failed. ${JSON.stringify(msg)}`);
    }
  };

  // 🔹 Render Steps
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <PersonalDetails
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
          />
        );
      case 1:
        return (
          <EmploymentDetails formData={formData} handleChange={handleChange} />
        );
      case 2:
        return (
          <PayrollPensionInfo formData={formData} handleChange={handleChange} />
        );
      case 3:
        return (
          <ProfessionalDetails
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            handleAddCertificate={handleAddCertificate}
            handleRemoveCertificate={handleRemoveCertificate}
          />
        );
      case 4:
        return (
          <EducationalDetails
            formData={formData}
            handleChange={handleChange}
            handleAddEducation={handleAddEducation}
            handleRemoveEducation={handleRemoveEducation}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h5" align="left" gutterBottom>
        Register New Employee
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {renderStepContent(activeStep)}

      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
        >
          Back
        </Button>
        <Button onClick={handleNext} variant="contained" color="primary">
          {activeStep === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </Box>
    </Paper>
  );
};

export default EmployeeForm;

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

  // 🔹 Submit
  const handleSubmit = async () => {
    const submissionData = new FormData();

    // Append certificates
    formData.certificates.forEach((cert, index) => {
      Object.entries(cert).forEach(([key, value]) => {
        submissionData.append(`certificates[${index}][${key}]`, value);
      });
    });

    // Append education
    Object.keys(formData.education).forEach((level) => {
      formData.education[level].forEach((edu, i) => {
        Object.entries(edu).forEach(([key, val]) => {
          submissionData.append(`education.${level}[${i}].${key}`, val);
        });
      });
    });

    // Append other top-level fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "certificates" && key !== "education") {
        submissionData.append(key, value);
      }
    });

    // Append general files
    Object.entries(fileData).forEach(([key, file]) => {
      submissionData.append(key, file);
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/admin/nom_roll/employee/add/", {
        method: "POST",
        body: submissionData,
      });

      if (!response.ok) throw new Error("Failed to submit data");

      const result = await response.json();
      alert("Employee registered successfully!");
      console.log(result);

      // Reset form
      setActiveStep(0);
      setFormData({
        certificates: [{}],
        education: { Primary: [{}], Secondary: [{}], Tertiary: [{}] },
      });
      setFileData({});
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Submission failed. Try again.");
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

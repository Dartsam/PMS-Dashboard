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
import AccountDetails from "./steps/AccountDetails";
import AcademicDetails from "./steps/AcademicDetails";
import ProfessionalDetails from "./steps/ProfessionalDetails";

const steps = [
  "Personal Details",
  "Account Details",
  "Academic Details",
  "Professional Details",
];

const EmployeeForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [fileData, setFileData] = useState({}); // For image and documents

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFileData((prev) => ({ ...prev, [name]: files[0] }));
  };

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

  const handleSubmit = async () => {
    const submissionData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value);
    });

    Object.entries(fileData).forEach(([key, file]) => {
      submissionData.append(key, file);
    });

    try {
      const response = await fetch("http://localhost:8000/api/employees", {
        method: "POST",
        body: submissionData,
      });

      if (!response.ok) throw new Error("Failed to submit data");

      const result = await response.json();
      alert("Employee registered successfully!");
      console.log(result);

      setActiveStep(0);
      setFormData({});
      setFileData({});
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Submission failed. Try again.");
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <PersonalDetails formData={formData} handleChange={handleChange} />
        );
      case 1:
        return (
          <AccountDetails formData={formData} handleChange={handleChange} />
        );
      case 2:
        return (
          <AcademicDetails formData={formData} handleChange={handleChange} />
        );
      case 3:
        return (
          <ProfessionalDetails
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
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

import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";

const PromotionEligibilityForm = () => {
  const [formData, setFormData] = useState({
    year: "",
    conhess: "",
    designation: "",
    step: "",
    dolp: "",
    fileNumber: "",
    user: "",
  });

  const [eligibilityMessage, setEligibilityMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const checkEligibility = () => {
    if (!formData.dolp) {
      setEligibilityMessage("Please select Date of Last Promotion.");
      return false;
    }

    const minYearsRequired = 3;
    const lastPromotionDate = new Date(formData.dolp);
    const nextEligibleDate = new Date(lastPromotionDate);
    nextEligibleDate.setFullYear(nextEligibleDate.getFullYear() + minYearsRequired);

    if (new Date() < nextEligibleDate) {
      setEligibilityMessage(
        `Not eligible yet. Next eligible date: ${nextEligibleDate.toDateString()}`
      );
      return false;
    }

    setEligibilityMessage("✅ Eligible for promotion.");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkEligibility()) return;

    setLoading(true);
    try {
      await axios.post("http://localhost:8000/api/promotions/", formData);
      alert("Promotion added successfully!");
      setFormData({
        year: "",
        conhess: "",
        designation: "",
        step: "",
        dolp: "",
        fileNumber: "",
        user: "",
      });
      setEligibilityMessage("");
    } catch (error) {
      alert("Error adding promotion");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ minHeight: 250, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Promotion Eligibility
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Year"
            type="date"
            name="year"
            value={formData.year}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Conhess"
            name="conhess"
            value={formData.conhess}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Step"
            type="number"
            name="step"
            value={formData.step}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Date of Last Promotion"
            type="date"
            name="dolp"
            value={formData.dolp}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="File Number"
            name="fileNumber"
            value={formData.fileNumber}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="User"
            name="user"
            value={formData.user}
            onChange={handleChange}
            fullWidth
            required
          />

          {eligibilityMessage && (
            <Alert severity={eligibilityMessage.includes("✅") ? "success" : "error"}>
              {eligibilityMessage}
            </Alert>
          )}

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Saving..." : "Save Promotion"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PromotionEligibilityForm;
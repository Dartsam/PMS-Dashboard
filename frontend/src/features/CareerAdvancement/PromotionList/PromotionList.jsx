import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

const PromotionList = () => {
  const [formData, setFormData] = useState({
    role: "",
    criteria: "",
    yearsOfExperience: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Promotion request submitted:", formData);
    alert("Promotion request submitted successfully!");
  };

  return (
    <Card sx={{ minHeight: 250, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Promotion List (Application Form)
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Fill this form to request consideration for promotion.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Desired Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Criteria Met"
            name="criteria"
            value={formData.criteria}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Years of Experience"
            name="yearsOfExperience"
            type="number"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            fullWidth
            required
          />

          <Button variant="contained" type="submit">
            Submit Promotion Request
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PromotionList;
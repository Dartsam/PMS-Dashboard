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

const EducationQualificationForm = () => {
  const [formData, setFormData] = useState({
    institution: "",
    startDate: "",
    endDate: "",
    certificate: "",
    certificateId: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:5000/api/education", formData);
      setMessage("✅ Educational qualification added successfully!");
      setFormData({
        institution: "",
        startDate: "",
        endDate: "",
        certificate: "",
        certificateId: "",
      });
    } catch (error) {
      setMessage("❌ Error submitting data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ minHeight: 250, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Educational Qualification
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Institution Attended"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            required
          />
          <TextField
            label="Start Date"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="End Date"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Certificate Obtained"
            name="certificate"
            value={formData.certificate}
            onChange={handleChange}
            required
          />
          <TextField
            label="Certificate ID"
            name="certificateId"
            value={formData.certificateId}
            onChange={handleChange}
          />

          {message && <Alert severity={message.includes("✅") ? "success" : "error"}>{message}</Alert>}

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Saving..." : "Save Education"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EducationQualificationForm;

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

const ProfessionalQualificationForm = () => {
  const [formData, setFormData] = useState({
    issuingBody: "",
    certificateId: "",
    certificateName: "",
    issueDate: "",
    expiryDate: "",
    licenceNumber: "",
    user: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(
        "http://localhost:8000/api/professional-qualification/",
        formData
      );
      setMessage("✅ Professional qualification added successfully!");
      setFormData({
        issuingBody: "",
        certificateId: "",
        certificateName: "",
        issueDate: "",
        expiryDate: "",
        licenceNumber: "",
        user: "",
      });
    } catch (error) {
      setMessage("❌ Error saving qualification");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ minHeight: 250, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Professional Qualification
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Issuing Body"
            name="issuingBody"
            value={formData.issuingBody}
            onChange={handleChange}
            required
          />
          <TextField
            label="Certificate ID"
            name="certificateId"
            value={formData.certificateId}
            onChange={handleChange}
            required
          />
          <TextField
            label="Certificate Name"
            name="certificateName"
            value={formData.certificateName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Issue Date"
            type="date"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Expiry Date"
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Licence Number"
            name="licenceNumber"
            value={formData.licenceNumber}
            onChange={handleChange}
          />
          <TextField
            label="User"
            name="user"
            value={formData.user}
            onChange={handleChange}
          />

          {message && <Alert severity={message.includes("✅") ? "success" : "error"}>{message}</Alert>}

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Saving..." : "Save Qualification"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfessionalQualificationForm;
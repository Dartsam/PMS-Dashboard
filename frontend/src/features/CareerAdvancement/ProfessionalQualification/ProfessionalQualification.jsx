import React, { useState } from "react";
import axios from "axios";

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
      const response = await axios.post(
        "http://localhost:8000/api/professional-qualification/",
        formData
      );
      setMessage("Professional qualification added successfully!");
      console.log(response.data);
    } catch (error) {
      setMessage("Error saving qualification");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3 className="mb-4 text-center">Add Professional Qualification</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Issuing Body</label>
            <input
              type="text"
              className="form-control"
              name="issuingBody"
              value={formData.issuingBody}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Certificate ID</label>
            <input
              type="text"
              className="form-control"
              name="certificateId"
              value={formData.certificateId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Certificate Name</label>
            <input
              type="text"
              className="form-control"
              name="certificateName"
              value={formData.certificateName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Issue Date</label>
            <input
              type="date"
              className="form-control"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Expiry Date</label>
            <input
              type="date"
              className="form-control"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Licence Number</label>
            <input
              type="text"
              className="form-control"
              name="licenceNumber"
              value={formData.licenceNumber}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">User</label>
            <input
              type="text"
              className="form-control"
              name="user"
              value={formData.user}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>

          {message && (
            <div className="alert alert-info text-center mt-3">{message}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfessionalQualificationForm;
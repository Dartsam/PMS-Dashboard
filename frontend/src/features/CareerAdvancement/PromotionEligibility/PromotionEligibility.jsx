
import React, { useState } from "react";
import axios from "axios";

const PromotionForm = () => {
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

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Check eligibility before submit
  const checkEligibility = () => {
    if (!formData.dolp) {
      setEligibilityMessage("Please select Date of Last Promotion.");
      return false;
    }

    const minYearsRequired = 3; // Example rule
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

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkEligibility()) {
      return;
    }

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
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3 className="mb-4 text-center">Add Promotion</h3>
        <form onSubmit={handleSubmit}>
          {/* Year */}
          <div className="mb-3">
            <label className="form-label">Year</label>
            <input
              type="date"
              className="form-control"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>

          {/* Conhess */}
          <div className="mb-3">
            <label className="form-label">Conhess</label>
            <input
              type="text"
              className="form-control"
              name="conhess"
              value={formData.conhess}
              onChange={handleChange}
              required
            />
          </div>

          {/* Designation */}
          <div className="mb-3">
            <label className="form-label">Designation</label>
            <input
              type="text"
              className="form-control"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
            />
          </div>

          {/* Step */}
          <div className="mb-3">
            <label className="form-label">Step</label>
            <input
              type="number"
              className="form-control"
              name="step"
              value={formData.step}
              onChange={handleChange}
              required
            />
          </div>

          {/* Date of Last Promotion */}
          <div className="mb-3">
            <label className="form-label">Date of Last Promotion (Dolp)</label>
            <input
              type="date"
              className="form-control"
              name="dolp"
              value={formData.dolp}
              onChange={handleChange}
              required
            />
          </div>

          {/* File Number */}
          <div className="mb-3">
            <label className="form-label">File Number</label>
            <input
              type="text"
              className="form-control"
              name="fileNumber"
              value={formData.fileNumber}
              onChange={handleChange}
              required
            />
          </div>

        {/* user*/}
          <div className="mb-3">
            <label className="form-label">User</label>
            <input
              type="text"
              className="form-control"
              name="user"
              value={formData.user}
              onChange={handleChange}
              required
            />
          </div>

          {/* Eligibility Message */}
          {eligibilityMessage && (
            <div
              className={`alert ${
                eligibilityMessage.includes("✅") ? "alert-success" : "alert-danger"
              }`}
            >
              {eligibilityMessage}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Saving..." : "Save Promotion"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PromotionEligibilityForm;
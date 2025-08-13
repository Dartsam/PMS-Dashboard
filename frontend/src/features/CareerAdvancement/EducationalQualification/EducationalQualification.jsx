import React, { useState } from "react";
import axios  from "axios";

const EducationQualificationForm = () => {
  const [formData, setFormData] = useState({
    institution: "",
    startDate: "",
    endDate: "",
    certificate: "",
    certificateId: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] =useState ("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
try {
      const response = await axios.post("http://localhost:5000/api/education", formData);
      setMessage("Data submitted successfully!");
      console.log(response.data);
    } catch (error) {
      setMessage("Error submitting data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mt-8">
      <h4 className="mb-1">Educational Qualification</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label>Institution Attended</label>
          <input
            type="text"
            className="form-control"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <div className="mb-5 col-md-8">
            <label>Start Date</label>
            <input
              type="date"
              className="form-control"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 col-md-6">
            <label>End Date</label>
            <input
              type="date"
              className="form-control"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label>Certificate Obtained</label>
          <input
            type="text"
            className="form-control"
            name="certificate"
            value={formData.certificate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Certificate ID</label>
          <input
            type="text"
            className="form-control"
            name="certificateId"
            value={formData.certificateId}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EducationQualificationForm;
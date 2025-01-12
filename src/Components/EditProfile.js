import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    gender: "",
    isSubscribe: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData({
          name: res.data.Name,
          address: res.data.Address,
          phoneNumber: res.data.Phonenumber,
          gender: res.data.Gender,
          isSubscribe: res.data.isSubscribe,
        });
      } catch (err) {
        console.error(err);
        alert("Error fetching profile data.");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:8080/Profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    Swal.fire({
      icon: 'success',
      title: 'Profile updated successfully!',
      showConfirmButton: false,
      timer: 1500
    });
      navigate("/home");
    } catch (err) {
      console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Error updating profile.',
      text: 'Something went wrong!',
    });
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Name"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
            placeholder="Address"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="form-control"
            placeholder="Phone Number"
            required
          />
        </div>

        <div className="mb-3">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label>
            <input
              type="checkbox"
              name="isSubscribe"
              checked={formData.isSubscribe}
              onChange={handleChange}
            />
            Subscribe to newsletter
          </label>
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;

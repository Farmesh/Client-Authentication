import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
 
const ChangePassword = () => {
   const [formData, setFormData] = useState({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
   });
  const navigate = useNavigate();


   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (formData.newPassword !== formData.confirmPassword) {
         alert("New password and confirm password do not match.");
         return;
      }

      try {
         const token = localStorage.getItem("token");
         const res = await axios.put(
            "http://localhost:8080/change-password",
            {
               oldPassword: formData.oldPassword,
               newPassword: formData.newPassword,
            },
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );
          Swal.fire({
            icon: 'success',
            title: 'Password Changed',
            text: res.data.message,
          });
      navigate("/home");

          
      } catch (err) {
         console.error("Error:", err.response ? err.response.data : err.message);
         alert(err.response?.data?.message || "Failed to change password.");
      }
   };

   return (
      <div className="container mt-5">
         <h1>Change Password</h1>
         <form onSubmit={handleSubmit}>
            <div className="mb-3">
               <label>Old Password</label>
               <input
                  type="password"
                  name="oldPassword"
                  placeholder="Old Password"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  className="form-control"
                  required
               />
            </div>
            <div className="mb-3">
            <label>New Password</label>

               <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="form-control"
                  required
               />
            </div>
            <div className="mb-3">
            <label>Confirm Password</label>

               <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                  required
               />
            </div>
            <button type="submit" className="btn btn-primary">
               Change Password
            </button>
         </form>
      </div>
   );
};

export default ChangePassword;

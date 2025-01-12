import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      const res = await axios.post("http://localhost:8080/login", formData);
      console.log(res.data);  

      localStorage.setItem("token", res.data.token);
      // console.log(res.data.user.Name);
      localStorage.setItem("user", res.data.user.Name);
      localStorage.setItem("email", res.data.user.Email);
      localStorage.setItem("PhoneNumber", res.data.user.PhoneNumber);
      localStorage.setItem("Gender", res.data.user.Gender);
      localStorage.setItem("Country", res.data.user.Country);
      Swal.fire({
        icon: 'success',
        title: 'Login successful!',
        showConfirmButton: false,
        timer: 1500
      });
      toast.success("login Successfull");
      navigate("/home");
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid email or password.',
      });
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

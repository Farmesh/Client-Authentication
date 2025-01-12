import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
   const [formData, setFormData] = useState({
      Name: "",
      Address: "",
      Phonenumber: "",
      Email: "",
      Password: "",
      Gender: "",
      isSubscribe: false,
      countryId: "",
      stateId: "",
      cityId: "",
      otp: "", // New field for OTP input
   });

   const [countries, setCountries] = useState([]);
   const [states, setStates] = useState([]);
   const [cities, setCities] = useState([]);
   const [otpSent, setOtpSent] = useState(false); // Track if OTP is sent
   const navigate = useNavigate();

   useEffect(() => {
      axios
         .get("http://localhost:8080/countries")
         .then((res) => setCountries(res.data))
         .catch((err) => console.log("Error fetching countries:", err));
   }, []);

   useEffect(() => {
      if (formData.countryId) {
         axios
            .get(`http://localhost:8080/states/${formData.countryId}`)
            .then((res) => setStates(res.data))
            .catch((err) => console.log("Error fetching states:", err));
      }
   }, [formData.countryId]);

   useEffect(() => {
      if (formData.stateId) {
         axios
            .get(`http://localhost:8080/cities/${formData.stateId}`)
            .then((res) => setCities(res.data))
            .catch((err) => console.log("Error fetching cities:", err));
      }
   }, [formData.stateId]);

   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: type === "checkbox" ? checked : value,
      }));
   };

   const sendOtp = async () => {
      try {
         const res = await axios.post("http://localhost:8080/send-otp", {
            Phonenumber: formData.Phonenumber,
         });
         if (res && res.data && res.data.message) {
            Swal.fire({
               icon: 'success',
               title: 'OTP Sent',
               text: res.data.message,
            });
            toast.success(res.data.message);
            setOtpSent(true); 
         }
      } catch (err) {
         const errorMessage = "Failed to send OTP!";
         Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage,
         });
         toast.error(errorMessage);
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const res = await axios.post("http://localhost:8080/register", formData);
         if (res && res.data && res.data.message) {
            Swal.fire({
               icon: 'success',
               title: 'Registration Successful',
               text: res.data.message,
            });
            toast.success(res.data.message);
            navigate("/login");
         }
      } catch (err) {
         const errorMessage = "Something went wrong!";
         Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: errorMessage,
         });
         toast.error(errorMessage);
      }
   };

   return (
      <div className="container mt-5">
         <h1 className="text-center">Register</h1>
         <form onSubmit={handleSubmit}>
      
            <div className="mb-3">
               <input
                  type="text"
                  name="Name"
                  placeholder="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  className="form-control"
               />
            </div>
            <div className="mb-3">
               <input
                  type="text"
                  name="Address"
                  placeholder="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  className="form-control"
               />
            </div>
            <div className="mb-3">
               <input
                  type="text"
                  name="Phonenumber"
                  placeholder="Phone Number"
                  value={formData.Phonenumber}
                  onChange={handleChange}
                  className="form-control"
               />
               {!otpSent && (
                  <button
                     type="button"
                     className="btn btn-secondary mt-2"
                     onClick={sendOtp}
                  >
                     Send OTP
                  </button>
               )}
            </div>

            {otpSent && (
               <div className="mb-3">
                  <input
                     type="text"
                     name="otp"
                     placeholder="Enter OTP"
                     value={formData.otp}
                     onChange={handleChange}
                     className="form-control"
                  />
               </div>
            )}

            <div className="mb-3">
               <input
                  type="email"
                  name="Email"
                  placeholder="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  className="form-control"
               />
            </div>
            <div className="mb-3">
               <input
                  type="password"
                  name="Password"
                  placeholder="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  className="form-control"
               />
            </div>
            <div className="mb-3">
               <label>Gender</label>
               <div>
                  <input
                     type="radio"
                     name="Gender"
                     value="Male"
                     checked={formData.Gender === "Male"}
                     onChange={handleChange}
                     className="form-check-input"
                  />
                  <label>Male</label>
               </div>
               <div>
                  <input
                     type="radio"
                     name="Gender"
                     value="Female"
                     checked={formData.Gender === "Female"}
                     onChange={handleChange}
                     className="form-check-input"
                  />
                  <label>Female</label>
               </div>
               <div>
                  <input
                     type="radio"
                     name="Gender"
                     value="Other"
                     checked={formData.Gender === "Other"}
                     onChange={handleChange}
                     className="form-check-input"
                  />
                  <label>Other</label>
               </div>
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
               <select
                  name="countryId"
                  value={formData.countryId}
                  onChange={handleChange}
                  className="form-select"
               >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                     <option key={country._id} value={country._id}>
                        {country.name}
                     </option>
                  ))}
               </select>
            </div>
            <div className="mb-3">
               <select
                  name="stateId"
                  value={formData.stateId}
                  onChange={handleChange}
                  className="form-select"
               >
                  <option value="">Select State</option>
                  {states.map((state) => (
                     <option key={state._id} value={state._id}>
                        {state.name}
                     </option>
                  ))}
               </select>
            </div>
            <div className="mb-3">
               <select
                  name="cityId"
                  value={formData.cityId}
                  onChange={handleChange}
                  className="form-select"
               >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                     <option key={city._id} value={city._id}>
                        {city.name}
                     </option>
                  ))}
               </select>
            </div>
            <div className="mb-3">
               <button type="submit" className="btn btn-primary">
                  Register
               </button>
            </div>
         </form>
         <ToastContainer />
      </div>
   );
};

export default Register;

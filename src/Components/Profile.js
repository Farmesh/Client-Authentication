import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get("https://server-authentication-1.onrender.com/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch((err) => console.log("Error fetching profile:", err));
    }
  }, [token]);

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-3 mb-5 bg-white rounded">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Profile</h1>
          {user ? (
            <div>
              <p className="card-text"><strong>Name:</strong> {user.Name}</p>
              <p className="card-text"><strong>Email:</strong> {user.Email}</p>
              <p className="card-text"><strong>Address:</strong> {user.Address}</p>
              <p className="card-text"><strong>Phone Number:</strong> {user.Phonenumber}</p>
              <p className="card-text"><strong>Gender:</strong> {user.Gender}</p>
              <p className="card-text"><strong>Subscribe to Newsletter:</strong> {user.isSubscribe ? "Yes" : "No"}</p>
            </div>
          ):""}
        </div>
      </div>
    </div>
  );
};

export default Profile;

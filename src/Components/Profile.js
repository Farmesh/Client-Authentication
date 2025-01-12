import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8080/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch((err) => console.log("Error fetching profile:", err));
    }
  }, [token]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Profile</h1>
      {user ? (
        <div>
          <p>Name: {user.Name}</p>
          <p>Email: {user.Email}</p>
          <p>Address: {user.Address}</p>
          <p>Phone Number: {user.Phonenumber}</p>
          <p>Gender: {user.Gender}</p>
          <p>Subscribe to Newsletter: {user.isSubscribe ? "Yes" : "No"}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;

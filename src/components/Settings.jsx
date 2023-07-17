import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Settings.css";

const Settings = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleProfileEdit = () => {
    // Implement logic to update profile with the new name and email
    console.log("Profile updated:", { name, email });
    // Optionally, redirect to a success page
    navigate("/settings/edit/success");
  };

  const handleDeleteAccount = () => {
    // Implement logic to delete the user account
    console.log("Account deleted");
    // Optionally, redirect to a login page or home page
    navigate("/login");
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="profile-edit">
        <h2>Edit Profile</h2>
        {/* <form className="form-container"> */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <button className="btn" onClick={handleProfileEdit}>
          Save Changes
        </button>
        {/* </form> */}
      </div>
      <div className="delete-account">
        <h2>Delete Account</h2>
        <p>
          Deleting your account is an irreversible action. All your data will be
          permanently deleted.
        </p>
        <button className="btn btn-danger" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;

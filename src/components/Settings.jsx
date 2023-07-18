/*
This file represents the Settings component, which handles user settings related functionality.
It imports necessary dependencies from the React and 'react-router-dom' libraries and also imports
the required CSS file for styling.
*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Settings.css";

/*
The Settings component is a functional component that renders the user settings page.
It allows users to edit their profile and delete their account.
*/
const Settings = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [deleteEmail, setDeleteEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");

  /*
  Event handler for email input changes in the edit profile form.
  Updates the email value in the state.
  */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  /*
  Event handler for old password input changes in the edit profile form.
  Updates the old password value in the state.
  */
  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  /*
  Event handler for new password input changes in the edit profile form.
  Updates the new password value in the state.
  */
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  /*
  Event handler for delete email input changes in the delete account form.
  Updates the delete email value in the state.
  */
  const handleEmailDelete = (e) => {
    setDeleteEmail(e.target.value);
  };

  /*
  Event handler for password input changes in the delete account form.
  Updates the password value in the state.
  */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /*
  Event handler for saving profile changes.
  Performs input validation and sends a POST request to update the password.
  */
  const handleProfileEdit = () => {
    // Perform input validation for empty fields
    if (!email || !oldPassword || !newPassword) {
      alert("Please fill in all required fields.");
      return;
    }
    // Send a POST request to update the password
    fetch("http://localhost:3306/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: "update",
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update password");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Password updated:", data.password);
        alert("Changed password successfully.");
      })
      .catch((error) => {
        console.log(error);
        alert("Incorrect credentials or failed to update password.");
      });
  };

  /*
  Event handler for deleting the account.
  Performs input validation and sends a POST request to delete the account.
  */
  const handleDeleteAccount = () => {
    // Perform input validation for empty fields
    if (!deleteEmail || !password) {
      alert("Please fill in all required fields.");
      return;
    }
    // Send a POST request to delete the account
    fetch("http://localhost:3306/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: "delete",
        deleteEmail: deleteEmail,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update password");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Account deleted:", data.id);
        alert("Account deleted successfully.");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("Incorrect credentials or failed to delete account.");
      });
  };

  /*
  Render the Settings component.
  It includes sections for editing profile and deleting account.
  */
  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="profile-edit">
        <h2>Edit Profile</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={handleOldPasswordChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </div>
        <button className="btn" onClick={handleProfileEdit}>
          Save Changes
        </button>
      </div>
      <div className="delete-account">
        <h2>Delete Account</h2>
        <p>
          Deleting your account is an irreversible action. All your data will be
          permanently deleted.
        </p>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="deleteEmail"
            value={deleteEmail}
            onChange={handleEmailDelete}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="btn btn-danger" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;

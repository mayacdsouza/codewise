import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Settings.css';

const Settings = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleProfileEdit = () => {
    // Implement logic to update the profile with the new password
    console.log('Password updated:', { password });
    // Optionally, redirect to a success page
    navigate('/settings/edit/success');
  };

  const handleDeleteAccount = () => {
    // Implement logic to delete the user account
    console.log('Account deleted');
    // Optionally, redirect to a login page or home page
    navigate('/login');
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="profile-edit">
        <h2>Edit Profile</h2>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
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
        <button className="btn btn-danger" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
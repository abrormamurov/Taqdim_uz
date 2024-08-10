import React from "react";
import "./MyAccount.css";

const MyAccount = () => {
  return (
    <div className="my-account-container">
      <h2>My Account</h2>
      <form className="my-account-form">
        <div className="form-group">
          <label htmlFor="full_name">Full Name</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            placeholder="Full Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Email" />
        </div>
        <div className="form-group">
          <label htmlFor="telephone">Telephone</label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            placeholder="Telephone"
          />
        </div>
        <button type="submit" className="submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default MyAccount;

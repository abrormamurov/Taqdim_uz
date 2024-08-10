import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Profile from "../../service/edit";

function Create() {
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    telephone: "",
    location: "",
    about: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await Profile.createProfile(formData);
      if (response) {
        navigate("/preview", { state: { formData, token: response.token } });
      } else {
        setError("Failed to create profile");
      }
    } catch (error) {
      console.error("Failed to create profile:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <NavLink
        to={"/"}
        className="brand items-center flex justify-center mt-10 mb-10"
      >
        <i className="bx "></i>
        <span className="text-gradient">TAQDIM.UZ</span>
      </NavLink>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="form-group flex flex-col mb-4">
          <label htmlFor="username" className="mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full max-w-[600px] p-2 text-sm border rounded"
          />
        </div>
        <div className="form-group flex flex-col mb-4">
          <label htmlFor="full_name" className="mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full max-w-[600px] p-2 text-sm border rounded"
          />
        </div>
        <div className="form-group flex flex-col mb-4">
          <label htmlFor="telephone" className="mb-2">
            Telephone
          </label>
          <input
            type="text"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="w-full max-w-[600px] p-2 text-sm border rounded"
          />
        </div>
        <div className="form-group flex flex-col mb-4">
          <label htmlFor="location" className="mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full max-w-[600px] p-2 text-sm border rounded"
          />
        </div>
        <div className="form-group flex flex-col mb-4">
          <label htmlFor="about" className="mb-2">
            About
          </label>
          <textarea
            id="about"
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="w-full max-w-[600px] p-2 text-sm border rounded"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full max-w-[600px] py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default Create;

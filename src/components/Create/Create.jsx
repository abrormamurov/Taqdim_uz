import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Profile from "../../service/edit";
import IconSelector from "../IconMap/IconSelector"; // Import IconSelector
import "./Create.css"; // Import the CSS file for styling

function Create({ t }) {
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    telephone: "",
    location: "",
    about: "",
    sites: [],
    profile_image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_image") {
      setFormData((prevData) => ({
        ...prevData,
        profile_image: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddSite = () => {
    setFormData((prevData) => ({
      ...prevData,
      sites: [...prevData.sites, { icon: "", url: "" }],
    }));
  };

  const getIconType = (url) => {
    if (url.match(/instagram/)) return "Instagram";
    if (url.match(/twitter/)) return "Twitter";
    if (url.match(/t.me/)) return "Telegram";
    if (url.match(/whatsapp/)) return "Whatsapp";
    if (url.match(/facebook/)) return "Facebook";
    if (url.match(/youtube/)) return "YouTube";
    if (url.match(/web/)) return "Web";
    if (url.match(/tel:/)) return "PhoneNumber";
    if (url.match(/linkedin/)) return "LinkedIn";
    if (url.match(/snapchat/)) return "Snapchat";
    if (url.match(/steam/)) return "Steam";
    if (url.match(/tiktok/)) return "TikTok";
    if (url.match(/odnoklassniki/)) return "Odnoklassniki";
    if (url.match(/vk/)) return "VK";
    if (url.match(/dropbox/)) return "Dropbox";
    if (url.match(/maps.google/)) return "GoogleMaps";
    if (url.match(/threads/)) return "Threads";
    if (url.match(/viber/)) return "Viber";
    if (url.match(/github/)) return "GitHub";

    return "";
  };

  const handleSiteChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSites = formData.sites.map((site, i) => {
      if (i === index) {
        const updatedSite = { ...site, [name]: value };
        // Update icon if URL changes
        if (name === "url") {
          updatedSite.icon = getIconType(value);
        }
        return updatedSite;
      }
      return site;
    });

    setFormData((prevData) => ({
      ...prevData,
      sites: updatedSites,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("username", formData.username);
      formDataToSubmit.append("full_name", formData.full_name);
      formDataToSubmit.append("telephone", formData.telephone);
      formDataToSubmit.append("location", formData.location);
      formDataToSubmit.append("about", formData.about);
      formDataToSubmit.append("sites", JSON.stringify(formData.sites));

      if (formData.profile_image) {
        formDataToSubmit.append("profile_image", formData.profile_image);
      }

      const profileResponse = await Profile.createProfile(formDataToSubmit);
      console.log("Profile created:", profileResponse);

      navigate(`/preview/${formData.username}`, {
        state: { username: formData.username },
      });
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
      {loading && <p className="text-center">{t.loading}</p>}
      {error && (
        <p className="text-red-500 text-center text-bold text-xl">
          {t.createerror}
        </p>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Form Inputs */}
        <div className="form-group flex flex-col mb-4">
          <label htmlFor="profile_image" className="mb-2">
            {t.profileimage}
          </label>
          <div className="profile-image-preview mb-4 relative">
            {formData.profile_image ? (
              <img
                src={URL.createObjectURL(formData.profile_image)}
                alt="Profile Preview"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border border-gray-300 flex items-center justify-center pl-4 text-gray-500">
                <span>{t.NoImage}</span>
              </div>
            )}
            <input
              type="file"
              id="profile_image"
              name="profile_image"
              accept="image/*"
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
        <div className="form-group flex flex-col mb-4">
          <label htmlFor="username" className="mb-2">
            {t.username}
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
            {t.fullname}
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
            {t.phonenumber}
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
            {t.location}
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
            {t.about}
          </label>
          <textarea
            id="about"
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="w-full max-w-[600px] p-2 text-sm border rounded bg-white"
          />
        </div>

        <div className="form-group flex flex-col mb-4">
          <label className="mb-2"> {t.links}</label>
          {formData.sites.map((site, index) => (
            <div key={index} className="flex gap-4 mb-2 items-center">
              <IconSelector type={site.icon} />{" "}
              {/* Add IconSelector component */}
              <input
                type="text"
                name="icon"
                placeholder="Icon Name"
                value={site.icon}
                onChange={(e) => handleSiteChange(index, e)}
                className="w-1/3 p-2 text-sm border rounded"
              />
              <input
                type="text"
                name="url"
                placeholder="URL"
                value={site.url}
                onChange={(e) => handleSiteChange(index, e)}
                className="w-2/3 p-2 text-sm border rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSite}
            className="py-2 px-4 bg-blue-500 text-white rounded"
          >
            {t.addlink}
          </button>
        </div>

        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white rounded"
        >
          {loading ? t.loading : t.create}
        </button>
      </form>
    </div>
  );
}

export default Create;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../../service/edit";
import IconSelector from "../../components/IconMap/IconSelector";
import "./Edit.css";
import { FaRegUser } from "react-icons/fa";

function Edit() {
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    telephone: "",
    location: "",
    about: "",
    profile_image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [urls, setUrls] = useState([]);

  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);

      try {
        const profile = await Profile.getProfile(username);
        setFormData((prevData) => ({
          ...prevData,
          ...profile,
          profile_image: null,
        }));
        if (profile.sites) {
          setUrls(profile.sites);
        }
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
        setError("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profile_image: file,
    }));
  };

  const handleLinkChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLinks = [...urls];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [name]: value,
      icon: getIconType(value), // Get the icon type based on URL
    };

    setUrls(updatedLinks);
  };

  const handleAddLink = () => {
    const newLink = { name: "", url: "", icon: "", type: "", id: "" };
    setUrls([...urls, newLink]);
  };

  const getIconType = (url) => {
    if (url.match(/instagram/)) return "Instagram";
    if (url.match(/twitter/)) return "Twitter";
    if (url.match(/telegram/)) return "Telegram";
    if (url.match(/whatsapp/)) return "Whatsapp";
    if (url.match(/facebook/)) return "Facebook";
    if (url.match(/youtube/)) return "YouTube";
    if (url.match(/web/)) return "Web";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { qr_code, profile_image, ...formDataWithoutQrCode } = formData;

      const formDataToSend = new FormData();
      for (const key in formDataWithoutQrCode) {
        formDataToSend.append(key, formDataWithoutQrCode[key]);
      }

      if (profile_image) {
        formDataToSend.append("profile_image", profile_image);
      }

      formDataToSend.append("sites", JSON.stringify(urls));

      const response = await Profile.updateProfile(formDataToSend, username);

      if (response) {
        setFormData((prevData) => ({
          ...prevData,
          profile_image: null,
        }));
        navigate(`/preview/${username}`);
      } else {
        setError("Failed to update profile");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-container max-w-sm mx-auto p-4">
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      <form className="edit-form flex flex-col" onSubmit={handleSubmit}>
        <div className="form-group mb-6">
          <label htmlFor="username" className="block mb-2 text-gray-600">
            Username
          </label>
          <input
            className="input w-full p-2 border rounded-md border-gray-300 text-gray-600"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="form-group mb-6">
          <label htmlFor="full_name" className="block mb-2 text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            className="w-full p-2 border rounded-md border-gray-300 text-gray-600"
            value={formData.full_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-6">
          <label htmlFor="telephone" className="block mb-2 text-gray-600">
            Telephone
          </label>
          <input
            type="text"
            id="telephone"
            name="telephone"
            className="w-full p-2 border rounded-md border-gray-300 text-gray-600"
            value={formData.telephone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-6">
          <label htmlFor="location" className="block mb-2 text-gray-600">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="w-full p-2 border rounded-md border-gray-300 text-gray-600"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-6">
          <label htmlFor="about" className="block mb-2 text-gray-600">
            About
          </label>
          <textarea
            id="about"
            name="about"
            className="w-full p-2 border rounded-md border-gray-300 text-gray-600"
            value={formData.about}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-6 relative w-32 h-32 sm:w-48 sm:h-48 flex items-center justify-center">
          <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-200 flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-slate-300 hover:border-4 hover:border-blue-500">
            {formData.profile_image ? (
              <img
                src={URL.createObjectURL(formData.profile_image)}
                alt="Profile Preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <FaRegUser className="text-blue-600 w-20 h-20 sm:w-32 sm:h-32" />
            )}
            <input
              type="file"
              id="profile_image"
              name="profile_image"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {urls.map((url, index) => (
          <div key={index} className="form-group mb-6">
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="w-full p-2 border rounded-md border-gray-300 text-gray-600"
              value={url.name}
              onChange={(e) => handleLinkChange(index, e)}
            />
            <input
              type="text"
              placeholder="Link"
              name="url"
              className="w-full p-2 border rounded-md border-gray-300 text-gray-600 mt-2"
              value={url.url}
              onChange={(e) => handleLinkChange(index, e)}
            />
            {url.url && <IconSelector type={url.icon} />}
          </div>
        ))}

        <div className="buttons flex justify-between gap-2">
          <button
            type="button"
            className="bg-blue-500 text-white px-6 py-2 rounded-full"
            onClick={handleAddLink}
          >
            Add Link
          </button>

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-full"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;

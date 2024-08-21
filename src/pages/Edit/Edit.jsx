import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../../service/edit";
import IconSelector from "../../components/IconMap/IconSelector";
import "./Edit.css";

function Edit({ t }) {
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

        let profileImageUrl = null;
        if (profile.profile_image instanceof Blob) {
          profileImageUrl = URL.createObjectURL(profile.profile_image);
        }

        setFormData((prevData) => ({
          ...prevData,
          ...profile,
          profile_image: profileImageUrl,
        }));

        if (profile.sites) {
          setUrls(profile.sites);
        }
      } catch (error) {
        console.error("Profil ma'lumotlarini olishda xatolik:", error);
        setError("Profil ma'lumotlarini olishda xatolik");
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
      icon: getIconType(value),
    };

    setUrls(updatedLinks);
  };

  const handleAddLink = () => {
    const newLink = { name: "", url: "", icon: "", type: "", id: "" };
    setUrls([...urls, newLink]);
  };

  const handleDeleteLink = (index) => {
    const updatedLinks = urls.filter((_, i) => i !== index);
    setUrls(updatedLinks);
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
        setError("Profilni yangilashda xatolik");
      }
    } catch (error) {
      console.error("Profilni yangilashda xatolik:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-container max-w-sm mx-auto p-4">
      {loading && <p className="">{t.loading}</p>}
      {error && <p className="text-red-600">Xato: </p>}
      <form className="edit-form  flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex items-center ">
          <div className="relative  rounded-full w-44 h-44 overflow-hidden bg-slate-200 flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-slate-300 hover:border-4 hover:border-blue-500 mb-5 md:mb-0">
            {formData.profile_image ? (
              <img
                src={formData.profile_image}
                alt="Profil oldindan ko'rsatish"
                className="object-cover w-full h-full rounded-full"
              />
            ) : (
              <div className="default-image w-full h-full flex items-center justify-center pl-6 text-gray-500">
                {t.NoImage}
              </div>
            )}
            <input
              type="file"
              id="profile_image"
              name="profile_image"
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept="image/*"
              value={formData.profile_image}
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col gap-5 w-full">
            <div className="form-group">
              <label htmlFor="username" className="block mb-2 ">
                {t.username}
              </label>
              <input
                className="input w-full p-2 border rounded-md border-gray-300 bg-white"
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="full_name" className="block mb-2 ">
                {t.fullname}
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                className="w-full p-2 border rounded-md border-gray-300 "
                value={formData.full_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="telephone" className="block mb-2 ">
                {t.phonenumber}
              </label>
              <input
                type="text"
                id="telephone"
                name="telephone"
                className="w-full p-2 border rounded-md border-gray-300 "
                value={formData.telephone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="location" className="block mb-2 ">
                {t.location}
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="w-full p-2 border rounded-md border-gray-300 "
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="about" className="block mb-2 text-gray-600">
                {t.about}
              </label>
              <textarea
                id="about"
                name="about"
                className="w-full p-2 border rounded-md border-gray-300 text-gray-600 bg-white"
                value={formData.about}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="block mb-2 ">{t.links}</label>
          {urls.map((url, index) => (
            <div key={index} className="link-item  items-center gap-4 mb-2">
              <input
                type="text"
                name="name"
                placeholder="Nom"
                value={url.name}
                onChange={(e) => handleLinkChange(index, e)}
                className="w-1/2 p-2 border mb-2 mt-2 rounded-md border-gray-300 "
              />
              <input
                type="text"
                name="url"
                placeholder="URL"
                value={url.url}
                onChange={(e) => handleLinkChange(index, e)}
                className="w-1/2 p-2 border  rounded-md border-gray-300 "
              />
              <div className="flex justify-between mt-2">
                <IconSelector type={url.icon} />
                <button
                  type="button"
                  onClick={() => handleDeleteLink(index)}
                  className="text-white bg-red-600 hover:text-red-800"
                >
                  {t.delete}
                </button>
              </div>
            </div>
          ))}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <button
              type="button"
              onClick={handleAddLink}
              className="bg-blue-500  text-white px-4 py-2 rounded-md"
            >
              {t.addlink}{" "}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {t.save}
        </button>
      </form>
    </div>
  );
}

export default Edit;

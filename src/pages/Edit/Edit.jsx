import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../../service/edit";
import IconSelector from "../../components/IconMap/IconSelector";
import "./Edit.css";
import axios from "axios";
import useToken from "antd/es/theme/useToken";
function ConfirmationModal({ isVisible, onClose, onConfirm, t }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">Eslatma</h2>
        <p className="mb-4">{t.deleteP}</p>
        <div className="flex justify-between">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Ha
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Yo'q
          </button>
        </div>
      </div>
    </div>
  );
}
function Edit({ t }) {
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    telephone: "",
    location: "",
    about: "",
    profile_image: null,
    pdf: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [urls, setUrls] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accounts, setAccounts] = useState([]);

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
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // API dan rasm URL olish
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(
          `https://api.taqdim.uz/profile/list/${username}`
        );
        // API dan olingan rasm URL'ni saqlang
        setFormData({
          profile_image: response.data.imageUrl, // API dan olingan rasm URL ni saqlash
        });
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    fetchProfileImage();
  }, [username]);
  const handleChange1 = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Yangi rasm yuklanganda preview yarating
      setImagePreview(URL.createObjectURL(file));
      // FormData ga yangi rasmni saqlang yoki serverga yuboring
      setFormData((prevState) => ({
        ...prevState,
        profile_image: file, // Bu yerda faylni saqlang yoki serverga yuboring
      }));
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB limit

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert("File size exceeds the 20 MB limit.");
        return;
      }

      setFormData((prevData) => ({
        ...prevData,
        pdf: file,
      }));
    }
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
      const { qr_code, profile_image, pdf, ...formDataWithoutQrCode } =
        formData;

      // Construct FormData
      const formDataToSend = new FormData();
      for (const key in formDataWithoutQrCode) {
        formDataToSend.append(key, formDataWithoutQrCode[key]);
      }

      if (formData.profile_image) {
        formDataToSend.append("profile_image", formData.profile_image);
      }

      if (pdf !== null) {
        // Fayl o'lchamini tekshirish
        if (pdf && pdf.size > 20 * 1024 * 1024) {
          throw new Error("PDF fayli juda katta");
        }

        formDataToSend.append("pdf", pdf);
      }

      // Add URLs as JSON string
      formDataToSend.append(
        "sites",
        JSON.stringify(
          urls.map((url) => ({
            name: url.name,
            url: url.url,
            icon: url.icon,
          }))
        )
      );

      // Send request
      const response = await Profile.updateProfile(formDataToSend, username);

      if (response) {
        setFormData((prevData) => ({
          ...prevData,
          profile_image: null,
          pdf: null,
        }));
        navigate(`/preview/${username}`);
      } else {
        setError("Profilni yangilashda xatolik");
      }
    } catch (error) {
      console.error("Profilni yangilashda xatolik:", error);
      setError("Profilni yangilashda xatolik: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    setIsModalVisible(true);
  };
  useEffect(() => {
    const fetchAccounts = async () => {};

    fetchAccounts();
  }, []);

  const handleConfirmDelete = async () => {
    try {
      console.log("Deleting profile:", username);
      await Profile.deleteProfile(username);

      console.log("Profile deleted. Refreshing token...");
      await Profile.refreshToken();

      console.log("Token refreshed. Fetching updated accounts...");
      const updatedProfile = await Profile.getProfile(username);

      if (updatedProfile.length > 0) {
        navigate(`/preview/${updatedProfile[0].username}`);
      } else {
        navigate.location.reload();
        console.log("No accounts found. Navigating to default page...");
        navigate("/create");
      }
    } catch (error) {
      console.error("Hisobni o'chirishda xatolik:", error);
      setError("Hisobni o'chirishda xatolik: " + error.message);
    } finally {
      setIsModalVisible(false);
      window.location.reload();
    }
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="edit-container max-w-sm mx-auto p-4">
      <form
        className="edit-form  flex flex-col gap-6"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="flex items-center ">
          <div className="relative rounded-full w-44 h-44 overflow-hidden bg-slate-200 flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-slate-300 hover:border-4 hover:border-blue-500 mb-5 md:mb-0">
            <div className="relative rounded-full w-44 h-44 overflow-hidden bg-slate-200 flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-slate-300 hover:border-4 hover:border-blue-500 mb-5 md:mb-0">
              <div className="relative rounded-full w-44 h-44 overflow-hidden bg-slate-200 flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-slate-300 hover:border-4 hover:border-blue-500 mb-5 md:mb-0">
                {imagePreview || formData.profile_image ? (
                  <img
                    src={
                      imagePreview ||
                      URL.createObjectURL(formData.profile_image)
                    } // Preview yoki eski rasm URL
                    alt="Profile Preview"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border border-gray-300 flex items-center justify-center pl-4 text-gray-500">
                    <span>{t.NoImage}</span> {/* Default rasm haqida matn */}
                  </div>
                )}

                <input
                  type="file"
                  id="profile_image"
                  name="profile_image"
                  accept="image/*"
                  onChange={handleChange1}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
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
            <div className="form-group">
              <label htmlFor="pdf" className="block mb-2 ">
                pdf{" "}
              </label>
              <input
                type="file"
                id="pdf"
                name="pdf"
                className="w-full p-2 border rounded-md border-gray-300"
                accept=".pdf"
                defaultvalue={formData.pdf}
                onChange={handlePdfChange}
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
                className="w-full p-2 border mb-2 mt-2 rounded-md border-gray-300 "
              />
              <input
                type="text"
                name="url"
                placeholder="URL"
                value={url.url}
                onChange={(e) => handleLinkChange(index, e)}
                className=" p-2 border w-full  rounded-md border-gray-300 "
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

        <div className="flex justify-between">
          {" "}
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            {t.deleteacc}
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            {t.save}
          </button>
        </div>
      </form>
      <ConfirmationModal
        isVisible={isModalVisible}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        t={t}
      />
    </div>
  );
}

export default Edit;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoLocationSharp } from "react-icons/io5";
import { BsFillTelephoneOutboundFill, BsTelephone } from "react-icons/bs";
import {
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
  FaYoutube,
  FaFacebook,
  FaGlobe,
} from "react-icons/fa";

function Preview({ setUsername }) {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  const handleDownload = async () => {
    try {
      if (!qrCodeUrl) return;

      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `qr_code_${username}.png`;
      document.body.appendChild(a);
      a.click();

      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          `http://64.225.8.227:9999/profile/list/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData(response.data);
        setQrCodeUrl(response.data.qr_code); // Assuming qr_code is part of the response
        if (setUsername) setUsername(username); // Update username state
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setAuthError("No Profile matches the given query.");
        } else if (error.response && error.response.status === 401) {
          setAuthError("Unauthorized access. Please log in again.");
        } else {
          console.error("Error fetching user data:", error);
          setAuthError("An error occurred. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username, setUsername]);

  if (loading) {
    return <div className="text-center text-xl text-red-500">Loading...</div>;
  }

  if (authError) {
    return <div className="text-center text-xl text-red-500">{authError}</div>;
  }

  return (
    <div className="p-5 max-w-4xl mx-auto rounded-lg mt-5">
      <div className="flex justify-center gap-10 flex-col md:flex-row items-center mb-5">
        <div className="mb-4 md:mb-0">
          {userData?.profile_image ? (
            <img
              src={userData.profile_image}
              alt="Profile Avatar"
              className="w-40 h-40 rounded-full object-cover shadow-lg"
            />
          ) : (
            <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center text-gray-700">
              No Image
            </div>
          )}
        </div>
        <div className="text-center md:text-left md:ml-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {userData?.username}
          </h1>
          <p className="text-xl text-blue-600 flex items-center justify-center md:justify-start mt-2">
            <IoLocationSharp className="mr-2" /> {userData?.location}
          </p>
          <a
            className="text-xl text-blue-600 hover:underline flex items-center justify-center md:justify-start mt-2"
            href={`tel:${userData?.telephone}`}
          >
            <BsFillTelephoneOutboundFill className="mr-2" />
            {userData?.telephone}
          </a>
          <p className="text-lg mt-2">{userData?.about}</p>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-2xl font-semibold mb-3">Sites</h2>
        <div className="space-y-2">
          {userData?.sites?.map((site, index) => {
            let Icon;
            switch (site.icon) {
              case "Instagram":
                Icon = FaInstagram;
                break;
              case "Telegram":
                Icon = FaTelegram;
                break;
              case "Whatsapp":
                Icon = FaWhatsapp;
                break;
              case "YouTube":
                Icon = FaYoutube;
                break;
              case "Facebook":
                Icon = FaFacebook;
                break;
              case "Telephone":
                Icon = BsTelephone;
                break;
              default:
                Icon = FaGlobe; // Agar aniqlanmagan bo'lsa, umumiy veb-ikonka
            }

            return (
              <a
                key={index}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex gap-3 items-center p-4 rounded-lg shadow-md ${
                  site.icon === "Instagram"
                    ? "bg-pink-600 text-white"
                    : site.icon === "Telegram"
                    ? "bg-blue-500 text-white"
                    : site.icon === "Whatsapp"
                    ? "bg-green-500 text-white"
                    : site.icon === "Telephone"
                    ? "bg-green-500 text-white"
                    : site.icon === "YouTube"
                    ? "bg-red-600 text-white"
                    : site.icon === "Facebook"
                    ? "bg-blue-800 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <Icon className="mr-2 w-10 h-10" />
                <span className="font-bold text-lg">{site.icon}</span>
              </a>
            );
          })}
        </div>
      </div>

      <div className="mt-5 text-center">
        {qrCodeUrl ? (
          <>
            <img
              src={qrCodeUrl}
              alt="QR Code"
              className="w-20 h-20 mx-auto border-2 border-gray-800 rounded-lg"
            />
            <div className="mt-3">
              <button
                onClick={handleDownload}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Download QR Code
              </button>
            </div>
          </>
        ) : (
          <div>No QR Code</div>
        )}
      </div>
    </div>
  );
}

export default Preview;

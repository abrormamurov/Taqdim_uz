import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoLocationSharp } from "react-icons/io5";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          `https://vildan.pythonanywhere.com/profile/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData(response.data);
        if (setUsername) setUsername(username); // Update username state
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setAuthError("Unauthorized access. Please log in again.");
        } else {
          console.error("Error fetching user data:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) {
    return <div className="text-center text-xl text-red-500">Loading...</div>;
  }

  if (authError) {
    return <div className="text-center text-xl text-red-500">{authError}</div>;
  }

  return (
    <div className="p-5 max-w-4xl mx-auto  rounded-lg  mt-5">
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
            <BsFillTelephoneOutboundFill className="mr-2" />{" "}
            {userData?.telephone}
          </a>
          <p className="text-lg text-gray-600 mt-2">About: {userData?.about}</p>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Sites</h2>
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
                    : site.icon === "YouTube"
                    ? "bg-red-600 text-white"
                    : site.icon === "Facebook"
                    ? "bg-blue-800 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <Icon className="mr-2 w-10 h-10" />
                <span className="font-bold text-lg font-helvetica">
                  {site.icon}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      <div className="mt-5 text-center">
        {userData?.qr_code ? (
          <>
            <img
              src={userData.qr_code}
              alt="QR Code"
              className="w-20 h-20 mx-auto border-2 border-gray-800 rounded-lg"
            />
            <div className="mt-3">
              <a
                href={userData.qr_code}
                download="qr_code.png"
                className="text-blue-600 hover:underline"
              >
                Download QR Code
              </a>
            </div>
          </>
        ) : (
          <div className="text-gray-600">No QR Code</div>
        )}
      </div>
    </div>
  );
}

export default Preview;

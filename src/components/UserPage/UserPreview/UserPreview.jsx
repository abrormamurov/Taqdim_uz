import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoLocationSharp } from "react-icons/io5";
import { BsFillTelephoneOutboundFill, BsTelephone } from "react-icons/bs";
import {
  FaInstagram,
  FaTwitter,
  FaTelegramPlane,
  FaWhatsapp,
  FaFacebookF,
  FaGlobe,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaCopy } from "react-icons/fa";

function UserPreview({ setUsername }) {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState(null); // QR kod URL holati

  const handleCopy = () => {
    navigator.clipboard
      .writeText(`https://taqdim.uz/${username}`)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying URL:", error);
      });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://api.taqdim.uz/profile/list/${username}`
        );

        setUserData(response.data);
        setQrCodeUrl(response.data.qr_code); // QR kod URLni o'rnatish
        if (setUsername) setUsername(username); // Update username state
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setAuthError("User not found");
        } else if (error.response && error.response.status === 401) {
          setAuthError("Authentication credentials were not provided.");
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
            <IoLocationSharp className=" mr-2" size={26} />
            {userData?.location}
          </p>
          <a
            className="text-xl text-blue-600 hover:underline flex items-center justify-center md:justify-start mt-2"
            href={`tel:${userData?.telephone}`}
          >
            <BsFillTelephoneOutboundFill className="mr-2 " />{" "}
            {userData?.telephone}
          </a>
          <p className="text-lg  mt-2">{userData?.about}</p>
        </div>
      </div>
      <div className="mt-5 text-center flex justify-center items-center">
        <div className="flex h-10 border-4 border-blue-500 rounded-3xl items-center justify-center w-96 p-8">
          <span className="text-gray-700">
            <a
              href={`https://taqdim.uz/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              https://taqdim.uz/{username}
            </a>
          </span>
          <button
            onClick={handleCopy}
            className="ml-3  text-gray-600 hover:text-gray-800 border mt-7 border-blue-500 rounded-lg px-2 py-1"
            aria-label="Copy URL"
          >
            <FaCopy size={20} />
          </button>
        </div>
      </div>

      <div className="mt-5">
        <div className="space-y-2">
          {userData?.sites?.map((site, index) => {
            let Icon;
            let backgroundColor;

            switch (site.icon) {
              case "Instagram":
                Icon = FaInstagram;
                backgroundColor = "bg-pink-600";
                break;
              case "Telegram":
                Icon = FaTelegramPlane;
                backgroundColor = "bg-blue-500";
                break;
              case "Whatsapp":
                Icon = FaWhatsapp;
                backgroundColor = "bg-green-500";
                break;
              case "YouTube":
                Icon = BsYoutube;
                backgroundColor = "bg-red-600";
                break;
              case "Facebook":
                Icon = FaFacebookF;
                backgroundColor = "bg-blue-800";
                break;
              case "GitHub":
                Icon = FaGithub;
                backgroundColor = "bg-gray-800"; // qo'shimcha rang
                break;
              case "LinkedIn":
                Icon = FaLinkedin;
                backgroundColor = "bg-blue-700"; // qo'shimcha rang
                break;
              case "Telephone":
                Icon = BsTelephone;
                backgroundColor = "bg-green-500";
                break;
              default:
                Icon = FaGlobe;
                backgroundColor = "bg-gray-200"; // umumiy veb-ikonka
            }

            return (
              <a
                key={index}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex gap-3 items-center p-4 rounded-lg shadow-md ${backgroundColor} text-white`}
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
                className=" text-white hover:underline"
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

export default UserPreview;

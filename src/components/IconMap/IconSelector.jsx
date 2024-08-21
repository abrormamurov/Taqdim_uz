// IconSelector.jsx
import React from "react";
import { BsTelephone, BsYoutube } from "react-icons/bs";
import {
  FaInstagram,
  FaTwitter,
  FaTelegramPlane,
  FaWhatsapp,
  FaFacebookF,
  FaGlobe,
  FaGithub,
  FaLinkedin,
  FaSnapchatGhost,
  FaSteam,
  FaTiktok,
  FaOdnoklassniki,
  FaVk,
  FaDropbox,
} from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { FaThreads, FaViber } from "react-icons/fa6";

import "./IconSelector.css";

const iconMap = {
  Instagram: {
    icon: <FaInstagram size={24} color="#000" />,
    label: "Instagram",
  },
  Twitter: {
    icon: <FaTwitter size={24} color="#000" />,
    label: "Twitter",
  },
  Telegram: {
    icon: <FaTelegramPlane size={24} color="#000" />,
    label: "Telegram",
  },
  Whatsapp: {
    icon: <FaWhatsapp size={24} color="#000" />,
    label: "WhatsApp",
  },
  Facebook: {
    icon: <FaFacebookF size={24} color="#000" />,
    label: "Facebook",
  },
  Web: {
    icon: <FaGlobe size={24} color="#000" />,
    label: "Website",
  },
  YouTube: {
    icon: <BsYoutube size={24} color="#000" />,
    label: "YouTube",
  },
  PhoneNumber: {
    icon: <BsTelephone size={24} color="#000" />,
    label: "PhoneNumber",
  },
  GitHub: {
    icon: <FaGithub size={24} color="#000" />,
    label: "GitHub",
  },
  LinkedIn: {
    icon: <FaLinkedin size={24} color="#000" />,
    label: "LinkedIn",
  },
  Snapchat: {
    icon: <FaSnapchatGhost size={24} color="#000" />,
    label: "Snapchat",
  },
  Steam: {
    icon: <FaSteam size={24} color="#000" />,
    label: "Steam",
  },
  TikTok: {
    icon: <FaTiktok size={24} color="#000" />,
    label: "TikTok",
  },
  Odnoklassniki: {
    icon: <FaOdnoklassniki size={24} color="#000" />,
    label: "Odnoklassniki",
  },
  VK: {
    icon: <FaVk size={24} color="#000" />,
    label: "VK",
  },
  Dropbox: {
    icon: <FaDropbox size={24} color="#000" />,
    label: "Dropbox",
  },
  GoogleMaps: {
    icon: <SiGooglemaps size={24} color="#000" />,
    label: "Google Maps",
  },
  Threads: {
    icon: <FaThreads size={24} color="#000" />,
    label: "Threads",
  },
  Viber: {
    icon: <FaViber size={24} color="#000" />,
    label: "Viber",
  },
};

const IconSelector = ({ type }) => {
  const iconInfo = iconMap[type] || { icon: null, label: "" };

  return (
    <div className="icon-selector">
      {iconInfo.icon && <div className="icon-display">{iconInfo.icon}</div>}
      {iconInfo.label && <div className="icon-label">{iconInfo.label}</div>}
    </div>
  );
};

export default IconSelector;

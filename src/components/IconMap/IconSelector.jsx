import React from "react";
import { BsYoutube } from "react-icons/bs";
import {
  FaInstagram,
  FaTwitter,
  FaTelegramPlane,
  FaWhatsapp,
  FaFacebookF,
  FaGlobe,
} from "react-icons/fa";
import "./IconSelector.css";

const iconMap = {
  Instagram: {
    icon: <FaInstagram size={24} color="#000" />,
    label: "Instagram",
    label: "Instagram",
  },
  Twitter: { icon: <FaTwitter size={24} color="#000" />, label: "Twitter" },
  label: "Twitter",

  Telegram: {
    icon: <FaTelegramPlane size={24} color="#000" />,
    label: "Telegram",
  },
  Whatsapp: { icon: <FaWhatsapp size={24} color="#000" />, label: "WhatsApp" },
  label: "Whatsapp",

  Facebook: { icon: <FaFacebookF size={24} color="#000" />, label: "Facebook" },
  label: "Facebook",

  Web: { icon: <FaGlobe size={24} color="#000" />, label: "Website" },
  label: "Web",

  YouTube: { icon: <BsYoutube size={24} color="#000" />, label: "YouTube" },
  label: "YouTube",
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

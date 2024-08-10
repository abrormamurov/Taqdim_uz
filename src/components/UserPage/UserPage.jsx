import React, { useEffect, useState } from "react";
import Profile from "../../service/edit"; // Profil ma'lumotlarini olish uchun

const UserPage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await Profile.postProfile();
        setUserData(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{userData.username} Profil Sahifasi</h1>
      <p>Email: {userData.email}</p>
    </div>
  );
};

export default UserPage;

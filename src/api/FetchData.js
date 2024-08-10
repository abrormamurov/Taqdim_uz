const fetchData = async () => {
  setLoading(true);
  try {
    const token = getAccessToken();
    console.log("Fetching profile with token:", token); // Tokenni konsolda ko'rsatish
    const response = await Profile.postProfile(token);
    console.log("Profile data:", response); // Ma'lumotlarni konsolda ko'rsatish
    setLocalData(response);
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
    setError(error);
  } finally {
    setLoading(false);
  }
};

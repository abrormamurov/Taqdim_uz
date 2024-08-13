import api from "./api";

const Profile = {
  async postProfile(username) {
    try {
      const response = await api.get(
        `/profile/list/${username}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response || new Error("Unknown error");
    }
  },
  async getProfile(username) {
    try {
      const response = await api.get(`/profile/list/${username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response || new Error("Unknown error");
    }
  },
  async updateProfile(params, username) {
    try {
      const response = await api.patch(`/profile/${username}/`, params, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Update Profile Error Response:", error.response?.data);
      throw new Error(
        error.response?.data?.detail || error.message || "Unknown error"
      );
    }
  },
  async createProfile(data) {
    try {
      const response = await api.post("/profile/create/", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log("Request Headers:", response.data);
      return response.data;
    } catch (error) {
      console.error("Create Profile Error:", error);
      throw new Error(error.message || "Unknown error");
    }
  },
  async iconProfile(data) {
    try {
      const response = await api.get("/icons/", {
        params: { url: data.url },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log("Icon response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Create Profile Error:", error);
      throw new Error(error.message || "Unknown error");
    }
  },
  async postPreview() {
    try {
      const response = await api.get("/profile/list/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response || new Error("Unknown error");
    }
  },
};

export default Profile;

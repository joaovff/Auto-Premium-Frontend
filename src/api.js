import axios from "axios";
const BASE_URL = `${process.env.REACT_APP_AUTO_PREMIUM_API}`;
export const getAllAnnouncements = () => {
  return axios.get(`${BASE_URL}/announcements`);
};

export const getAnnouncement = (id) => {
  return axios.get(`${BASE_URL}/announcements/${id}`);
};

export const createAnnouncement = (announcement) => {
  return axios.post(`${BASE_URL}/announcements/create`, announcement, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

export const deleteAnnouncement = (id) => {
  return axios.delete(`${BASE_URL}/announcements/${id}`);
};

export const login = (user) => {
  return axios.post(`${BASE_URL}/login`, user);
};

export const signup = (user) => {
  return axios.post(`${BASE_URL}/signup`, user);
};

export const verify = (token) => {
  return axios.get(`${BASE_URL}/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateAnnouncement = (announcementId) => {
  return axios.put(
    `${BASE_URL}/announcements/${announcementId}`,
    announcementId
  );
};

export const uploadImage = (uploadData) => {
  return axios.post(`${BASE_URL}/announcements/upload`, uploadData);
};

export const getMakes = () => {
  return axios.get(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
  );
};

export const getUser = (userId) => {
  return axios.get(`${BASE_URL}/profile/${userId}`);
};

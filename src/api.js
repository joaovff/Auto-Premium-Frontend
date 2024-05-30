import axios from "axios";
const BASE_URL = `${process.env.REACT_APP_AUTO_PREMIUM_API}`; /* "http://localhost:5005" */
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

export const updateAnnouncement = (announcementId, announcement) => {
  return axios.put(
    `${BASE_URL}/announcements/edit/${announcementId}`,
    announcement
  );
};

//UPLOAD ANNOUNCEMENT IMAGE
export const uploadImage = (uploadData) => {
  return axios.post(`${BASE_URL}/announcements/upload`, uploadData);
};

//UPDATE USER (email and password)
export const editUser = (userId, user) => {
  return axios.put(`${BASE_URL}/profile/edit/security/${userId}`, user);
};

//UPDATE USER (name,phone,picture)
export const editUserGeneral = (userId, user) => {
  return axios.put(`${BASE_URL}/profile/edit/${userId}`, user);
};

//DELETE USER
export const deleteUser = (userId) => {
  return axios.delete(`${BASE_URL}/${userId}`);
};

//UPLOAD USER PICTURE
export const UploadPicture = (uploadData) => {
  return axios.post(`${BASE_URL}/upload`, uploadData);
};

export const getMakes = () => {
  return axios.get(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
  );
};

export const getUser = (userId) => {
  return axios.get(`${BASE_URL}/profile/${userId}`);
};

export const userSettings = (userId) => {
  return axios.get(`${BASE_URL}/profile/settings/${userId}`);
};

export const updateFavorites = (userId, favoritesId) => {
  return axios.put(`${BASE_URL}/profile/favorites/${userId}`, favoritesId);
};

export const getFavorites = (userId) => {
  return axios.get(`${BASE_URL}/profile/favorites/${userId}`);
};

export const deleteFavorites = (userId, itemId) => {
  return axios.patch(`${BASE_URL}/profile/favorites/${userId}`, {
    itemId: itemId,
  });
};

export const sendMessage = (sms) => {
  return axios.post(`${BASE_URL}/send-sms`, sms);
};

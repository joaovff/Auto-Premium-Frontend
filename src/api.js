import axios from "axios";
const BASE_URL = `${process.env.REACT_APP_AUTO_PREMIUM_API}`;
export const getAllAnnouncements = () => {
  return axios.get(`${BASE_URL}/announcements`);
};

export const getAnnouncement = (id) => {
  return axios.get(`${BASE_URL}/announcements/${id}`);
};

export const createAnnouncement = (announcement) => {
  return axios.post(`${BASE_URL}/announcements/create`, announcement);
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

export const uploadImage = (uploadData) => {
  return axios.post(`${BASE_URL}/announcements/upload`, uploadData);
};

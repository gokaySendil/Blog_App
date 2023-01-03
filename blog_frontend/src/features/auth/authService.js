import axios from "axios";
const BASEURL = "http://localhost:8000/api/users/";

// Login
const loginUser = async () => {};

// Register
const registerUser = async (userData) => {
  const response = await axios.post(BASEURL, userData);
  if (response.data) {
    // Save the user to localStorage
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout
const logoutUser = async () => {
  localStorage.removeItem("user");
};

module.exports = { loginUser, registerUser, logoutUser };

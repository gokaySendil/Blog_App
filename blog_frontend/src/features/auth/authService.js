import axios from "axios";
const BASEURL = "http://localhost:8000/api/users";

// Login
const loginUser = async (userData) => {
  const res = await axios.post(BASEURL+"/login",userData);
  if(res.data){
    // Save the user to localStorage
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

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
  localStorage.removeItem("user")
};

const authService = {
  registerUser,
  logoutUser,
  loginUser,
};
export default authService;

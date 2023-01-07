import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout,reset } from "../features/auth/authSlice";
const MainPage = () => {
  const dispacth = useDispatch();
  const nav = useNavigate();
  const onLogout =() => {
    dispacth(logout());
    dispacth(reset());
    nav("/auth")
    
  }
  return <div>MainPage
    <button onClick={onLogout}>Logout</button></div>;
};

export default MainPage;

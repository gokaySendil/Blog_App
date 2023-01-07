import React from "react";
import Form from "./pages/Form";
import Landing from "./pages/Landing";
import MainPage from "./pages/Main";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Form />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
      <ToastContainer/>
    </div>
   
  );
}

export default App;

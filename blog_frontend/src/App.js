import React from "react";
import Form from "./pages/Form";
import Landing from "./pages/Landing";
import MainPage from "./pages/Main";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Form />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;

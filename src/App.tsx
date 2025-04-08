import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Sidebar />

        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/rooms" element={<div>rooms</div>} />
          <Route path="/routes" element={<div>routes</div>} />
          <Route path="/mypage" element={<div>mypage</div>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import Login from "./pages/Login";
import Main from "./pages/Main";

const DefaultLayout: React.FC = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Main />} />
            <Route path="/rooms" element={<div>rooms</div>} />
            <Route path="/routes" element={<div>routes</div>} />
            <Route path="/mypage" element={<div>mypage</div>} />
            <Route path="/rooms/map" element={<div>Rooms - Map</div>} />
            <Route
              path="/rooms/calendar"
              element={<div>Rooms - Calendar</div>}
            />
            <Route
              path="/rooms/route-calculation"
              element={<div>Rooms - Route Calculation</div>}
            />
            <Route
              path="/rooms/room-info"
              element={<div>Rooms - Room Info</div>}
            />

            <Route
              path="/routes/my-route"
              element={<div>Routes - My Route</div>}
            />
            <Route
              path="/routes/saved-routes"
              element={<div>Routes - Saved Routes</div>}
            />

            <Route
              path="/mypage/reviews"
              element={<div>MyPage - Reviews</div>}
            />
            <Route
              path="/mypage/calendar"
              element={<div>MyPage - Calendar</div>}
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;

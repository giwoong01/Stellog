import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Room from "./pages/Room";
import RoomCreate from "./pages/RoomCreate";
import RoomDetail from "./pages/RoomDetail";
import ReviewForm from "./pages/ReviewForm";

const DefaultLayout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Main />} />
            <Route path="/rooms" element={<Room />} />
            <Route path="/rooms/create" element={<RoomCreate />} />
            <Route path="/rooms/:roomId" element={<RoomDetail />} />
            <Route
              path="/rooms/:roomId/calendar"
              element={<div>Rooms - Calendar</div>}
            />
            <Route
              path="/rooms/:roomId/route-calculation"
              element={<div>Rooms - Route Calculation</div>}
            />
            <Route
              path="/rooms/:roomId/room-info"
              element={<div>Rooms - Room Info</div>}
            />
            <Route path="/rooms/:roomId/review" element={<ReviewForm />} />

            <Route path="/routes" element={<div>routes</div>} />
            <Route
              path="/routes/my-route"
              element={<div>Routes - My Route</div>}
            />
            <Route
              path="/routes/saved-routes"
              element={<div>Routes - Saved Routes</div>}
            />

            <Route path="/mypage" element={<div>mypage</div>} />
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

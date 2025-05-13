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
import Room from "./pages/RoomList";
import RoomCreate from "./pages/RoomCreate";
import RoomDetail from "./pages/RoomDetail";
import ReviewForm from "./pages/ReviewForm";
import RoomCalendar from "./pages/RoomCalendar";
import RoomRoute from "./pages/RoomRouteList";
import RoomRouteCreate from "./pages/RoomRouteCreate";
import RoomRouteDetail from "./pages/RoomRouteDetail";
import RoomInfo from "./pages/RoomInfo";
import RoomEdit from "./pages/RoomEdit";

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
            <Route path="/rooms/:roomId/calendar" element={<RoomCalendar />} />
            <Route path="/rooms/:roomId/routes" element={<RoomRoute />} />
            <Route
              path="/rooms/:roomId/routes/create"
              element={<RoomRouteCreate />}
            />
            <Route
              path="/rooms/:roomId/routes/:routeId"
              element={<RoomRouteDetail />}
            />
            <Route path="/rooms/:roomId/info" element={<RoomInfo />} />
            <Route path="/rooms/:roomId/review" element={<ReviewForm />} />
            <Route path="/rooms/:roomId/edit" element={<RoomEdit />} />

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

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
import Room from "./pages/room/RoomList";
import RoomCreate from "./pages/room/RoomCreate";
import RoomDetail from "./pages/room/RoomDetail";
import ReviewForm from "./pages/ReviewForm";
import RoomCalendar from "./pages/room/RoomCalendar";
import RoomRoute from "./pages/room/RoomRouteList";
import RoomRouteCreate from "./pages/room/RoomRouteCreate";
import RoomInfo from "./pages/room/RoomInfo";
import RoomEdit from "./pages/room/RoomEdit";
import RouteList from "./pages/route/RouteList";
import RouteDetail from "./pages/route/RouteDetail";
import RouteStarList from "./pages/route/RouteStarList";
import RouteMyList from "./pages/route/RouteMyList";
import MyPage from "./pages/mypage/MyPage";

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
              element={<RouteDetail />}
            />
            <Route path="/rooms/:roomId/info" element={<RoomInfo />} />
            <Route path="/rooms/:roomId/review" element={<ReviewForm />} />
            <Route path="/rooms/:roomId/edit" element={<RoomEdit />} />

            <Route path="/routes" element={<RouteList />} />
            <Route path="/routes/star" element={<RouteStarList />} />
            <Route path="/routes/my" element={<RouteMyList />} />
            <Route path="/routes/:routeId" element={<RouteDetail />} />

            <Route path="/mypage" element={<MyPage />} />
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

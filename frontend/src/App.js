import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./pages/navbar/Navbar";
import Profile from "./pages/profile/Profile";
import Register from "./pages/auth/register";
import Login from "./pages/auth/Login";
import Form from "./pages/form/Form";
import OtherProfile from "./pages/otherProfile/OtherProfile";
import Explore from "./pages/explore/Explore";
import Sidenav from "./pages/sidenav/Sidenav";
import SavedPosts from "./pages/savedPost/SavedPosts";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Sidenav />
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route exact path="/login" element={<Login />} />

          <Route exact path="/register" element={<Register />} />
          <Route exact path="/form" element={<Form />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/profile/:id" element={<OtherProfile />} />
          <Route exact path="/explore" element={<Explore />} />
          <Route exact path="/saved" element={<SavedPosts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

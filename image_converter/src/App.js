import "./App.css";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import Convert from "./pages/Convert";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/convert" element={<Convert />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </>
    );
}

export default App;

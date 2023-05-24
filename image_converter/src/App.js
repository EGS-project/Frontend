import "./App.css";
import Navbar from "./Navbar";
import Convert from "./pages/Convert";
import Profile from "./pages/Profile";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <>
            <Navbar />
            <div /*style={{ padding: "50px" }}*/>
                <Routes>
                    <Route path="/convert" element={<Convert />} />
                    <Route path="/login" component={() => {
                        window.location.href = process.env.REACT_APP_PROXY_URL + '/login';
                        return null;
                    }} />
                    <Route path="/logout" component={() => {
                        window.location.href = process.env.REACT_APP_PROXY_URL + '/logout';
                        return null;
                    }} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </>
    );
}

export default App;

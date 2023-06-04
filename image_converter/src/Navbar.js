import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import "./Navbar.css";


function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}

function getCookie(cookieName) {
    return Cookies.get(cookieName);
}

export default function Navbar() {
    const navigate = useNavigate();
    const cookieName = process.env.REACT_APP_COOKIE_NAME;
    const [logged, setLogged] = useState()


    useEffect(() => {
        var cookie = getCookie(cookieName);
        if (cookie !== undefined) {
            setLogged(true);
        } else {
            setLogged(false)
        }
    }, [cookieName]);


    if (logged) {
        return (
            <nav className="nav">
                <Link to="/" className="site-title">
                    <h2>ImgConv</h2>
                </Link>
                <ul>
                    <CustomLink to="/convert">Convert Image</CustomLink>
                    <CustomLink to="/profile">My Profile</CustomLink>
                    <CustomLink to="/logout">Logout</CustomLink>
                </ul>
            </nav>
        );
    } else {
        return (
            <nav className="nav">
                <Link to="/" className="site-title">
                    <h2>ImgConv</h2>
                </Link>
                <ul>
                    <CustomLink to="/login">Login</CustomLink>
                    <CustomLink to="/convert">Convert Image</CustomLink>
                </ul>
            </nav>
        );
    }

}


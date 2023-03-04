import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                <h2>ImgConv</h2>
            </Link>
            <ul>
                <CustomLink to="/login">Login</CustomLink>
                <CustomLink to="/signup">Sign Up</CustomLink>
                <CustomLink to="/convert">Convert Image</CustomLink>
                <CustomLink to="/profile">My Profile</CustomLink>
                <CustomLink to="/logout">Logout</CustomLink>
            </ul>
        </nav>
    );
}

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

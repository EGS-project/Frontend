import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const checkCookie = () => {
            const cookieName = process.env.REACT_APP_COOKIE_NAME;
            const cookieExists = document.cookie.includes(cookieName);

            if (cookieExists) {
                navigate('/convert');
            } else {
                navigate('/login');
            }
        };

        checkCookie();
    }, [navigate]);

    return <div>Checking cookie...</div>;
}

import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

function getCookie(cookieName) {
    return Cookies.get(cookieName);
}

async function login() {
    const fetchData = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_PROXY_URL + "/api/v1/login");
            if (response.ok) {
                return true;
            } else {
                throw new Error(response.status);
            }

        } catch (error) {
            console.error(error);
            return false
        }
    };

    return (await fetchData());
}

export default function Login() {
    const navigate = useNavigate();
    const cookieName = process.env.REACT_APP_COOKIE_NAME;
    useEffect(() => {
        const fetchData = async () => {
            var cookie = getCookie(cookieName);
            if (cookie !== undefined) {
                console.log('Cookie exists!');
                navigate('/')
            } else {
                console.log('Cookie does not exist!');
                navigate('/')
                window.open(process.env.REACT_APP_PROXY_URL + "/api/v1/login", '_blank');
                var successfulLogin = await login();
                if (successfulLogin) {
                    console.log("login successful");
                    window.location.reload(true);
                } else {
                    console.log("login failed");
                }
            }
        }

        fetchData();
    }, [navigate, cookieName]);
    return <h1> </h1>;
}

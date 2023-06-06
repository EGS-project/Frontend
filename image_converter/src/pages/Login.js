import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

function getCookie(cookieName) {
    return Cookies.get(cookieName);
}

async function login() {
    const fetchData = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_PROXY_URL + "/api/v1/login", {
                'credentials': 'include',
            })
            if (response.ok) {
                console.log("login ok")
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
                window.open(process.env.REACT_APP_PROXY_URL + "/api/v1/login", "_blank");
                window.location.reload(true);
            }
        }

        fetchData();
    }, [navigate, cookieName]);
    return <h1> </h1>;
}

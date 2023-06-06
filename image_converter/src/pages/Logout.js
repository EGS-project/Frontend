import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

function getCookie(cookieName) {
    return Cookies.get(cookieName);
}

async function logout() {
    const fetchData = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_PROXY_URL + "/api/v1/logout", {
                'credentials': 'include',
            })
            if (response.ok) {
                console.log("logout ok")
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

export default function Logout() {
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
                window.open(process.env.REACT_APP_PROXY_URL + "/api/v1/logout", "_blank");
                window.location.reload(true);
                navigate('/')
            }
        }
        fetchData();
    }, [navigate, cookieName]);
    return <h1> </h1>;
}

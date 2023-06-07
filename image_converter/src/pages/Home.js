import './home.css'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

function getCookie(cookieName) {
    return Cookies.get(cookieName);
}

export default function Home() {
    const navigate = useNavigate();
    const cookieName = process.env.REACT_APP_COOKIE_NAME;
    useEffect(() => {
        var cookie = getCookie(cookieName);
        if (cookie !== undefined) {
            console.log('Cookie exists!');
        } else {
            console.log('Cookie does not exist!');
        }
    }, [navigate, cookieName]);


    return (
        <>
            <div className="background-div-home">
                <h1>Welcome to ImgConv!</h1>
                <h3>Your all in one image convertion service</h3>
            </div>
        </>
    );

}
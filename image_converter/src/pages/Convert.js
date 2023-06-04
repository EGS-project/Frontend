import { AnimatePresence } from "framer-motion";
import UploadBox from "../Components/UploadBox";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import "./convert.css";


function getCookie(cookieName) {
    return Cookies.get(cookieName);
}

export default function Convert() {
    const navigate = useNavigate();
    const cookieName = process.env.REACT_APP_COOKIE_NAME;
    useEffect(() => {
        var cookie = getCookie(cookieName);
        if (cookie !== undefined) {
            console.log('Cookie exists!');
        } else {
            console.log('Cookie does not exist!');
            navigate('/login')
        }
    }, [navigate, cookieName]);

    return (
        <>
            <div className="background-div">
                <div className="wrapper-div">
                    <AnimatePresence>
                        <UploadBox />
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
}

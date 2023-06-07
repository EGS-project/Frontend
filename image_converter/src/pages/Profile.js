import "./profile.css";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Switch from '@mui/material/Switch';

function GetInfo() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_PROXY_URL + '/api/v1/user');
            if (response.status === 404) {
                throw Error;
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    const { email, nickname, auth_type, premium, email_notification, whatsapp_notification, sms_notification, profile_picture, conv_history, id } = data;

    return (
        <>
            <div className="wrapper-div-profile">
                <h1>Hello, {String(email).split('@')[0]}!</h1>
                <div className="user-data">
                    {/*profile picture*/}
                    <img src={profile_picture} className="prof-image" />
                    <ul className="profile-info-ul">
                        <li>
                            <p className="profile-sub">Email address:</p>
                            <p style={{ paddingLeft: 10 }}>{email}</p>

                        </li>
                        <li>
                            <p className="profile-sub">Authentication type:</p>
                            <p style={{ paddingLeft: 10 }}>{auth_type}</p>
                        </li>
                        <li>
                            <p className="profile-sub">Premium:</p>
                            <Switch label="label" />
                        </li>
                        <li>
                            <p className="profile-sub">Email notification:</p>
                            <Switch label="label" defaultChecked />
                        </li>
                        <li>
                            <p className="profile-sub">Whatsapp notification:</p>
                            <Switch label="label" />
                        </li>
                        <li>
                            <p className="profile-sub">SMS notification:</p>
                            <Switch label="label" />
                        </li>
                    </ul>

                </div>
                <h1>Conversion history</h1>
                <div className="user-history">
                    <ul>
                        {conv_history.map((item, index) => (
                            <li key={index}><a href={item.replace(/"|'/g, '')} target="_blank">{item.replace(/"|'/g, '')}</a></li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

function getCookie(cookieName) {
    return Cookies.get(cookieName);
}

export default function Profile() {
    const navigate = useNavigate();
    const cookieName = process.env.REACT_APP_COOKIE_NAME;
    useEffect(() => {
        var cookie = getCookie(cookieName);
        if (cookie !== undefined) {
            console.log('Cookie exists!');
        } else {
            console.log('Cookie does not exist!');
            //navigate('/login')
        }
    }, [navigate, cookieName]);


    return (
        <>
            <div className="background-div">
                <GetInfo />
            </div >
        </>
    );
}

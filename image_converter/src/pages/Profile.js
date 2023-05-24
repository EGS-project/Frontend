import "./profile.css";
import React, { useEffect, useState } from 'react';

function GetInfo() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_PROXY_URL + '/user');
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
                <h1>My profile</h1>
                <div className="user-data">
                    {/*profile picture*/}

                    <ul className="profile-info-ul">
                        <li>
                            <p>Nickname:</p>
                            <p style={{ paddingLeft: 10 }}>{nickname}</p>
                        </li>
                        <li>
                            <p>Email address:</p>
                            <p style={{ paddingLeft: 10 }}>{email}</p>
                        </li>
                        <li>
                            <p>Authentication type:</p>
                            <p style={{ paddingLeft: 10 }}>{auth_type}</p>
                        </li>
                        <li>
                            <p>Premium:</p>
                            <p style={{ paddingLeft: 10 }}>{premium}</p>
                        </li>
                        <li>
                            <p>Email notification:</p>
                            <p style={{ paddingLeft: 10 }}>{email_notification}</p>
                        </li>
                        <li>
                            <p>Whatsapp notification:</p>
                            <p style={{ paddingLeft: 10 }}>{whatsapp_notification}</p>
                        </li>
                        <li>
                            <p>SMS notification:</p>
                            <p style={{ paddingLeft: 10 }}>{sms_notification}</p>
                        </li>
                    </ul>

                </div>


                <h1>Convertion history</h1>
                <div className="user-history">
                    {conv_history.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </div>
            </div>
        </>
    );
}

export default function History() {
    return (
        <>
            <div className="background-div">
                <GetInfo />
            </div >
        </>
    );
}

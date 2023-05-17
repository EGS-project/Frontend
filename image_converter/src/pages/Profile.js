import "./profile.css";

export default function History() {
    return (
        <>
            <div className="background-div">
                <div className="wrapper-div-profile">
                    <h1>My profile</h1>
                    <div className="user-data">
                        {/*profile picture*/}
                        <ul className="profile-info-ul">
                            <li>
                                <p>Nickname:</p>
                                <p style={{ paddingLeft: 10 }}>&lt;name&gt;</p>
                            </li>
                            <li>
                                <p>Email address:</p>
                                <p style={{ paddingLeft: 10 }}>&lt;email&gt;</p>
                            </li>
                            <li>
                                <p>Authentication type:</p>
                                <p style={{ paddingLeft: 10 }}>&lt;?github&gt;</p>
                            </li>
                            <li>
                                <p>Premium:</p>
                                <p style={{ paddingLeft: 10 }}>&lt;?yes&gt;</p>
                            </li>
                            <li>
                                <p>Email notification:</p>
                                <p style={{ paddingLeft: 10 }}>&lt;?yes&gt;</p>
                            </li>
                            <li>
                                <p>Whatsapp notification:</p>
                                <p style={{ paddingLeft: 10 }}>&lt;?yes&gt;</p>
                            </li>
                            <li>
                                <p>SMS notification:</p>
                                <p style={{ paddingLeft: 10 }}>&lt;?yes&gt;</p>
                            </li>
                        </ul>

                    </div>


                    <h1>Convertion history</h1>
                    <div className="user-history">
                        <p>Conversion History</p>
                    </div>
                </div>
            </div>
        </>
    );
}

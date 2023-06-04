import React, { useState, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import './UploadBox.css';
import PropagateLoader from "react-spinners/PropagateLoader";
import { saveAs } from 'file-saver'

// Our app
function UploadBox() {
    const [file, setFile] = useState();
    const [fileObject, setFileObject] = useState();
    const [currentState, setCurrentState] = useState("first")
    const [targetEndPoint, setTargetEndPoint] = useState('png');
    const [imageLink, setImageLink] = useState("");
    const [receivedFormat, setReceivedFormat] = useState("");
    const inputRef = React.useRef();

    function handleChangeImage(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
        setFileObject(e.target.files[0]);
        setCurrentState("choosing")
    }

    function handleChangeRadio(e) {
        setTargetEndPoint(e.target.value);
    }

    function CardType(state) {
        if (state === "first") {
            return <BeforeImage />;
        } else if (state === "choosing") {
            return <AfterImage />
        } else if (state === "loading") {
            return <LoadingImage />;
        } else if (state === "success") {
            return <DownloadImage />
        } else {
            return <RequestFailed />
        }
    }

    function uploadImage(imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const size = imageFile.size;
        const type = imageFile.type.split('/')[1];

        if (targetEndPoint === '') {
            alert('You have to select one option');
            return;
        } else {
            setCurrentState("loading");

            var fetchString =
                process.env.REACT_APP_PROXY_URL +
                '/api/v1/convert' +
                '?target_format=' +
                targetEndPoint;

            fetch(fetchString, {
                method: 'POST',
                body: formData,
            })
                .then(response => {
                    if (!response.ok) {
                        setCurrentState("fail")
                        throw new Error(response.status);
                    } else {
                        setCurrentState("success")
                    }
                    return response.json();

                })
                .then(data => {
                    setImageLink(data.link);
                    setReceivedFormat(data.target_format);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    function LoadingImage() {
        return (
            <>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className='motionDiv'
                >
                    <div className='loading-container'>
                        <h1>Image is loading...</h1>
                        <br></br>
                        <PropagateLoader color="#47B5FF" />
                    </div>
                </motion.div>
            </>
        );
    }

    function DownloadImage() {
        return (
            <>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className='motionDiv'
                >
                    <div className='download-container'>
                        <h1>All done, here is your <b style={{ color: "#66d4ff" }}>{receivedFormat}</b> image:</h1>
                        <button
                            className="white-button"
                            onClick={() => saveAs(imageLink, 'image.' + targetEndPoint)}
                        >
                            <p>Download</p>
                        </button>
                        <br></br>
                        <p id='underlined' onClick={() => setCurrentState("choosing")}>Go back to conversion</p>
                    </div>
                </motion.div>
            </>
        )
    }

    function RequestFailed() {
        return (
            <>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className='motionDiv'
                >
                    <div className='failed-container'>
                        <h1>Something went wrong...</h1>
                        <br></br>
                        <p id='underlined' onClick={() => setCurrentState("choosing")}>Go back to conversion</p>
                    </div>
                </motion.div>
            </>
        )
    }

    function BeforeImage() {
        return (
            <>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className='motionDiv'
                >
                    <div className='button-add-file'>
                        <h1>Drag & Drop image or Browse!</h1>
                        <input
                            ref={inputRef}
                            type="file"
                            name="image"
                            onChange={handleChangeImage}
                            style={{
                                opacity: '0',
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                cursor: 'pointer',
                            }}
                            title={' '}
                            accept="image/*"
                        />
                    </div>
                </motion.div>
            </>
        );
    }

    class AfterImage extends React.PureComponent {
        render() {
            return (
                <>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className='motionDiv'
                    >
                        <div className='card-img-added'>
                            <div className="function-box">
                                <p>
                                    This is your image, how do you wish to convert it?
                                </p>
                                <div className="radio-buttons">
                                    <label>
                                        <input
                                            type="radio"
                                            value="png"
                                            name="desiredType"
                                            checked={targetEndPoint === 'png'}
                                            onChange={handleChangeRadio}
                                        />
                                        To png
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="jpeg"
                                            name="desiredType"
                                            checked={targetEndPoint === 'jpeg'}
                                            onChange={handleChangeRadio}
                                        />
                                        To jpeg
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="ppm"
                                            name="desiredType"
                                            checked={targetEndPoint === 'ppm'}
                                            onChange={handleChangeRadio}
                                        />
                                        To ppm
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="tiff"
                                            name="desiredType"
                                            checked={targetEndPoint === 'tiff'}
                                            onChange={handleChangeRadio}
                                        />
                                        To tiff
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="bmp"
                                            name="desiredType"
                                            checked={targetEndPoint === 'bmp'}
                                            onChange={handleChangeRadio}
                                        />
                                        To bmp
                                    </label>
                                </div>
                                <button
                                    className="white-button"
                                    onClick={() => uploadImage(fileObject)}
                                >
                                    <p>Convert</p>
                                </button>
                            </div>
                            <div className="img-box">
                                <img id="image-preview" src={file} alt="" />
                                <p style={{ fontSize: '0.8rem' }}>
                                    Your image size is: {fileObject.size} Bytes
                                </p>
                                <button
                                    className="white-button"
                                //onClick={() => inputRef.current.click()}
                                >
                                    <p>Select another image</p>
                                    <input
                                        ref={inputRef}
                                        type="file"
                                        name="image"
                                        onChange={handleChangeImage}
                                        style={{
                                            opacity: '0',
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            cursor: 'pointer',
                                            backgroundColor: 'black',
                                            top: '0',
                                            left: '0',
                                        }}
                                        title={' '}
                                        accept="image/*"
                                    />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            );
        }
    }

    return CardType(currentState);
}

export default UploadBox;

import React, { useState } from 'react';
import './UploadBox.css';

// Our app
function UploadBox() {
    const [file, setFile] = useState();
    const [fileObject, setFileObject] = useState();
    const [imgchanged, setImgchanged] = useState(false);
    const [targetEndPoint, setTargetEndPoint] = useState('');
    const inputRef = React.useRef();

    function handleChangeImage(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
        setFileObject(e.target.files[0]);
        setImgchanged(true);
    }

    function handleChangeRadio(e) {
        setTargetEndPoint(e.target.value);
    }

    function CardType(addedFile) {
        if (addedFile) {
            return <AfterImage />;
        } else {
            return <BeforeImage />;
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
            var fetchString =
                process.env.REACT_APP_PROXY_URL +
                '/convert' +
                '?format=' +
                type +
                '&size=' +
                size +
                '&target_format=' +
                targetEndPoint;

            alert(fetchString);

            fetch(fetchString, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then((response) => {
                    console.log(response);

                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    function BeforeImage() {
        return (
            <>
                <button
                    className="button-add-file"
                //onClick={() => inputRef.current.click()}
                >
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
                </button>
            </>
        );
    }

    function AfterImage() {
        return (
            <>
                <div
                    className="card-img-added"
                //onClick={() => inputRef.current.click()}
                >
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
            </>
        );
    }

    return CardType(imgchanged);
}

export default UploadBox;

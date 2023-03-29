import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./UploadBox.css";

// Our app
function UploadBox() {
    const [file, setFile] = useState();
    const [fileObject, setFileObject] = useState();
    const [imgchanged, setImgchanged] = useState(false);
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
        setFileObject(e.target.files[0]);
        setImgchanged(true);
    }
    const inputRef = React.useRef();

    function CardType(addedFile) {
        if (addedFile) {
            return <AfterImage />;
        } else {
            return <BeforeImage />;
        }
    }

    function uploadImage(imageFile) {
        //Use MIME
        const formData = new FormData();
        formData.append("image", imageFile);

        fetch("https://example.com/upload", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });

        //http POST
        //2 endpoints(one for json and one for image http post)
        //openapi documentation

        /*var jsonData = {
            users: [
                {
                    name: "alan",
                    age: 23,
                    username: "aturing",
                },
                {
                    name: "john",
                    age: 29,
                    username: "__john__",
                },
            ],
        };*/
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
                        onChange={handleChange}
                        style={{
                            opacity: "0",
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                        }}
                        title={" "}
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
                        <button
                            className="white-button"
                            onClick={() => uploadImage(fileObject)}
                        >
                            <p>Convert</p>
                        </button>
                    </div>
                    <div className="img-box">
                        <img id="image-preview" src={file} alt="" />
                        <p style={{ fontSize: "0.8rem" }}>
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
                                onChange={handleChange}
                                style={{
                                    opacity: "0",
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    cursor: "pointer",
                                    backgroundColor: "black",
                                    top: "0",
                                    left: "0",
                                }}
                                title={" "}
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

import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import '../style/upload.css';

function Upload(props) {
    const { handleFoundProduct, showMessage_success, showMessage_danger } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [labelText, setLabelText] = useState('Upload Image');
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(event.target.files[0]);
        setLabelText(file.name.toUpperCase());
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedFile === null) showMessage_danger('please upload an image');
        console.log("The image is sent");
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('http://localhost:8000/process_image', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data[0].name === props.name.toLowerCase()) {
                handleFoundProduct(true)
                showMessage_success('Verified Successfully!');
            }
            else {
                showMessage_danger('Please Upload Again!');
                handleFoundProduct(false)
            }
        } catch (error) {
            console.error(error);
        }
        setLabelText('Upload Image');
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="input-button">{labelText}</label>
                <input id="input-button" type="file" accept="image/*" onChange={handleFileChange} />
                <button className="cart-button" type="submit">Submit</button>
            </form>
        </>
    );
}

export default Upload;

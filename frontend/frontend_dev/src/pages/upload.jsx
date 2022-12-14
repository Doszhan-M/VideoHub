import React, { useState } from "react";
import "../styles/css/upload.min.css";
import { useNavigate } from 'react-router-dom'

import api from "../api/requests"
import { DotLoaderOverlay } from 'react-spinner-overlay'


function Upload(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate();

    const uploadVideo = async (event) => {
        event.preventDefault();
        setLoading(true)

        const title = event.target.elements.title.value
        const desc = event.target.elements.desc.value
        const videoFile = selectedFile
        const htag = event.target.elements.htag.value

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", desc);
        formData.append("video_file", videoFile);
        formData.append("hashtag", htag);

        const createResponse = await api.uploadVideo(formData).then(
            response => {
                return response
            }).catch(function (error) {
                return error.response
            });
        if (createResponse.status == 201) {
            setLoading(false)
            return navigate(`/video/${createResponse.data.id}`);
        } else {
            setLoading(false)
        }

    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }

    return (
        <div className="upload_page_container">
            <DotLoaderOverlay loading={loading} overlayColor="rgba(0,153,255,0.2)" message=<h4>uploading...</h4> />
            <h1>Upload Video</h1>
            <div className="video_form">
                <form method="post" encType="multipart/form-data" onSubmit={uploadVideo}>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="firstname" placeholder="Your video title.." required="required" />

                    <label htmlFor="desc">Description</label>
                    <textarea rows="10" cols="45" id="desc" placeholder="Description for video.." required="required" />

                    <label htmlFor="file">Choose file to upload</label>
                    <input type="file" id="file" name="file" onChange={handleFileSelect} required="required" />

                    <label htmlFor="htag">Hashtags</label>
                    <input type="text" id="htag" name="firstname" placeholder="Your video title.." required="required" />

                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}
export default Upload;

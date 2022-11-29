import React, { useState, useEffect } from "react";
import "../styles/css/manage.min.css";
import "../styles/css/upload.min.css";
import { useNavigate, useParams } from 'react-router-dom'

import api from "../api/requests"
import { DotLoaderOverlay } from 'react-spinner-overlay'


function Manage(props) {
    let navigate = useNavigate();
    const { id } = useParams()
    let [initValues, setInitValues] = useState({})

    const fetchInitValues = async (id) => {
        const response = await api.getVideo(id)
        setInitValues(response)
    }

    useEffect(() => { fetchInitValues(id) }, []);

    const updateVideo = async (event) => {
        event.preventDefault();
        const data = {
            "title": event.target.title.value,
            "description": event.target.desc.value,
            "hashtag": event.target.htag.value
        }
        await api.updateVideo(id, data)
        return navigate(`/video/${id}`);
    }

    const deleteVideo = async (event) => {
        await api.deleteVideo(id)
        return navigate(`/`);
    }

    return (
        <div className="upload_page_container">
            <h1>Edit Video</h1>
            <div className="video_form">
                <form method="put" onSubmit={updateVideo}>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" placeholder="Your video title.."
                        required="required" defaultValue={initValues.title} />

                    <label htmlFor="desc">Description</label>
                    <textarea rows="10" cols="45" id="desc" placeholder="Description for video.."
                        required="required" defaultValue={initValues.description} />

                    <label htmlFor="htag">Hashtags</label>
                    <input type="text" id="htag" placeholder="Your video title.."
                        required="required" defaultValue={initValues.hashtag} />

                    <input type="submit" value="Submit" />
                </form>
                <button type="button" onClick={deleteVideo}>Delete Video</button>
            </div>
        </div>
    )
}
export default Manage;

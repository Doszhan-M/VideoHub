import React, { useState } from "react";
import "../styles/css/video.min.css";
import { useParams } from "react-router-dom"

import api from "../api/requests"
import VideoDetail from "../components/video_detail"
import Chat from "../components/chat"

function VideoPage(props) {

    const { id } = useParams()

    // TODO:  слева сделать ваши видео если getMe, иначе чат и внизу related videos

    return (
        <div className="page_video">
            <div className="video_detail_container">
                <VideoDetail id={id} />
            </div>
            <div className="private_chat_container">
                <Chat />
            </div>
        </div>
    )
}
export default VideoPage;

import React, { useState } from "react";
import "../styles/css/video_detail.min.css";
import { useParams } from "react-router-dom"

import api from "../api/requests"



function VideoDetail(props) {

    const { id } = useParams()

    return (
        <div className="page_container">
            {id}
        </div>
    )
}
export default VideoDetail;

import React from "react";
import "../styles/css/video_column.min.css";

import VideoCard from "./video_card"


function VideoColumn(props) {
    const videoList = props.videoList

    return (
        <div className="video_detail_column">
            <div className="title">{props.title}</div>
            {videoList?.map(video => {
                return <VideoCard key={video.id} video={video} />
            })}
        </div>
    )
}
export default VideoColumn;
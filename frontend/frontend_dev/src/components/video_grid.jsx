import React from "react";
import "../styles/css/search.min.css";

import VideoCard from "../components/video_card"


function VideoGrid(props) {

    return (
        <div className="found_videos">
            <div className="title" style={props.videos != null && props.videos.length > 0 ?
                { display: 'flex' } : { display: 'none' }}>
                {props.title}
            </div>
            <div className="found_videos_container">
                {props.videos != null && props.videos.length > 0 ?
                    props.videos.map(video => {
                        return <VideoCard key={video.id} video={video} />
                    }) :
                    props.videos != null && props.videos.length == 0 ?
                        <div className="not_found">{props.not_video}</div>
                        : <></>
                }
            </div>
        </div>
    )
}
export default VideoGrid;

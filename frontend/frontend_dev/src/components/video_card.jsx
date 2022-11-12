import React from "react";
import "../styles/css/video_card.min.css";
import { Link } from "react-router-dom"

import HoverVideoPlayer from 'react-hover-video-player';


function VideoCard(props) {

    const scr = props.video.video_file
    const user_avatar = props.video.user_avatar
    const author = props.video.username
    const title = props.video.title
    const upload_date = props.video.upload_date
    const views_count = props.video.views
    const id = props.video.id

    return (
        <div className="video anim">
            <div className="video-wrapper">
                <Link to={`/video/${id}`}>
                    <HoverVideoPlayer videoSrc={scr} />
                </Link>
                <div className="author-img__wrapper video-author">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                        strokeLinejoin="round" className="feather feather-check">
                        <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                    <img className="author-img"
                        src={user_avatar} />
                </div>
            </div>
            <div className="video-by">{author}</div>
            <div className="video-name">{title}</div>
            <div className="video-view">{views_count} views<span className="seperate video-seperate"></span>{upload_date}</div>
        </div>
    )
}
export default VideoCard;

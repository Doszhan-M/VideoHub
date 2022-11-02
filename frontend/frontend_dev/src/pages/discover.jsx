import React from "react";
import "../styles/css/discover.min.css";

import VideoLine from "../components/video_card"


function Discover(props) {

    return (
        <div className="page_container">
            <div className="discover">
                <div className="discover_title">Discover</div>
                <div className="discover_container">
                    <div className="video_width">
                        <VideoLine />
                    </div>
                    <div className="video_thin">
                        <VideoLine />
                    </div>
                </div>
            </div>
            <div className="page_most_watched">
                <div className="title">Most Watched</div>
                <div className="page_most_watched_container">
                    <VideoLine />
                    <VideoLine />
                    <VideoLine />
                    <VideoLine />
                </div>
            </div>
        </div>
    )
}
export default Discover;

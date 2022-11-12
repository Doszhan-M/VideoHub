import React, { useState, useEffect } from "react";
import "../styles/css/discover.min.css";

import VideoLine from "../components/video_line"
import VideoCard from "../components/video_card"
import api from "../api/requests"

// TODO: сделать страницу полностью

function Discover(props) {

    const [discoverVideos, setDiscoverVideos] = useState(null)

    const getDiscoverVideos = async () => {
        const videoList = await api.discoverVideos()
        setDiscoverVideos(videoList)
    }

    console.log(discoverVideos)

    useEffect(() => { getDiscoverVideos() }, []);

    return (
        <div className="page_container">
            <div className="discover">
                <div className="discover_title">Discover</div>
                <div className="discover_container">

                    <div className="video_width">
                        {discoverVideos ? (
                            <VideoCard video={discoverVideos[0]} />
                        ) : (<></>)}
                    </div>
                    <div className="video_thin">
                    {discoverVideos ? (
                            <VideoCard video={discoverVideos[1]} />
                        ) : (<></>)}
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

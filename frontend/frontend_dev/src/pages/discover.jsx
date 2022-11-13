import React, { useState, useEffect } from "react";
import "../styles/css/discover.min.css";

import VideoLine from "../components/video_line"
import VideoCard from "../components/video_card"
import api from "../api/requests"

// TODO: сделать страницу полностью

function Discover(props) {

    const [discoverVideos, setDiscoverVideos] = useState(null)
    const [mostWatchedVideos, setMostWatchedVideos] = useState(null)
    const [allVideos, setAllVideos] = useState(null)

    const getDiscoverVideos = async () => {
        const videoList = await api.discoverVideos()
        setDiscoverVideos(videoList)
    }

    const getMostWatchedVideos = async () => {
        const videoList = await api.mostWatchedVideos()
        setMostWatchedVideos(videoList)
    }

    const getAllVideos = async () => {
        const videoList = await api.allVideos()
        setAllVideos(videoList)
    }

    useEffect(() => { 
        getDiscoverVideos(); 
        getMostWatchedVideos(); 
        getAllVideos(); 
    }, []);

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
                    {mostWatchedVideos?.map(video => {
                        return <VideoCard key={video.id} video={video} />
                    })}
                </div>
            </div>
            <div className="page_most_watched">
                <div className="title">More Videos</div>
                <div className="page_most_watched_container">
                    {allVideos?.map(video => {
                        return <VideoCard key={video.id} video={video} />
                    })}
                </div>
            </div>
        </div>
    )
}
export default Discover;

import React, { useState, useEffect } from "react";
import "../styles/css/search.min.css";
import { useSelector, useDispatch } from "react-redux"

import api from "../api/requests"
import VideoCard from "../components/video_card"
import { refreshTrendVideos } from "../store/videoSlice"


function Trending(props) {
    const dispatch = useDispatch()

    const trendVideos = useSelector(state => state.videos.trendVideos)

    const getTrendVideos = async () => {
        const videoList = await api.trending()
        dispatch(refreshTrendVideos(videoList))
    }
    useEffect(() => { getTrendVideos(); }, []);

    return (
        <div className="search_page_container">
            <div className="found_videos">
                <div className="title" style={trendVideos != null && trendVideos.length > 0 ?
                    { display: 'flex' } : { display: 'none' }}>
                    Trending
                </div>
                <div className="found_videos_container">
                    {trendVideos != null && trendVideos.length > 0 ?
                        trendVideos.map(video => {
                            return <VideoCard key={video.id} video={video} />
                        }) :
                        trendVideos != null && trendVideos.length == 0 ?
                            <div className="not_found">Nothing found, please search again...</div>
                            : <></>
                    }
                </div>
            </div>
        </div>
    )
}
export default Trending;

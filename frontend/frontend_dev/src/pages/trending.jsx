import React, { useEffect } from "react";
import "../styles/css/search.min.css";
import { useSelector, useDispatch } from "react-redux"

import api from "../api/requests"
import VideoGrid from "../components/video_grid"
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
            <VideoGrid videos={trendVideos} title={"Trending"} not_video={"Not videos..."} />
        </div>
    )
}
export default Trending;

import React, { useEffect } from "react";
import "../styles/css/search.min.css";
import { useSelector, useDispatch } from "react-redux"

import api from "../api/requests"
import VideoGrid from "../components/video_grid"
import { refreshMostPopular } from "../store/videoSlice"


function MostPopular(props) {
    const dispatch = useDispatch()

    const mostPopularVideos = useSelector(state => state.videos.mostPopular)

    const getMostPopularVideos = async () => {
        const videoList = await api.most_popular()
        dispatch(refreshMostPopular(videoList))
    }
    useEffect(() => { getMostPopularVideos(); }, []);

    return (
        <div className="search_page_container">
                <VideoGrid videos={mostPopularVideos} title={"Most Popular"} not_video={"Not videos"} />
        </div>
    )
}
export default MostPopular;

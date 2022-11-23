import React, { useEffect } from "react";
import "../styles/css/search.min.css";
import { useSelector, useDispatch } from "react-redux"

import api from "../api/requests"
import VideoGrid from "../components/video_grid"
import { refreshSubscribed } from "../store/videoSlice"


function Subscribe(props) {
    const dispatch = useDispatch()

    const subscribedVideos = useSelector(state => state.videos.subscribed)

    const getSubscribedVideos = async () => {
        const videoList = await api.most_popular()
        dispatch(refreshSubscribed(videoList))
    }
    useEffect(() => { getSubscribedVideos(); }, []);

    return (
        <div className="search_page_container">
            <VideoGrid videos={subscribedVideos} title={"Subscribe"} not_video={"Not subscribed videos..."} />
        </div>
    )
}
export default Subscribe;

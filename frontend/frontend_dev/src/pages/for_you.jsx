import React, { useEffect } from "react";
import "../styles/css/search.min.css";
import { useSelector, useDispatch } from "react-redux"

import api from "../api/requests"
import VideoGrid from "../components/video_grid"
import { refreshForYou } from "../store/videoSlice"


function ForYou(props) {
    const dispatch = useDispatch()

    const forYouVideos = useSelector(state => state.videos.forYou)

    const getSubscribedVideos = async () => {
        const videoList = await api.forYou()
        dispatch(refreshForYou(videoList))
    }
    useEffect(() => { getSubscribedVideos(); }, []);

    return (
        <div className="search_page_container">
            <VideoGrid videos={forYouVideos} title={"For You"} not_video={"Not videos"} />
        </div>
    )
}
export default ForYou;

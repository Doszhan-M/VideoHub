import React, { useEffect } from "react";
import "../styles/css/search.min.css";
import { useSelector, useDispatch } from "react-redux"

import api from "../api/requests"
import VideoCard from "../components/video_card"
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
            <div className="found_videos">
                <div className="title" style={subscribedVideos != null && subscribedVideos.length > 0 ?
                    { display: 'flex' } : { display: 'none' }}>
                    Subscribe
                </div>
                <div className="found_videos_container">
                    {subscribedVideos != null && subscribedVideos.length > 0 ?
                        subscribedVideos.map(video => {
                            return <VideoCard key={video.id} video={video} />
                        }) :
                        subscribedVideos != null && subscribedVideos.length == 0 ?
                            <div className="not_found">Not subscribed videos...</div>
                            : <></>
                    }
                </div>
            </div>
        </div>
    )
}
export default Subscribe;

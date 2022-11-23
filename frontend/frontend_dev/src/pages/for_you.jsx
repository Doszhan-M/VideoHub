import React, { useEffect } from "react";
import "../styles/css/search.min.css";
import { useSelector, useDispatch } from "react-redux"

import api from "../api/requests"
import VideoCard from "../components/video_card"
import { refreshForYou } from "../store/videoSlice"


function forYou(props) {
    const dispatch = useDispatch()

    const forYouVideos = useSelector(state => state.videos.forYou)

    const getSubscribedVideos = async () => {
        const videoList = await api.forYou()
        dispatch(refreshForYou(videoList))
    }
    useEffect(() => { getSubscribedVideos(); }, []);

    return (
        <div className="search_page_container">
            <div className="found_videos">
                <div className="title" style={forYouVideos != null && forYouVideos.length > 0 ?
                    { display: 'flex' } : { display: 'none' }}>
                    For You
                </div>
                <div className="found_videos_container">
                    {forYouVideos != null && forYouVideos.length > 0 ?
                        forYouVideos.map(video => {
                            return <VideoCard key={video.id} video={video} />
                        }) :
                        forYouVideos != null && forYouVideos.length == 0 ?
                            <div className="not_found">Not videos...</div>
                            : <></>
                    }
                </div>
            </div>
        </div>
    )
}
export default forYou;

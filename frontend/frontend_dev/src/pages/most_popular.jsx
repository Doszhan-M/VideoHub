import React, { useEffect } from "react";
import "../styles/css/search.min.css";
import { useSelector, useDispatch } from "react-redux"

import api from "../api/requests"
import VideoCard from "../components/video_card"
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
            <div className="found_videos">
                <div className="title" style={mostPopularVideos != null && mostPopularVideos.length > 0 ?
                    { display: 'flex' } : { display: 'none' }}>
                    Trending
                </div>
                <div className="found_videos_container">
                    {mostPopularVideos != null && mostPopularVideos.length > 0 ?
                        mostPopularVideos.map(video => {
                            return <VideoCard key={video.id} video={video} />
                        }) :
                        mostPopularVideos != null && mostPopularVideos.length == 0 ?
                            <div className="not_found">Nothing found, please search again...</div>
                            : <></>
                    }
                </div>
            </div>
        </div>
    )
}
export default MostPopular;

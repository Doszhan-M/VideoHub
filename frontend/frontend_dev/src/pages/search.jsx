import React, { useState, useEffect } from "react";
import "../styles/css/search.min.css";
import { useParams } from "react-router-dom"

import api from "../api/requests"
import VideoCard from "../components/video_card"


function Search(props) {

    const { searchText } = useParams()
    const [findVideos, setFindVideos] = useState(null)

    const searchVideos = async () => {
        const videoList = await api.search(searchText)
        setFindVideos(videoList)
    }
    useEffect(() => { searchVideos(); }, [searchText,]);

    return (
        <div className="search_page_container">
            <div className="found_videos">
                <div className="title" style={findVideos != null && findVideos.length > 0 ?
                    { display: 'flex' } : { display: 'none' }}>
                    Found videos...
                </div>
                <div className="found_videos_container">
                    {findVideos != null && findVideos.length > 0 ?
                        findVideos.map(video => {
                            return <VideoCard key={video.id} video={video} />
                        }) :
                        findVideos != null && findVideos.length == 0 ?
                            <div className="not_found">Nothing found, please search again...</div>
                            : <></>}
                </div>
            </div>
        </div>
    )
}
export default Search;

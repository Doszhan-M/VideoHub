import React, { useState, useEffect } from "react";
import "../styles/css/search.min.css";
import { useParams } from "react-router-dom"

import api from "../api/requests"
import VideoGrid from "../components/video_grid"


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
                <VideoGrid
                    videos={findVideos}
                    title={"Found videos..."}
                    not_video={"Nothing found, please search again..."}
                />
        </div>
    )
}
export default Search;

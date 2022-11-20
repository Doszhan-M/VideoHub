import React, { useEffect } from "react";
import "../styles/css/discover.min.css";
import { useSelector, useDispatch } from "react-redux"
import { refreshDiscoverVideos, refreshMostWatchedVideos, refreshAllVideos } from "../store/videoSlice"

import VideoCard from "../components/video_card"
import api from "../api/requests"


function Discover(props) {
    const dispatch = useDispatch()

    const discoverVideos = useSelector(state => state.videos.discoverVideosList)
    const mostWatchedVideos = useSelector(state => state.videos.mostWatchedVideos)
    const allVideos = useSelector(state => state.videos.allVideos)

    const getDiscoverVideos = async () => {
        const videoList = await api.discoverVideos()
        dispatch(refreshDiscoverVideos(videoList))
    }

    const getMostWatchedVideos = async () => {
        const videoList = await api.mostWatchedVideos()
        dispatch(refreshMostWatchedVideos(videoList))
    }

    const getAllVideos = async () => {
        const videoList = await api.allVideos()
        dispatch(refreshAllVideos(videoList))
    }

    const titleShow = () => {
        let discover = {
            display: 'none',
        };
        let mostWatched = {
            display: 'none',
        };
        let all = {
            display: 'none',
        };
        if (discoverVideos) {
            discover = {
                display: 'flex',
            };
        }
        if (mostWatchedVideos) {
            mostWatched = {
                display: 'flex',
            };
        }
        if (allVideos) {
            all = {
                display: 'flex',
            };
        }
        return { discover, mostWatched, all }
    }


    useEffect(() => {
        getDiscoverVideos();
        getMostWatchedVideos();
        getAllVideos();
    }, []);

    useEffect(() => {
        titleShow();

    }, [discoverVideos, mostWatchedVideos, allVideos]);

    return (
        <div className="page_container">
            <div className="discover">
                <div className="discover_title" style={titleShow().discover}>Discover</div>
                <div className="discover_container">

                    <div className="video_width">
                        {discoverVideos ? (
                            <VideoCard video={discoverVideos[0]} />
                        ) : (<></>)}
                    </div>
                    <div className="video_thin">
                        {discoverVideos ? (
                            <VideoCard video={discoverVideos[1]} />
                        ) : (<></>)}
                    </div>
                </div>
            </div>
            <div className="page_most_watched">
                <div className="title" style={titleShow().mostWatched}>Most Watched</div>
                <div className="page_most_watched_container">
                    {mostWatchedVideos?.map(video => {
                        return <VideoCard key={video.id} video={video} />
                    })}
                </div>
            </div>
            <div className="page_most_watched">
                <div className="title" style={titleShow().all}>More Videos</div>
                <div className="page_most_watched_container">
                    {allVideos?.map(video => {
                        return <VideoCard key={video.id} video={video} />
                    })}
                </div>
            </div>
        </div>
    )
}
export default Discover;

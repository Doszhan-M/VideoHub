import React, { useState, useEffect } from "react";
import "../styles/css/video.min.css";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import api from "../api/requests"
import VideoDetail from "../components/video_detail"
import Chat from "../components/chat"
import VideoColumn from "../components/video_column"


// TODO:  слева сделать ваши видео если getMe, иначе чат и внизу related videos
function VideoPage(props) {
    const { id } = useParams()
    const isAuth = useSelector(state => state.user.isAuth)
    const authUserChannelId = useSelector(state => state.user.channel_id)
    const [videoChannelId, setVideoChannelId] = useState('')
    const [videoOwner, setVideoOwner] = useState(false)
    const [userVideoList, setUserVideoList] = useState([])
    const columnTitle = "Your Videos"

    const checkChannelOwner = async () => {
        if (isAuth & authUserChannelId == videoChannelId) {
            setVideoOwner(true)
            const videoList = await api.getUserVideos()
            const slicedVideoList = videoList.slice(0, 3);
            setUserVideoList(slicedVideoList)

        }
    }

    useEffect(() => {
        const getVideoOwner = async () => {
            const response = await api.getVideo(id)
            setVideoChannelId(response.channel)
            if (isAuth & authUserChannelId == response.channel) {
                setVideoOwner(true)
            }
        }
        getVideoOwner()
    }, [id,]);

    useEffect(() => { checkChannelOwner() }, [videoChannelId,]);


    return (
        <div className="page_video">
            <div className="video_detail_container">
                <VideoDetail id={id} />
            </div>
            <div className="video_right_container">
                {videoOwner ? (
                    <VideoColumn  videoList={userVideoList} title={columnTitle} />
                ) : (
                    <Chat />
                )}

            </div>
        </div>
    )
}
export default VideoPage;

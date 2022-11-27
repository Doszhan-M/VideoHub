import React, { useState, useEffect } from "react";
import "../styles/css/video.min.css";
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import api from "../api/requests"
import VideoDetail from "../components/video_detail"
import PrivateChat from "../components/private_chat"
import VideoColumn from "../components/video_column"


function VideoPage(props) {
    const { id } = useParams()
    const isAuth = useSelector(state => state.user.isAuth)
    const authUserChannelId = useSelector(state => state.user.channel_id)
    const [videoChannelId, setVideoChannelId] = useState('')
    const [videoOwner, setVideoOwner] = useState(null)
    const [userVideoList, setUserVideoList] = useState([])
    const [columnTitle, setColumnTitle] = useState('')
    const [ownerEmail, setOwnerEmail] = useState(null)

    const checkChannelOwner = async () => {
        if (isAuth & authUserChannelId == videoChannelId) {
            setVideoOwner(true)
            const videoList = await api.getUserVideos()
            const slicedVideoList = videoList.slice(0, 3);
            setUserVideoList(slicedVideoList)
            setColumnTitle("Your Videos")
        } else {
            const videoList = await api.getRelatedVideos(id)
            const slicedVideoList = videoList.slice(0, 2);
            setUserVideoList(slicedVideoList)
            setColumnTitle("Related Videos")
        }
    }

    useEffect(() => {
        const getVideoOwner = async () => {
            const response = await api.getVideo(id)
            setVideoChannelId(response.channel)
            setOwnerEmail(response.user_email)
            if (isAuth & authUserChannelId == response.channel) {
                setVideoOwner(true)
            } else {setVideoOwner(false)}
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
                    <VideoColumn videoList={userVideoList} title={columnTitle} />
                ) : (videoOwner == false ?
                    <>
                        <PrivateChat ownerEmail={ownerEmail}/>
                        <div className="related_videos">
                            <VideoColumn videoList={userVideoList} title={columnTitle} />
                        </div>
                    </> : <></>
                )}
            </div>
        </div>
    )
}
export default VideoPage;

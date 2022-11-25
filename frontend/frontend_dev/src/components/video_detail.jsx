import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import "../styles/css/video_detail.min.css";
import { FaHeart, FaTelegramPlane } from 'react-icons/fa';
import { AiFillLike } from 'react-icons/ai';
import { BsFillGearFill } from 'react-icons/bs';
import { Link } from "react-router-dom"
import { loginUrl } from "../utils/env_variables"

import api from "../api/requests"
import { TelegramShareButton } from "react-share";
import Comments from "./comments"


function VideoDetail(props) {

    const id = props.id
    const isAuth = useSelector(state => state.user.isAuth)
    const authUserChannelId = useSelector(state => state.user.channel_id)

    const [videoLink, setVideoLink] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [userName, setUserName] = useState('')
    const [videoChannelId, setVideoChannelId] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [upload_date, setUploadDate] = useState('')
    const [likes, setLikes] = useState(0)
    const [subscribeText, setSubscribeText] = useState('subscribe')

    const like = () => {
        api.like(id)
        setLikes(likes + 1)
    }

    const subscribe = () => {
        api.subscribe(id)
        checkChannel()
    }

    const checkChannel = async () => {
        let response = await api.checkChannel(id)
        setSubscribeText(response)
    }

    const checkChannelOwner = () => {
        if (isAuth && authUserChannelId == videoChannelId) {
            return <div className="like">
                <Link to={`/edit/${id}`}>
                    <BsFillGearFill />
                    <span>manage</span>
                </Link>
            </div>
        } else {
            if (videoChannelId) {
                return <>
                    {isAuth ? <button onClick={subscribe}>
                        <FaHeart />
                        <span>{subscribeText}</span>
                    </button> : <></>}

                    {isAuth ? <button onClick={like}>
                        <AiFillLike />
                        {likes}
                        <span>like</span>
                    </button> : <a href={loginUrl}>
                        <button>
                            <AiFillLike />
                            {likes}
                            <span>like</span>
                        </button>
                    </a>
                    }
                </>
            }

        }
    }

    useEffect(() => {
        const fetchVideoData = async () => {
            const response = await api.getVideo(id)
            const link = response.imagekit_url + "#t=0.9"
            setVideoLink(link)
            setUserAvatar(response.user_avatar)
            setUserName(response.username)
            setVideoChannelId(response.channel)
            setTitle(response.title)
            setDescription(response.description)
            setUploadDate(response.upload_date)
            setLikes(response.likes.length)
        }
        fetchVideoData()
    }, [id,]);

    useEffect(() => {
        checkChannelOwner()
        checkChannel()
    }, [authUserChannelId,]);

    return (
        <div className="video_detail" controls>
            <video controls src={videoLink} preload="true" loop></video>
            <div className="details">
                <img src={userAvatar} alt="avatar"></img>
                <div className="author">{userName}</div>
                <div className="button_wrapper">
                    {checkChannelOwner()}
                    <div className="share">
                        <TelegramShareButton url={window.location.href}>
                            <FaTelegramPlane />
                            <span>share</span>
                        </TelegramShareButton>
                    </div>
                </div>
            </div>
            <h2>{title}</h2>
            <div className="description">{description}</div>
            <div className="load_date">upload date {upload_date}</div>
            <Comments id={id}/>
        </div>
    )
}
export default VideoDetail;

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

// TODO: comment_blog

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
            console.log(response)
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
            <div className="comment_blog">
                <form method="post">
                    <div className="form__group field">
                        <textarea type="input" className="form__field" placeholder="Enter your comment" id='comment' required />
                        <label htmlFor="comment" className="form__label">Enter your comment</label>
                    </div>
                    <input type="submit" value="send"></input>
                </form>
                <div className="comments">
                    <div className="message">
                        <div className="author_wrapper">
                            <img src="https://images.unsplash.com/photo-1560941001-d4b52ad00ecc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1650&amp;q=80" />
                            <div className="author_name">Andy William</div>
                        </div>
                        <div className="msg_content">
                            Lorem ipsum clor sit, ame conse quae debitis Lorem ipsum clor sit, ame conse quae debitis Lorem ipsum clor sit, ame conse quae debitis Lorem ipsum clor sit, ame conse quae debitis
                        </div>
                    </div>
                    <div className="message">
                        <div className="author_wrapper">
                            <img src="https://images.unsplash.com/photo-1560941001-d4b52ad00ecc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1650&amp;q=80" />
                            <div className="author_name">Andy William</div>
                        </div>
                        <div className="msg_content">
                            Lorem ipsum clor sit, ame conse quae debitis Lorem ipsum clor sit, ame conse quae debitis Lorem ipsum clor sit, ame conse quae debitis Lorem ipsum clor sit, ame conse quae debitis
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VideoDetail;

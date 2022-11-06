import React, { useState, useEffect } from "react";
import "../styles/css/video_detail.min.css";
import { FaHeart, FaTelegramPlane } from 'react-icons/fa';

import api from "../api/requests"



function VideoDetail(props) {
    const id = props.id

    const [videoLink, setVideoLink] = useState('')
    const [userAvatar, setUserAvatar] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.getVideo(id)
            console.log(response)
            const link = response.video_file + "#t=0.9"
            setVideoLink(link)
            setUserAvatar(response.user_avatar)
            console.log(response.user_avatar)
        }
        fetchData()
    }, [id,]);


    return (
        <div className="video_detail" controls>
            <video controls src={videoLink} preload="true" loop></video>
            <div className="details">
                <img src={userAvatar}></img>
                <div className="author">Andy William</div>
                <div className="button_wrapper">
                    <button className="share">
                        <FaTelegramPlane />
                        <span>Share</span>
                    </button>
                    <button className="like">
                        <FaHeart />
                        <span>Liked</span>
                    </button>
                </div>
            </div>
            <h2>Basic how to ride your skateboard comfortly</h2>
            <div className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus illum tempora consequuntur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis earum velit accusantium maiores qui sit quas, laborum voluptatibus vero quidem tempore facilis voluptate tempora deserunt!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus laborum qui dolorum fugiat eius accusantium repellendus illum tempora consequuntur. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </div>
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

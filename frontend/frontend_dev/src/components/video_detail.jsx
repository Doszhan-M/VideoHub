import React, { useState } from "react";
import "../styles/css/video_detail.min.css";
import { FaHeart, FaTelegramPlane } from 'react-icons/fa';

import api from "../api/requests"
import HoverVideoPlayer from 'react-hover-video-player';



function VideoDetail(props) {


    return (
        <div className="video_detail" controls>
            <video controls>
                <source src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4#t=0.1" type="video/mp4" />
            </video>
            <div className="details">
                <img src="https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500"></img>
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

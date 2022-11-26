import React from "react";
import "../styles/css/chat.min.css";


function Message(props) {

    return (
        <div className="message anim">
            <div className="author-img__wrapper video-author video-p">
                <img className="author-img" src="https://images.unsplash.com/photo-1560941001-d4b52ad00ecc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1650&amp;q=80" />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                    <path d="M20 6L9 17l-5-5"></path>
                </svg>
            </div>
            <div className="msg-wrapper">
                <div className="msg__name video-p-name">Andy William</div>
                <div className="msg__content video-p-sub"> Lorem ipsum clor sit, ame conse quae debitis Lorem ipsum clor sit, ame conse quae debitis Lorem ipsum clor sit, ame conse quae debitis Lorem ipsum clor sit, ame conse quae debitis Lorem ipsum clor sit, ame conse quae debitis</div>
            </div>
        </div>
    )
}
export default Message;
import React from "react";
import "../styles/css/chat.min.css";


function Message(props) {
    const message = props.message
    const src = message.avatar.replaceAll('+', '/')

    return (
        <div className="message anim">
            <div className="author-img__wrapper video-author video-p">
                <img className="author-img" src={src} />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                    <path d="M20 6L9 17l-5-5"></path>
                </svg>
            </div>
            <div className="msg-wrapper">
                <div className="msg__name video-p-name">{message.user}</div>
                <div className="msg__content video-p-sub">{message.message}</div>
            </div>
        </div>
    )
}
export default Message;
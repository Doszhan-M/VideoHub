import React, { useEffect, useState } from "react";
import "../styles/css/comments.min.css";

import api from "../api/requests"


function Comment(props) {
    const comment = props.comment
    const [name, setName] = useState(null)
    const [avatar, setAvatar] = useState(null)

    const userInfo = async () => {
        const response = await api.userInfo(comment.user)
        setName(response.first_name)
        setAvatar(response.avatar)
    }

    useEffect(() => { userInfo(); }, [comment])

    return (
        <div className="message">
            <div className="author_wrapper">
                <img src={avatar} />
                <div className="author_name">{name}</div>
            </div>
            <div className="msg_content">
                {comment.text}
            </div>
        </div>
    )
}
export default Comment;

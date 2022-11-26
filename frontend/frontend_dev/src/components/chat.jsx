import React, { useEffect, useState } from "react";
import "../styles/css/chat.min.css";
import { useSelector, useDispatch } from "react-redux"

import { MdPeopleAlt } from 'react-icons/md';
import Message from "./message"

function Chat(props) {

    const isAuth = useSelector(state => state.user.isAuth)
    const username = useSelector(state => state.user.username)
    let avatar = useSelector(state => state.user.avatar)
    if (avatar) { avatar = avatar.replaceAll('/', '+') }
    const [messages, setMessages] = useState([])

    if (username, avatar) {
        const socket = new WebSocket(`wss://video.localhost/websocket/api/chat/${username}/${avatar}`)
        socket.onmessage = function (event) {
            const data = JSON.parse(event.data)
            console.log(data)
            setMessages(messages => [...messages, data])
            console.log(messages)
            console.log(messages.length)

        }
    }



    return (
        <div className="chat">
            <div className="chat-header anim">
                Live Chat
                <div className="people">
                    <MdPeopleAlt />
                    <span>15 people</span>
                </div>
            </div>
            <div className="message_container">
                <div className="message-container">
                    {messages.length > 0 ?
                        <Message />
                        : <></>}
                </div>
            </div>
            <div className="chat_footer anim">
                <input type="text" placeholder="Write your message" />
            </div>
        </div>
    )
}
export default Chat;
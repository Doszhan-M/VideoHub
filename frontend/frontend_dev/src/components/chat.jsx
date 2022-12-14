import React, { useEffect, useState, useRef } from "react";
import "../styles/css/chat.min.css";
import { useSelector } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';

import { MdPeopleAlt } from 'react-icons/md';
import Message from "./message"


function Chat(props) {
    const bottomRef = useRef(null);
    const isAuth = useSelector(state => state.user.isAuth)
    const socket = useSelector(state => state.user.socket)
    const [messages, setMessages] = useState([])
    const [people, setPeople] = useState(5)


    const websocket = () => {
        if (socket) {
            socket.onmessage = function (event) {
                const data = JSON.parse(event.data)
                setMessages(messages => [...messages, data])
                setPeople(Math.round(Math.random() * 20))
                bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }
    }

    useEffect(() => { websocket() }, [socket]);

    const pressEnter = (event) => {
        if (isAuth) {
            if (event.key === 'Enter') {
                let msg = event.target.value;
                let data = { message: msg }
                event.target.value = ''
                socket.send(JSON.stringify(data))
                bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        } else {
            toast("Please, log in!")
        }
    }

    return (
        <div className="chat">
            <div className="chat-header anim">
                Live Chat
                <div className="people">
                    <MdPeopleAlt />
                    <span>{people} people</span>
                </div>
            </div>
            <div className="message-container">
                {messages.length > 0 ?
                    messages.map(message => {
                        return <Message key={message.id} message={message} />
                    }) : <></>}
                <div className="dummy" ref={bottomRef} />
            </div >

            <div className="chat_footer anim">
                <input type="text" placeholder="Write your message" onKeyPress={pressEnter} />
            </div>
            <ToastContainer position="bottom-left" theme="dark" />
        </div>
    )
}
export default Chat;
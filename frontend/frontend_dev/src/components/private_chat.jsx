import React, { useEffect, useState, useRef } from "react";
import "../styles/css/chat.min.css";
import { useSelector, useDispatch } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';

import { privateSocket } from "../store/userSlice"
import { BsFillPersonCheckFill } from 'react-icons/bs';
import Message from "./message"


function PrivateChat(props) {

    const dispatch = useDispatch()
    const bottomRef = useRef(null);
    const isAuth = useSelector(state => state.user.isAuth)
    const [messages, setMessages] = useState([])
    const socket = useSelector(state => state.user.privateSocket)
    const my_email = useSelector(state => state.user.email)
    const avatar = useSelector(state => state.user.avatar)

    if (my_email != null && avatar != null && socket == null) {
        const socketAvatar = avatar.replaceAll('/', '+')
        const companion_email = props.ownerEmail
        const websocket = new WebSocket(`wss://video.localhost/websocket/private_chat/ws/${my_email}/${socketAvatar}/${companion_email}`)
        dispatch(privateSocket(websocket))
    }

    const websocket = () => {
        if (socket) {
            socket.onmessage = function (event) {
                const data = JSON.parse(event.data)
                setMessages(messages => [...messages, data])
                bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }
    }

    const websocketClose = () => {
        dispatch(privateSocket(null))
    }


    useEffect(() => { websocket() }, [socket]);
    useEffect(()=>{
        return ()=> websocketClose()
    },[])

    const pressEnter = (event) => {
        if (isAuth) {
            if (event.key === 'Enter') {
                let msg = event.target.value;
                event.target.value = ''
                socket.send(JSON.stringify(msg))
                bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        } else {
            toast("Please, log in!")
        }
    }

    return (
        <div className="chat">
            <div className="chat-header anim">
                Private chat
                <div className="people">
                    <BsFillPersonCheckFill />
                    <span>{props.ownerEmail}</span>
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
export default PrivateChat;
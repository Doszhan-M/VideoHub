import React from "react";
import "../styles/css/chat.min.css";

import { MdPeopleAlt } from 'react-icons/md';




function Chat(props) {

    return (
        <div className="chat">
            <div className="chat-header anim">
                Live Chat
                <div className="people">
                    <MdPeopleAlt />
                    <span>15 people</span>
                </div>

            </div>

        </div>
    )
}
export default Chat;
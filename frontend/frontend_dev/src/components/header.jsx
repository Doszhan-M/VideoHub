import React from "react";
import "../styles/css/header.min.css";

import { FaBell } from 'react-icons/fa';


function Header(props) {


    return (
        <header>
            <div className="title">
                Video Hub
            </div>
            <div className="search">
                <input type="text" placeholder="Search"/>
            </div>
            <div className="right_block">
                <div className="user">
                    <img className="user_img" src="https://images.unsplash.com/photo-1587918842454-870dbd18261a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=943&q=80"></img>
                    <div className="username">TestUser</div>
                </div>
                <div className="notification">
                    <FaBell/>
                    <span className="badge" style={{backgroundColor: "red"}}>2</span>
                </div>
            </div>

        </header>
    )
}
export default Header;
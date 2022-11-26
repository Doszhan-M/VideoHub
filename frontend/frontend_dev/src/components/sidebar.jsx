import React from "react";
import "../styles/css/sidebar.min.css";
import {NavLink} from "react-router-dom"

import Chat from "./chat"

import { 
    AiFillHome, 
    AiTwotoneFire, 
    AiFillLike, 
    AiFillEye, 
    AiFillUpCircle 
} from 'react-icons/ai';


function Sidebar(props) {

    return (
        <aside>
            <div className="sidebar">
                <ul>
                    <li><div className="side_title">Menu</div></li>
                    <li><AiFillHome/><span><NavLink to="/">Discover</NavLink></span></li>
                    <li><AiTwotoneFire/><span><NavLink to="/trending">Trending</NavLink></span></li>
                    <li><AiFillLike/><span><NavLink to="/most_popular">Most Popular</NavLink></span></li>
                    <li><AiFillEye/><span><NavLink to="/subscribe">Subscribe</NavLink></span></li>
                    <li><AiFillUpCircle/><span><NavLink to="/for_you">For You</NavLink></span></li>
                </ul>
            </div>
            <div className="groupe_chat">
                <Chat/>
            </div>
        </aside>
    )
}
export default Sidebar;
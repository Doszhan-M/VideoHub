import React from "react";
import "../styles/css/sidebar.min.css";

import { AiFillHome } from 'react-icons/ai';
import { AiTwotoneFire } from 'react-icons/ai';
import { AiFillLike } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import { AiFillUpCircle } from 'react-icons/ai';


function Sidebar(props) {

    return (
        <aside>
            <div className="sidebar">
                <ul>
                    <li><div className="side_title">Menu</div></li>
                    <li><AiFillHome/><span>Promote</span></li>
                    <li><AiTwotoneFire/><span>Trending</span></li>
                    <li><AiFillLike/><span>Most Popular</span></li>
                    <li><AiFillEye/><span>Subscribe</span></li>
                    <li><AiFillUpCircle/><span>For You</span></li>
                </ul>
            </div>
            <div className="groupe_chat">

            </div>
        </aside>
    )
}
export default Sidebar;
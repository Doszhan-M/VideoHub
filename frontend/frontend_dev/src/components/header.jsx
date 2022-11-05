import React from "react";
import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import "../styles/css/header.min.css";

import { FaBell } from 'react-icons/fa';
import { RiVideoUploadLine, RiLoginBoxLine } from 'react-icons/ri';

import api from "../api/requests"
import { loginUrl, loginUrlRedirectVideoEdit } from "../utils/env_variables"
import { userInfo } from "../store/userSlice"


function Header(props) {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.user.isAuth)
    const username = useSelector(state => state.user.username)
    const avatar = useSelector(state => state.user.avatar)

    const getUserData = () => {
        api.getMe().then(response => {
            dispatch(userInfo(response.data))
        });

    }
    const authStatus = () => {
        if (isAuth) {
            { getUserData() }
            return <div>
                <img className="user_img" src={avatar}></img>
                <div className="username"><NavLink to={`/profile`}>{username}</NavLink></div>
            </div>
        } else {
            return <button className="upload_video">
                <RiLoginBoxLine />
                <a href={loginUrl}>Login/Register</a>
            </button>;
        }
    }
    const authStatusVideoUploadButton = () => {
        if (isAuth) {
            return <button className="upload_video">
                <RiVideoUploadLine />
                <NavLink to={`/video_edit`}>Upload video</NavLink>
            </button>
        } else {
            return <button className="upload_video">
                <RiVideoUploadLine />
                <a href={loginUrlRedirectVideoEdit}>Upload video</a>
            </button>
        }
    }

    return (
        <header>
            <div className="title">
                <NavLink to={`/`}>Video Hub</NavLink>                
            </div>
            <div className="search">
                <input type="text" placeholder="Search" />
            </div>
            <div className="right_block">
                {authStatusVideoUploadButton()}
                <div className="user">
                    {authStatus()}
                </div>
                <div className="notification">
                    <FaBell />
                    <span className="badge" style={{ backgroundColor: "red" }}>2</span>
                </div>
            </div>
        </header>
    )
}
export default Header;
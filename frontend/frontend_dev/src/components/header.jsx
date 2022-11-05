import React from "react";
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import "../styles/css/header.min.css";

import { FaBell } from 'react-icons/fa';
import { RiVideoUploadLine, RiLoginBoxLine } from 'react-icons/ri';

import api from "../api/requests"
import { loginUrl, loginUrlRedirectVideoUpload } from "../utils/env_variables"
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
                <div className="username"><Link to={`/profile`}>{username}</Link></div>
            </div>
        } else {
            return <div className="upload_video">
                <a href={loginUrl}>
                    <RiLoginBoxLine />
                    <span>Login/Register</span>
                </a>
            </div>;
        }
    }
    const authStatusVideoUploadButton = () => {
        if (isAuth) {
            return <div className="upload_video">
                <Link to={`/upload`}>
                    <RiVideoUploadLine />
                    <span>Upload video</span>
                </Link>
            </div>
        } else {
            return <div className="upload_video" >
                <a href={loginUrlRedirectVideoUpload}>
                    <RiVideoUploadLine />
                    <span>Upload video</span>
                </a>
            </div>
        }
    }

    return (
        <header>
            <div className="title">
                <Link to={`/`}>Video Hub</Link>
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
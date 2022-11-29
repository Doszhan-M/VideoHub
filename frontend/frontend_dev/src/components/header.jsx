import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import "../styles/css/header.min.css";

import { FaBell } from 'react-icons/fa';
import { RiVideoUploadLine, RiLoginBoxLine } from 'react-icons/ri';

import { loginUrl, loginUrlRedirectVideoUpload } from "../utils/env_variables"
import { changeNotifyCount, clearDataList } from "../store/pushSlice"


function Header(props) {
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const isAuth = useSelector(state => state.user.isAuth)
    const username = useSelector(state => state.user.username)
    const avatar = useSelector(state => state.user.avatar)
    const notifyCount = useSelector(state => state.push.notifyCount)
    const dataList = useSelector(state => state.push.dataList)
    const [searchText, setSearchText] = useState('')

    const authStatus = () => {
        if (isAuth) {
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

    const searchInput = (event) => {
        let text = event.target.value.toLowerCase();
        setSearchText(text);
    }

    const pressEnter = (event) => {
        if (event.key === 'Enter') {
            return navigate(`/search/${searchText}`);
        }
    }

    const showPushNotify = () => {
        dispatch(changeNotifyCount(-1))
        dispatch(clearDataList())
        {
            dataList.length > 0 ?
                dataList.map(data => {
                    return toast.custom((t) => (
                        <div className="web_push_toast">
                            <a href={`video/${data.body}`}>
                                <div className="question">{data.title}</div>
                            </a>
                        </div>
                    ));
                }) : <></>
        }
    }

    return (
        <header>
            <div className="title">
                <Link to={`/`}>Video Hub</Link>
            </div>
            <div className="search">
                <input type="text" placeholder="Search" onChange={searchInput} onKeyPress={pressEnter} />
                <Link className="search_btn" to={`/search/${searchText}`}></Link>
            </div>
            <div className="right_block">
                {authStatusVideoUploadButton()}
                <div className="user">
                    {authStatus()}
                </div>
                <div className="notification" onClick={showPushNotify}>
                    <FaBell />
                    <span className="badge" style={
                        notifyCount > 0
                            ? { backgroundColor: "red" }
                            : { backgroundColor: "blue" }}>
                        {notifyCount}
                    </span>
                </div>
            </div>
        </header>
    )
}
export default Header;
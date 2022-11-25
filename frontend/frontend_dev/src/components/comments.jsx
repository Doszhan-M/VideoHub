import React, { useEffect, useState } from "react";
import "../styles/css/comments.min.css";
import { useSelector } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from "../api/requests"
import Comment from "./comment"


function Comments(props) {
    const id = props.id
    const isAuth = useSelector(state => state.user.isAuth)
    const [comments, setComments] = useState(null)

    const createComment = async (event) => {
        event.preventDefault();
        if (isAuth) {
            const comment = event.target.elements.comment.value
            await api.createComment(id, comment)
            event.target.elements.comment.value = ''
            await allComments()
        } else {
            toast("Please, log in!")
        }
    }

    const allComments = async () => {
        const videoList = await api.videoComments(id)
        setComments(videoList)
    }

    useEffect(() => {allComments();}, [id])

    return (
        <div className="comment_blog">
            <form method="post" onSubmit={createComment}>
                <div className="form__group field">
                    <textarea type="input" className="form__field" placeholder="Enter your comment" id='comment' required />
                    <label htmlFor="comment" className="form__label">Enter your comment</label>
                </div>
                <input type="submit" value="send"></input>
            </form>
            <ToastContainer position="bottom-center" theme="dark" />
            <div className="comments">
                {comments?.map(comment => {
                    return <Comment key={comment.id} comment={comment} />
                })}
            </div>
        </div>
    )
}
export default Comments;

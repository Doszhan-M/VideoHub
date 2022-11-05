import React from "react";
import "../styles/css/video_edit.min.css";



function VideoEdit(props) {

    return (
        <div className="page_container">
            <h1>Upload Video</h1>
            <div className="video_form">
                <form method="post" encType="multipart/form-data">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="firstname" placeholder="Your video title.."></input>

                    <label htmlFor="desc">Description</label>
                    <textarea rows="10" cols="45" id="desc" name="lastname" placeholder="Description for video.."></textarea>

                    <label htmlFor="file">Choose file to upload</label>
                    <input type="file" id="file" name="file" multiple></input>

                    <label htmlFor="htag">Hashtags</label>
                    <input type="text" id="htag" name="firstname" placeholder="Your video title.."></input>

                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        </div>
    )
}
export default VideoEdit;

import React from "react";
import "../styles/css/discover.min.css";


function Discover(props) {

    return (
        <div className="page_container">
            <div className="discover">
                <div className="discover_title">Discover</div>
                <div className="discover_container">
                    <div className="pic1"></div>
                    <div className="pic2"></div>
                </div>
            </div>
            <div className="page_most_watched">
                <div className="title">Most Watched</div>

                <div className="page_most_watched_container">

                    <div className="video anim">
                        <div className="video-time">8 min</div>
                        <div className="video-wrapper">
                            <video muted="">
                                <source
                                    src="https://player.vimeo.com/external/436572488.sd.mp4?s=eae5fb490e214deb9ff532dd98d101efe94e7a8b&amp;profile_id=139&amp;oauth2_token_id=57447761"
                                    type="video/mp4"/>
                            </video>
                            <div className="author-img__wrapper video-author">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                                    strokeLinejoin="round" className="feather feather-check">
                                    <path d="M20 6L9 17l-5-5"></path>
                                </svg>
                                <img className="author-img"
                                    src="https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500"/>
                            </div>
                        </div>
                        <div className="video-by">Andy William</div>
                        <div className="video-name">Basic how to ride your skateboard comfortly</div>
                        <div className="video-view">54K views<span className="seperate video-seperate"></span>1 week ago</div>
                    </div>

                </div>
            </div>
        </div>

    )
}
export default Discover;

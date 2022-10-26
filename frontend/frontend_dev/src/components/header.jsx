import React from "react";
import "../styles/css/header.min.css";


function Header(props) {

    let processed = 0
    let success = 0
    let failed = 0
    let processing = 0

    props.tasks.forEach(function (item, i, arr) {
        processed = processed + item[0].processed
        success = success + item[0].success
        failed = failed + item[0].failed
        processing = processing + item[0].processing
    });
    
    return (
        <header>
            <div className="title">
                Video Dashboard
            </div>
            <div className="header_box">
                <div className="main_status">
                    Processed: {processed}
                </div>
                <div className="main_status">
                    Success: {success}
                </div>
                <div className="main_status">
                    Failed: {failed}
                </div>
                <div className="main_status">
                    Processing: {processing}
                </div>
            </div>
        </header>
    )
}
export default Header;
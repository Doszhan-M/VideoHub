import React from "react";
import "../styles/css/common_table.min.css";

import CommonTableRow from "../components/common_table_row"


function CommonTable(props) {

    return (
        <div className="common_table">
            <div className="fake_back_button"></div>
            <table id="common">
                <tbody>
                    <tr>
                        <th>IIN/BIN</th>
                        <th>All Tasks</th>
                        <th>Processing</th>
                        <th>Processed</th>
                        <th>Success</th>
                        <th>Failed</th>
                        <th>Start time</th>
                        <th>Finish time</th>
                        <th>Duration</th>
                    </tr>
                    {props.tasks.map(task => <CommonTableRow key={task[0].iin_bin} data={task[0]}/>)}
                </tbody>
            </table>
        </div>
    )
}
export default CommonTable;

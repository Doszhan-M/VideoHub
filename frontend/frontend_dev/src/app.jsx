import React, { useState } from "react";
import { Routes, Route,} from "react-router-dom"

import { Layout } from "./components/layout"


function App() {

    let [all_tasks, setAllTasks] = useState([])

    return (
        <Routes>
            <Route path="/" element={<Layout  {...{ all_tasks, setAllTasks }}/>}>
                {/* <Route index element={<CommonTable tasks={all_tasks}/>} />
                <Route path="task/:id" element={<DetailedTable />} /> */}
            </Route>
        </Routes>
    );
}
export default App;

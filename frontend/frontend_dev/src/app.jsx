import React, { useState } from "react";
import { Routes, Route, } from "react-router-dom"

import Layout from "./components/layout"
import Discover from "./pages/discover"
import VideoEdit from "./pages/video_edit"


function App() {

    if (process.env.NODE_ENV == 'production') {
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
              .then(registration => {
                console.log('SW registered: ', registration);
              }).catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
              });
          });
        }
      }
      
    let [all_tasks, setAllTasks] = useState([])

    return (
        <Routes>
            <Route path="/" element={<Layout  {...{ all_tasks, setAllTasks }} />}>
                <Route index element={<Discover/>} />
                <Route path="video_edit" element={<VideoEdit/>} />
            </Route>
        </Routes>
    );
}
export default App;

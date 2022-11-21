import React, { useState } from "react";
import { Routes, Route, } from "react-router-dom"

import Layout from "./components/layout"
import Discover from "./pages/discover"
import Upload from "./pages/upload"
import VideoPage from "./pages/video"
import Search from "./pages/search"


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
          <Route index element={<Discover />} />
          <Route path="upload" element={<Upload />} />
          <Route path="video/:id" element={<VideoPage />} />
          <Route path="search/:searchText" element={<Search />} />
        </Route>
      </Routes>
  );
}
export default App;

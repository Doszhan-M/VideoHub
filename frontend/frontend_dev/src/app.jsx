import React, { useState } from "react";
import { Routes, Route, } from "react-router-dom"

import Layout from "./components/layout"
import Discover from "./pages/discover"
import Upload from "./pages/upload"
import VideoPage from "./pages/video"
import Search from "./pages/search"
import Trending from "./pages/trending"
import MostPopular from "./pages/most_popular"
import Subscribe from "./pages/subscribe"
import ForYou from "./pages/for_you"


function App() {

  let [all_tasks, setAllTasks] = useState([])

  return (
      <Routes>
        <Route path="/" element={<Layout  {...{ all_tasks, setAllTasks }} />}>
          <Route index element={<Discover />} />
          <Route path="upload" element={<Upload />} />
          <Route path="video/:id" element={<VideoPage />} />
          <Route path="search/:searchText" element={<Search />} />
          <Route path="search/" element={<Discover />} />
          <Route path="trending/" element={<Trending />} />
          <Route path="most_popular/" element={<MostPopular />} />
          <Route path="subscribe/" element={<Subscribe />} />
          <Route path="for_you/" element={<ForYou />} />
        </Route>
      </Routes>
  );
}
export default App;

import React, { useEffect } from "react";
import { Outlet } from "react-router-dom"
import "../styles/css/main.min.css";

import Header from "./header"
import api from "../api"



const Main = (props) => {

    const allTasks = () => {
        api.fetchAllTasks().then(response => {
            props.setAllTasks(response.data)
        });
    }

    useEffect(() => allTasks(), [])

    useEffect(() => {
        const interval = setInterval(() => {
          allTasks();
        }, 3000);
        return () => {
          clearInterval(interval);
        };
      }, [])

    return (
        <main>
            <Header tasks={props.all_tasks}/>
            <Outlet />
        </main>
    )
}

export { Main }
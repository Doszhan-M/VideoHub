import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import "../styles/css/layout.min.css";

import Header from "./header"
import Sidebar from "./sidebar"

import api from "../api"
import { addTodo } from "../store/todoSlice"


const Layout = (props) => {

    const allTasks = () => {
        api.fetchAllTasks().then(response => {
            props.setAllTasks(response.data)
        });
    }

    const todos = useSelector(state => state.todos.todos)

    const dispatch = useDispatch()


    // useEffect(() => dispatch(addTodo('test')), [])

    console.log(todos)

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       allTasks();
    //     }, 3000);
    //     return () => {
    //       clearInterval(interval);
    //     };
    //   }, [])

    return (
        <main>
            <Header tasks={props.all_tasks} />
            <div className="container">
                <Sidebar />
                <div className="pages">
                    <Outlet />
                </div>
            </div>
        </main>
    )
}

export { Layout }
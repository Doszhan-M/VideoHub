import React, { useEffect } from "react";
import { Outlet } from "react-router-dom"
import "../styles/css/main.min.css";
import {useSelector, useDispatch} from "react-redux"

import Header from "./header"
import api from "../api"
import {addTodo} from "../store/todoSlice"


const Main = (props) => {

    const allTasks = () => {
        api.fetchAllTasks().then(response => {
            props.setAllTasks(response.data)
        });
    }

    const todos = useSelector(state => state.todos.todos)

    const dispatch = useDispatch()


    useEffect(() => dispatch(addTodo('test')), [])
    
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
            <Header tasks={props.all_tasks}/>
            <Outlet />
        </main>
    )
}

export { Main }
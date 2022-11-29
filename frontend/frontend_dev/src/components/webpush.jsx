import React, { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { fetchToken, onMessageListener } from '../firebase/firebase';
import { useDispatch } from "react-redux"
import "../styles/css/webpush.min.css";
import api from "../api/requests"
import { changeNotifyCount, pushDataList } from "../store/pushSlice"


const WebPush = (props) => {

    const dispatch = useDispatch()

    onMessageListener().then(payload => {
        dispatch(changeNotifyCount(1))
        dispatch(pushDataList(payload.notification))
    }).catch(err => console.log('failed: ', err));

    const activateWebPush = async (t) => {
        const token = await fetchToken();
        toast.remove(t.id)
        console.log('token', token)
        const response = await api.saveWebPushToken(token)
        console.log(response)
    }

    const webPushNotify = () => toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'}`}>
            <div className="web_push_toast">
                <div className="question">Would you like to subscribe notifications?</div>
                <div className="btns">
                    <button className="accept" onClick={activateWebPush}>Accept</button>
                    <button onClick={() => toast.remove(t.id)}>Decline</button>
                </div>
            </div>
        </div>
    ));

    const checkClient = async () => {
        if (Notification.permission !== "granted") {
            webPushNotify()
        } else {
            const foundToken = await fetchToken();
            const response = await api.checkWebPushToken(foundToken)
            if (response.status == 200) {
                console.log("webPush token already register")
            } else {
                webPushNotify()
            }
        }
    }

    useEffect(() => { setTimeout(() => { checkClient() }, 60000) }, []);

    return (
        <>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 120000,
                }}
            />
        </>
    )
}

export default WebPush 
import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { fetchToken, onMessageListener } from '../firebase/firebase';
import "../styles/css/webpush.min.css";
import api from "../api/requests"


const WebPush = (props) => {

    const [notification, setNotification] = useState('');
    const [isTokenFound, setTokenFound] = useState(false);

    onMessageListener().then(payload => {
        setNotification(payload.notification.title)
        console.log(payload);
        // toast(notification)
    }).catch(err => console.log('failed: ', err));

    const activateWebPush = (t) => {
        toast.remove(t.id)
        fetchToken(setTokenFound);
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

    const checkClient = async() => {
        const token = fetchToken(setTokenFound);
        const response = await api.ckeckWebPushToken(token)
        if (response.status == 200) {
            console.log('token already exist')
        } else {
            console.log('token not exist')
            webPushNotify()
        }
    }
    // TODO: на фронте сделать реквест ckeckWebPushToken, на бекенде сделать роут проверки токена в базе данных

    setTimeout(() => { checkClient() }, 1000)

    return (
        <>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 20000,
                  }}
            />
        </>
    )
}

export default WebPush 
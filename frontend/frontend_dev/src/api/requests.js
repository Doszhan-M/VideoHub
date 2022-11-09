import axios from "./axios_conf"


const check_session = async () => {
    const url = `/api/web/accounts/check_session/`
    const response = await axios.get(url).then(response => {
        return response;
    })
    return response
}

const csrf = async () => {
    const url = `/api/web/accounts/csrf/`
    const response = await axios.get(url).then(response => {
        return response.data['X-CSRFToken']
    })
    return response
}

const getMe = async () => {
    const url = `/api/web/auth/users/me/`
    const response = await axios.get(url).then(response => {
        return response
    })
    return response
}

const uploadVideo = async (formData) => {
    const url = `api/web/create_video/`
    const response = await axios(
        {
            method: "post",
            url: url,
            data: formData,
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': '"multipart/form-data',
                'Accept': 'application/json',
                'X-CSRFToken': await csrf()
            }
        }
    ).then(response => {
        return response
    })
    return response
}

const getVideo = async (id) => {
    const url = `/api/web/get_video/${id}`
    const response = await axios(
        {
            method: "get",
            url: url,
        }
    ).then(response => {
        return response.data
    })
    return response
}

const getUserVideos = async () => {
    const url = `/api/web/user_videos/`
    const response = await axios(
        {
            method: "get",
            url: url,
            withCredentials: true,
        }
    ).then(response => {
        return response.data
    })
    return response
}



export default { check_session, csrf, getMe, uploadVideo, getVideo, getUserVideos }

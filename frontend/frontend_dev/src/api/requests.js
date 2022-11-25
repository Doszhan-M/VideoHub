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
                'Content-Type': 'multipart/form-data',
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

const getRelatedVideos = async (id) => {
    const url = `/api/web/related_videos/${id}`
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

const discoverVideos = async () => {
    const url = `/api/web/discover_videos/`
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

const mostWatchedVideos = async () => {
    const url = `/api/web/most_watched/`
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

const allVideos = async () => {
    const url = `/api/web/all_videos/`
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

const search = async (searchValue) => {
    const url = `/api/web/search/video/${searchValue}/`
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

const trending = async () => {
    const url = `/api/web/trending/`
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

const most_popular = async () => {
    const url = `/api/web/most_popular/`
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

const subscribedVideos = async () => {
    const url = `/api/web/subscribed_videos/`
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

const forYou = async () => {
    const url = `/api/web/for_you/`
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

const like = async (id) => {
    const url = `/api/web/like_video/${id}`
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

const subscribe = async (id) => {
    const url = `/api/web/subscribe_channel/${id}`
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

const checkChannel = async (id) => {
    const url = `/api/web/check_channel/${id}`
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

const videoComments = async (id) => {
    const url = `/api/web/video_comments/${id}`
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

const createComment = async (id, comment) => {
    const url = `api/web/create_comment/`
    const response = await axios(
        {
            method: "post",
            url: url,
            data: {
                "text": comment,
                "video": id
            },
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRFToken': await csrf()
            }
        }
    ).then(response => {
        return response
    })
    return response
}


const userInfo = async (id) => {
    const url = `/api/web/accounts/user_info/${id}`
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


export default {
    check_session,
    csrf,
    getMe,
    uploadVideo,
    getVideo,
    getUserVideos,
    getRelatedVideos,
    discoverVideos,
    mostWatchedVideos,
    allVideos,
    search,
    trending,
    most_popular,
    subscribedVideos,
    forYou,
    like,
    subscribe,
    checkChannel,
    createComment,
    videoComments,
    userInfo,
}

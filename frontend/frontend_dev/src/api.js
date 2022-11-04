import axios from "axios"


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
        return response
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



export default { check_session, csrf, getMe }

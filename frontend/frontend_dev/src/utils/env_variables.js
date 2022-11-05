let loginUrl = ''
let logoutUrl = ''
let loginUrlRedirectVideoUpload = ''

if (process.env.NODE_ENV == 'production') {
    loginUrl = 'https://dev-ge0s31km.us.auth0.com/authorize?response_type=code&client_id=4ap6Vuy6rEcpNAkzQ2IMzFTcThpWKqTN&redirect_uri=https://doszhan.online/api/web/accounts/authO/login/&scope=openid%20profile%20email&state=https://doszhan.online'
    logoutUrl = 'https://dev-ge0s31km.us.auth0.com/v2/logout?client_id=4ap6Vuy6rEcpNAkzQ2IMzFTcThpWKqTN&returnTo=https://doszhan.online/api/web/accounts/authO/logout/'
    loginUrlRedirectVideoEdit = 'https://dev-ge0s31km.us.auth0.com/authorize?response_type=code&client_id=4ap6Vuy6rEcpNAkzQ2IMzFTcThpWKqTN&redirect_uri=https://doszhan.online/api/web/accounts/authO/login/&scope=openid%20profile%20email&state=https://doszhan.online/video_edit'
} else {
    loginUrl = 'https://dev-ge0s31km.us.auth0.com/authorize?response_type=code&client_id=4ap6Vuy6rEcpNAkzQ2IMzFTcThpWKqTN&redirect_uri=https://video.localhost/api/web/accounts/authO/login/&scope=openid%20profile%20email&state=https://video.localhost'
    logoutUrl = 'https://dev-ge0s31km.us.auth0.com/v2/logout?client_id=4ap6Vuy6rEcpNAkzQ2IMzFTcThpWKqTN&returnTo=https://video.localhost/api/web/accounts/authO/logout/'
    loginUrlRedirectVideoUpload = 'https://dev-ge0s31km.us.auth0.com/authorize?response_type=code&client_id=4ap6Vuy6rEcpNAkzQ2IMzFTcThpWKqTN&redirect_uri=https://video.localhost/api/web/accounts/authO/login/&scope=openid%20profile%20email&state=https://video.localhost/upload'
}

export {loginUrl, logoutUrl, loginUrlRedirectVideoUpload}

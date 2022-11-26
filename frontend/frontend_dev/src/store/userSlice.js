import { createSlice } from '@reduxjs/toolkit';



const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuth: null,
        email: null,
        avatar: null,
        username: null,
        channel_id: null,
        socket: null,
    },
    reducers: {
        checkAuth(state, action) {
            state.isAuth = action.payload;
        },
        userInfo(state, action) {
            state.email = action.payload.email;
            state.avatar = action.payload.avatar;
            state.username = action.payload.first_name;
            state.channel_id = action.payload.user_channel;
        },
        websocket(state, action) {
            state.socket = action.payload;
        },
    },
});

export const { checkAuth, userInfo, websocket,} = userSlice.actions;

export default userSlice.reducer;
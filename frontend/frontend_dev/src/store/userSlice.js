import { createSlice } from '@reduxjs/toolkit';



const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuth: false,
        email: '',
        avatar: '',
        username: '',
        channel_id: null,
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
    },
});

export const { checkAuth, userInfo, } = userSlice.actions;

export default userSlice.reducer;
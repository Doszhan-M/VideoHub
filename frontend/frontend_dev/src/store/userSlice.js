import { createSlice } from '@reduxjs/toolkit';



const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuth: false,
        email: '',
        avatar: '',
        username: '',
    },
    reducers: {
        checkAuth(state, action) {
            state.isAuth = action.payload;
        },
        userInfo(state, action) {
            state.email = action.payload.email;
            state.avatar = action.payload.avatar;
            state.username = action.payload.first_name;
        },
    },
});

export const { checkAuth, userInfo, } = userSlice.actions;

export default userSlice.reducer;
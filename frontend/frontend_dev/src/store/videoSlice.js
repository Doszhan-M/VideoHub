import { createSlice } from '@reduxjs/toolkit';



const videoSlice = createSlice({
    name: 'videos',
    initialState: {
        discoverVideosList: [],
    },
    reducers: {
        refreshDiscoverVideos(state, action) {
            state.discoverVideosList = [];
        },
    },
});

export const { discoverVideos, } = videoSlice.actions;

export default videoSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';



const videoSlice = createSlice({
    name: 'videos',
    initialState: {
        discoverVideosList: null,
        mostWatchedVideos: null,
        allVideos: null,
    },
    reducers: {
        refreshDiscoverVideos(state, action) {
            state.discoverVideosList = action.payload;
        },
        refreshMostWatchedVideos(state, action) {
            state.mostWatchedVideos = action.payload;
        },
        refreshAllVideos(state, action) {
            state.allVideos = action.payload;
        },
    },
});

export const { refreshDiscoverVideos, refreshMostWatchedVideos, refreshAllVideos} = videoSlice.actions;

export default videoSlice.reducer;
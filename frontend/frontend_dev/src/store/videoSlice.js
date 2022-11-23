import { createSlice } from '@reduxjs/toolkit';



const videoSlice = createSlice({
    name: 'videos',
    initialState: {
        discoverVideosList: null,
        mostWatchedVideos: null,
        allVideos: null,
        trendVideos: null,
        mostPopular: null,
        subscribed: null,
        forYou: null,
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
        refreshTrendVideos(state, action) {
            state.trendVideos = action.payload;
        },
        refreshMostPopular(state, action) {
            state.mostPopular = action.payload;
        },
        refreshSubscribed(state, action) {
            state.subscribed = action.payload;
        },
        refreshForYou(state, action) {
            state.forYou = action.payload;
        },
    },
});

export const { 
    refreshDiscoverVideos, 
    refreshMostWatchedVideos, 
    refreshAllVideos, 
    refreshTrendVideos,
    refreshMostPopular,
    refreshSubscribed,
    refreshForYou,
} = videoSlice.actions;

export default videoSlice.reducer;
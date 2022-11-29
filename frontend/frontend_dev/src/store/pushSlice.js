import { createSlice } from '@reduxjs/toolkit';



const pushSlice = createSlice({
    name: 'push',
    initialState: {
        notifyCount: 0,
        dataList: [],

    },
    reducers: {
        changeNotifyCount(state, action) {
            state.notifyCount = action.payload + state.notifyCount;
            if (state.notifyCount < 0) {
                state.notifyCount = 0
            }
        },
        pushDataList(state, action) {
            state.dataList.push(action.payload);
        },
        clearDataList(state, action) {
            state.dataList = [];
        },
    },
});

export const { changeNotifyCount, pushDataList, clearDataList } = pushSlice.actions;

export default pushSlice.reducer;
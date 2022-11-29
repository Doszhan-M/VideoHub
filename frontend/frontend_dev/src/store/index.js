import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import videoReducer from './videoSlice';
import pushReducer from './pushSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    videos: videoReducer,
    push: pushReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './coursesReducer';
import usersReducer from './usersReducer';

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    users: usersReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

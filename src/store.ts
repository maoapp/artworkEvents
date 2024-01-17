import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';

// @reducers
import eventReducer from './reducers/artworkReducer';

export const store = configureStore({
  reducer: {
    events: eventReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {Dispatch} from 'redux';

// @constants
import {END_POINTS, HOST} from '../constants/constants';
import {AppDispatch, RootState} from '../store';

// @types
import {IEvents, IEvent, IRequest} from '../types';

export const getEvents =
  (page: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(getEventsRequest());
    try {
      const response = await axios.get(
        `${HOST}/${END_POINTS.artworks}?page=${page}`,
      );
      let events = response.data;

      if (page > 1 && page < response.data.pagination.limit) {
        const currentData = getState().events.events.data;
        events = {
          ...events,
          data: [...currentData.data, ...response.data.data],
        };
      }

      dispatch(getEventsRequestSuccessful(events));
    } catch (err) {
      dispatch(getEventsRequestFailure());
    }
  };
export const onSelectEvent = (event: IEvent) => (dispatch: Dispatch<any>) =>
  dispatch(selectEvent(event));

export interface IArtworksState {
  events: IRequest<IEvents>;
  eventSelected: IEvent;
}
const initialState: IArtworksState = {
  events: {
    loading: true,
    data: null as unknown as IEvents,
    error: false,
    successful: false,
  },
  eventSelected: null as unknown as IEvent,
};

export const artworksSlice = createSlice({
  name: 'artworks',
  initialState,
  reducers: {
    getEventsRequest: state => {
      state.events.loading = true;
    },
    getEventsRequestFailure: state => {
      state.events.error = true;
    },
    getEventsRequestSuccessful: (state, action: PayloadAction<IEvents>) => {
      state.events.data = action.payload;
    },
    selectEvent: (state, action: PayloadAction<IEvent>) => {
      state.eventSelected = action.payload;
    },
  },
});

export const {
  getEventsRequest,
  getEventsRequestFailure,
  getEventsRequestSuccessful,
  selectEvent,
} = artworksSlice.actions;

export default artworksSlice.reducer;

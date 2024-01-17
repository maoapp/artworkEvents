import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {Dispatch} from 'redux';

// @constants
import {END_POINTS, HOST} from '../constants/constants';

// @types
import {IArtwork, IRequest} from '../types';

export const getArtworkDetail =
  (id: string) => async (dispatch: Dispatch<any>) => {
    dispatch(getArtworkDetailRequest());
    try {
      const response = await axios.get(`${HOST}/${END_POINTS.artworks}/${id}`);
      dispatch(getArtworkDetailRequestSuccessful(response.data));
    } catch (err) {
      dispatch(getArtworkDetailFailure());
    }
  };

export interface IArtworkDetailState {
  artworkSelected: IRequest<IArtwork>;
}
const initialState: IArtworkDetailState = {
  artworkSelected: {
    loading: false,
    data: null as unknown as IArtwork,
    error: false,
    successful: false,
  },
};

export const artworksSlice = createSlice({
  name: 'artworkDetail',
  initialState,
  reducers: {
    getArtworkDetailRequest: state => {
      state.artworkSelected.loading = true;
    },
    getArtworkDetailFailure: state => {
      state.artworkSelected.error = true;
    },
    getArtworkDetailRequestSuccessful: (
      state,
      action: PayloadAction<IArtwork>,
    ) => {
      state.artworkSelected.data = action.payload;
    },
  },
});

export const {
  getArtworkDetailRequest,
  getArtworkDetailFailure,
  getArtworkDetailRequestSuccessful,
} = artworksSlice.actions;
export const showArtworkDetail = state => state.artworkDetail.artworkSelected;

export default artworksSlice.reducer;

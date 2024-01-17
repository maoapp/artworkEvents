// @constants
import {HOST_IMAGE_IFF_LOCATION} from '../constants/constants';

// @types
import {IArtwork} from '../types';

export const buildArtwork = (artwork: IArtwork, imageUrl: string) => ({
  id: artwork.id,
  title: artwork.title,
  place_of_origin: artwork.place_of_origin,
  thumbnail: artwork.thumbnail,
  image: buildImageUrl(imageUrl, artwork.image_id),
  image_id: artwork.image_id,
  artist_display: artwork.artist_display,
  artist_title: artwork.artist_title,
  artwork_type_title: artwork.artwork_type_title,
});

export const buildImageUrl = (hostImage: string, id: string) =>
  `${hostImage}/${id}/${HOST_IMAGE_IFF_LOCATION}`;

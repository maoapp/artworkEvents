import {StackNavigationProp} from '@react-navigation/stack';

export interface IEvent {
  id: string;
  title: string;
  place_of_origin: string;
  thumbnail: IThumbnail;
  image: string;
  image_id: string;
  location: string;
  image_url: string;
  description: string;
}

export interface IEvents {
  data: IEvent[];
  pagination: IPagination;
}

export interface IThumbnail {
  lqip: string;
  width: number;
  height: number;
  alt_text: string;
}

export interface IRequest<T> {
  loading: boolean;
  data: T;
  error: boolean;
  successful: boolean;
}

export interface INavigation {
  navigation: StackNavigationProp<any>;
  goBack: () => void;
}

export interface IPagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
}

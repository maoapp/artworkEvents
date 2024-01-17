import React, {useEffect, useState, useCallback} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';

// @redux
import {getEvents, onSelectEvent} from '../../reducers/artworkReducer';

// @theme
import {FontNames, FontSizes, Pallet} from '../../theme';

// @components
import EventCard from '../../components/eventCard/EventCard';
import Loader from '../../components/loader/Loader';

// @types
import {IEvent, INavigation} from '../../types';
import {RootState, useAppDispatch} from '../../store';

const HomeScreen: React.FC<INavigation> = ({navigation}) => {
  const [markedAsFavorites, setMarkedAsFavorites] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const artworks = useSelector((state: RootState) => state.events).events;
  const dispatch = useAppDispatch();

  const toast = useToast();

  useEffect(() => {
    dispatch(getEvents(page));
    onMarkFavorites();
  }, [dispatch, page]);

  const onMarkFavorites = async () => {
    const favoritesStored = await AsyncStorage.getItem('favorites');

    if (!favoritesStored) {
      return false;
    }

    const favoritesArtworksIds = JSON.parse(favoritesStored as string).map(
      (event: IEvent) => event.id,
    );

    setMarkedAsFavorites(favoritesArtworksIds);
  };

  const renderError = () => (
    <View style={styles.infoContainer}>
      <Text style={styles.emptyState}>Error fetching artworks</Text>
    </View>
  );

  const saveArtworkOnDevice = useCallback(
    async (event: IEvent) => {
      const favoritesStored = await AsyncStorage.getItem('favorites');
      let newFavorite = JSON.parse(favoritesStored as string);

      if (!newFavorite) {
        newFavorite = [];
      } else {
        newFavorite = newFavorite.filter(
          (item: IEvent) => item.id !== event.id,
        );
      }

      newFavorite.push(event);

      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorite))
        .then(() => {
          toast.show('Artwork Saved on favorites');
          setMarkedAsFavorites([...markedAsFavorites, event.id]);
        })
        .catch(() => {
          toast.show('Error saving artwork, try again please');
        });
    },
    [markedAsFavorites, toast],
  );

  const handleArtworkSelection = (event: IEvent) => {
    dispatch(onSelectEvent(event));
    const imageUrl = event.image_url;
    navigation.navigate('Detail', {imageUrl});
  };

  const renderArtworks = () => (
    <FlatList
      data={artworks.data.data}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <EventCard
          event={item}
          urlImage={item.image_url}
          onPress={() => handleArtworkSelection(item)}
          onSaveFavorite={() => saveArtworkOnDevice(item)}
          favorite={markedAsFavorites.includes(item.id)}
        />
      )}
      ItemSeparatorComponent={() => <View style={styles.dividerCard} />}
      onEndReached={() => setPage(page + 1)}
    />
  );

  const renderContent = () => {
    let content;

    if (artworks.loading) {
      content = <Loader />;
    }

    if (artworks.data) {
      content = renderArtworks();
    }

    if (artworks.error) {
      content = renderError();
    }

    return content;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ARTWORK EVENTS</Text>
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Pallet.grayVariant,
    paddingBottom: 50,
  },
  title: {
    fontFamily: FontNames.TextExtraBold,
    fontSize: FontSizes.Large,
    alignSelf: 'center',
    color: '#796f65',
    marginVertical: 20,
  },
  dividerCard: {
    width: '100%',
    backgroundColor: Pallet.grayLight,
    height: 1,
    marginVertical: 20,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    fontSize: FontSizes.ExtraMedium,
    color: Pallet.blackGray,
  },
});

export default HomeScreen;

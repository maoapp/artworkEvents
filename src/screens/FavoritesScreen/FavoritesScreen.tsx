import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IEvent} from '../../types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';

// @components
import EventCard from '../../components/eventCard/EventCard';
import Loader from '../../components/loader/Loader';

// @theme
import {FontNames, FontSizes, Pallet} from '../../theme';

const FavoritesScreen = ({navigation}) => {
  const [favorites, setFavorites] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    getFavorites();
  }, [isFocused]);

  const getFavorites = async () => {
    const favoritesStored = await AsyncStorage.getItem('favorites');
    const formatFavorites = favoritesStored ? JSON.parse(favoritesStored) : [];

    setFavorites(formatFavorites);
    setLoading(false);
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        There is not favorites artworks saved yet
      </Text>
    </View>
  );

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }

    if (favorites) {
      return (
        <FlatList
          data={favorites}
          ListEmptyComponent={() => renderEmptyState()}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <EventCard
              event={item}
              urlImage={item.image}
              onPress={() =>
                navigation.navigate('Detail', {imageUrl: item.image})
              }
              favorite
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.dividerCard} />}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>FAVORITES EVENTS</Text>
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
  dividerCard: {
    width: '100%',
    backgroundColor: Pallet.grayLight,
    height: 0.3,
    marginVertical: 20,
  },
  title: {
    fontFamily: FontNames.TextExtraBold,
    fontSize: FontSizes.Large,
    alignSelf: 'center',
    color: '#796f65',
    marginVertical: 20,
  },
  emptyContainer: {
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FontSizes.ExtraMedium,
    color: Pallet.blackGray,
  },
});

export default FavoritesScreen;

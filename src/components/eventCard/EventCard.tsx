import React, {useEffect, useRef} from 'react';
import {
  Animated,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  View,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import {Text} from 'react-native-elements';

// @theme
import {Pallet} from '../../theme';
import {IEvent} from '../../types';

// @styles
import styles from './styles';

// @assets
const favoriteIcon = require('../../assets/svg/favorite');
const locationIcon = require('../../assets/svg/location');

interface IEventCardProps {
  event: IEvent;
  onPress?: () => void;
  onSaveFavorite?: () => void;
  urlImage: string;
  favorite: boolean;
}

const EventCard: React.FC<IEventCardProps> = ({
  event,
  favorite,
  urlImage,
  onPress,
  onSaveFavorite,
}) => {
  const fadeAnim = useRef(new Animated.Value(0.01)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        imageStyle={styles.imageBackground}
        style={styles.eventCard}
        source={{
          uri: urlImage,
        }}>
        <Animated.View style={[styles.animatedView, {opacity: fadeAnim}]}>
          <ScrollView style={styles.contentCard}>
            <View style={styles.headerCard}>
              <Text style={styles.titleCard}>{event.title}</Text>
              {!favorite && (
                <TouchableOpacity onPress={onSaveFavorite}>
                  <SvgUri
                    fill={Pallet.gray}
                    height={18}
                    width={18}
                    svgXmlData={favoriteIcon}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.eventlocation}>
              <SvgUri
                fill={Pallet.gray}
                height={14}
                width={14}
                svgXmlData={locationIcon}
              />
              <Text style={styles.originCard}>{event.location}</Text>
            </View>
          </ScrollView>
        </Animated.View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default EventCard;

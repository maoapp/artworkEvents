import React, {useEffect, useRef} from 'react';
import {
  Animated,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import {Text} from 'react-native-elements';
import {useSelector} from 'react-redux';
import SvgUri from 'react-native-svg-uri';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {RouteProp} from '@react-navigation/native';

// @types
import {RootState} from '../../store';

// @components
import Loader from '../../components/loader/Loader';

// @theme
import {FontNames, FontSizes, Pallet} from '../../theme';
import {INavigation} from '../../types';
import {useState} from 'react';

// @assets
const {width, height} = Dimensions.get('window');
const backIcon = require('../../assets/svg/back');

interface DetailScreenProps {
  navigation: INavigation;
  route: RouteProp<{params: {imageUrl: string}}, 'params'>;
}

const DetailScreen: React.FC<DetailScreenProps> = ({route, navigation}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const fadeAnim = useRef(new Animated.Value(0.01)).current;
  const event = useSelector((state: RootState) => state.events).eventSelected;

  const {imageUrl} = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const renderContent = (
    <Animated.View style={[styles.animation, {opacity: fadeAnim}]}>
      <ImageBackground
        source={{uri: imageUrl}}
        style={{backgroundColor: Pallet.grayVariant}}
        onLoadStart={() => <Loader />}
        imageStyle={{width, height}}
        resizeMode="cover">
        <SafeAreaView style={styles.container}>
          <TouchableOpacity onPress={navigation.goBack}>
            <SvgUri fill="white" height={20} width={20} svgXmlData={backIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.infoContainer}>{event.description}</Text>
        </SafeAreaView>
      </ImageBackground>
    </Animated.View>
  );

  return loading ? (
    <View style={styles.loaderContainer}>
      <Loader />
    </View>
  ) : (
    renderContent
  );
};

const styles = StyleSheet.create({
  infoTitle: {fontFamily: FontNames.TextExtraBold},
  infoContainer: {
    fontSize: FontSizes.Medium,
    marginTop: 10,
  },
  title: {
    fontSize: FontSizes.ExtraLarge,
    alignSelf: 'center',
    fontFamily: FontNames.TextBold,
    marginVertical: 20,
  },
  container: {
    opacity: 0.6,
    width,
    height,
    paddingHorizontal: 15,
    backgroundColor: Pallet.black,
  },
  loaderContainer: {
    backgroundColor: Pallet.black,
    flex: 1,
  },
  animation: {
    flex: 1,
  },
});

export default DetailScreen;

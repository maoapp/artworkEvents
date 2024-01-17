import React from 'react';
import {View} from 'react-native';
import Lottie from 'lottie-react-native';

// @styles
import styles from './styles';

const Loader = () => (
  <View style={styles.infoContainer}>
    <Lottie
      source={require('../../assets/animations/loading.json')}
      autoPlay
      loop
    />
  </View>
);

export default Loader;

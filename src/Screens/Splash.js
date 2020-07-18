/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {StyleSheet, View, Image, Dimensions, StatusBar} from 'react-native';

const DEVICE = Dimensions.get('window');

const Splash = ({splash, isSplash}) => {
  useEffect(() => {
    if (isSplash) {
      setTimeout(() => {
        splash();
      }, 2000);
    }
  }, [isSplash, splash]);
  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <Image source={require('../images/splash.jpg')} style={styles.image} />
      </View>
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: DEVICE.width,
    height: DEVICE.height,
    resizeMode: 'contain',
  },
});

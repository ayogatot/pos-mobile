/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View, Dimensions, TextInput} from 'react-native';

const DEVICE = Dimensions.get('window');

const CardCart = ({id, nama, qty, harga}) => {
  return (
    <View key={id.toString()} style={cardStyles.cardContainer}>
      <View style={cardStyles.colTab1}>
        <Text>{id}</Text>
      </View>
      <View style={cardStyles.colTab2}>
        <Text>{nama}</Text>
      </View>
      <View style={cardStyles.colTab3}>
        {/* <Text>{qty}</Text> */}
        <TextInput
          placeholder={qty}
          defaultValue={qty}
          keyboardType="numeric"
          style={cardStyles.input}
        />
      </View>
      <View style={cardStyles.colTab4}>
        <Text>{harga}</Text>
      </View>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  colTab1: {
    display: 'flex',
    borderWidth: 1,
    borderColor: '#eb4034',
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE.width / 10,
    height: DEVICE.width / 8,
  },

  colTab2: {
    display: 'flex',
    borderWidth: 1,
    borderColor: '#eb4034',
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE.width / 2.55,
    height: DEVICE.width / 8,
  },
  colTab3: {
    display: 'flex',
    borderWidth: 1,
    borderColor: '#eb4034',
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE.width / 8,
    height: DEVICE.width / 8,
  },
  colTab4: {
    display: 'flex',
    borderWidth: 1,
    borderColor: '#eb4034',
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE.width / 4.6,
    height: DEVICE.width / 8,
  },
  input: {
    textDecorationLine: 'underline',
    textDecorationColor: 'red',
    textDecorationStyle: 'dashed',
    color: 'red',
  },
});

export default CardCart;

/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DEVICE = Dimensions.get('screen');

const CardItem = ({image, productName, quantity, price, handleClick}) => {
  return (
    <View style={cardStyle.cardContainer}>
      <Image style={cardStyle.image} source={image} />
      <Text style={cardStyle.productName}>
        {productName.length > 10
          ? productName.slice(0, 10).concat('...')
          : productName}
      </Text>
      <Text style={cardStyle.quantity}>Stok: {quantity}</Text>
      <Text style={cardStyle.price}>Rp. {price}</Text>
      <TouchableOpacity onPress={handleClick} style={cardStyle.plusContainer}>
        <Icon
          style={cardStyle.plus}
          name="plus-circle"
          size={55}
          color="#eb4034"
        />
      </TouchableOpacity>
    </View>
  );
};

const cardStyle = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#eb4034',
    width: DEVICE.width / 2.4,
    height: DEVICE.height / 2.5,
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: DEVICE.width / 3,
    height: DEVICE.width / 3,
    alignSelf: 'center',
  },
  productName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quantity: {
    color: '#fff',
    fontSize: 14,
    paddingTop: 5,
  },
  price: {
    paddingTop: 10,
    fontSize: 18,
    color: '#fff',
    // alignSelf: 'center',
  },
  cardRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  plusContainer: {
    marginTop: 7.5,
    backgroundColor: '#fff',
    borderRadius: DEVICE.width / 6 / 2,
    width: DEVICE.width / 6,
    height: DEVICE.width / 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  plus: {
    alignSelf: 'center',
  },
});

export default CardItem;

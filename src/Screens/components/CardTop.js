/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {currencyFormat} from '../../helpers';

const DEVICE = Dimensions.get('window');

const CardTop = ({item, handleRemove, handlePlus, handleMinus}) => {
  return (
    <View style={cardStyle.container}>
      <Image style={cardStyle.image} source={{uri: item.image}} />
      <View style={cardStyle.right}>
        <Text style={cardStyle.nama}>
          {item.nama.length > 10
            ? item.nama.slice(0, 13).concat('...')
            : item.nama}
        </Text>
        <View style={cardStyle.quantity}>
          <TouchableWithoutFeedback onPress={handleMinus}>
            <View style={cardStyle.plusMin}>
              <Icon name="minus-circle" size={30} color="#fff" />
            </View>
          </TouchableWithoutFeedback>
          <Text style={cardStyle.quantityText}>{item.jumlah}</Text>
          <TouchableWithoutFeedback onPress={handlePlus}>
            <View style={cardStyle.plusMin}>
              <Icon name="plus-circle" size={30} color="#fff" />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Text style={cardStyle.price}>
          RP. {currencyFormat(item.totalHarga)}
        </Text>
      </View>
      <TouchableWithoutFeedback onPress={handleRemove}>
        <View style={cardStyle.remove}>
          <Icon name="delete" size={28} color={'#eb4034'} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CardTop;

const cardStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#eb4034',
    paddingVertical: 10,
    backgroundColor: '#eb4034',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
    height: DEVICE.height / 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  right: {
    padding: 10,
  },
  quantity: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  plusMin: {
    width: DEVICE.width / 10,
    height: DEVICE.width / 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  nama: {
    fontSize: 14,
    color: '#fff',
  },
  price: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  remove: {
    width: DEVICE.width / 9,
    height: DEVICE.width / 9,
    borderRadius: DEVICE.width / 9 / 2,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
});

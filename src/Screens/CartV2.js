/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useSelector, useDispatch} from 'react-redux';
import {removeItem, plusItem, minusItem} from '../store/action/cart';

import {currencyFormat} from '../helpers';
import CardTop from './components/CardTop';

const DEVICE = Dimensions.get('window');

const Cart = ({navigation}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.cartItem);
  const totalHarga = useSelector((state) => state.cart.totalHarga);
  console.log(cartItem);

  const removeCartItem = (id, data) => dispatch(removeItem(id, data));
  const plusCartItem = (id) => dispatch(plusItem(id));
  const minusCartItem = (id) => dispatch(minusItem(id));

  return (
    <>
      <View style={styles.container}>
        {cartItem.length > 0 ? (
          <FlatList
            style={styles.flatlist}
            data={cartItem}
            renderItem={({item}) => (
              <CardTop
                item={item}
                handleRemove={() => removeCartItem(item.id, item)}
                handleMinus={() => minusCartItem(item.id)}
                handlePlus={() => plusCartItem(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Icon name="emoticon-cry-outline" size={80} color="red" />
            <Text style={styles.emptyText}>Keranjang Kosong</Text>
          </View>
        )}
      </View>
      <View style={styles.totalContainer}>
        <View style={styles.totalCol}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalNum}>Rp. {currencyFormat(totalHarga)}</Text>
        </View>
        <View style={styles.totalCol}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (totalHarga > 0) {
                navigation.navigate('pay');
              } else {
                alert('Masukan barang terlebih dahulu');
              }
            }}>
            <View style={styles.checkoutButton}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 10,
    width: DEVICE.width / 1.1,
  },
  flatlist: {
    width: DEVICE.width / 1.055,
    marginBottom: DEVICE.height / 10,
  },
  totalContainer: {
    width: DEVICE.width,
    height: DEVICE.height / 9,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  totalCol: {
    width: DEVICE.width / 2.2,
    height: DEVICE.height / 10,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  totalText: {
    color: '#636363',
    fontSize: 12,
  },
  totalNum: {
    color: '#f72525',
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#f72525',
    alignSelf: 'center',
    height: DEVICE.height / 12,
    width: DEVICE.width / 2.3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: DEVICE.width / 1.1,
    height: DEVICE.height / 1.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 30,
    color: '#454545',
  },
});

export default Cart;

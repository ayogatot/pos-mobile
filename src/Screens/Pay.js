/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {StackActions} from '@react-navigation/native';

import {useSelector, useDispatch} from 'react-redux';
import {doneTransaction} from '../store/action/cart';
import {currencyFormat, Request, url} from '../helpers/';

const DEVICE = Dimensions.get('window');

const Pay = ({navigation}) => {
  const cartItem = useSelector((state) => state.cart.cartItem);
  const totalHarga = useSelector((state) => state.cart.totalHarga);

  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (item, harga) => {
    setisLoading(true);
    const data = {
      cartItem: item,
      totalHarga: harga,
    };
    Request(url + '/transactions', 'POST', data).then((res) => {
      if (res.error) {
        alert('Error, Coba beberapa saat lagi');
      } else {
        alert('Transaksi berhasil dibuat');
        dispatch(doneTransaction());
        const resetAction = StackActions.pop(2);
        navigation.dispatch(resetAction);
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.card2}>
          <Text style={styles.card1Title}>Keranjang</Text>
          <View style={styles.card2Col}>
            <ScrollView persistentScrollbar={true} style={styles.card2ColTop}>
              {cartItem.length > 0
                ? cartItem.map((i, index) => {
                    return (
                      <View key={index} style={styles.card1row}>
                        <View style={styles.rowLeft}>
                          <Text style={styles.card1Key}>
                            {i.nama} x{i.jumlah}
                          </Text>
                        </View>
                        <View style={styles.rowRight}>
                          <Text style={styles.card1Val}>
                            Rp. {currencyFormat(i.totalHarga)}
                          </Text>
                        </View>
                      </View>
                    );
                  })
                : null}
            </ScrollView>
            <View style={styles.card2ColBot}>
              <View style={styles.card1row}>
                <Text style={styles.card1Key2}>Total</Text>
                <Text style={styles.card1Val2}>
                  Rp. {currencyFormat(totalHarga)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.card1}>
          <Text style={styles.card1Title}>Summary</Text>
          <View style={styles.card1row}>
            <Text style={styles.card1Key}>Nominal</Text>
            <Text style={styles.card1Val}>
              Rp. {currencyFormat(totalHarga)}
            </Text>
          </View>
          <View style={styles.card1row}>
            <Text style={styles.card1Key}>Pajak</Text>
            <Text style={styles.card1Val}>IDR 0</Text>
          </View>
          <View style={styles.card1row}>
            <Text style={styles.card1Key2}>Total</Text>
            <Text style={styles.card1Val2}>
              Rp. {currencyFormat(totalHarga)}
            </Text>
          </View>
        </View>
        <TouchableWithoutFeedback
          onPress={() => handleSubmit(cartItem, totalHarga)}>
          <View style={styles.payButton}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.payText}>Bayar</Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      {/* <View style={styles.overlay}>
        <View style={styles.successContainer}>
          <Text>Transaksi Berhasil</Text>
        </View>
      </View> */}
    </View>
  );
};

export default Pay;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card2: {
    backgroundColor: '#fff',
    width: DEVICE.width / 1.13,
    height: DEVICE.height / 1.9,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card2Col: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: DEVICE.height / 2.25,
  },
  card1: {
    backgroundColor: '#fff',
    width: DEVICE.width / 1.13,
    height: DEVICE.height / 5,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card1Title: {
    width: DEVICE.width / 1.2,
    borderBottomColor: '#BA1414',
    borderBottomWidth: 2,
    paddingBottom: 5,
    marginBottom: 5,
    color: '#BA1414',
    fontWeight: 'bold',
  },
  card1row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: DEVICE.width / 1.2,
    marginVertical: 2.5,
  },
  rowLeft: {
    width: DEVICE.width / 2,
  },
  card1Key: {
    color: '#919191',
    fontWeight: 'bold',
    fontSize: 12,
  },
  card1Val: {
    color: '#303030',
    fontWeight: 'bold',
  },
  card1Key2: {
    color: '#919191',
    fontWeight: 'bold',
    fontSize: 16,
    paddingTop: 5,
  },
  card1Val2: {
    color: '#303030',
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 5,
  },
  payButton: {
    backgroundColor: '#BA1414',
    width: DEVICE.width / 1.13,
    height: DEVICE.height / 11,
    borderRadius: 5,
    marginTop: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: DEVICE.width,
    height: DEVICE.height,
    backgroundColor: 'rgba(173, 173, 173, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successContainer: {
    backgroundColor: '#fff',
    width: DEVICE.width / 1.4,
    height: DEVICE.height / 1.4,
    borderRadius: 10,
    marginBottom: DEVICE.height / 7,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

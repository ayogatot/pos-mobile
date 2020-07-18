/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import CardCart from './components/CardCart';

const DEVICE = Dimensions.get('window');

const Cart = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([1, 2, 3, 4, 5, 6]);
  }, []);
  return (
    <>
      <StatusBar backgroundColor="red" />
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <View style={styles.rowTab}>
            <View style={styles.colTab1}>
              <Text style={styles.tabTitle}>ID</Text>
            </View>
            <View style={styles.colTab2}>
              <Text style={styles.tabTitle}>Nama</Text>
            </View>
            <View style={styles.colTab3}>
              <Text style={styles.tabTitle}>Qty</Text>
            </View>
            <View style={styles.colTab4}>
              <Text style={styles.tabTitle}>Harga</Text>
            </View>
          </View>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <CardCart
                id={item + 1}
                nama="Mie Ayam"
                harga="12000"
                qty="3"
                key={item}
              />
            )}
            keyExtractor={(item) => item}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
          />
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>RP. 60.000</Text>
        </View>
        <TouchableOpacity style={styles.buttonBayar}>
          <Text style={styles.buttonText}>BAYAR</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: DEVICE.width / 1.1,
    alignSelf: 'center',
  },
  listContainer: {
    height: DEVICE.height / 1.8,
  },
  totalContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 3,
    width: DEVICE.width / 1.2,
    borderTopColor: '#eb4034',
    marginTop: 30,
    paddingTop: 10,
  },
  totalText: {
    color: '#eb4034',
    fontSize: 25,
    fontWeight: 'bold',
  },
  rowTab: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
  colTab1: {
    display: 'flex',
    borderWidth: 1,
    borderColor: '#eb4034',
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE.width / 10,
    height: DEVICE.width / 10,
  },
  colTab2: {
    display: 'flex',
    borderWidth: 1,
    borderColor: '#eb4034',
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE.width / 2.55,
    height: DEVICE.width / 10,
  },
  colTab3: {
    display: 'flex',
    borderWidth: 1,
    borderColor: '#eb4034',
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE.width / 8,
    height: DEVICE.width / 10,
  },
  colTab4: {
    display: 'flex',
    borderWidth: 1,
    borderColor: '#eb4034',
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE.width / 4.6,
    height: DEVICE.width / 10,
  },
  tabTitle: {
    color: '#eb4034',
    fontWeight: 'bold',
  },
  buttonBayar: {
    backgroundColor: '#eb4034',
    width: DEVICE.width / 1.1,
    alignSelf: 'center',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 5,
    alignSelf: 'center',
  },
});

export default Cart;

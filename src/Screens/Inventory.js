/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {currencyFormat} from '../helpers';

import {useSelector} from 'react-redux';

const DEVICE = Dimensions.get('window');

const Log = ({navigation}) => {
  const dataItem = useSelector((state) =>
    state.cart.dataItem.sort((a, b) => a.stock - b.stock),
  );
  const [keyword, setKeywoard] = useState('');

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Inventory</Text>
        <View style={styles.searchContainer}>
          <TextInput
            onChangeText={(text) => setKeywoard(text)}
            style={styles.searchInput}
            value={keyword}
            placeholder="Search Item"
            placeholderTextColor="rgba(235, 64, 52, 0.3)"
          />
          <View style={styles.magnify}>
            <Icon name="magnify" size={20} color={'#fff'} />
          </View>
        </View>
        <View style={styles.flatlist}>
          <FlatList
            data={dataItem.filter(
              (i) =>
                i.nama.toLowerCase().search(keyword.toLocaleLowerCase()) !== -1,
            )}
            renderItem={({item}) => LogCard(item)}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Log;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 20,
    alignItems: 'center',
    width: DEVICE.width,
  },
  searchContainer: {
    width: DEVICE.width / 1.1,
    height: DEVICE.height / 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgba(235, 64, 52, 1)',
    borderBottomWidth: 2,
  },
  searchInput: {
    borderRadius: 10,
    paddingLeft: 10,
    color: '#eb4034',
    width: DEVICE.width / 1.3,
    backgroundColor: '#fefefe',
  },
  magnify: {
    backgroundColor: '#eb4034',
    height: DEVICE.height / 14,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  flatlist: {
    width: DEVICE.width / 1,
    marginBottom: DEVICE.height / 2.15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#eb4034',
    alignSelf: 'flex-start',
  },
});

const LogCard = (item) => (
  <View style={log.logCard}>
    <View style={log.logLeft}>
      {/* <Icon name="bike" color={'#eb4034'} size={30} /> */}
      <Image source={{uri: item.image}} style={log.image} />
    </View>
    <View style={log.logRight}>
      <View style={log.category}>
        <Text style={log.categoryText}>{item.category}</Text>
      </View>
      <Text style={log.id}>{item.id}</Text>
      <Text style={log.name}>
        {item.nama.length > 10
          ? item.nama.slice(0, 20).concat('...')
          : item.nama}
      </Text>
      <Text style={log.item}>Stock: {item.stock}</Text>
      <View style={log.logRow}>
        <Text style={log.money}>Rp. {currencyFormat(item.harga)}</Text>
        <Text style={log.date}>29-07-2020</Text>
      </View>
    </View>
  </View>
);

const log = StyleSheet.create({
  logCard: {
    marginTop: 5,
    height: DEVICE.height / 5,
    width: DEVICE.width / 1.1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
  },
  logRight: {
    paddingLeft: 10,
  },
  logRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: DEVICE.width / 2,
    alignItems: 'flex-end',
  },
  image: {
    width: DEVICE.width / 3,
    height: DEVICE.width / 3,
  },
  id: {
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
  },
  category: {
    backgroundColor: '#eb4034',
    padding: 5,
    borderRadius: 5,
  },
  categoryText: {
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  item: {
    color: '#6e6e6e',
  },
  money: {
    color: '#eb4034',
  },
  date: {
    fontSize: 10,
  },
});

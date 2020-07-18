/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useSelector, useDispatch} from 'react-redux';
import {addItem} from '../store/action/cart';
import {currencyFormat} from '../helpers';

import CardItem from './components/CardItem';

const DEVICE = Dimensions.get('window');

const Home = ({navigation}) => {
  const dataItem = useSelector((state) => state.cart.dataItem) || [];
  const [sort, setSort] = useState(true);
  const [select, setSelect] = useState('all');
  const [keyword, setKeywoard] = useState('');
  const dispatch = useDispatch();

  const addToCart = (item) => dispatch(addItem(item));

  return (
    <>
      <StatusBar backgroundColor="red" />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Icon name="magnify" size={20} color={'#fff'} />
          <TextInput
            style={styles.searchInput}
            onChangeText={(text) => setKeywoard(text)}
            placeholder="Search Item"
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
          />
          <TouchableWithoutFeedback onPress={() => navigation.navigate('cart')}>
            <View style={styles.cartButton}>
              <Icon name="cart" size={20} color={'#fff'} />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.badge} />
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.selectContainer}>
            <Picker
              selectedValue={select}
              onValueChange={(i) => setSelect(i)}
              style={styles.select}>
              <Picker.Item label="All" value="all" />
              <Picker.Item label="Home Appliance" value="home_appliance" />
              <Picker.Item label="PC/Smarthphone" value="pc_smartphone" />
              <Picker.Item label="Hobby" value="hobby" />
              <Picker.Item label="Fashion" value="fashion" />
            </Picker>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              dataItem.sort((a, b) => {
                if (!sort) {
                  return a.harga - b.harga;
                } else {
                  return b.harga - a.harga;
                }
              });
              setSort(!sort);
            }}>
            <View style={styles.sort}>
              <Icon
                name={sort ? 'sort-ascending' : 'sort-descending'}
                color={'#eb4034'}
                size={22}
              />
              <Text style={styles.sortItem}>
                {sort ? 'Termurah - Termahal' : 'Termahal - Termurah'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.flatlist}>
          {dataItem.length > 0 ? (
            <FlatList
              data={
                select !== 'all'
                  ? dataItem
                      .filter((i) => i.category === select)
                      .filter(
                        (i) =>
                          i.nama
                            .toLowerCase()
                            .search(keyword.toLocaleLowerCase()) !== -1,
                      )
                  : dataItem.filter(
                      (i) =>
                        i.nama
                          .toLowerCase()
                          .search(keyword.toLocaleLowerCase()) !== -1,
                    )
              }
              horizontal={false}
              numColumns={2}
              renderItem={({item}) => (
                <CardItem
                  key={item.id}
                  image={{uri: item.image}}
                  productName={item.nama}
                  quantity={item.stock}
                  price={currencyFormat(item.harga)}
                  handleClick={() => addToCart(item)}
                />
              )}
              keyExtractor={(item) => item.id}
              onEndReachedThreshold={0.5}
              initialNumToRender={10}
            />
          ) : null}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: DEVICE.height,
    width: DEVICE.width,
    alignItems: 'center',
  },
  profileContainer: {
    width: DEVICE.width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  profileText: {
    paddingRight: 15,
    color: '#BA1414',
    fontWeight: 'bold',
  },
  searchContainer: {
    width: DEVICE.width,
    height: DEVICE.height / 10,
    backgroundColor: '#eb4034',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    borderRadius: 10,
    paddingHorizontal: 20,
    color: '#fff',
    width: DEVICE.width / 1.4,
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: DEVICE.width / 1.1,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#eb4034',
  },
  selectContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(242, 111, 107, 0.6)',
  },
  select: {
    width: DEVICE.width / 2.3,
    height: DEVICE.height / 12,
  },
  sort: {
    width: DEVICE.width / 2.3,
    height: DEVICE.height / 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(242, 111, 107, 0.6)',
  },
  sortItem: {fontSize: 12, color: '#eb4034'},
  flatlist: {
    width: DEVICE.width / 1.05,
    marginBottom: DEVICE.height / 2.7,
  },
  badge: {
    position: 'absolute',
    top: DEVICE.height / 40,
    right: 10,
    height: DEVICE.width / 30,
    width: DEVICE.width / 30,
    borderRadius: 20,
    backgroundColor: '#fa8050',
  },
  cartButton: {
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;

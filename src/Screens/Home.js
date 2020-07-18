/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardItem from './components/CardItem';

const DEVICE = Dimensions.get('window');

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [tab, setTab] = useState('sepeda');

  useEffect(() => {
    setData([1, 2, 3, 4, 5, 6, 7, 8]);
  }, []);

  return (
    <>
      <StatusBar backgroundColor="red" />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Icon name="magnify" size={20} color={'#fff'} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Item"
            placeholderTextColor="rgba(235, 64, 52, 0.3)"
          />
          <TouchableOpacity onPress={() => navigation.navigate('cart')}>
            <Icon name="cart" size={20} color={'#fff'} />
          </TouchableOpacity>
          <View style={styles.badge} />
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            onPress={() => setTab('sepeda')}
            style={tab === 'sepeda' ? styles.menuActive : styles.menu}>
            <Icon
              name="bike"
              size={30}
              color={tab === 'sepeda' ? '#fff' : '#eb4034'}
            />
            <Text
              style={
                tab === 'sepeda' ? styles.textMenuActive : styles.textMenu
              }>
              Sepeda
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTab('perkakas')}
            style={tab === 'perkakas' ? styles.menuActive : styles.menu}>
            <Icon
              name="screwdriver"
              size={30}
              color={tab === 'perkakas' ? '#fff' : '#eb4034'}
            />
            <Text
              style={
                tab === 'perkakas' ? styles.textMenuActive : styles.textMenu
              }>
              Perkakas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTab('fashion')}
            style={tab === 'fashion' ? styles.menuActive : styles.menu}>
            <Icon
              name="hanger"
              size={30}
              color={tab === 'fashion' ? '#fff' : '#eb4034'}
            />
            <Text
              style={
                tab === 'fashion' ? styles.textMenuActive : styles.textMenu
              }>
              Fashion
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTab('game')}
            style={tab === 'game' ? styles.menuActive : styles.menu}>
            <Icon
              name="gamepad"
              size={30}
              color={tab === 'game' ? '#fff' : '#eb4034'}
            />
            <Text
              style={tab === 'game' ? styles.textMenuActive : styles.textMenu}>
              Game
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flatlist}>
          <FlatList
            data={data}
            horizontal={false}
            numColumns={2}
            renderItem={({item}) =>
              CardItem(
                item + 1,
                require('../images/sepatu.jpg'),
                'Sepatu',
                5,
                500000,
              )
            }
            keyExtractor={(item) => item}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
          />
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
    width: DEVICE.width / 1.3,
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
  menu: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE.width / 5.5,
    height: DEVICE.width / 5.5,
  },
  menuActive: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eb4034',
    width: DEVICE.width / 5.5,
    height: DEVICE.width / 5.5,
    borderRadius: DEVICE.width / 5.5 / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textMenu: {
    paddingTop: 5,
    color: '#eb4034',
    fontWeight: '300',
  },
  textMenuActive: {
    color: '#fff',
  },
  flatlist: {
    width: DEVICE.width / 1.1,
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
});

export default Home;

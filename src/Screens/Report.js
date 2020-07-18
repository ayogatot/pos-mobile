/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';
import {Request, url, currencyFormat} from '../helpers/';

const DEVICE = Dimensions.get('window');

const data2 = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
  datasets: [
    {
      data: [20, 10, 30, 80, 40, 46],
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      strokeWidth: 2,
    },
  ],
  legend: ['Total Barang Terjual'],
};
const chartConfig = {
  backgroundGradientFrom: '#f72525',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: '#f72525',
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const Report = () => {
  const [report, setReport] = useState('mingguan');
  const [todayTransaction, setTodayTransaction] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [trxData, setTrxData] = useState({totalHarga: 0, totalTrx: 0});

  const getData = () => {
    setLoading(true);
    Request(url + '/transactions', 'GET')
      .then((res) => {
        if (res.error) {
          alert('Error, Coba beberapa saat lagi');
        } else {
          let total = {totalHarga: 0, totalTrx: 0};
          res.data.forEach((i) => {
            total.totalHarga += i.totalHarga;
            i.totalItem = 0;
            i.cartItem.forEach((e) => (i.totalItem += e.jumlah));
          });
          total.totalTrx = res.data.length;
          setTrxData(total);
          setTodayTransaction(res.data);
          setRefresh(false);
          setLoading(false);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRefresh = () => {
    setRefresh(true);
    getData();
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Barang keluar overview</Text>
        <Text style={styles.diagramText}>Diagram</Text>
        <View style={styles.selectReport}>
          {/* <TouchableOpacity
            onPress={() => setReport('mingguan')}
            style={
              report === 'mingguan'
                ? styles.selectLeftActive
                : styles.selectLeft
            }>
            <Text style={styles.selectText}>Mingguan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setReport('bulanan')}
            style={
              report === 'bulanan' ? styles.selectLeftActive : styles.selectLeft
            }>
            <Text style={styles.selectText}>Bulanan</Text>
          </TouchableOpacity> */}
          <TouchableWithoutFeedback onPress={() => setReport('mingguan')}>
            <View
              style={
                report === 'mingguan'
                  ? styles.selectLeftActive
                  : styles.selectLeft
              }>
              <Text style={styles.selectText}>Mingguan</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setReport('bulanan')}>
            <View
              style={
                report === 'bulanan'
                  ? styles.selectLeftActive
                  : styles.selectLeft
              }>
              <Text style={styles.selectText}>Bulanan</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
          }
          style={styles.scrollContainer}>
          <View style={{height: DEVICE.height / 2.3}}>
            <LineChart
              style={styles.diagramView}
              data={data2}
              width={DEVICE.width / 1.1}
              height={DEVICE.height / 2.8}
              chartConfig={chartConfig}
              verticalLabelRotation={20}
            />
          </View>
          <View style={styles.row1}>
            <View style={styles.cardUang}>
              <Text style={styles.cardTitle}>Uang Masuk</Text>
              <Text style={styles.cardSubTitle}>
                {currencyFormat(trxData.totalHarga)}
              </Text>
            </View>
            <View style={styles.cardUang}>
              <Text style={styles.cardTitle}>Transaksi</Text>
              <Text style={styles.cardSubTitle}>{trxData.totalTrx}</Text>
            </View>
          </View>
          <Text style={styles.top3Text}>Transaction History</Text>
          {!isloading ? (
            todayTransaction.map((i, key) => {
              return <TaskCard key={key} item={i} />;
            })
          ) : (
            <ActivityIndicator size="large" color="#f72525" />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 15,
  },
  scrollContainer: {
    marginBottom: 195,
    width: DEVICE.width / 1.1,
  },
  title: {
    fontSize: 12,
    color: '#636363',
    paddingHorizontal: 5,
  },
  diagramText: {
    color: '#000',
    paddingHorizontal: 5,
    fontSize: 16,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  selectReport: {
    display: 'flex',
    flexDirection: 'row',
    width: DEVICE.width / 1.1,
    justifyContent: 'space-between',
  },
  selectLeft: {
    width: DEVICE.width / 1.16 / 2,
    height: DEVICE.height / 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: DEVICE.width / 70,
  },
  selectLeftActive: {
    width: DEVICE.width / 1.16 / 2,
    height: DEVICE.height / 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginHorizontal: DEVICE.width / 70,
    borderBottomWidth: 3,
    borderBottomColor: '#f72525',
  },
  selectText: {
    color: '#f72525',
    fontSize: 16,
  },
  diagramView: {
    alignSelf: 'center',
    borderRadius: 10,
  },
  row1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardUang: {
    width: DEVICE.width / 2.3,
    height: DEVICE.height / 7,
    backgroundColor: '#f72525',
    borderRadius: 10,
    padding: 10,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 14,
    paddingTop: 10,
  },
  cardSubTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 5,
  },
  top3Text: {
    color: '#292929',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 15,
    paddingBottom: 10,
  },
});

const TaskCard = ({item}) => (
  <View style={taskStyle.container}>
    <View style={taskStyle.row}>
      <Text style={taskStyle.text1}>Transaction ID</Text>
      <Text style={taskStyle.date}>{item.id}</Text>
    </View>
    <View style={taskStyle.row2}>
      <Text style={taskStyle.text1}>{item.totalItem} Item Sold</Text>
      <Text style={taskStyle.date}>
        {moment.unix(item.created_at).format('dddd, MMMM Do YYYY')}
      </Text>
    </View>
    <View style={taskStyle.row}>
      <Text style={taskStyle.text1}>Total</Text>
      <Text style={taskStyle.text2}>Rp. {currencyFormat(item.totalHarga)}</Text>
    </View>
  </View>
);

const taskStyle = StyleSheet.create({
  container: {
    width: DEVICE.width / 1.1,
    height: DEVICE.height / 6,
    backgroundColor: '#f72525',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#f72525',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 8,
  },
  date: {color: '#fff', fontWeight: 'bold'},
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 3,
    alignItems: 'flex-end',
  },
  row2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    alignItems: 'flex-end',
  },
  text1: {color: '#fefefe'},
  text2: {color: '#3bff65', fontSize: 18},
});

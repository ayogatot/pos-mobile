/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './Screens/HomeV2';
import LoginScreen from './Screens/Login';
import CartScreen from './Screens/CartV2';
import InventoryScreen from './Screens/Inventory';
import ReportScreen from './Screens/Report';
import PayScreen from './Screens/Pay';
import SplashScreen from './Screens/Splash';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const ACTIVE_TAB_COLOR = '#BA1414';
const INACTIVE_TAB_COLOR = '#636363';

class Tab extends Component {
  render() {
    return (
      <BottomTab.Navigator
        tabBarOptions={{
          activeTintColor: ACTIVE_TAB_COLOR,
          inactiveTintColor: INACTIVE_TAB_COLOR,
        }}>
        <BottomTab.Screen
          options={{
            title: 'Home',
            tabBarIcon: ({focused, size}) => (
              <Icon
                name="home"
                color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR}
                size={size}
              />
            ),
          }}
          component={HomeScreen}
          name="home"
        />
        <BottomTab.Screen
          options={{
            title: 'Report',
            tabBarIcon: ({focused, size}) => (
              <Icon
                name="book-open-variant"
                color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR}
                size={size}
              />
            ),
          }}
          component={ReportScreen}
          name="report"
        />
        <BottomTab.Screen
          options={{
            title: 'Inventory',
            tabBarIcon: ({focused, size}) => (
              <Icon
                name="playlist-check"
                color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR}
                size={size}
              />
            ),
          }}
          component={InventoryScreen}
          name="inventory"
        />
      </BottomTab.Navigator>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      splash: false,
    };
  }
  login = () => {
    this.setState({isLogin: true});
  };
  logout = () => {
    this.setState({isLogin: false});
  };
  setSplash = () => this.setState({splash: false});
  render() {
    const {isLogin, splash} = this.state;
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {splash ? (
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name={'splash'}>
              {(props) => (
                <SplashScreen
                  {...props}
                  splash={this.setSplash}
                  isSplash={this.state.splash}
                />
              )}
            </Stack.Screen>
          ) : (
            <>
              {!isLogin ? (
                <Stack.Screen
                  options={{
                    headerShown: false,
                  }}
                  name={'login'}>
                  {(props) => <LoginScreen {...props} login={this.login} />}
                </Stack.Screen>
              ) : (
                <>
                  <Stack.Screen
                    options={{headerShown: false}}
                    component={Tab}
                    name={'tab'}
                  />
                  <Stack.Screen
                    options={{
                      headerBackTitleVisible: false,
                      headerTitle: 'Keranjang',
                      headerTintColor: ACTIVE_TAB_COLOR,
                    }}
                    component={CartScreen}
                    name={'cart'}
                  />
                  <Stack.Screen
                    options={{
                      headerBackTitleVisible: false,
                      headerTitle: 'Bayar',
                      headerTintColor: ACTIVE_TAB_COLOR,
                    }}
                    component={PayScreen}
                    name={'pay'}
                  />
                </>
              )}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

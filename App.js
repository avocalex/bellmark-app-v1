import React from 'react';
import { Text, View } from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import SelectScreen from './src/screens/SelectScreen';
import ResultScreen from './src/screens/ResultScreen';

const App = createStackNavigator({
  Select:     { screen: SelectScreen,
                navigationOptions: {
                  header: null,
                },
  },
  Result:     { screen: ResultScreen,
                navigationOptions: {
                  headerTitle: 'スキャン結果',
                  headerTintColor: '#fff',
                  headerBackTitle: null,
                  headerStyle: {
                    backgroundColor: '#265366',
                  },
                  headerTitleStyle: {
                    color: '#fff',
                  },
                }
              },
}, { // デフォルト設定(全てに適用)
  defaultNavigationOptions: {
    // headerTitle: 'Memot',
    // headerTintColor: '#fff',
    // headerBackTitle: null,
    // headerStyle: {
    //   backgroundColor: '#265366',
    // },
    // headerTitleStyle: {
    //   color: '#fff',
    // },
  },
});

export default createAppContainer(App);

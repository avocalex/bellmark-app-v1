import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MyPageTest from '../screens/MyPageScreen';
import ImagePickerSample from '../components/ImagePicker';
import AccountInfoTest from '../screens/AccountInfo.js'

//to install react-nativation-tabs
//$ yarn add react-navigation
//$ expo install react-native-gesture-handler react-native-reanimated

class HomeScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ImagePickerSample navigation={navigation} />
      </View>
    );
  }
}

class MyScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <MyPageTest navigation={navigation} />
      </View>
    );
  }
}

class AccountInfo extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <AccountInfoTest navigation={navigation} />
      </View>
    );
  }
}
export default createBottomTabNavigator(
  {
    ホーム: HomeScreen,
    マイページ: MyScreen,
    アカウント: AccountInfo,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'ホーム') {
          iconName = 'ios-camera';
        }
        if (routeName === 'マイページ') {
          iconName = 'ios-contact';
        }
        if (routeName === 'アカウント') {
          iconName = 'ios-lock';
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
  },
});
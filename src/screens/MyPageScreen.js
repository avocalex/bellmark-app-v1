import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';


// import { ScrollView } from 'react-native-gesture-handler';

class MyPageTest extends React.Component {
  static navigationOptions = {
    title: 'マイページ',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text1}>
          ご利用可能なポイント
        </Text>
        <Text style={styles.text2}>
          200点
        </Text>
        <TouchableOpacity
          style={styles.button}
          underlayColor="#C70F66"
        >
          <Text style={styles.buttonTitle}>商品を購入</Text>
        </TouchableOpacity>
        <Image
          source = {require('../../assets/chara_54.jpg')}
          style={styles.image1}
        />
      </View>
    );
  }
}


const RootStack = createStackNavigator(
  {
    Home: MyPageTest
  }
)

const AppContainer = createAppContainer(RootStack);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#636363',
    marginTop: '8%',
  },
  text2: {
    fontSize: 80,
    color: '#5e87a8',
    marginBottom: '15%',
    },
  buttonTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#424242',
  },
  button: {
    backgroundColor: '#ffcb2e',
    // marginTop: '15%',
    borderRadius: 30,
    height: '10%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row',
  },
  image1: {
    width: '70%',
    height: '70%',
    // margin: 5,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
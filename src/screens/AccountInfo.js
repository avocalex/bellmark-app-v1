import React from 'react';
import { StyleSheet, View, Text, Image, Keyboard, TouchableOpacity, AsyncStorage} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';

class AccountInfo extends React.Component {
  constructor(){
    super();
    samplevar = 'global variable'
  }

  static navigationOptions = ({navigation})=> {
    return {
      title: 'アカウント情報',
      // headerRight: (
      //   <TouchableOpacity onPress={() => navigation.navigate('ResultScreen')}>
      //     <Text>
      //       変更
      //     </Text>
      //   </TouchableOpacity>
      // ),
    }
  };

  render() {
    return (
      <View>
        <Text style={styles.text2}>
          お名前：
        </Text>
        <Text style={styles.text2}>
          PTA・登録番号：
        </Text>
        <Text style={styles.text2}>
          学校・団体：
        </Text>
        <Text style={styles.text2}>
          電話番号：
        </Text>
        <TouchableOpacity
          style={styles.savebutton}
          underlayColor="#C70F66"
          onPress = {() => {this.props.navigation.navigate('内容の変更')}}
        >
          <Text style={styles.buttontext}>
            内容の変更
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class EditInfo extends React.Component {
  static navigationOptions = {
    title: '内容の変更',
  };
  constructor() {
    super();
    this.state = {
      name: '',
      pta: '',
      school: '',
      phone: '',
      name_output: '',
      pta_output: '',
      school_output: '',
      phone_output: '',
    }
  }
  //Asyncstorageに値を保存する
  saveValueFuntion = () => {
    if(this.state.name, this.state.pta, this.state.school, this.state.phone){
      AsyncStorage.setItem('key', this.state.name);
      AsyncStorage.setItem('key2', this.state.pta);
      AsyncStorage.setItem('key3', this.state.school);
      AsyncStorage.setItem('key4', this.state.phone);
      alert('データが保存されました')
      // this.props.navigation.goBack()
    }
    else {
      alert('未完成の項目があります');
    }
  };
  //Asyncstorageから値を取る
  getValueFunction = () => {
    AsyncStorage.getItem('key').then(name_value => this.setState({name_output: name_value}));
    AsyncStorage.getItem('key2').then(pta_value => this.setState({pta_output: pta_value}));
    AsyncStorage.getItem('key3').then(school_value => this.setState({school_output: school_value}));
    AsyncStorage.getItem('key4').then(phone_value => this.setState({phone_output: phone_value}));
    // インプットデータをリセット
    // this.setState({name_output: ''})
    // this.setState({pta_output: ''})
    // this.setState({school_output: ''})
    // this.setState({phone_output: ''})
  };

  render() {
    console.log(this.state.name_output);
    return (
      <ScrollView bounces={true} style={styles.scrollview}>
            <View style={styles.container}>
                <TextInput
                    label='名前'
                    onBlur={Keyboard.dismiss}
                    style={styles.text1}
                    name_value={this.state.name}
                    onChangeText={Names => this.setState({name: Names})}
                    //placeholder={'名前2'}

                />
                <TextInput
                    label='PTA番号・登録番号'
                    onBlur={Keyboard.dismiss}
                    style={styles.text1}
                    pta_value={this.state.pta}
                    onChangeText={PTA => this.setState({pta: PTA})}
                    keyboardType={'number-pad'}
                />
                <TextInput
                    label='学校・団体の名前'
                    school_value={this.state.school}
                    onChangeText={School => this.setState({school: School})}
                    onBlur={Keyboard.dismiss}
                    style={styles.text1}
                />
                <TextInput
                    label='電話番号'
                    phone_value={this.state.phone}
                    onChangeText={Phone => this.setState({phone: Phone})}
                    onBlur={Keyboard.dismiss}
                    style={styles.text1}
                    keyboardType={'phone-pad'}
                    maxLength={11}
                />
                <TouchableOpacity
                  style={styles.savebutton}
                  underlayColor="#C70F66"
                  onPress = {this.saveValueFuntion}
                >
                  <Text style={styles.buttontext}>
                    内容を保存する
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.savebutton}
                  underlayColor="#C70F66"
                  onPress = {this.getValueFunction}
                >
                  <Text style={styles.buttontext}>
                    アウトプットデータ
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.gobackbutton}
                  underlayColor="#C70F66"
                  onPress = {() => this.props.navigation.goBack()}
                >
                  <Text style={styles.buttontext}>
                    戻る
                  </Text>
                </TouchableOpacity>
                <Text>
                  {this.state.name_output}
                  {this.state.pta_output}
                  {this.state.school_output}
                  {this.state.phone_output}
                </Text>
            </View>
        </ScrollView>
    )
  }
}

const RootStack = createStackNavigator(
  {
    Home: AccountInfo,
    内容の変更: EditInfo,
  }
)

const AppContainer = createAppContainer(RootStack);

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  savebutton: {
    backgroundColor: '#007bff',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '90%',
    margin: 10,
    borderRadius: 30,

  },
  text1: {
    margin: 10,
  },
  text2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#636363',
    marginTop: '8%',
    marginLeft: '8%'
  },
  buttontext: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    justifyContent: 'center',

  },
  gobackbutton: {
    backgroundColor: '#f5aa42',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '90%',
    margin: 10,
    borderRadius: 30,

  },
});

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
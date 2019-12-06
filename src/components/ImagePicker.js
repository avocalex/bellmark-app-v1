import {View, Text, Image, TouchableOpacity,} from 'react-native';
// import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React, { Component } from 'react';
import Spinner from 'react-native-loading-spinner-overlay'

//to install spinner-overlay
//$ yarn add react-native-loading-spinner-overlay


class ImagePickerSample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      hasCameraRollPermission: null,
      image: null,
      tableData: [],
      sum: 0,
      spinner: false,
    };
    this.navigation = this.navigation.bind(this);
  }

  async componentWillMount() {
    // カメラ＆カメラロールPermission許可
    const { CamStatus } = await Permissions.askAsync(Permissions.CAMERA);
    const { CamRollStatus } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: CamStatus === 'granted' });
    this.setState({ hasCameraRollPermission: CamRollStatus === 'granted' });
  }

  sendAPI = async (imageuri) => {
    const imageURI = imageuri;
    this.setState({spinner: true})
    this.setState({ image: imageURI });

    // APIにデータを送る部分
    const data = new FormData()
    if (imageURI) {
      data.append('photo', {
        uri: imageURI,
        name: 'image.jpg',
        type: 'image/jpg',
      });
    }
    // API処理用のconfig
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      },
      body: data,
    };
    // 実際にconfigを参照にAPIを送っている部分
    const postResult = await fetch('http://10.100.57.63:3000/bellmark', config);

    // APIのjsonレスポンス
    const json = await postResult.json();
    console.log(json);

    const results = [];
    let totalsum = 0;
    for (let i = 0; i < json.length; i++) {
      let label = json[i].label;
      let points = json[i].points;
      if (!results[label]) {
        results[label] = {};
        results[label].points = 0;
        results[label].count = 0;
      }
      results[label].points += points;
      results[label].count++;
      totalsum += json[i].points
    }
    const tableData = [];
    for (let key in results) {
      const row = [
        key,
        results[key].count+'個',
        results[key].points+'点',
        ]
      tableData.push(row);
    }
    this.setState({
      tableData,
      totalsum,
    });
    this.setState({ spinner: false})
    this.navigation('Result', this.state.tableData, this.state.totalsum);
  }

  // カメラ
  takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
    });
    console.log(result);
    // 写真を取った後の挙動
    if (!result.cancelled) {
      this.sendAPI(result.uri);
    }
  }

  // カメラロール
  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      // aspect: [16, 9],
    });
    // 写真を選んだ後の挙動
    if (!result.cancelled) {
      this.sendAPI(result.uri);
    }
  }

  // 解析結果画面へ
  navigation(screen, param, param2) {
    this.props.navigation.navigate(screen, {
      tableData: param,
      tableData2: param2,
    });
  }

  render() {
    const { navigation } = this.props;
    const { hasCameraPermission, hasCameraRollPermission, image } = this.state;
    console.log(this.state);
    return (
      <View style={styles.containerStyle}>
        <Image
          source={require('../../assets/title.png')}
          style={styles.titleImage}
        />
        <Image
          source={require('../../assets/character.png')}
          style={styles.characterImage}
        />
        <TouchableOpacity
          onPress={this.takePhoto.bind(this)}
          style={styles.button}
          underlayColor="#C70F66"
        >
          <Text style={styles.buttonTitle}>写真をとる</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.pickImage.bind(this)}
          style={styles.button}
          underlayColor="#C70F66"
        >
          <Text style={styles.buttonTitle}>カメラロールから選択</Text>
        </TouchableOpacity>
        <Spinner
        visible={this.state.spinner}
        textContent="スキャン中"
        textStyle={{ fontSize: 24, color: 'white' }}
        size="large"
        overlayColor="rgba(0, 0, 0, 0.8)"
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor:'#fff',
  },
  titleImage: {
    width: '90%',
    height: 100,
    marginTop: '10%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  characterImage: {
    width: '80%',
    margin: 20,
    height: 200,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  button: {
    // backgroundColor: '#E31676',
    backgroundColor: '#546c91',
    marginTop: 48,
    height: 64,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    alignSelf: 'center',
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',

  },
  textStyle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    marginHorizontal: 15,
  },
};

export default ImagePickerSample;

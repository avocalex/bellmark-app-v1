import React from 'react';
import {StyleSheet, Text, View, ScrollView,} from 'react-native';
import {Table, Row, Rows,} from 'react-native-table-component';


class ResultScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const tableHead = ['企業名', '個数', '総点数'];
    // SelectScreenから送られてきた前処理済みAPIレスポンスを代入
    const tableHead2 = ['合計: ', navigation.getParam('tableData2', [['nothing passed']]),'点'];
    const tableData = navigation.getParam('tableData', [['nothing passed']]);

    return (
      <View style={{flex: 1}}>
        <ScrollView bounces={false} style={styles.scrollview}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff',}}>
              <Row
                data={tableHead}
                flexArr={[3,1,1]}
                style={styles.head}
                textStyle={styles.text}
              />
              <Rows
                data={tableData}
                textStyle={styles.text}
                flexArr={[3,1,1]}
              />
            </Table>
          </View>
        </ScrollView>
        <View style={styles.scorebox}>
          <Text style={styles.score}>{tableHead2}</Text>
        </View>
      </View>
    );
  }
}

export default ResultScreen;

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  head2: {
    height: 40,
    backgroundColor: '#fff7f1',
  },
  text: {
    margin: 6,
    fontSize: 18,
  },
  scorebox: {
    zIndex: 1,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    paddingTop: 16,
    paddingBottom: 16,
    width: '100%',
    backgroundColor: '#a19c9d',
    alignItems: 'center',
  },
  score: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white'
  },
});

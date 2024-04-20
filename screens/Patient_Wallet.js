import {Row} from 'native-base';
import React, {Component} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  Pressable,
  Dimensions,
  BackHandler,
  AsyncStorage,
} from 'react-native';
import {
  Content,
  Card,
  CardItem,
  Thumbnail,
  Icon,
  Form,
  Container,
  Header,
  Drawer,
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import Connection from '../connection';
import {connect} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Patient_Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      total_balance: 0,
      data: [],
      skalton: true,
    };
  }

  backAction = () => {
    Actions.pop();
    return true;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  componentDidMount = async () => {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );

    let user = await AsyncStorage.getItem('customer');
    // console.log(user);
    let parsed = JSON.parse(user);
    let id = parsed[0].id;
    let name = parsed[0].name;
    let currency = parsed[0].currency;
    console.log('jjjjjjjjjjjjj', currency);
    if (currency == 'USD') {
      this.setState({
        s_currency: '$',
      });
    } else {
      this.setState({
        s_currency: 'Br',
      });
    }
    console.log('wwwwwwwwwwwwwwwwwwwwwwwwwww', name);
    // console.log('wwwwwwwwwwwwwwwwwwwwwwwwwww',payment_ride_price);

    this.setState({
      name: name,
      id: id,
    });
    // this.Get_Balance()
    this.Display_User_Wallet();
  };

  Display_User_Wallet = () => {
    let uploaddata = new FormData();
    uploaddata.append('id', this.state.id);
    // console.log("ride_id =>",this.state.driver_id)

    let api = Connection + 'rest_apis.php?action=Display_User_Wallet';
    //  console.log('pass => ', api)
    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        otherHeader: 'foo',
      },
      body: uploaddata,
    })
      .then(response => response.json())
      .then(response => {
        console.log('11111111111111111111', response.response);

        let record = response.response;

        if (record !== 'fail') {
          this.setState({
            data: record,
            skalton: false,
          });
          // console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', this.state.data);
        } else {
          this.setState({
            data: [],
            skalton: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  createtable2 = () => {
    let table = [];
    // let len = this.state.campaignlist.length;
    // let hasRecord = this.state.campaignlist;
    let record = this.state.data;
    // console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTt',record)

    let len = record.length;
    //console.log(hasRecord[0])
    if (record != 'fail') {
      for (let i = 0; i < len; i++) {
        let appointment_id = record[i].appointment_id;

        let payment = record[i].payment;
        let payment_method = record[i].payment_method;
        let tax = record[i].profit;
        let date = record[i].date;
        // let ss = date.split(" ");
        // let date_1 = ss[0];
        // let time_1 = ss[1];

        // let xx = date_1;
        // let qq = new Date(xx).toString();
        //  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',qq)
        // let ddd = qq.split(" ");
        // let dd_1 = ddd[1];
        // let dd_2 = ddd[2];
        // let dd_3 = ddd[3];
        // let final_date = dd_1 + " " + dd_2 + " " + dd_3;

        // console.log('vvvvvvvvvvvvvvvvvvvvvvvvvv',ride_id)

        table.push(
          <View>
            {
              <View>
                <View
                  style={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                    paddingVertical: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',

                      marginTop: 10,
                    }}>
                    {payment_method == 'Card' ? (
                      <Image
                        style={{width: 30, height: 30}}
                        resizeMode="contain"
                        source={require('../assets/master.png')}
                      />
                    ) : (
                      <Image
                        style={{width: 30, height: 30}}
                        resizeMode="contain"
                        source={require('../assets/paypal.png')}
                      />
                    )}

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 10,
                        width: '85%',
                        marginLeft: 10,
                      }}>
                      <View>
                        <Text style={{fontSize: 14, color: 'black'}}>
                          Appointment Id: {appointment_id}
                        </Text>
                        <Text style={{fontSize: 14, color: 'gray'}}>
                          Payed by {payment_method}
                        </Text>
                      </View>
                      <Text style={{fontSize: 15, color: 'black'}}>
                        ${payment}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            }
          </View>,
        );
      }
      return table;
    } else {
      let img = [];
      img.push(
        <View style={{flex: 1, justifyContent: 'center'}}>
          {<View></View>}
        </View>,
      );
      return img;
    }
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 15,
            backgroundColor: '#27aae0',
            paddingHorizontal: 15,
          }}>
          <Icon
            onPress={() => Actions.pop()}
            name="arrow-back"
            type="MaterialIcons"
            style={{color: 'white', fontSize: 24}}
          />

          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
            Transaction History
          </Text>
          <Text style={{fontSize: 22, fontWeight: 'bold', color: 'black'}}>
            {' '}
          </Text>
        </View>

        {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, backgroundColor: '#fafafa', paddingVertical: 20 }}>
          <View>
            <Text style={{ color: 'gray', fontSize: 13, fontWeight: '500' }}>Available balance</Text>
            <Text style={{ color: 'black', fontSize: 15, fontWeight: '500' }}>${this.state.total_balance}</Text>
          </View>

          <TouchableOpacity activeOpacity={0.8} onPress={() => Actions.Patient_Add_Money()}
            style={{ width: width / 3, paddingVertical: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2C5BA4' }}>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Add Money</Text>
          </TouchableOpacity>
        </View> */}

        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 12,
            backgroundColor: '#efefef',
          }}>
          <Text style={{color: 'black', fontSize: 11, fontWeight: '600'}}>
            Your appointment's payment history will appear here.
          </Text>
        </View>

        {this.state.skalton == true ? (
          <SkeletonPlaceholder>
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                height: 100,
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginTop: 20,
                backgroundColor: 'white',
              }}></View>

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                height: 100,
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginTop: 15,
                backgroundColor: 'white',
              }}></View>

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                height: 100,
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginTop: 15,
                backgroundColor: 'white',
              }}></View>

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                height: 100,
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginTop: 15,
                backgroundColor: 'white',
              }}></View>

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                height: 100,
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginTop: 15,
                backgroundColor: 'white',
                marginBottom: 15,
              }}></View>

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                height: 100,
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginTop: 15,
                backgroundColor: 'white',
              }}></View>

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                height: 100,
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginTop: 15,
                backgroundColor: 'white',
              }}></View>

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                height: 100,
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginTop: 15,
                backgroundColor: 'white',
                marginBottom: 15,
              }}></View>
          </SkeletonPlaceholder>
        ) : (
          <ScrollView>
            {this.state.data == '' ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: height / 1.5,
                }}>
                <Text style={{color: 'black'}}>
                  You don't have any transaction history.
                </Text>
              </View>
            ) : (
              <View
                style={{
                  paddingBottom: 10,
                  marginTop: 10,
                  width: width / 1.1,
                  alignSelf: 'center',
                }}>
                {this.createtable2()}
              </View>
            )}
          </ScrollView>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    Appointment_Id: state.Appointment_Id,
    Wallet: state.Wallet,
    transcation_history: state.transcation_history,
    Recharge_your_wallet_to_create_booking:
      state.Recharge_your_wallet_to_create_booking,
    Once_you_add_money: state.Once_you_add_money,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    add_Vehicle: vehicle => {
      dispatch({type: 'add_Vehicle', payload: vehicle});
    },
    spanish_lang: (
      Appointment_Id,
      Wallet,
      transcation_history,
      Recharge_your_wallet_to_create_booking,
      Once_you_add_money,
    ) => {
      dispatch({
        type: 'spanish_lang',
        payload: Appointment_Id,
        Wallet,
        transcation_history,
        Recharge_your_wallet_to_create_booking,
        Once_you_add_money,
      });
    },
    english_lang: (
      Appointment_Id,
      Wallet,
      transcation_history,
      Recharge_your_wallet_to_create_booking,
      Once_you_add_money,
    ) => {
      dispatch({
        type: 'english_lang',
        payload: Appointment_Id,
        Wallet,
        transcation_history,
        Recharge_your_wallet_to_create_booking,
        Once_you_add_money,
      });
    },
    add_Social_User: social_user => {
      dispatch({type: 'add_Social_User', payload: social_user});
    },
    // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
    // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
    // addservice:(service)=>{dispatch({type:"addservice",payload:service})},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Patient_Wallet);

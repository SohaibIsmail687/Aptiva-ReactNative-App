import {Row} from 'native-base';
import React, {Component} from 'react';
import ImageLoad from 'react-native-image-placeholder';

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
  Modal,
  AsyncStorage,
  ImageBackground,
  Dimensions,
  Pressable,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
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
import {connect} from 'react-redux';
import Connection from '../connection';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class book_appointment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      date1: new Date(),
      mode1: 'time',
      dateshow1: '',
      timeshow1: '',
      timeshow2: '',
      dateshow2: '',

      date_1: '',
      date_2: '',
      date_3: '',
      date_4: '',
      date_5: '',
      date_6: '',
      date_7: '',
      day_1: 'aa',
      day_2: '',
      day_3: '',
      day_4: '',
      day_5: '',
      day_6: '',
      day_7: '',
      appointment_date: this.props.final_date_1,

      arr: [],
      arr1: [],
      arr2: [],
      arr3: [],
      arr4: [],
      arr5: [],

      record1: [],
      record2: [],
      data4: [],
      monday1: [],
      tuesday1: [],
      wednesday1: [],
      thursday1: [],
      saturday1: [],
      friday1: [],
      sunday1: [],

      main_array: [],

      category: this.props.day_1,
      text1: 2,
      text2: 1,
      text3: 1,
      text4: 1,
      text5: 1,
      text6: 1,
      text7: 1,

      timeSelected: false,
      timeSelected1: false,
      add_new: false,

      show1: false,
      updated_time: '',
      value_for_updating_index: '',
      changes_time_for_specific_day: this.props.day_1,
      appointment_time: '',

      final_date: '',
      spinner: false,
      payment_method: '',
      total_fee: '',
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // then navigate
    navigate('NewScreen');
  };
  handleBackButtonClick() {
    // BackHandler.exitApp();
    Actions.pop();
    return true;
  }

  componentDidMount = async () => {
    let user = await AsyncStorage.getItem('customer');
    console.log('QQQQQQQQQQQQ', this.props.day_1);

    let parsed = JSON.parse(user);
    let aaa = new Date();
    let id = parsed[0].id;
    let insurance_name = parsed[0].insurance_name;
    if (
      insurance_name == 'Anthem' ||
      insurance_name == 'Aetna' ||
      insurance_name == 'Cigna' ||
      insurance_name == 'United Healthcare'
    ) {
      if (this.props.doctor_type == 'Generalist') {
        this.setState({
          total_fee: 20,
        });
      } else {
        this.setState({
          total_fee: 50,
        });
      }
    } else if (insurance_name == 'Self-Pay') {
      if (this.props.doctor_type == 'Generalist') {
        this.setState({
          total_fee: 80,
        });
      } else {
        this.setState({
          total_fee: 120,
        });
      }
    }

    // let total_fee = Number(this.props.fee) + Number(3);

    console.log(
      'fcm_token,fcm_token,fcm_token,fcm_token',
      this.props.fcm_token,
    );

    this.setState({
      id: id,
      // total_fee: total_fee,
    });
  };

  changebtn(value, val) {
    this.setState({
      payment_method: val,
    });

    if (this.state[value] == 2) {
      this.setState({
        text1: 1,
        text2: 1,
        text3: 1,
        text4: 1,
        text5: 1,
        text6: 1,
        text7: 1,
        text8: 1,
        [value]: 2,
      });
    } else {
      this.setState({
        text1: 1,
        text2: 1,
        text3: 1,
        text4: 1,
        text5: 1,
        text6: 1,
        text7: 1,
        text8: 1,
        [value]: 2,
      });
    }
  }

  Payment = () => {
    if (this.state.payment_method == '') {
      alert('Please select your payment method for appointment.');
    } else if (this.state.payment_method == 'Paypal') {
      alert('Paypal is coming soon please select other payment method.');
      // Actions.Paypal({
      //   payment_method: this.state.payment_method,
      //   experience: this.props.experience,
      //   a_r: this.props.a_r,
      //   address: this.props.address,
      //   fcm_token: this.props.fcm_token,
      //   s_key: this.props.s_key,
      //   paypal: this.props.paypal,
      //   access: this.props.access,
      //   category: this.props.category,
      //   doctor_id: this.props.doctor_id,
      //   time: this.props.time,
      //   date: this.props.date,
      //   day: this.props.day,
      //   appointment_price: this.state.total_fee,
      //   fcm_token: this.props.fcm_token,
      //   doctor_name: this.props.doctor_name,
      //   city: this.props.city,
      //   doctor_profile: this.props.doctor_profile,
      //   p_age: this.state.p_age,
      // });
    } else {
      Actions.Payment({
        payment_method: this.state.payment_method,
        experience: this.props.experience,
        a_r: this.props.a_r,
        address: this.props.address,
        s_key: this.props.s_key,
        paypal: this.props.paypal,
        access: this.props.access,
        category: this.props.category,
        doctor_id: this.props.doctor_id,
        time: this.props.time,
        date: this.props.date,
        day: this.props.day,
        fee: this.state.total_fee,
        fcm_token: this.props.fcm_token,
        doctor_name: this.props.doctor_name,
        city: this.props.city,
        doctor_profile: this.props.doctor_profile,
        p_age: this.state.p_age,
      });
    }
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar backgroundColor="#27aae0" barStyle="light-content" />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 15,
            backgroundColor: '#27aae0',
            paddingHorizontal: 15,
            borderBottomColor: '#27aae0',
            borderBottomWidth: 0.5,
          }}>
          <Icon
            onPress={() => Actions.pop()}
            name="arrow-back"
            type="MaterialIcons"
            style={{color: 'white', fontSize: 24}}
          />

          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
            Checkout
          </Text>
          <Text style={{fontSize: 22, fontWeight: 'bold', color: 'black'}}>
            {' '}
          </Text>
        </View>

        <View
          style={{
            width: width / 1.1,
            alignSelf: 'center',
            marginTop: 20,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: 'white',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: '85%'}}>
              <Text
                style={{
                  color: '#27aae0',
                  fontWeight: 'bold',
                  fontSize: 20,
                  // maxWidth: "90%",
                }}
                //   numberOfLines={2}
              >
                {this.props.doctor_name}
              </Text>
              <Text
                numberOfLines={2}
                style={{
                  color: '#92BC2A',
                  fontSize: 12,
                  // maxWidth: "90%",
                  fontWeight: 'bold',
                  marginTop: 5,
                }}>
                {this.props.category}
              </Text>
            </View>

            <ImageLoad
              style={styles.image}
              loadingStyle={{size: 'large', color: 'blue'}}
              source={{uri: this.props.doctor_profile}}
              borderRadius={60}
              placeholderStyle={{width: 60, height: 60, borderRadius: 500}}
            />

            {/* <Image
              style={styles.image}
              source={require('../assets/doctor-11.jpg')}
            /> */}
          </View>

          <View
            style={{
              flexDirection: 'row',

              marginTop: 10,
              alignItems: 'center',
            }}>
            <Icon
              name="clockcircle"
              type="AntDesign"
              style={{color: '#27aae0', fontSize: 16}}
            />

            <Text
              //   numberOfLines={1}
              style={{
                color: 'black',
                fontSize: 12,
                // maxWidth: "90%",
                marginLeft: 10,
                fontWeight: 'bold',
              }}>
              {this.props.time}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',

              //   marginTop:5,
              alignItems: 'center',
            }}>
            <Icon
              name="calendar"
              type="Entypo"
              style={{color: '#27aae0', fontSize: 16}}
            />

            <Text
              //   numberOfLines={1}
              style={{
                color: 'black',
                fontSize: 12,
                // maxWidth: "90%",
                marginLeft: 10,
                fontWeight: 'bold',
              }}>
              {this.props.date}
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              alignItems: 'center',
              flexDirection: 'row',

              alignSelf: 'center',
              justifyContent: 'center',
              borderBottomColor: 'lightgray',
              borderBottomWidth: 1,
              marginVertical: 10,
            }}></View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',

              //   marginTop:5,
              alignItems: 'center',
            }}>
            <Text
              //   numberOfLines={1}
              style={{
                color: '#27aae0',
                fontSize: 14,
                // maxWidth: "90%",
                marginLeft: 10,
                fontWeight: 'bold',
              }}>
              Amount to Pay
            </Text>

            <Text
              //   numberOfLines={1}
              style={{
                color: '#27aae0',
                fontSize: 14,
                // maxWidth: "90%",
                marginLeft: 10,
                fontWeight: 'bold',
              }}>
              ${this.state.total_fee}
            </Text>
          </View>
        </View>

        {/* <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 15,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 3,
            marginLeft: 7,
            marginRight: 7,
            marginBottom: 5,
            width: width / 1.1,
            backgroundColor: 'white',
            borderRadius: 8,
            alignSelf: 'center',
            marginTop: 20,
          }}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
            Payment Info
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Text style={{color: 'gray', fontSize: 12}}>Doctor fee</Text>

            <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
              ${this.props.fee}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Text style={{color: 'gray', fontSize: 12}}>
              Appointment Booking fee
            </Text>

            <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
              $0
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Text style={{color: 'gray', fontSize: 12}}>Total</Text>

            <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
              ${this.props.fee}
            </Text>
          </View>
        </View> */}

        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 14,
            marginTop: 20,
            marginLeft: 20,
          }}>
          Select payment method You want to use
        </Text>

        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: width / 1.1,
            marginTop: 20,
            alignSelf: 'center',
            backgroundColor: 'white',
            borderRadius: 8,
            paddingVertical: 15,
            paddingHorizontal: 20,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{width: 30, height: 30, borderRadius: 12}}
                resizeMode="contain"
                source={require('../assets/paypal.png')}
              />
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 12,
                  marginLeft: 10,
                }}>
                Paypapl
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.changebtn('text2', 'Paypal')}
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 100,
                  borderColor: '#27aae0',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2,
                }}>
                <View
                  style={
                    this.state.text2 == 1 ? styles.uncheked : styles.checked
                  }></View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: width / 1.1,
            marginTop: 20,
            alignSelf: 'center',
            backgroundColor: 'white',
            borderRadius: 8,
            paddingVertical: 15,
            paddingHorizontal: 20,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{width: 30, height: 30, borderRadius: 12}}
                resizeMode="contain"
                source={require('../assets/master.png')}
              />
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 12,
                  marginLeft: 10,
                }}>
                Card
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.changebtn('text3', 'Card')}
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 100,
                  borderColor: '#27aae0',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2,
                }}>
                <View
                  style={
                    this.state.text3 == 1 ? styles.uncheked : styles.checked
                  }></View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.Payment()}
          style={{
            width: width / 1.1,
            backgroundColor: '#27aae0',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            paddingVertical: 10,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            marginVertical: 15,
            position: 'absolute',
            bottom: 0,
          }}>
          <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text1: {
    color: 'gray',
  },
  text: {
    color: 'white',
  },
  view1: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
  },
  view: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: '#27aae0',
  },
  unselect: {
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#27aae0',
    borderWidth: 1,
    marginLeft: 10,
    paddingVertical: 10,
  },
  select: {
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#27aae0',
    backgroundColor: '#27aae0',
    marginLeft: 10,
    paddingVertical: 10,
  },
  unselect_text: {
    color: '#27aae0',
    fontWeight: 'bold',
  },
  select_text: {
    color: 'white',
    fontWeight: 'bold',
  },
  select_text_red: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  unselect_text_red: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  select_red: {
    width: 130,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFD242',
    marginLeft: 10,
    paddingVertical: 10,
  },
  unselect_red: {
    width: 130,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFD242',
    marginLeft: 10,
    paddingVertical: 10,
  },
  checked: {
    width: 17,
    height: 17,
    backgroundColor: '#27aae0',
    borderRadius: 30,
  },

  uncheked: {
    width: 17,
    height: 17,
    borderRadius: 100,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 500,
  },
});

const mapStateToProps = state => {
  return {
    Select_Time: state.Select_Time,
    Check_up_Time: state.Check_up_Time,
    Next: state.Next,
    Progressing_your_request: state.Progressing_your_request,
    Please_select_appointment_time_for_moving_next:
      state.Please_select_appointment_time_for_moving_next,
    Slot_already_booked: state.Slot_already_booked,
    List_of_Schedule: state.List_of_Schedule,
    No_Slots_available: state.No_Slots_available,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    add_Vehicle: vehicle => {
      dispatch({type: 'add_Vehicle', payload: vehicle});
    },
    spanish_lang: (
      Select_Time,
      Check_up_Time,
      Next,
      Progressing_your_request,
      Please_select_appointment_time_for_moving_next,
      Slot_already_booked,
      List_of_Schedule,
      No_Slots_available,
    ) => {
      dispatch({
        type: 'spanish_lang',
        payload: Select_Time,
        Check_up_Time,
        Next,
        Progressing_your_request,
        Please_select_appointment_time_for_moving_next,
        Slot_already_booked,
        List_of_Schedule,
        No_Slots_available,
      });
    },
    english_lang: (
      Select_Time,
      Check_up_Time,
      Next,
      Progressing_your_request,
      Please_select_appointment_time_for_moving_next,
      Slot_already_booked,
      List_of_Schedule,
      No_Slots_available,
    ) => {
      dispatch({
        type: 'english_lang',
        payload: Select_Time,
        Check_up_Time,
        Next,
        Progressing_your_request,
        Please_select_appointment_time_for_moving_next,
        Slot_already_booked,
        List_of_Schedule,
        No_Slots_available,
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

export default connect(mapStateToProps, mapDispatchToProps)(book_appointment);

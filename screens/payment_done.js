import React, {Component} from 'react';
import {
  StatusBar,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Icon,
  Footer,
  FooterTab,
  Badge,
  Right,
  Picker,
  Left,
  Button,
} from 'native-base';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import {Actions} from 'react-native-router-flux';
import Connection from '../connection';
import {connect} from 'react-redux';
import moment from 'moment';

class payment_done extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payment_ride_price: '',
      heh: false,
      payment_ride_id: '',
      name: 'Book_An_Ev',
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
    Actions.pop();
    // this.open_dialogue();
    return true;
  }

  componentDidMount = async () => {
    let aa = moment(new Date()).format('YYYY-MM-DD hh:mm a');
    console.log('QQQQQQQQQQQQ,AA', this.props.fcm_token);
    let split = aa.split(' ');
    let date = split[0];
    let time = split[1];
    let am_pm = split[2];
    let final_time = time + '' + am_pm;

    console.log('finaltimefinaltimefinaltime', final_time);
    console.log(
      'fcm_token,fcm_token,fcm_token,fcm_token',
      this.props.fcm_token,
    );

    let user = await AsyncStorage.getItem('customer');
    // console.log(user);
    let parsed = JSON.parse(user);
    let id = parsed[0].id;
    let name = parsed[0].name;
    console.log('wwwwwwwwwwwwwwwwwwwwwwwwwww', this.props.category);

    console.log('wwwwwwwwwwwwwwwwwwwwwwwwwww', name);
    // console.log('wwwwwwwwwwwwwwwwwwwwwwwwwww',payment_ride_price);

    this.setState({
      name: name,
      id: id,
      date: date,
      time: final_time,
    });
    this.get_percentage();
    this.Add_appointment();

    // setTimeout(() => {
    //   this.Add_Membership();
    // }, 500);
  };

  Add_appointment = () => {
    let uploaddata = new FormData();

    console.log('arrrrrrrrrrrrrrrr', this.props.doctor_id);
    console.log('arrrrrrrrrrrrr111111111111rrr', this.props.time);
    console.log('arrrrrrrrr2222222222rrrrrrr', this.props.day);

    this.setState({spinner: true});
    uploaddata.append('user_id', this.state.id);
    uploaddata.append('time', this.props.time);
    uploaddata.append('category', this.props.category);
    uploaddata.append('doctor_id', this.props.doctor_id);
    uploaddata.append('date', this.props.date);
    uploaddata.append('day', this.props.day);
    uploaddata.append('fee', this.props.fee);
    uploaddata.append('payment_method', this.props.payment_method);

    let api = Connection + 'rest_apis.php?action=Add_Appointment';
    console.log('pass => ', api);
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
        console.log(
          'KKKKKKKKKKKKKKKKKKKresponseeeeKKKKKKKKKKKKKK',
          response.response,
        );
        let record = response.response;
        if (record == 'fail') {
          this.setState({
            spinner: false,
          });
        } else {
          let app_id = record[0];
          console.log('OOOOOOOOOOOOOOO', app_id);
          // this.setState({
          //   spinner: false,
          // });
          // ToastAndroid.show(this.props.Your_appointment_successfully_booked, ToastAndroid.SHORT);
          this.Add_App_Wallet(app_id);
          this.add_notification(app_id);
          // this.update_first_appointment();
          this.notification();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  notification = async () => {
    let to = this.props.fcm_token;

    console.log('totototototototototototototototo', to);

    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'key= AAAA2XtYsuc:APA91bELnEWCV3Z12HxIOdU56f767wfoJaKR1tlqfOTzvWSqhSwWvkrkOgLOw9TPgaoKP8PhvGKgr7D1i6qfPUV8dbf64EkoqlPfeXYRgCWlT91eXFEwikCFngSYoZIT_Xzd3MooB5Vn', //cloud server key
      },
      body: JSON.stringify({
        to: to,
        priority: 'high',
        notification: {
          title: 'AptivaNow',
          body: this.state.name + ' has booked an appointment with you.',
          sound: 'default',
          icon: 'myicon',
        },
      }),
    })
      .then(res => res.json())
      .then(resjson => console.log('test', resjson))
      .catch(err => console.log('error =>', err));
  };

  add_notification = val => {
    let uploaddata = new FormData();
    uploaddata.append('user_id', this.state.id);
    uploaddata.append('time', this.state.time);
    uploaddata.append('type', 'success');
    uploaddata.append('doctor_id', this.props.doctor_id);
    uploaddata.append('date', this.state.date);
    uploaddata.append('appointment_id', val);

    let api = Connection + 'rest_apis.php?action=add_notification';
    console.log('pass => ', api);
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
        let record = response.response;

        console.log('adnotification/adnotification/adnotification', record);
        if (record == 'fail') {
          this.setState({
            spinner: false,
          });
        } else {
          this.setState({
            spinner: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  Add_App_Wallet = val => {
    let uploaddata = new FormData();

    this.setState({spinner: true});
    uploaddata.append('user_id', this.state.id);
    uploaddata.append('doctor_id', this.props.doctor_id);
    uploaddata.append('appointment_id', val);
    uploaddata.append('d_earning', this.state.d_earning);
    uploaddata.append('price', this.props.fee);
    uploaddata.append('tax', this.state.tax);
    uploaddata.append('method', 'Card');

    let api = Connection + 'rest_apis.php?action=Add_App_Wallet';
    console.log('pass => ', api);
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
        console.log(
          'KKKKKKKKKKKKKKKKKKKresponseeeeKKKKKKKKKKKKKK',
          response.response,
        );
        let record = response.response;
        if (record == 'fail') {
          this.setState({
            spinner: false,
          });
          // alert(this.props.Something_went_wrong_try_agin_later);
        } else {
          this.setState({
            spinner: false,
          });
          // ToastAndroid.show(`Your appointment successfully booked!`, ToastAndroid.SHORT);
          // this.notification()
          // Actions.Patient_Tab_Screen({ app_id: app_id });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  get_percentage = () => {
    // console.log('((((((((((((((((((((((((((((((((',this.state.tax_percentage)

    let tax = Number((10 / 100) * this.props.fee).toFixed(2);
    // console.log('((((((((((((((((((((((((((((((((',tax)

    let d_earning = Number(this.props.fee - tax).toFixed(2);
    // console.log('((((((((((((((((((((((((((((((((',d_earning)

    this.setState({
      tax: tax,
      d_earning: d_earning,
    });
  };

  // add_balance = () => {

  //   this.setState({ spinner: true, visible: false })

  //   let uploaddata = new FormData();

  //   uploaddata.append("id", this.state.id);
  //   uploaddata.append("amount", this.props.amount);

  //   let api = Connection + "rest_apis.php?action=add_balance";
  //   console.log("pass => ", api);
  //   fetch(api, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       otherHeader: "foo",
  //     },
  //     body: uploaddata,
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       let record = response.response

  //       console.log('mondddddddddddayyyyyyyyyy', record)
  //       if (response.response == "fail") {
  //         this.setState({
  //           spinner: false,
  //         });
  //         alert('');
  //       } else {

  //         this.setState({
  //           spinner: false,
  //         });
  //         ToastAndroid.show("You have successfully credited this amount.", ToastAndroid.SHORT);

  //         // Actions.Doctor_Tab_Screen();

  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  // };

  render() {
    return (
      <>
        <StatusBar backgroundColor="white" barStyle="light-content" />

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}>
          <View
            style={{
              backgroundColor: '#27aae0',
              width: 120,
              height: 120,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 120,
              alignSelf: 'center',
            }}>
            <Icon
              style={{color: 'white', fontSize: 70}}
              name="done"
              type="MaterialIcons"
            />
          </View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#27aae0',
              textAlign: 'center',
              marginTop: 20,
            }}>
            Payment Successfull
          </Text>

          <Text
            style={{
              fontSize: 15,
              color: 'gray',
              textAlign: 'center',
              marginTop: 30,
            }}>
            You have succesfully paid{' '}
            <Text style={{fontWeight: 'bold', color: 'black'}}> $ 33 </Text>{' '}
            from your card{' '}
            <Text style={{fontWeight: 'bold', color: 'black'}}>
              9102********0987
            </Text>{' '}
            to{' '}
            <Text style={{fontWeight: 'bold', color: 'black'}}>
              {this.props.doctor_name}
            </Text>{' '}
          </Text>

          <TouchableOpacity
            onPress={() => Actions.Patient_Tab_Screen()}
            style={{
              position: 'absolute',
              bottom: 30,
              width: 300,
              height: 40,
              alignSelf: 'center',
              borderRadius: 38,
              backgroundColor: '#27aae0',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 20,
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <Text style={{color: 'white', fontSize: 16}}>Go Home</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    Category: state.Category,
    Time: state.Time,
    Something_went_wrong_try_agin_later:
      state.Something_went_wrong_try_agin_later,
    Your_appointment_successfully_booked:
      state.Your_appointment_successfully_booked,
    Payment_processed_successfully: state.Payment_processed_successfully,
    You_have_succesfully_paid: state.You_have_succesfully_paid,
    Appointment_Details: state.Appointment_Details,
    Doctor_Name: state.Doctor_Name,
    Date: state.Date,
    Go_to_Home: state.Go_to_Home,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    add_Vehicle: vehicle => {
      dispatch({type: 'add_Vehicle', payload: vehicle});
    },
    spanish_lang: (
      Category,
      Time,
      Something_went_wrong_try_agin_later,
      Your_appointment_successfully_booked,
      Payment_processed_successfully,
      You_have_succesfully_paid,
      Appointment_Details,
      Doctor_Name,
      Date,
      Go_to_Home,
    ) => {
      dispatch({
        type: 'spanish_lang',
        payload: Category,
        Time,
        Something_went_wrong_try_agin_later,
        Your_appointment_successfully_booked,
        Payment_processed_successfully,
        You_have_succesfully_paid,
        Appointment_Details,
        Doctor_Name,
        Date,
        Go_to_Home,
      });
    },
    english_lang: (
      Category,
      Time,
      Something_went_wrong_try_agin_later,
      Your_appointment_successfully_booked,
      Payment_processed_successfully,
      You_have_succesfully_paid,
      Appointment_Details,
      Doctor_Name,
      Date,
      Go_to_Home,
    ) => {
      dispatch({
        type: 'english_lang',
        payload: Category,
        Time,
        Something_went_wrong_try_agin_later,
        Your_appointment_successfully_booked,
        Payment_processed_successfully,
        You_have_succesfully_paid,
        Appointment_Details,
        Doctor_Name,
        Date,
        Go_to_Home,
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

export default connect(mapStateToProps, mapDispatchToProps)(payment_done);

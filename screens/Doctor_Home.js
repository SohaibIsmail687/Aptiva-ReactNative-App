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
  Dimensions,
  BackHandler,
  Pressable,
  AsyncStorage,
  AppState,
  Platform,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
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
import messaging from '@react-native-firebase/messaging';
import Connection from '../connection';
import ImageLoad from 'react-native-image-placeholder';
import {connect} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {NavigationEvents} from 'react-navigation';
import {Rating, AirbnbRating} from 'react-native-ratings';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Patient_Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data1: [],
      data5: [],
      skalton: false,
      active_appointments: '',
      complete_appointments: '',
      total_balance: '',
      appState: AppState.currentState,
    };
  }

  dd = () => {
    this.componentDidMount();
  };

  online = () => {
    let uploaddata = new FormData();
    uploaddata.append('id', this.state.id);
    let api = Connection + 'rest_apis.php?action=update_online';
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
      .then(response => {})
      .catch(error => {
        console.error(error);
      });
  };

  offline = () => {
    let uploaddata = new FormData();

    uploaddata.append('id', this.state.id);

    let api = Connection + 'rest_apis.php?action=update_offline';
    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        otherHeader: 'foo',
      },
      body: uploaddata,
    })
      .then(response => response.json())
      .then(response => {})
      .catch(error => {
        console.error(error);
      });
  };

  check_call = async () => {
    let user = await AsyncStorage.getItem('customer');

    if (user != null) {
      let parsed = JSON.parse(user);
      let id = parsed[0].id;
      let role = parsed[0].role;
      let uploaddata = new FormData();
      uploaddata.append('receiver_id', id);
      let api = Connection + 'rest_apis.php?action=check_call';
      console.log(api);
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
          // console.log(response.response);
          let hasRecord = response.response;
          if (hasRecord == 'fail') {
          } else {
            let api = Connection + 'rest_apis.php?action=call_status_change';
            console.log(api);
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
                // console.log('Calling status  ', response.response);
              });
            // console.log("calllllllll22222222222222")
            let receiver = hasRecord[0].sender_name;
            let receiver_image = hasRecord[0].sender_image;
            let receiver_id = hasRecord[0].sender_id;
            let sender_id = hasRecord[0].receiver;
            let type = hasRecord[0].type;
            if (receiver_image != null) {
              receiver_image = Connection + 'images/' + receiver_image;
            }
            let room = hasRecord[0].room;
            // console.log("calllllllll", room)
            if (type == 'audio') {
              Actions.pick_audio_call({
                receiver: receiver,
                receiver_image: receiver_image,
                room: room,
                sender_id: sender_id,
                receiver_id: receiver_id,
                role: role,
              });
            } else {
              Actions.pick_video_call({
                receiver: receiver,
                receiver_image: receiver_image,
                room: room,
                sender_id: sender_id,
                receiver_id: receiver_id,
                role: role,
              });
            }
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // console.log('App has come to the foreground!', nextAppState);
      // this.check_call()
    }
    this.setState({appState: nextAppState});

    if (nextAppState === 'active') {
      // console.log('ggg', nextAppState);
      this.check_call();
      this.online();
    } else {
      // console.log('hhh', nextAppState);
      this.offline();
    }

    // console.log('22', nextAppState);
  };

  componentDidMount = async () => {
    // console.log("redux", this.props.Status2)
    // let aa = "aas"
    // this.props.Status1(aa)

    let user = await AsyncStorage.getItem('customer');

    let parsed = JSON.parse(user);
    let name = parsed[0].name;
    let id = parsed[0].id;
    let latitude = parsed[0].lat;
    let longitude = parsed[0].lng;
    let lat = parseFloat(latitude);
    let lng = parseFloat(longitude);
    let profile1 = parsed[0].profile;
    let role = parsed[0].role;
    // console.log('profile1', profile1);

    let profile = Connection + 'images/' + profile1;
    // console.log('hdbbh =>', profile);

    this.setState({
      name: name,
      id: id,
      image1: profile,
      lat: lat,
      lng: lng,
      role: role,
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const settings = await messaging().requestPermission();

    if (settings) {
      await messaging().registerDeviceForRemoteMessages();

      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        console.log('Tapped');
      });
      messaging().onMessage(payload => {
        console.log('payload', JSON.stringify(payload));
        // alert(JSON.stringify(payload))
        this.setState({noti: JSON.stringify(payload)});
      });
      //  console.log(this.state.noti)

      messaging()
        .getToken()
        .then(currentToken => {
          if (currentToken) {
            this.setState({token: currentToken});
            this.update_fcm_token(id, currentToken);
            console.log('current tokens', currentToken);
            //   console.log('notificaiton data:',this.state.noti)
          } else {
            // alert(this.props.No_Instance_ID_token);
          }
        })
        .catch(err => {
          // alert(this.props.An_error_occurred_while_retrieving_token + err);
          console.log(err);
        });
      console.log('Permission settings:', settings);
    } else {
      console.log('Permission settings:', settings);
    }

    this.doctors_all_fav();
    this.get_appointments_user();
    this.get_total_appointments_doctor();
    this.check_doctor_sheduling();
    this.get_total_balance();
  };

  update_fcm_token = (val1, val2) => {
    let uploaddata = new FormData();

    // console.log("nameeeeeeee =>", val1);
    // console.log("nameeeeeeee =>", val2);

    uploaddata.append('id', val1);
    uploaddata.append('fcm_token', val2);

    let api = Connection + 'rest_apis.php?action=update_fcm_token';
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
        console.log('response', response.response);

        if (response.response == 'fail') {
          this.setState({
            spinner: false,
          });
          alert(this.props.Please_try_agin_later);
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

  check_doctor_sheduling = val => {
    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.state.id);
    uploaddata.append('role', this.state.role);

    let api = Connection + 'rest_apis.php?action=check_doctor_sheduling';
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
        console.log('scheduleeeeeeeeeeeee', record);
        if (record == 'fail') {
          Actions.add_schedulling();
        } else {
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  get_total_appointments_doctor = () => {
    let uploaddata = new FormData();

    // console.log('user_iduser_iduser_id', this.state.id);
    uploaddata.append('user_id', this.state.id);

    let api = Connection + 'rest_apis.php?action=get_total_appointments_doctor';

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

        console.log('apointtotalapointtotalapointtotal', record);

        if (record != 'fail') {
          let a_a = record[0].active_appointments;
          let c_a = record[0].complete_appointments;
          let t_b = record[0].balance;

          this.setState({
            active_appointments: a_a,
            complete_appointments: c_a,
            total_balance: t_b,
            skalton: false,
          });
        } else {
          this.setState({
            active_appointments: 0,
            complete_appointments: 0,
            total_balance: 0,
            skalton: true,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  complete_appointment_doctor = val => {
    let uploaddata = new FormData();

    uploaddata.append('user_id', this.state.id);
    uploaddata.append('appointment_id', val);

    let api = Connection + 'rest_apis.php?action=complete_appointment_doctor';
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
        if (response.response == 'fail') {
          this.setState({
            spinner: false,
          });
          alert(this.props.Something_went_wrong);
        } else {
          this.setState({
            spinner: false,
          });

          // this.notification();
          // this.add_notification();
          // this.opendialogue();
          // Actions.Patient_All_Appointment();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  get_appointments_user = () => {
    let uploaddata = new FormData();

    this.setState({
      skalton: true,
    });

    uploaddata.append('user_id', this.state.id);
    uploaddata.append('status', 'pending');

    let api =
      Connection + 'rest_apis.php?action=display_appointments_doctor_home';
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
        let record4 = response.response;
        console.log('reeeeeeeeesponseeeresponseresponseresponse', record4);
        if (record4 != 'fail') {
          this.setState({
            data1: record4,
            skalton: false,
          });
        } else {
          this.setState({
            data1: '',
            skalton: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  get_total_balance = () => {
    let uploaddata = new FormData();
    uploaddata.append('id', this.state.id);
    let api = Connection + 'rest_apis.php?action=get_balance';

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
        console.log('recccccccccco', record);

        if (record != 'fail') {
          let balance_1 = record[0];
          console.log('recccccccccco', balance_1);
          let balance_2 = balance_1['balance'];
          console.log('recccccccccco', balance_2);
          if (balance_2 == null) {
            this.setState({
              balance: 0,
            });
          } else {
            this.setState({
              balance: balance_2,
            });
          }
        } else {
          this.setState({
            balance: 0,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  doctors_all_fav = () => {
    let api = Connection + 'rest_apis.php?action=all_doctors';
    console.log('pass => ', api);
    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        otherHeader: 'foo',
      },
      // body: uploaddata,
    })
      .then(response => response.json())
      .then(response => {
        let table = [];
        let record = response.response;
        let len = record.length;

        if (record != 'fail') {
          this.setState({
            data5: record,
            skalton: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  update_fcm_token = (val1, val2) => {
    let uploaddata = new FormData();
    uploaddata.append('id', val1);
    uploaddata.append('fcm_token', val2);

    let api = Connection + 'rest_apis.php?action=update_fcm_token';

    console.log('fcmtokenAPfcmtokenAPfcmtokenAPfcmtokenAP', api);
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
        console.log('response', response.response);

        if (response.response == 'fail') {
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

  createtable1 = () => {
    let table = [];
    let record1 = this.state.data1;
    let len = record1.length;
    if (record1 != 'fail') {
      for (let i = 0; i < len; i++) {
        let date = record1[i].date;
        let doctor_name = record1[i].doctor_name;
        let user_id = record1[i].user_id;
        let user_name = record1[i].user_name;
        let user_email = record1[i].user_email;
        let user_mobile = record1[i].user_mobile;
        let user_address = record1[i].user_address;
        let user_gender = record1[i].gender;
        let doc_mobile = record1[i].doc_mobile;
        let category = record1[i].category;
        let appointment_id = record1[i].id;
        let doctor_id = record1[i].doctor_id;
        let day = record1[i].day;
        let user_fcm_token = record1[i].user_fcm_token;
        let fee = record1[i].fee;
        let type = record1[i].type;
        let time = record1[i].time;
        let status = record1[i].status;
        let age = record1[i].age;
        let perscription = record1[i].perscription;
        let review = record1[i].review;
        let perscription1 = Connection + 'perscription/' + perscription;
        let profile1 = record1[i].user_profile;
        let profile = Connection + 'images/' + profile1;

        console.log('user_fcm_token,user_fcm_token', user_fcm_token);

        table.push(
          <View>
            {
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  backgroundColor: 'white',
                  width: width / 1.1,
                  alignSelf: 'center',
                  borderRadius: 8,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  marginTop: 15,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <ImageLoad
                    style={{width: 50, height: 50, borderRadius: 8}}
                    loadingStyle={{size: 'large', color: 'blue'}}
                    source={{uri: profile}}
                    borderRadius={8}
                    placeholderStyle={{
                      width: 50,
                      height: 50,
                      borderRadius: 8,
                    }}
                  />

                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        color: '#27aae0',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      {user_name}
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon
                        name="location-pin"
                        type="Entypo"
                        style={{color: 'gray', fontSize: 16}}
                      />

                      <View style={{marginLeft: 5}}>
                        <Text
                          numberOfLines={1}
                          style={{
                            width: '100%',
                            color: 'gray',
                            fontSize: 12,
                            fontWeight: 'bold',
                          }}>
                          {user_address}
                        </Text>
                      </View>
                    </View>
                    {/* <Text style={{color:'#bebebe',fontSize:14}}>$25</Text> */}
                  </View>
                  {/* <ImageLoad
                                                  style={{ width:60, height:60, borderRadius: 12}}
                                                    loadingStyle={{ size: 'large', color: 'blue' }}
                                                    source={{ uri: profile }}
                                                    borderRadius={12}
                                                    placeholderStyle={{
                                                        width: 60,
                                                        height: 60,
                                                        borderRadius: 100,
                                                    }}


                                                /> */}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignSelf: 'center',
                    marginVertical: 15,
                    backgroundColor: 'lightgray',
                    paddingVertical: 13,
                    borderRadius: 8,
                    paddingHorizontal: 20,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="calendar"
                      type="Entypo"
                      style={{color: 'black', fontSize: 16}}
                    />

                    <View style={{marginLeft: 8}}>
                      <Text style={{color: 'black', fontSize: 12}}>
                        {day}, {date}
                      </Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="clockcircle"
                      type="AntDesign"
                      style={{color: 'black', fontSize: 16}}
                    />

                    <View style={{marginLeft: 8}}>
                      <Text style={{color: 'black', fontSize: 12}}>{time}</Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    paddingHorizontal: 15,
                  }}>
                  {/* <TouchableOpacity
                    onPress={() =>
                      this.complete_appointment_doctor(appointment_id)
                    }
                    activeOpacity={0.8}
                    style={{
                      width: '47%',
                      marginBottom: 10,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 10,
                      borderRadius: 100,
                      backgroundColor: '#27aae0',
                      borderWidth: 1,
                      borderColor: '#27aae0',
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 3,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 15,
                      }}>
                      Complete
                    </Text>
                  </TouchableOpacity> */}

                  <TouchableOpacity
                    onPress={() =>
                      Actions.doctor_site_appointment_detail({
                        user_gender: user_gender,
                        user_age: age,
                        user_name: user_name,
                        date: date,
                        day: day,
                        time: time,
                        // registration_number: registration_number,
                        profile: profile,
                        // subject: subject,
                        // symptoms: symptoms,
                        // symtoms_images: symtoms_images,
                        user_address: user_address,
                        user_email: user_email,
                        user_mobile: user_mobile,
                        user_id: user_id,
                        appointment_id: appointment_id,
                        fee: fee,
                        perscription1: perscription1,
                        perscription: perscription,
                        doc_mobile: doc_mobile,
                        user_fcm_token: user_fcm_token,
                        status: status,
                      })
                    }
                    activeOpacity={0.8}
                    style={{
                      // width: '47%',
                      width: '100%',
                      marginBottom: 10,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 10,
                      borderRadius: 100,
                      borderWidth: 2,
                      borderColor: '#27aae0',
                    }}>
                    <Text
                      style={{
                        color: '#27aae0',
                        fontWeight: 'bold',
                        fontSize: 15,
                      }}>
                      View Details
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* <View style={{marginBottom: 30}}></View> */}
              </TouchableOpacity>
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

  CheckConnectivity = () => {
    // For Android devices
    if (Platform.OS === 'android') {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          alert('You are online!');
        } else {
          alert('You are offline!');
        }
      });
    } else {
      // For iOS devices
      NetInfo.isConnected.addEventListener(
        'connectionChange',
        this.handleFirstConnectivityChange,
      );
    }
  };

  handleFirstConnectivityChange = isConnected => {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange,
    );

    if (isConnected === false) {
      alert('You are offline!');
    } else {
      alert('You are online!');
    }
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <NavigationEvents onDidFocus={payload => this.dd()} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingVertical: 7,
          }}>
          <Image
            style={{width: 45, height: 45}}
            resizeMode="contain"
            source={require('../assets/Vertical.png')}
          />

          <Text style={{color: '#27aae0', fontSize: 20, fontWeight: 'bold'}}>
            Home
          </Text>

          <Text style={{color: '#27aae0', fontSize: 20, fontWeight: 'bold'}}>
            {' '}
          </Text>

          {/* <Icon    name="search" type="FontAwesome" style={{ color: '#27aae0', fontSize: 25, borderRadius: 10 }} /> */}
        </View>

        <Text
          style={{
            color: '#27aae0',
            fontWeight: 'bold',
            fontSize: 18,
            paddingHorizontal: 15,
          }}>
          Hello, {this.state.name}
        </Text>

        <View
          style={{
            width: width / 1.1,
            alignSelf: 'center',
            borderRadius: 10,
            flexDirection: 'row',
            paddingVertical: 20,
            marginTop: 20,
          }}>
          <View
            style={{
              width: '33%',
              paddingHorizontal: 15,
              alignSelf: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              borderRightWidth: 0.3,
              borderColor: '#bebebe',
            }}>
            <View style={{width: '100%'}}>
              <Text
                style={{color: '#27aae0', fontSize: 20, fontWeight: 'bold'}}>
                {this.state.active_appointments}
              </Text>

              <Text style={{color: '#27aae0', fontSize: 12, fontWeight: '400'}}>
                Active Appointments
              </Text>
            </View>
          </View>

          <View style={{borderRightWidth: 0.3, borderColor: '#bebebe'}}></View>

          <View
            style={{
              width: '33%',
              paddingHorizontal: 15,
              alignSelf: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              borderRightWidth: 0.3,
              borderColor: '#bebebe',
            }}>
            <View style={{width: '100%'}}>
              <Text
                style={{color: '#27aae0', fontSize: 20, fontWeight: 'bold'}}>
                {this.state.complete_appointments}
              </Text>

              <Text style={{color: '#27aae0', fontSize: 12, fontWeight: '400'}}>
                Completed Appointments
              </Text>
            </View>
          </View>

          <View
            style={{
              width: '33%',
              paddingHorizontal: 15,
              alignSelf: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View style={{width: '100%'}}>
              <Text
                style={{color: '#27aae0', fontSize: 20, fontWeight: 'bold'}}>
                ${this.state.total_balance}
              </Text>

              <Text style={{color: '#27aae0', fontSize: 12, fontWeight: '400'}}>
                Total Balance
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: 15,
            marginTop: 25,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
            Appointments Requests
          </Text>
          <Text style={{color: '#27aae0', fontWeight: 'bold', fontSize: 16}}>
            {' '}
          </Text>
        </View>

        <View>
          <ScrollView>
            {this.state.skalton == true ? (
              <View style={{marginHorizontal: 8}}>
                <SkeletonPlaceholder>
                  <View
                    style={{
                      width: width / 1.1,
                      paddingBottom: 10,
                      backgroundColor: 'white',
                      borderRadius: 8,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 3,
                      marginLeft: 7,
                      marginRight: 7,
                      marginTop: 15,
                      height: 160,
                    }}></View>
                </SkeletonPlaceholder>
                <SkeletonPlaceholder>
                  <View
                    style={{
                      width: width / 1.1,
                      paddingBottom: 10,
                      backgroundColor: 'white',
                      borderRadius: 8,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 3,
                      marginLeft: 7,
                      marginRight: 7,
                      marginTop: 15,
                      height: 160,
                    }}></View>
                </SkeletonPlaceholder>
              </View>
            ) : (
              <View>
                {this.state.data1 == '' ? (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: height / 7,
                    }}>
                    <Text style={{color: 'black'}}>
                      You don't have any appointment.
                    </Text>
                  </View>
                ) : (
                  <View style={{paddingBottom: 10}}>{this.createtable1()}</View>
                )}
              </View>
            )}
          </ScrollView>
        </View>

        {this.state.spinner == true && (
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(2, 2, 2, 0.8)',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: width / 1.2,
                height: height / 9 - 20,
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 20,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
                borderRadius: 6,
              }}>
              <UIActivityIndicator color="#27aae0" />
              <Text
                style={{fontSize: 16, color: '#27aae0', fontWeight: 'bold'}}>
                Progressing your request
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  active_button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    width: width / 2.2,
    borderBottomWidth: 2,
    borderColor: '#27aae0',
  },
  in_active_button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    width: width / 2.2,
  },

  active_text: {
    color: '#27aae0',
    fontWeight: '500',
    fontSize: 14,
  },
  in_active_text: {
    color: 'gray',
    fontWeight: '500',
    fontSize: 14,
  },
});

const mapStateToProps = state => {
  return {
    Status2: state.Status2,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    Status1: Status2 => {
      dispatch({type: 'Status1', payload: Status2});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Patient_Home);

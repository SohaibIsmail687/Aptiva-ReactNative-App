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
import {Rating, AirbnbRating} from 'react-native-ratings';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Patient_Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data1: [],
      data5: [],
      name: '',
      skalton: false,
      appState: AppState.currentState,
    };
  }

  componentDidMount = async () => {
    // this.backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   this.backAction,
    // );

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // console.log('Message handled in the background!', remoteMessage);
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
        // console.log('payload', JSON.stringify(payload))
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

    var today = new Date();
    var nextweek_T = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    let date0 = nextweek_T.toString();
    let ddd = date0.split(' ');
    console.log('check ddd whole date:::::', ddd);
    let day_1 = ddd[0];
    let dd_2 = ddd[1];
    let dd_3 = ddd[2];
    let dd_4 = ddd[3];
    let final_date_1 = dd_2 + ' ' + dd_3 + ', ' + dd_4;
    this.setState({
      day_1: day_1,
      final_date_1: final_date_1,
    });

    let user = await AsyncStorage.getItem('customer');
    let parsed = JSON.parse(user);
    console.log('user Asyncstorage data/user Asyncstorage data', user);
    let id = parsed[0].id;
    let name = parsed[0].name;
    let insurance_name = parsed[0].insurance_name;

    this.setState({
      id: id,
      name: name,
      insurance_name: insurance_name,
    });
    console.log('usernameusernameusernameusername', this.state.name);
    this.doctors_all_fav();
    this.get_appointments_user();
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

  get_appointments_user = () => {
    let uploaddata = new FormData();

    this.setState({
      skalton: true,
    });

    uploaddata.append('user_id', this.state.id);
    uploaddata.append('status', 'pending');

    let api = Connection + 'rest_apis.php?action=display_upcoming_appointments';
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
        // console.log('responseeeresponseeereeeeeeeeespons', record4);
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

  doctors_all_fav = () => {
    let uploaddata = new FormData();

    console.log('doactors_alllllllll_Favvvvvvvvvvv');

    uploaddata.append('user_id', this.state.id);

    let api = Connection + 'rest_apis.php?action=all_doctors';
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
        let table = [];
        let record = response.response;
        let len = record.length;

        console.log('recordrecordrecordrecordrecordrecordrecord', record);

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

  createtable2 = () => {
    let table = [];
    let record1 = this.state.data1;
    let len = record1.length;

    console.log('lengthlengthlengthlengthlengthlength', len);
    if (record1 != 'fail') {
      for (let i = 0; i < len; i++) {
        let date = record1[i].date;
        let doctor_name = record1[i].doctor_name;
        let doctor_degree = record1[i].doctor_degree;
        let category = record1[i].category;
        let day = record1[i].day;
        let time = record1[i].time;
        let status = record1[i].status;
        let profile1 = record1[i].doctor_profile;
        let profile = Connection + 'images/' + profile1;

        console.log('status statusstatusstatusstatus=> ', status);

        table.push(
          <View>
            {
              <View>
                <View
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
                          color: 'black',
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}>
                        {doctor_name}
                      </Text>
                      <Text style={{color: 'gray', fontSize: 12}}>
                        {doctor_degree} ({category})
                      </Text>
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
                      backgroundColor: '#27aae0',
                      paddingVertical: 13,
                      borderRadius: 8,
                      paddingHorizontal: 20,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon
                        name="calendar"
                        type="Entypo"
                        style={{color: 'lightgray', fontSize: 16}}
                      />

                      <View style={{marginLeft: 8}}>
                        <Text style={{color: 'white', fontSize: 12}}>
                          {day}, {date}
                        </Text>
                      </View>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon
                        name="clockcircle"
                        type="AntDesign"
                        style={{color: 'lightgray', fontSize: 16}}
                      />

                      <View style={{marginLeft: 8}}>
                        <Text style={{color: 'white', fontSize: 12}}>
                          {time}
                        </Text>
                      </View>
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

  createtable1 = () => {
    let table = [];
    let record1 = this.state.data5;
    let len = record1.length;

    console.log('lengthoftable1lengthoftable1lengthoftable1', len);

    if (record1 != 'fail') {
      for (let i = 0; i < len; i++) {
        let name = record1[i].name;
        let category = record1[i].category;
        let fee = record1[i].fee;
        let address = record1[i].address;
        let fcm_token = record1[i].fcm_token;
        let doctor_id = record1[i].id;
        let lat1 = record1[i].lat;
        let lng1 = record1[i].lng;
        let lat = parseFloat(lat1);
        let lng = parseFloat(lng1);
        let experience = record1[i].experience;
        let avg_rating = record1[i].avg_rating;
        let total_review = record1[i].total_review;
        let a_r = Number(avg_rating).toFixed(2);
        let degree = record1[i].degree;
        let license_number = record1[i].license_number;
        let c_name = record1[i].c_name;
        let appointment = record1[i].appointment;
        let s_key = record1[i].s_key;
        let paypal = record1[i].paypal;
        let access = record1[i].access;
        let online = record1[i].online;
        let email = record1[i].email;
        let app = record1[i].app;
        let doctor_type = record1[i].doctor_type;
        let profile1 = record1[i].profile;
        let profile = Connection + 'images/' + profile1;

        console.log('fcm_tokenfcm_tokenfcm_tokenfcm_token', fcm_token);

        table.push(
          <View>
            {
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  Actions.Doctor_Appointment_Profile({
                    day_1: this.state.day_1,
                    final_date_1: this.state.final_date_1,
                    name1: name,
                    category: category,
                    fee: fee,
                    address: address,
                    fcm_token: fcm_token,
                    doctor_id: doctor_id,
                    lat: lat,
                    lng: lng,
                    experience: experience,
                    avg_rating: avg_rating,
                    total_review: total_review,
                    a_r: a_r,
                    degree: degree,
                    license_number: license_number,
                    c_name: c_name,
                    appointment: appointment,
                    s_key: s_key,
                    paypal: paypal,
                    access: access,
                    online: online,
                    email: email,
                    app: app,
                    doctor_type: doctor_type,
                    profile: profile,
                  })
                }
                style={{
                  width: width / 1.1,
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  marginTop: 15,
                  borderWidth: 1,
                  borderColor: '#27aae0',
                }}>
                <View style={{width: 70, height: 70}}>
                  <ImageLoad
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 8,
                    }}
                    loadingStyle={{size: 'large', color: 'blue'}}
                    source={{uri: profile}}
                    borderRadius={8}
                    placeholderStyle={{
                      width: 70,
                      height: 70,
                      borderRadius: 8,
                    }}
                  />
                </View>

                <View style={{marginLeft: 10, width: '77%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      paddingRight: 10,
                    }}>
                    <View>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 15,
                          fontWeight: 'bold',
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {name}
                      </Text>
                      <Text
                        style={{
                          color: 'gray',
                          fontSize: 13,
                          fontWeight: '400',
                        }}>
                        {degree} ({category})
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 5,
                        }}>
                        <Icon
                          name="star"
                          type="AntDesign"
                          style={{color: 'gold', fontSize: 13}}
                        />
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 12,
                            fontWeight: '400',
                          }}>
                          {' '}
                          {a_r} Reviews
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
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

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingVertical: 7,
          }}>
          <Text style={{color: '#27aae0', fontSize: 20, fontWeight: 'bold'}}>
            Home
          </Text>

          <Image
            style={{width: '50%', height: 60}}
            source={require('../assets/ic_launcher.png')}
          />

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

        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              width: width,
              justifyContent: 'space-between',
              marginTop: 10,
              paddingHorizontal: 18,
              flexWrap: 'wrap',
            }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  Actions.All_sponsored_clinics({search: false});
                }}
                style={{
                  alignItems: 'center',
                  marginHorizontal: 10,
                  marginVertical: 5,
                  width: width / 2.0,
                  height: 80,
                  borderRadius: 5,
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  paddingHorizontal: 12,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}
                  source={require('../assets/all_doctors.png')}
                />

                <Text
                  style={{
                    color: '#27aae0',
                    fontWeight: '500',
                    fontSize: 18,
                    marginLeft: 14,
                  }}>
                  Doctors
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => Actions.All_Categories()}
                activeOpacity={0.8}
                style={{
                  marginHorizontal: 10,
                  marginVertical: 5,
                  alignItems: 'center',
                  width: width / 2.0,
                  height: 80,
                  borderRadius: 5,
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  paddingHorizontal: 12,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}
                  source={require('../assets/all_categories.png')}
                />

                <Text
                  style={{
                    color: '#27aae0',
                    fontWeight: '500',
                    fontSize: 18,
                    marginLeft: 8,
                  }}>
                  Categories
                </Text>
              </TouchableOpacity>

              {/* <TouchableOpacity  activeOpacity={0.8} onPress={() => { Actions.nearby_pharmacies() }}
              style={{  marginHorizontal:10,marginVertical:5,  alignItems:'center',  width: width / 2.0, height: 80, borderRadius: 5, flexDirection: 'row', backgroundColor: 'white', paddingHorizontal: 12,shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, }}>
              <Image style={{ width: 50, height:50, resizeMode: 'contain', alignSelf: 'center' }} source={require('../assets/all_pharmacies.png')} />
             
              <Text style={{ color: '#27aae0', fontWeight: '500', fontSize: 18,  marginLeft:8  }}>Pharmacies</Text>
            </TouchableOpacity> */}
            </ScrollView>
          </View>

          <View
            style={{
              paddingHorizontal: 15,
              marginTop: 25,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#27aae0', fontWeight: 'bold', fontSize: 18}}>
              Upcoming Appointments
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
                        height: 140,
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
                        height: 140,
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
                    <View style={{paddingBottom: 10}}>
                      {this.createtable2()}
                    </View>
                  )}
                </View>
              )}
            </ScrollView>
          </View>

          <View
            style={{
              paddingHorizontal: 15,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#27aae0', fontWeight: 'bold', fontSize: 18}}>
              Our Doctors
            </Text>
            <TouchableOpacity onPress={() => Actions.All_sponsored_clinics()}>
              <Text
                style={{color: '#27aae0', fontWeight: 'bold', fontSize: 14}}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              paddingBottom: 20,
            }}>
            <ScrollView style={{marginTop: 10}}>
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
                        height: 110,
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
                        height: 110,
                      }}></View>
                  </SkeletonPlaceholder>
                </View>
              ) : (
                <View>
                  {this.state.data5 == '' ? (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: height / 7,
                        alignSelf: 'center',
                        width: width,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          textAlignVertical: 'center',
                          color: 'black',
                        }}>
                        No Doctors Found
                      </Text>
                    </View>
                  ) : (
                    <View style={{paddingBottom: 100}}>
                      {this.createtable1()}
                    </View>
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
        </ScrollView>
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

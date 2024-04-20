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
import ImageLoad from 'react-native-image-placeholder';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import RBSheet from 'react-native-raw-bottom-sheet';
import {NavigationEvents} from 'react-navigation';
import Toast from 'react-native-simple-toast';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Patient_All_Appointment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text1: 1,
      text2: 1,
      text3: 2,
      //   text4:1,
      check_design: 'all',
      visible: false,
      data1: [],
      skalton: false,
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
    if (this.props.user == true) {
      Actions.pop();
    } else {
      BackHandler.exitApp();
    }
    return true;
  }

  changebtn(value, val) {
    this.setState({
      check_design: val,
    });

    if (this.state[value] == 2) {
      this.setState({
        text1: 1,
        text2: 1,
        text3: 1,

        [value]: 2,
      });
    } else {
      this.setState({
        text1: 1,
        text2: 1,
        text3: 1,

        [value]: 2,
      });
    }
    setTimeout(() => {
      if (val == 'all') {
        this.get_all_appointments_user();
      } else {
        this.get_appointments_user();
      }
    }, 100);
  }

  backAction = () => {
    // BackHandler.exitApp()
    Actions.Doctor_Tab_Screen();
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
    let parsed = JSON.parse(user);
    let id = parsed[0].id;
    this.setState({
      id: id,
    });
    console.log('kkkkkkkkkkkk', this.state.id);
    this.get_all_appointments_user();
  };

  toast = () => {
    Toast.show('You already submitted review for this appointment.');
  };

  get_appointments_user = () => {
    let uploaddata = new FormData();

    this.setState({
      skalton: true,
    });

    uploaddata.append('user_id', this.state.id);
    uploaddata.append('status', this.state.check_design);

    let api = Connection + 'rest_apis.php?action=display_appointments_user';
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
        console.log('reeeeeeeee', record4);
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

  get_all_appointments_user = () => {
    let uploaddata = new FormData();

    this.setState({
      skalton: true,
    });

    uploaddata.append('user_id', this.state.id);
    // uploaddata.append('status', this.state.check_design);

    let api = Connection + 'rest_apis.php?action=display_all_appointments_user';
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
        console.log('reeeeeeeee', record4);
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

  createtable1 = () => {
    let table = [];
    let record1 = this.state.data1;
    let len = record1.length;
    if (record1 != 'fail') {
      for (let i = 0; i < len; i++) {
        let date = record1[i].date;
        let doctor_name = record1[i].doctor_name;
        let user_name = record1[i].user_name;
        let doctor_address = record1[i].doctor_address;
        let doctor_experience = record1[i].doctor_experience;
        let doctor_degree = record1[i].doctor_degree;
        let doc_mobile = record1[i].doc_mobile;
        let category = record1[i].category;
        let appointment_id = record1[i].id;
        let doctor_id = record1[i].doctor_id;
        let day = record1[i].day;
        let fcm_token = record1[i].doc_fcm_token;
        let fee = record1[i].fee;
        let type = record1[i].type;
        let time = record1[i].time;
        let status = record1[i].status;
        let payment_method = record1[i].payment_method;
        let insurance_number = record1[i].insurance_number;
        let policy = record1[i].policy;
        let insurance_name = record1[i].insurance_name;
        let age = record1[i].age;
        let perscription = record1[i].perscription;
        let review = record1[i].review;
        let perscription1 = Connection + 'perscription/' + perscription;
        let profile1 = record1[i].doctor_profile;
        let profile = Connection + 'images/' + profile1;

        console.log('ReviewReviewReviewReview', review);

        table.push(
          <View>
            {
              <View>
                <View>
                  {this.state.check_design == 'all' && (
                    <View>
                      <View
                        style={{
                          backgroundColor: 'white',
                          width: width / 1.1,
                          marginBottom: 10,
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
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
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
                            <Text
                              style={{
                                color: 'gray',
                                fontSize: 12,
                                width: '95%',
                              }}
                              numberOfLines={1}>
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
                            backgroundColor: '#d9d9d9',
                            paddingVertical: 13,
                            borderRadius: 8,
                            paddingHorizontal: 20,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Icon
                              name="calendar"
                              type="Entypo"
                              style={{color: 'black', fontSize: 16}}
                            />

                            <View style={{marginLeft: 8}}>
                              <Text
                                style={{
                                  color: 'black',
                                  fontSize: 12,
                                  fontWeight: 'bold',
                                }}>
                                {day}, {date}
                              </Text>
                            </View>
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Icon
                              name="clockcircle"
                              type="AntDesign"
                              style={{color: 'black', fontSize: 16}}
                            />

                            <View style={{marginLeft: 8}}>
                              <Text
                                style={{
                                  color: 'black',
                                  fontSize: 12,
                                  fontWeight: 'bold',
                                }}>
                                {time}
                              </Text>
                            </View>
                          </View>
                        </View>

                        {status == 'pending' ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              width: '100%',

                              justifyContent: 'space-between',
                            }}>
                            <Pressable
                              onPress={() =>
                                Actions.patient_site_appointment_detai({
                                  doc_mobile: doc_mobile,
                                  payment_method: payment_method,
                                  date: date,
                                  status: status,
                                  day: day,
                                  time: time,
                                  doctor_name: doctor_name,
                                  category: category,
                                  doctor_address: doctor_address,
                                  doctor_profile: profile,
                                  fee: fee,
                                  patient_name: user_name,
                                  perscription1: perscription1,
                                  perscription: perscription,
                                  doctor_experience: doctor_experience,
                                  appointment_id: appointment_id,
                                  app_type: type,
                                  s_currency: this.state.s_currency,
                                  doctor_id: doctor_id,
                                  fcm_token: fcm_token,
                                })
                              }
                              style={{
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                alignItems: 'center',
                                flexDirection: 'row',
                                backgroundColor: '#27aae0',
                                width: '48%',
                                justifyContent: 'center',
                              }}>
                              <Text
                                numberOfLines={1}
                                style={{
                                  color: 'white',
                                  fontSize: 12,
                                  maxWidth: '90%',
                                  fontWeight: 'bold',
                                  marginLeft: 5,
                                }}>
                                View Details
                              </Text>
                            </Pressable>
                            <Pressable
                              onPress={() =>
                                Actions.cancel_appointment({
                                  appointment_id: appointment_id,
                                  doctor_id: doctor_id,
                                })
                              }
                              style={{
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                alignItems: 'center',
                                flexDirection: 'row',
                                borderColor: '#27aae0',
                                width: '48%',
                                justifyContent: 'center',
                                borderWidth: 1,
                              }}>
                              <Text
                                numberOfLines={1}
                                style={{
                                  width: '80%',
                                  color: '#27aae0',
                                  fontSize: 12,
                                  maxWidth: '90%',
                                  fontWeight: 'bold',
                                  marginLeft: 5,
                                }}>
                                Cancel Appointment
                              </Text>
                            </Pressable>
                          </View>
                        ) : (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              width: '100%',

                              justifyContent: 'space-between',
                            }}>
                            <Pressable
                              //   onPress={() => Actions.Doctor_Appointment_Profile()}
                              style={{
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                alignItems: 'center',
                                flexDirection: 'row',
                                backgroundColor: '#27aae0',
                                width: '48%',
                                justifyContent: 'center',
                              }}>
                              <Text
                                numberOfLines={1}
                                style={{
                                  color: 'white',
                                  fontSize: 12,
                                  maxWidth: '90%',
                                  fontWeight: 'bold',
                                  marginLeft: 5,
                                }}>
                                View Details
                              </Text>
                            </Pressable>

                            {review == appointment_id ? (
                              <Pressable
                                onPress={() => this.toast()}
                                activeOpacity={0.8}
                                style={{
                                  paddingVertical: 10,
                                  paddingHorizontal: 10,
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  borderColor: 'lightgray',
                                  width: '48%',
                                  justifyContent: 'center',
                                  borderWidth: 1,
                                }}>
                                <Text
                                  numberOfLines={1}
                                  style={{
                                    color: 'gray',
                                    fontSize: 12,
                                    maxWidth: '90%',
                                    fontWeight: 'bold',
                                    marginLeft: 5,
                                  }}>
                                  Review Submitted
                                </Text>
                              </Pressable>
                            ) : (
                              <Pressable
                                onPress={() =>
                                  Actions.video_done_1({
                                    doctor_id: doctor_id,
                                    appointment_id: appointment_id,
                                    doctor_address: doctor_address,
                                    doctor_profile: profile,
                                    doctor_name: doctor_name,
                                    category: category,
                                    fcm_token: fcm_token,
                                  })
                                }
                                activeOpacity={0.8}
                                style={{
                                  paddingVertical: 10,
                                  paddingHorizontal: 10,
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  borderColor: '#27aae0',
                                  width: '48%',
                                  justifyContent: 'center',
                                  borderWidth: 1,
                                }}>
                                <Text
                                  numberOfLines={1}
                                  style={{
                                    color: '#27aae0',
                                    fontSize: 12,
                                    maxWidth: '90%',
                                    fontWeight: 'bold',
                                    marginLeft: 5,
                                  }}>
                                  Leave Review
                                </Text>
                              </Pressable>
                            )}
                          </View>
                        )}
                      </View>
                    </View>
                  )}

                  {this.state.check_design == 'pending' && (
                    <View>
                      <View
                        style={{
                          backgroundColor: 'white',
                          width: width / 1.1,
                          marginBottom: 10,
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
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
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
                            <Text
                              style={{
                                color: 'gray',
                                fontSize: 12,
                                width: '95%',
                              }}
                              numberOfLines={1}>
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
                            backgroundColor: '#d9d9d9',
                            paddingVertical: 13,
                            borderRadius: 8,
                            paddingHorizontal: 20,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Icon
                              name="calendar"
                              type="Entypo"
                              style={{color: 'black', fontSize: 16}}
                            />

                            <View style={{marginLeft: 8}}>
                              <Text
                                style={{
                                  color: 'black',
                                  fontSize: 12,
                                  fontWeight: 'bold',
                                }}>
                                {day}, {date}
                              </Text>
                            </View>
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Icon
                              name="clockcircle"
                              type="AntDesign"
                              style={{color: 'black', fontSize: 16}}
                            />

                            <View style={{marginLeft: 8}}>
                              <Text
                                style={{
                                  color: 'black',
                                  fontSize: 12,
                                  fontWeight: 'bold',
                                }}>
                                {time}
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '100%',

                            justifyContent: 'space-between',
                          }}>
                          <Pressable
                            onPress={() =>
                              Actions.patient_site_appointment_detai({
                                doc_mobile: doc_mobile,
                                payment_method: payment_method,
                                date: date,
                                status: status,
                                day: day,
                                time: time,
                                doctor_name: doctor_name,
                                category: category,
                                doctor_address: doctor_address,
                                doctor_profile: profile,
                                fee: fee,
                                patient_name: user_name,
                                perscription1: perscription1,
                                perscription: perscription,
                                doctor_experience: doctor_experience,
                                appointment_id: appointment_id,
                                app_type: type,
                                s_currency: this.state.s_currency,
                                doctor_id: doctor_id,
                                fcm_token: fcm_token,
                              })
                            }
                            style={{
                              paddingVertical: 10,
                              paddingHorizontal: 10,
                              alignItems: 'center',
                              flexDirection: 'row',
                              backgroundColor: '#27aae0',
                              width: '48%',
                              justifyContent: 'center',
                            }}>
                            <Text
                              numberOfLines={1}
                              style={{
                                color: 'white',
                                fontSize: 12,
                                maxWidth: '90%',
                                fontWeight: 'bold',
                                marginLeft: 5,
                              }}>
                              View Details
                            </Text>
                          </Pressable>
                          <Pressable
                            onPress={() =>
                              Actions.cancel_appointment({
                                appointment_id: appointment_id,
                                doctor_id: doctor_id,
                              })
                            }
                            style={{
                              paddingVertical: 10,
                              paddingHorizontal: 10,
                              alignItems: 'center',
                              flexDirection: 'row',
                              borderColor: '#27aae0',
                              width: '48%',
                              justifyContent: 'center',
                              borderWidth: 1,
                            }}>
                            <Text
                              numberOfLines={1}
                              style={{
                                width: '80%',
                                color: '#27aae0',
                                fontSize: 12,
                                maxWidth: '90%',
                                fontWeight: 'bold',
                                marginLeft: 5,
                              }}>
                              Cancel Appointment
                            </Text>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  )}

                  {this.state.check_design == 'complete' && (
                    <View
                      style={{
                        backgroundColor: 'white',
                        width: width / 1.1,
                        marginBottom: 10,
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
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
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
                          <Text
                            style={{
                              color: 'gray',
                              fontSize: 12,
                              width: '95%',
                            }}
                            numberOfLines={1}>
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
                          backgroundColor: '#d9d9d9',
                          paddingVertical: 13,
                          borderRadius: 8,
                          paddingHorizontal: 20,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Icon
                            name="calendar"
                            type="Entypo"
                            style={{color: 'black', fontSize: 16}}
                          />

                          <View style={{marginLeft: 8}}>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 12,
                                fontWeight: 'bold',
                              }}>
                              {day}, {date}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Icon
                            name="clockcircle"
                            type="AntDesign"
                            style={{color: 'black', fontSize: 16}}
                          />

                          <View style={{marginLeft: 8}}>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 12,
                                fontWeight: 'bold',
                              }}>
                              {time}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: '100%',

                          justifyContent: 'space-between',
                        }}>
                        <Pressable
                          //   onPress={() => Actions.Doctor_Appointment_Profile()}
                          style={{
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            alignItems: 'center',
                            flexDirection: 'row',
                            backgroundColor: '#27aae0',
                            width: '48%',
                            justifyContent: 'center',
                          }}>
                          <Text
                            numberOfLines={1}
                            style={{
                              color: 'white',
                              fontSize: 12,
                              maxWidth: '90%',
                              fontWeight: 'bold',
                              marginLeft: 5,
                            }}>
                            View Details
                          </Text>
                        </Pressable>

                        {review == appointment_id ? (
                          <Pressable
                            onPress={() => this.toast()}
                            activeOpacity={0.8}
                            style={{
                              paddingVertical: 10,
                              paddingHorizontal: 10,
                              alignItems: 'center',
                              flexDirection: 'row',
                              borderColor: 'lightgray',
                              width: '48%',
                              justifyContent: 'center',
                              borderWidth: 1,
                            }}>
                            <Text
                              numberOfLines={1}
                              style={{
                                color: 'gray',
                                fontSize: 12,
                                maxWidth: '90%',
                                fontWeight: 'bold',
                                marginLeft: 5,
                              }}>
                              Review Submitted
                            </Text>
                          </Pressable>
                        ) : (
                          <Pressable
                            onPress={() =>
                              Actions.video_done_1({
                                doctor_id: doctor_id,
                                appointment_id: appointment_id,
                                doctor_address: doctor_address,
                                doctor_profile: profile,
                                doctor_name: doctor_name,
                                category: category,
                                fcm_token: fcm_token,
                              })
                            }
                            activeOpacity={0.8}
                            style={{
                              paddingVertical: 10,
                              paddingHorizontal: 10,
                              alignItems: 'center',
                              flexDirection: 'row',
                              borderColor: '#27aae0',
                              width: '48%',
                              justifyContent: 'center',
                              borderWidth: 1,
                            }}>
                            <Text
                              numberOfLines={1}
                              style={{
                                color: '#27aae0',
                                fontSize: 12,
                                maxWidth: '90%',
                                fontWeight: 'bold',
                                marginLeft: 5,
                              }}>
                              Leave Review
                            </Text>
                          </Pressable>
                        )}
                      </View>
                    </View>
                  )}

                  {this.state.check_design == 'cancel' && (
                    <View
                      style={{
                        backgroundColor: 'white',
                        width: width / 1.1,
                        marginBottom: 10,
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
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
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
                          <Text
                            style={{
                              color: 'gray',
                              fontSize: 12,
                              width: '95%',
                            }}
                            numberOfLines={1}>
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
                          backgroundColor: '#d9d9d9',
                          paddingVertical: 13,
                          borderRadius: 8,
                          paddingHorizontal: 20,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Icon
                            name="calendar"
                            type="Entypo"
                            style={{color: 'black', fontSize: 16}}
                          />

                          <View style={{marginLeft: 8}}>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 12,
                                fontWeight: 'bold',
                              }}>
                              {day}, {date}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Icon
                            name="clockcircle"
                            type="AntDesign"
                            style={{color: 'black', fontSize: 16}}
                          />

                          <View style={{marginLeft: 8}}>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 12,
                                fontWeight: 'bold',
                              }}>
                              {time}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
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

  open = (val, val1, va3, val4, val5, val6) => {
    this.setState({
      appointment_id_cancel: val,
      doc_id_cancel: val1,
      fcm_token: va3,
      date: val4,
      time: val5,
      fee: val6,
    });
    setTimeout(() => {
      this.RBSheet1.open();
    }, 100);
  };

  next = () => {
    this.RBSheet1.close();
    Actions.cancel_appointment({
      fee: this.state.fee,
      time: this.state.time,
      date: this.state.date,
      appointment_id: this.state.appointment_id_cancel,
      doctor_id: this.state.doc_id_cancel,
      fcm_token: this.state.fcm_token,
    });
  };

  dd = () => {
    this.get_appointments_user();
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <NavigationEvents onDidFocus={payload => this.dd()} />

        <View
          style={{
            paddingHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: 'white',
          }}>
          <Text style={{color: '#27aae0', fontSize: 20, fontWeight: 'bold'}}>
            Appointments
          </Text>

          <Image
            style={{width: '50%', height: 60}}
            source={require('../assets/ic_launcher.png')}
          />
        </View>

        <View
          style={{
            width: width,
            paddingHorizontal: 10,
            borderRadius: 10,
            alignSelf: 'center',
            height: 50,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 5,
          }}>
          <TouchableOpacity
            style={{
              width: '33%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.changebtn('text3', 'all')}>
            <View
              style={
                this.state.text3 == 1
                  ? styles.in_active_button
                  : styles.active_button
              }>
              <Text
                style={
                  this.state.text3 == 1
                    ? styles.in_active_text
                    : styles.active_text
                }>
                Appointments
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '33%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.changebtn('text1', 'pending')}>
            <View
              style={
                this.state.text1 == 1
                  ? styles.in_active_button
                  : styles.active_button
              }>
              <Text
                style={
                  this.state.text1 == 1
                    ? styles.in_active_text
                    : styles.active_text
                }>
                Scheduled
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '33%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.changebtn('text2', 'complete')}>
            <View
              style={
                this.state.text2 == 1
                  ? styles.in_active_button
                  : styles.active_button
              }>
              <Text
                style={
                  this.state.text2 == 1
                    ? styles.in_active_text
                    : styles.active_text
                }>
                Completed
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {this.state.skalton == true ? (
          <SkeletonPlaceholder>
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                height: 160,
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginTop: 5,
                backgroundColor: 'white',
              }}></View>

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                height: 160,
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
                height: 160,
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
                height: 160,
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
                height: 160,
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
            {this.state.data1 == '' ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: height / 1.5,
                }}>
                <Text style={{color: 'black'}}>
                  You don't have any appointment here.
                </Text>
              </View>
            ) : (
              <View style={{paddingBottom: 10}}>{this.createtable1()}</View>
            )}
          </ScrollView>
        )}

        <RBSheet
          ref={ref => {
            this.RBSheet1 = ref;
          }}
          closeOnDragDown={true}
          height={220}
          openDuration={270}
          customStyles={{
            container: {
              paddingHorizontal: 20,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            },
            draggableIcon: {
              backgroundColor: 'lightgray',
            },
          }}>
          <View>
            <Text
              style={{
                fontSize: 18,
                color: 'red',
                marginTop: 5,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Cancel Appointment!
            </Text>

            <View
              style={{
                width: '100%',
                backgroundColor: 'lightgray',
                height: 1,
                marginVertical: 15,
              }}></View>
            <Text
              style={{
                fontSize: 14,
                color: 'gray',
                textAlign: 'center',
                fontWeight: 'bold',
                paddingHorizontal: 30,
              }}>
              Are you sure you want to cancel your appointment?
            </Text>
            {/* <Text style={{ fontSize: 14, color: 'gray', marginTop: 10, textAlign: 'center', fontWeight: 'bold', paddingHorizontal: 30 }}>{this.props.Only_funds_will_return_your_accouont}</Text> */}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
                marginBottom: 10,
              }}>
              <TouchableOpacity
                onPress={() => this.RBSheet1.close()}
                activeOpacity={0.8}
                style={{
                  width: width / 2.3,
                  paddingVertical: 13,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                  backgroundColor: '#eef3ff',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                }}>
                <Text style={{color: '#27aae0', fontWeight: 'bold'}}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.next()}
                activeOpacity={0.8}
                style={{
                  width: width / 2.3,
                  paddingVertical: 13,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                  backgroundColor: '#27aae0',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Yes Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  active_button: {
    width: '98%',
    height: 45,
    borderBottomColor: '#27aae0',
    borderBottomWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  in_active_button: {
    width: '98%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  active_text: {
    color: '#27aae0',
    fontSize: 14,
    fontWeight: 'bold',
  },

  in_active_text: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Patient_All_Appointment;

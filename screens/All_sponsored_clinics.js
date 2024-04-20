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
// import messaging from '@react-native-firebase/messaging'
import Connection from '../connection';
import ImageLoad from 'react-native-image-placeholder';
import {connect} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Rating, AirbnbRating} from 'react-native-ratings';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class All_Providers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doctor_name: '',
      doctor_category: '',
      doctor_reviews: '',
      doctor_address: '',
      doctor_profile: '',
      doctor_id: '',
      data5: [],
      search: this.props.search,
      skalton: false,
      my_like: false,
    };
  }

  componentDidMount = async () => {
    // this.backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   this.backAction,
    // );

    var today = new Date();
    var nextweek_T = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    let date0 = nextweek_T.toString();
    let ddd = date0.split(' ');
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
    console.log(
      'user Asyncstorage data/user Asyncstorage data/user Asyncstorage data',
      user,
    );
    let id = parsed[0].id;
    let name = parsed[0].name;
    let email = parsed[0].email;
    let password = parsed[0].password;
    let address = parsed[0].adress;
    let number = parsed[0].number;
    let dob = parsed[0].dob;
    let profile = parsed[0].profile;

    this.setState({
      id: id,
      name: name,
      email: email,
      password: password,
      dob: dob,
      profile: profile,
      address: address,
      number: number,
    });
    // console.log('usernameusernameusernameusername', this.state.name);
    this.doctors_all_fav();
  };

  doctors_all_fav = () => {
    let uploaddata = new FormData();

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
          for (let i = 0; i < len; i++) {
            let my_like = record[i].my_like;

            console.log('mylikemylikemylikemylikemylike', my_like);

            let boxes = 'box' + my_like;
            if (my_like == null) {
              this.setState({[boxes]: false});
              console.log('!!!!!!!!!!!!!!!!!!!!', this.state[boxes]);
            } else {
              this.setState({[boxes]: true});
            }
          }

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

  Like_Station = () => {
    this.RBSheet.close();

    let boxes = 'box' + this.state.doctor_id;

    this.setState({[boxes]: true});

    this.setState({
      my_like: true,
      spinner: true,
    });

    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.state.doctor_id);
    uploaddata.append('user_id', this.state.id);
    let api = Connection + 'rest_apis.php?action=doctor_like';

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
        if (record != 'fail') {
          this.get_liked_doctor();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  Unlike_Station = () => {
    this.RBSheet.close();

    let boxes = 'box' + this.state.doctor_id;

    this.setState({[boxes]: false});

    this.setState({
      my_like: false,
      spinner: true,
    });

    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.state.doctor_id);
    uploaddata.append('user_id', this.state.id);
    let api = Connection + 'rest_apis.php?action=doctor_unlike';

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
        if (record != 'fail') {
          this.get_liked_doctor();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  get_liked_doctor = () => {
    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.state.doctor_id);
    uploaddata.append('user_id', this.state.id);

    let api = Connection + 'rest_apis.php?action=get_liked_doctor';

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
        if (record != 'fail') {
          this.setState({
            my_like: true,
            spinner: false,
          });
        } else {
          this.setState({
            my_like: false,
            spinner: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  like_doctor_RBSheet = (val1, val2, val3, val4, val5, val6, val7) => {
    this.RBSheet.open();
    this.setState({
      doctor_name: val1,
      doctor_category: val2,
      doctor_address: val3,
      doctor_reviews: val5,
      doctor_profile: val6,
      doctor_id: val4,
      liked: val7,
    });
    // console.log('Helllllllllllllloooooo', val5);
  };

  createtable5 = () => {
    let table = [];
    let record1 = this.state.data5;
    let len = record1.length;
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
        let profile1 = record1[i].profile;
        let profile = Connection + 'images/' + profile1;

        let boxes = 'box' + doctor_id;

        table.push(
          <View>
            {
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  width: width / 1.1,
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 10,
                  marginTop: 10,
                  marginBottom: 5,
                  shadowOffset: {width: 1, height: 1},
                  shadowOpacity: 0,
                  shadowRadius: 1,
                  elevation: 1,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <ImageLoad
                      style={{width: 60, height: 60, borderRadius: 100}}
                      loadingStyle={{size: 'large', color: 'blue'}}
                      source={{uri: profile}}
                      borderRadius={100}
                      placeholderStyle={{
                        width: 60,
                        height: 60,
                        borderRadius: 100,
                      }}
                    />
                    <View style={{marginTop: -20}}>
                      <AirbnbRating
                        count={5}
                        reviews={['', '', '', ' ', '']}
                        size={12}
                        // onFinishRating={this.ratingCompleted}
                        selectedColor="gold"
                        unSelectedColor="lightgray"
                        reviewSize={4}
                      />
                    </View>
                  </View>

                  <View style={{marginLeft: 13, width: '65%'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          width: '80%',
                          color: '#27aae0',
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}>
                        {name}
                      </Text>

                      {/* {this.state[boxes] == true ? (
                        <Icon
                          onPress={() =>
                            this.like_doctor_RBSheet(
                              name,
                              category,
                              address,
                              doctor_id,
                              a_r,
                              profile,
                              true,
                            )
                          }
                          name="heart"
                          type="AntDesign"
                          style={{color: 'red', fontSize: 20}}
                        />
                      ) : (
                        <Icon
                          onPress={() =>
                            this.like_doctor_RBSheet(
                              name,
                              category,
                              address,
                              doctor_id,
                              a_r,
                              profile,
                              false,
                            )
                          }
                          name="hearto"
                          type="AntDesign"
                          style={{color: '#007fff', fontSize: 20}}
                        />
                      )} */}
                    </View>

                    <Text style={{color: 'gray', fontSize: 13}}>
                      {degree} ({category})
                    </Text>

                    <Text
                      style={{
                        color: 'black',
                        fontSize: 13,
                        fontWeight: 'bold',
                      }}>
                      {address}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    marginTop: 10,
                    justifyContent: 'space-between',
                    paddingHorizontal: 15,
                  }}>
                  <Pressable
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
                        profile: profile,
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
                      View Profile
                    </Text>
                  </Pressable>
                  <Pressable
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
                        profile: profile,
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
                      Book Appointment
                    </Text>
                  </Pressable>
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

  Serach_doctor = val => {
    this.setState({skalton: true});

    let uploaddata = new FormData();

    this.setState({spinner: true});
    console.log('name', val);
    let name1 = val['name'];
    uploaddata.append('name', name1);

    let api = Connection + 'rest_apis.php?action=search_doctor';
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

        if (record != 'fail') {
          this.setState({
            data5: record,
            skalton: false,
          });
        } else {
          this.setState({
            data5: [],
            skalton: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  search_false = () => {
    this.setState({
      search: false,
    });
    this.doctors_all_fav();
  };

  search_true = () => {
    this.setState({
      search: true,
    });
  };

  render() {
    return (
      <>
        <StatusBar backgroundColor="#27aae0" barStyle="light-content" />
        <View style={{flex: 1}}>
          <View
            style={{
              paddingHorizontal: 15,
              paddingVertical: 15,
              backgroundColor: '#27aae0',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Icon
                onPress={() => {
                  Actions.pop();
                }}
                name="keyboard-backspace"
                type="MaterialCommunityIcons"
                style={{color: 'white', fontSize: 28}}
              />
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                Our Doctors
              </Text>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                {' '}
              </Text>

              {/* <Icon  name="search" type="FontAwesome" style={{ color: "white", fontSize: 24 }} /> */}
              {/* onPress={() => { this.search_true() }} */}
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: width / 1.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 12,
                  backgroundColor: '#27aae0',
                  borderColor: 'white',
                  borderWidth: 1,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                }}>
                <TextInput
                  onChangeText={name => this.Serach_doctor({name})}
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    height: 45,
                    borderRadius: 8,
                    paddingLeft: 15,
                    color: 'white',
                  }}
                  placeholder="Search "
                  placeholderTextColor="white"
                />
                <Icon
                  name="search"
                  type="Ionicons"
                  style={{
                    color: 'white',
                    fontSize: 25,
                    position: 'absolute',
                    right: 10,
                  }}
                />
              </View>
              <Icon
                name="filter"
                type="FontAwesome"
                style={{color: 'white', fontSize: 28}}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              alignSelf: 'center',
              marginTop: 10,
            }}>
            {this.state.skalton == true ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  paddingHorizontal: 15,
                }}>
                <SkeletonPlaceholder>
                  <View
                    style={{
                      height: 180,
                      width: width / 2.5,
                      paddingBottom: 10,
                      backgroundColor: 'white',
                      borderRadius: 8,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 3,
                      marginLeft: 7,
                      marginRight: 7,
                      marginBottom: 5,
                      marginTop: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 15,
                    }}></View>
                </SkeletonPlaceholder>
                <SkeletonPlaceholder>
                  <View
                    style={{
                      height: 180,
                      width: width / 2.5,
                      paddingBottom: 10,
                      backgroundColor: 'white',
                      borderRadius: 8,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 3,
                      marginLeft: 7,
                      marginRight: 7,
                      marginBottom: 5,
                      marginTop: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 15,
                    }}></View>
                </SkeletonPlaceholder>

                <SkeletonPlaceholder>
                  <View
                    style={{
                      height: 180,
                      width: width / 2.5,
                      paddingBottom: 10,
                      backgroundColor: 'white',
                      borderRadius: 8,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 3,
                      marginLeft: 7,
                      marginRight: 7,
                      marginBottom: 5,
                      marginTop: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 15,
                    }}></View>
                </SkeletonPlaceholder>

                <SkeletonPlaceholder>
                  <View
                    style={{
                      height: 180,
                      width: width / 2.5,
                      paddingBottom: 10,
                      backgroundColor: 'white',
                      borderRadius: 8,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 3,
                      marginLeft: 7,
                      marginRight: 7,
                      marginBottom: 5,
                      marginTop: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 15,
                    }}></View>
                </SkeletonPlaceholder>
                <SkeletonPlaceholder>
                  <View
                    style={{
                      height: 180,
                      width: width / 2.5,
                      paddingBottom: 10,
                      backgroundColor: 'white',
                      borderRadius: 8,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 3,
                      marginLeft: 7,
                      marginRight: 7,
                      marginBottom: 5,
                      marginTop: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 15,
                    }}></View>
                </SkeletonPlaceholder>

                <SkeletonPlaceholder>
                  <View
                    style={{
                      height: 180,
                      width: width / 2.5,
                      paddingBottom: 10,
                      backgroundColor: 'white',
                      borderRadius: 8,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 3,
                      marginLeft: 7,
                      marginRight: 7,
                      marginBottom: 5,
                      marginTop: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 15,
                    }}></View>
                </SkeletonPlaceholder>

                <SkeletonPlaceholder>
                  <View
                    style={{
                      height: 180,
                      width: width / 2.5,
                      paddingBottom: 10,
                      backgroundColor: 'white',
                      borderRadius: 8,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 3,
                      marginLeft: 7,
                      marginRight: 7,
                      marginBottom: 5,
                      marginTop: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 15,
                    }}></View>
                </SkeletonPlaceholder>

                <SkeletonPlaceholder>
                  <View
                    style={{
                      height: 180,
                      width: width / 2.5,
                      paddingBottom: 10,
                      backgroundColor: 'white',
                      borderRadius: 8,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 3,
                      marginLeft: 7,
                      marginRight: 7,
                      marginBottom: 5,
                      marginTop: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 15,
                    }}></View>
                </SkeletonPlaceholder>

                <SkeletonPlaceholder>
                  <View
                    style={{
                      height: 180,
                      width: width / 2.5,
                      paddingBottom: 10,
                      backgroundColor: 'white',
                      borderRadius: 8,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 3,
                      marginLeft: 7,
                      marginRight: 7,
                      marginBottom: 5,
                      marginTop: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 15,
                    }}></View>
                </SkeletonPlaceholder>

                <SkeletonPlaceholder>
                  <View
                    style={{
                      height: 180,
                      width: width / 2.5,
                      paddingBottom: 10,
                      backgroundColor: 'white',
                      borderRadius: 8,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 3,
                      marginLeft: 7,
                      marginRight: 7,
                      marginBottom: 5,
                      marginTop: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 15,
                    }}></View>
                </SkeletonPlaceholder>
              </View>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                {this.state.data5 == '' ? (
                  <View>
                    <Image
                      source={require('../assets/No_appointment.png')}
                      style={{
                        width: width / 1.3,
                        height: height / 3.7,
                        alignSelf: 'center',
                        marginTop: 200,
                        resizeMode: 'contain',
                      }}
                    />
                    <Text
                      style={{
                        color: 'black',
                        textAlign: 'center',
                        marginTop: 30,
                        fontSize: 16,
                      }}>
                      No doctor found.
                    </Text>
                  </View>
                ) : (
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                      style={{
                        marginBottom: 60,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        width: width / 1.1,
                        alignSelf: 'center',
                      }}>
                      {this.createtable5()}
                    </View>
                  </ScrollView>
                )}

                <View style={{marginBottom: 120}}></View>
              </ScrollView>
            )}
          </View>

          <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            height={320}
            openDuration={250}
            closeOnDragDown={true}
            customStyles={{
              container: {
                paddingHorizontal: 20,
                backgroundColor: '#f9f9fa',
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
              },
              draggableIcon: {
                backgroundColor: 'lightgray',
              },
            }}>
            <View>
              {this.state.my_like == false ? (
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    marginTop: 30,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Mark as Favourites?
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    marginTop: 30,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Remove from Favourites?
                </Text>
              )}
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginVertical: 15,
                }}></View>

              <View
                style={{
                  width: width / 1.1,
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  shadowOffset: {width: 1, height: 1},
                  shadowOpacity: 0,
                  shadowRadius: 1,
                  elevation: 1,
                }}>
                <ImageLoad
                  style={{width: 90, height: 90, borderRadius: 15}}
                  loadingStyle={{size: 'large', color: 'blue'}}
                  source={{uri: this.state.doctor_profile}}
                  borderRadius={15}
                  placeholderStyle={{width: 90, height: 90, borderRadius: 15}}
                />

                <View style={{marginLeft: 13, width: '65%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      {this.state.doctor_name}
                    </Text>

                    {this.state.my_like == false ? (
                      <Icon
                        name="hearto"
                        type="AntDesign"
                        style={{color: '#27aae0', fontSize: 20}}
                      />
                    ) : (
                      <Icon
                        name="heart"
                        type="AntDesign"
                        style={{color: '#27aae0', fontSize: 20}}
                      />
                    )}
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 2,
                      borderColor: '#f8f8f9',
                      marginVertical: 13,
                    }}></View>

                  <Text numberOfLines={1} style={{color: 'gray', fontSize: 13}}>
                    {this.state.doctor_category} | {this.state.doctor_address}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 7,
                    }}>
                    <Icon
                      name="star-half-empty"
                      type="FontAwesome"
                      style={{color: '#27aae0', fontSize: 18}}
                    />
                    <Text style={{color: 'gray', fontSize: 13, marginLeft: 5}}>
                      {this.state.doctor_reviews} (Total Reviews{' '}
                      {this.state.doctor_reviews})
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  onPress={() => this.RBSheet.close()}
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
                {this.state.liked == false ? (
                  <TouchableOpacity
                    onPress={() => this.Like_Station()}
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
                      Yes, Mark
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => this.Unlike_Station()}
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
                      Yes, Unmark
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </RBSheet>
        </View>
      </>
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
    borderColor: '#5b9ed2',
  },
  in_active_button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    width: width / 2.2,
  },

  active_text: {
    color: '#5b9ed2',
    fontWeight: '500',
    fontSize: 14,
  },
  in_active_text: {
    color: 'gray',
    fontWeight: '500',
    fontSize: 14,
  },
});

export default All_Providers;

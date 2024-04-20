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
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {connect} from 'react-redux';
import {NavigationEvents} from 'react-navigation';
import ImageLoad from 'react-native-image-placeholder';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class favourite_doctors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text1: 2,
      text2: 1,
      text3: 1,
      text4: 1,
      text5: 1,
      text6: 1,
      data1: [],
      skalton: true,

      check_design: 'All',
    };
  }

  backAction = () => {
    Actions.pop();
    return true;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  changebtn(value, val) {
    if (this.state[value] == 2) {
      this.setState({
        text1: 1,
        text2: 1,
        text3: 1,
        text4: 1,
        text5: 1,
        text6: 1,

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

        [value]: 2,
      });
    }
    this.setState({
      check_design: val,
    });
  }

  componentDidMount = async () => {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );

    let user = await AsyncStorage.getItem('customer');
    let parsed = JSON.parse(user);
    let id = parsed[0].id;
    let latitude = parsed[0].lat;
    let longitude = parsed[0].lng;
    let lat = parseFloat(latitude);
    let lng = parseFloat(longitude);

    this.setState({
      id: id,
      lat: lat,
      lng: lng,
    });

    this.doctors_by_category();
  };

  doctors_by_category = () => {
    this.setState({
      skalton: true,
    });

    let uploaddata = new FormData();
    uploaddata.append('user_id', this.state.id);
    let api = Connection + 'rest_apis.php?action=get_my_fav_doctors';

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

        console.log('RecordoffvtdrsRecordoffvtdrs', record);

        if (record != 'fail') {
          this.setState({
            data1: record,
            skalton: false,
          });
        } else {
          this.setState({
            data1: [],
          });
        }
        this.setState({
          skalton: false,
        });
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
        let app = record1[i].app;
        let profile1 = record1[i].profile;
        console.log('AAAAAAAAAAAAAAAAAAAAAAA', profile1);
        let profile = Connection + 'images/' + profile1;
        table.push(
          <View>
            {
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  Actions.Doctor_Appointment_Profile({
                    app: app,
                    fcm_token: fcm_token,
                    s_key: s_key,
                    paypal: paypal,
                    access: access,
                    name1: name,
                    profile: profile,
                    category: category,
                    doctor_id: doctor_id,
                    experience: experience,
                    fee: fee,
                    address: address,
                    lat: lat,
                    lng: lng,
                    total_review: total_review,
                    a_r: a_r,
                    license_number: license_number,
                    degree: degree,
                    c_name: c_name,
                    appointment: appointment,
                  })
                }>
                <View
                  style={{
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
                  }}>
                  <View>
                    <ImageLoad
                      style={{width: 70, height: 70, borderRadius: 70}}
                      loadingStyle={{size: 'large', color: 'blue'}}
                      source={{uri: profile}}
                      borderRadius={70}
                      placeholderStyle={{
                        width: 70,
                        height: 70,
                        borderRadius: 70,
                      }}
                    />
                    <View
                      style={{
                        width: 22,
                        height: 22,
                        backgroundColor: '#e71b1a',
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                      }}>
                      <Icon
                        style={{color: 'white', fontSize: 12}}
                        name="heart"
                        type="AntDesign"
                      />
                    </View>
                  </View>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 15,
                      fontWeight: 'bold',
                      marginTop: 5,
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: 'gray',
                      fontSize: 13,
                      fontWeight: '400',
                      // width: '90%',
                    }}>
                    {category}
                  </Text>

                  <View
                    style={{
                      width: 100,
                      height: 26,
                      backgroundColor: '#27aae0',
                      marginTop: 10,
                      borderRadius: 4,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 12,
                      }}>
                      Book Now
                    </Text>
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

  Serach_doctor = val => {
    this.setState({skalton: true});
    let uploaddata = new FormData();
    this.setState({spinner: true});
    console.log('name', val);
    let name1 = val['name'];

    uploaddata.append('name', name1);
    uploaddata.append('category', this.props.category);

    let api = Connection + 'rest_apis.php?action=search_doctor';
    // console.log("pass => ", api)
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
            data1: record,
            skalton: false,
          });
        } else {
          this.setState({
            data1: [],
            skalton: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  dd = () => {
    console.log('hhh');
    this.doctors_by_category();
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <NavigationEvents onDidFocus={payload => this.dd()} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            paddingVertical: 15,
            backgroundColor: '#27aae0',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
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
            Favorite Doctors
          </Text>
          <Icon
            onPress={() => {
              Actions.pop();
            }}
            name="bell-o"
            type="FontAwesome"
            style={{color: 'white', fontSize: 26}}
          />
        </View>

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
          <ScrollView>
            {this.state.data1 == '' ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: height / 1.5,
                }}>
                <Text style={{color: 'black'}}>
                  You haven't mark any provider as Favourite.
                </Text>
              </View>
            ) : (
              <View
                style={{
                  // width:width/1.1,
                  paddingBottom: 20,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                {this.createtable1()}
              </View>
            )}
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  active_button: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0192fc',
    marginRight: 10,
  },
  in_active_button: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    marginRight: 10,
  },

  active_text: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  in_active_text: {
    color: 'gray',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default favourite_doctors;

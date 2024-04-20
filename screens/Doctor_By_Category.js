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
  AsyncStorage,
  KeyboardAvoidingView,
  Pressable,
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
import {Rating, AirbnbRating} from 'react-native-ratings';

import ImageLoad from 'react-native-image-placeholder';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Doctor_By_Category extends React.Component {
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
      category_search: '',

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

    setTimeout(() => {
      this.doctors_by_category();
    }, 100);
  };

  doctors_by_category = () => {
    let uploaddata = new FormData();
    uploaddata.append('category', this.props.category);

    let api = Connection + 'rest_apis.php?action=doctors_by_category';
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

    // console.log('doctorscategorydoctorscategory', len);
    if (record1 != 'fail') {
      for (let i = 0; i < len; i++) {
        let name = record1[i].name;
        let email = record1[i].email;
        let category = record1[i].category;
        let fee = record1[i].fee;
        let address = record1[i].address;
        let doctor_id = record1[i].id;
        let lat1 = record1[i].lat;
        let lng1 = record1[i].lng;
        let lat = parseFloat(lat1);
        let lng = parseFloat(lng1);
        let experience = record1[i].experience;
        let avg_rating = record1[i].avg_rating;
        let total_review = record1[i].total_review;
        let city = record1[i].city;
        let a_r = Number(avg_rating).toFixed(2);
        let degree = record1[i].degree;
        let license_number = record1[i].license_number;
        let c_name = record1[i].c_name;
        let appointment = record1[i].appointment;
        let s_key = record1[i].s_key;
        let paypal = record1[i].paypal;
        let access = record1[i].access;
        let fcm_token = record1[i].fcm_token;
        let online = record1[i].online;
        let app = record1[i].app;
        let profile1 = record1[i].profile;
        let profile = Connection + 'images/' + profile1;

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

                  {/* <ImageLoad

style={{width:90,height:90,borderRadius:15}}
loadingStyle={{ size: 'large', color: 'blue' }}
source={{ uri: profile }}
borderRadius={15}

placeholderStyle={{width:90,height:90,borderRadius:15}}

/> */}
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

                      {/* 
{this.state[boxes] == true ?

 <Icon onPress={() => this.mark_fav(name,profile,category,address,a_r,total_review,doctor_id,true)} name="heart" type="AntDesign" style={{ color: "#007fff", fontSize: 20}} />
*/}

                      {/* : */}

                      <Icon
                        name="hearto"
                        type="AntDesign"
                        style={{color: '#27aae0', fontSize: 20}}
                      />

                      {/* } */}
                    </View>

                    <Text style={{color: 'gray', fontSize: 13}}>
                      {degree} ({category})
                    </Text>

                    {/* <Icon  name="star-half-empty" type="FontAwesome" style={{ color: "#007fff", fontSize:18}} /> */}
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 13,
                        fontWeight: 'bold',
                      }}>
                      Fee ${fee}
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
    uploaddata.append('category', this.props.category);

    let api = Connection + 'rest_apis.php?action=search_doctor1';
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

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
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
                Top Doctors
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

          {this.state.skalton == true ? (
            <SkeletonPlaceholder>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  height: 100,
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginTop: 10,
                  backgroundColor: 'white',
                }}></View>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  height: 100,
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginTop: 10,
                  backgroundColor: 'white',
                }}></View>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  height: 100,
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginTop: 10,
                  backgroundColor: 'white',
                }}></View>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  height: 100,
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginTop: 10,
                  backgroundColor: 'white',
                }}></View>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  height: 100,
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginTop: 10,
                  backgroundColor: 'white',
                }}></View>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  height: 100,
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginTop: 10,
                  backgroundColor: 'white',
                }}></View>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  height: 100,
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginTop: 10,
                  backgroundColor: 'white',
                }}></View>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  height: 100,
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginTop: 10,
                  backgroundColor: 'white',
                }}></View>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  height: 100,
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginTop: 10,
                  backgroundColor: 'white',
                }}></View>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  height: 100,
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginTop: 10,
                  backgroundColor: 'white',
                }}></View>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  height: 100,
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginTop: 10,
                  backgroundColor: 'white',
                }}></View>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  height: 100,
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginTop: 10,
                  backgroundColor: 'white',
                }}></View>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  height: 100,
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginTop: 10,
                  backgroundColor: 'white',
                }}></View>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  height: 100,
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginTop: 10,
                  backgroundColor: 'white',
                }}></View>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  height: 100,
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginTop: 10,
                  backgroundColor: 'white',
                }}></View>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  height: 100,
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginTop: 10,
                  backgroundColor: 'white',
                  marginBottom: 20,
                }}></View>
            </SkeletonPlaceholder>
          ) : (
            <View>
              <ScrollView>
                {this.state.data1 == '' ? (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: height / 1.5,
                    }}>
                    <Text style={{color: 'black'}}>
                      No Doctor found of this category!
                    </Text>
                  </View>
                ) : (
                  <View style={{paddingBottom: 20, marginTop: 20}}>
                    {this.createtable1()}
                  </View>
                )}
              </ScrollView>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
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

export default Doctor_By_Category;

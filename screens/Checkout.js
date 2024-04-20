import {Row} from 'native-base';
import React, {Component} from 'react';
import RadioForm from 'react-native-simple-radio-button';

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

var hobbies = [
  {label: 'Delivery', value: 0},
  {label: 'Pick-Up', value: 1},
];
class All_Providers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data5: [],
      search: this.props.search,
      skalton: false,
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

    // console.log("aaaaaaaaaaaaa", this.prop);
    let parsed = JSON.parse(user);
    let name = parsed[0].name;
    let id = parsed[0].id;

    this.setState({
      name: name,
      id: id,
    });

    this.doctors_all_fav();
  };

  doctors_all_fav = () => {
    let api = Connection + 'rest_apis.php?action=all_doctors_clinics';
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
        console.log('mondddddddddddayyyyyyyyyy', record);

        let len = record.length;

        if (record != 'fail') {
          for (let i = 0; i < len; i++) {
            let lat1 = record[i].lat;
            let lng1 = record[i].lng;
            let lat = parseFloat(lat1);
            let lng = parseFloat(lng1);

            if (lat1 != '' && lat1 != null) {
              table.push(record[i]);
            } else {
              this.setState({
                data5: [],
                skalton: false,
              });
            }
          }

          this.setState({
            data5: table,
            skalton: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
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
        let app = record1[i].app;
        let profile1 = record1[i].profile;
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
                  <ImageLoad
                    style={{width: 70, height: 70, borderRadius: 70}}
                    loadingStyle={{size: 'large', color: 'blue'}}
                    source={{uri: profile}}
                    borderRadius={70}
                    placeholderStyle={{width: 70, height: 70, borderRadius: 70}}
                  />
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
                    style={{color: 'gray', fontSize: 13, fontWeight: '400'}}>
                    {category}
                  </Text>

                  <View
                    style={{
                      width: 100,
                      height: 26,
                      backgroundColor: '#781517',
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

  Role_change = () => {};

  render() {
    return (
      <>
        <StatusBar backgroundColor="#781517" barStyle="light-content" />
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 15,
              backgroundColor: '#781517',
              paddingHorizontal: 15,
              borderBottomColor: 'gray',
              borderBottomWidth: 0.5,
            }}>
            <Icon
              onPress={() => Actions.pop()}
              name="arrow-back"
              type="MaterialIcons"
              style={{color: 'white', fontSize: 24}}
            />
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
              Your Checkout
            </Text>
            <Text style={{fontSize: 22, fontWeight: 'bold', color: 'black'}}>
              {' '}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 15,
              color: '#781517',
              fontWeight: 'bold',
              paddingHorizontal: 20,
              marginTop: 15,
              marginBottom: 10,
            }}>
            Delivery Option
          </Text>
          <View style={{marginTop: 20, marginLeft: 20}}>
            <RadioForm
              onPress={value => {
                this.Role_change(value);
              }}
              labelHorizontal={true}
              formHorizontal={true}
              selectedButtonColor={'#781517'}
              buttonSize={10}
              disabled={false}
              hobbies
              initial={1}
              buttonColor={'gray'}
              buttonOuterColor={'black'}
              labelStyle={{color: 'black', marginRight: 25}}
              radio_props={hobbies}
              animation={false}
            />
          </View>

          {/* <TouchableOpacity activeOpacity={0.8}   
style={{width:width/1.1,alignSelf:'center',backgroundColor:'white',paddingHorizontal:10,paddingVertical:10,borderRadius:10,marginTop:10,marginBottom:5, shadowOffset: { width: 1, height: 1, }, shadowOpacity: 0, shadowRadius: 1, elevation: 1}}>
<View style={{flexDirection:'row',alignItems:'center',}}>

 
 
                    <Icon onPress={() => Actions.pop()} name="home" type="Entypo" style={{ color: "gray", fontSize: 24 }} />
 
 
  
<View style={{marginLeft:13,width:'90%'}}>
 
       <Text style={{color:'black',fontWeight:'bold',fontSize:16}}>Hamza Shabir</Text>

 

      
 

<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',}}>
   
   <Text style={{color:'gray',fontSize:13}}>Circular Road, Narowal</Text>

  
  
   <Icon

name="edit"
type="Entypo"
style={{ color: "gray", fontSize: 18,  }}
/>

        </View>
      
</View>
</View>
 
</TouchableOpacity> */}

          <Text
            style={{
              fontSize: 15,
              color: '#781517',
              fontWeight: 'bold',
              paddingHorizontal: 20,
              marginTop: 15,
              marginBottom: 10,
            }}>
            Contact Number
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: width / 1.1,
              alignSelf: 'center',
              backgroundColor: 'white',
              paddingHorizontal: 10,
              paddingVertical: 15,
              borderRadius: 10,
              marginTop: 10,
              marginBottom: 5,
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0,
              shadowRadius: 1,
              elevation: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Icon
                onPress={() => Actions.pop()}
                name="home"
                type="Entypo"
                style={{color: 'gray', fontSize: 24}}
              />

              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 16,
                  width: '80%',
                }}>
                +92-348-6694823
              </Text>

              <Icon
                name="edit"
                type="Entypo"
                style={{color: 'gray', fontSize: 18}}
              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 15,
              color: '#781517',
              fontWeight: 'bold',
              paddingHorizontal: 20,
              marginTop: 15,
              marginBottom: 10,
            }}>
            Upload Perscription
          </Text>
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Image
                source={require('../assets/No_appointment.png')}
                resizeMode="contain"
                style={{width: 50, height: 50}}
              />

              {/* <Text style={{color:'black',fontWeight:'bold',fontSize:16,width:'80%'}}>+92-348-6694823</Text> */}

              <Icon
                name="camera"
                type="AntDesign"
                style={{color: 'gray', fontSize: 24}}
              />
            </View>
          </TouchableOpacity>
          <Text style={{fontSize: 12, color: 'gray', paddingHorizontal: 20}}>
            590 * 600 or larger recommended
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: 'gray',
              paddingHorizontal: 20,
              marginBottom: 10,
            }}>
            Less than 1 MB
          </Text>

          {/* 

<Text style={{ fontSize: 15, color: '#781517', fontWeight: 'bold',paddingHorizontal:20,marginTop:15,marginBottom:10 }}>Product List</Text>
<TouchableOpacity activeOpacity={0.8}   
style={{width:width/1.1,alignSelf:'center',backgroundColor:'white',paddingHorizontal:10,paddingVertical:10,borderRadius:10,marginTop:10,marginBottom:5, shadowOffset: { width: 1, height: 1, }, shadowOpacity: 0, shadowRadius: 1, elevation: 1}}>
<View style={{flexDirection:'row',alignItems:'center',}}>

 

<View style={{alignItems:'center',justifyContent:'center'}}>
<Image source={require("../assets/p2.jpg")} style={{width:60,height:60,borderRadius:100}}/>
 
</View>

                 
<View style={{marginLeft:13,width:'65%'}}>
   <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
       <Text style={{color:'black',fontWeight:'bold',fontSize:16}}>Alboard 100 mg</Text>

 


      
   </View>

<View style={{flexDirection:'row', width:'100%', alignItems:'center',justifyContent:'space-between',}}>
    <View>
   <Text style={{color:'gray',fontSize:13}}>USD 10 * 1</Text>

  
  
        <Text style={{color:'#781517',fontSize:13,fontWeight:'bold' }}>$14</Text>
        </View>
       

        </View>
</View>
</View>
 
</TouchableOpacity>


<TouchableOpacity activeOpacity={0.8}   
style={{width:width/1.1,alignSelf:'center',backgroundColor:'white',paddingHorizontal:10,paddingVertical:10,borderRadius:10,marginTop:10,marginBottom:5, shadowOffset: { width: 1, height: 1, }, shadowOpacity: 0, shadowRadius: 1, elevation: 1}}>
<View style={{flexDirection:'row',alignItems:'center',}}>

 

<View style={{alignItems:'center',justifyContent:'center'}}>
<Image source={require("../assets/p1.jpg")} style={{width:60,height:60,borderRadius:100}}/>
 
</View>

               
<View style={{marginLeft:13,width:'65%'}}>
   <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
       <Text style={{color:'black',fontWeight:'bold',fontSize:16}}>Alboard 100 mg</Text>

 


      
   </View>

<View style={{flexDirection:'row', width:'100%', alignItems:'center',justifyContent:'space-between',}}>
    <View>
   <Text style={{color:'gray',fontSize:13}}>USD 10 * 1</Text>

  
  
        <Text style={{color:'#781517',fontSize:13,fontWeight:'bold' }}>$14</Text>
        </View>
       

        </View>
</View>
</View>
 
</TouchableOpacity> */}
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
              <ScrollView>
                {/* {this.state.data5 == "" ?

                <View>
                  <Image source={require("../assets/No_appointment.png")} style={{ width: width / 1.3, height: height / 3.7, alignSelf: 'center', marginTop: 200, resizeMode: 'contain' }} />
                  <Text style={{ color: 'black', textAlign: 'center', marginTop: 30, fontSize: 16 }}>No doctor found.</Text>

                 
                </View>
                :
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={{ marginBottom: 60, flexDirection: 'row', flexWrap: 'wrap', width: width / 1.1, alignSelf: 'center' }}>
                    {this.createtable5()}
                  </View>
                </ScrollView>

              } */}

                <View style={{marginBottom: 80}}></View>
              </ScrollView>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: width,
              paddingHorizontal: 15,
              position: 'absolute',
              bottom: 0,
              backgroundColor: 'white',
            }}>
            {/* <View style={{ flexDirection:'row', backgroundColor:'white' , alignItems:'center',justifyContent:'center',  }}>
<Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>Item: 5</Text>
<Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15,marginLeft:20 }}>Total: <Text style={{color: '#781517', fontWeight: 'bold', fontSize: 15}}>24$</Text></Text>


                                   
                                       </View> */}

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                Actions.Patient_Tab_Screen();
              }}
              style={{
                width: width / 1.1,
                marginBottom: 10,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 13,
                borderRadius: 100,
                backgroundColor: '#781517',
                marginTop: 20,
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 3,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
                Request for Medicine
              </Text>
            </TouchableOpacity>
          </View>
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


import { Row } from 'native-base';
import React, { Component } from 'react';

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
  Platform
} from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';
import { Actions } from 'react-native-router-flux';
// import messaging from '@react-native-firebase/messaging'
import Connection from "../connection";
import ImageLoad from 'react-native-image-placeholder';
import { connect } from "react-redux";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Rating, AirbnbRating } from 'react-native-ratings';
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height


class Patient_Home extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      data5: [],
      skalton: false,
      appState: AppState.currentState,
    }
  }


  online = () => {

    let uploaddata = new FormData();
    uploaddata.append("id", this.state.id);
    let api = Connection + "rest_apis.php?action=update_online";
    console.log("pass => ", api);
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        otherHeader: "foo",
      },
      body: uploaddata,
    })
      .then((response) => response.json())
      .then((response) => {

      })
      .catch((error) => {
        console.error(error);
      });

  };





  offline = () => {

    let uploaddata = new FormData();

    uploaddata.append("id", this.state.id);

    let api = Connection + "rest_apis.php?action=update_offline";
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        otherHeader: "foo",
      },
      body: uploaddata,
    })
      .then((response) => response.json())
      .then((response) => {

      })
      .catch((error) => {
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
      console.log(api)
      fetch(api, {
        method: 'POST',
        headers: {
          "Content-Type": "multipart/form-data",
          "otherHeader": "foo",
        },
        body: uploaddata,
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response.response);
          let hasRecord = response.response;
          if (hasRecord == "fail") {

          }
          else {
            let api = Connection + 'rest_apis.php?action=call_status_change';
            console.log(api)
            fetch(api, {
              method: 'POST',
              headers: {
                "Content-Type": "multipart/form-data",
                "otherHeader": "foo",
              },
              body: uploaddata,
            })
              .then((response) => response.json())
              .then((response) => {
                console.log("Calling status  ", response.response);
              })
            // console.log("calllllllll22222222222222")
            let receiver = hasRecord[0].sender_name
            let receiver_image = hasRecord[0].sender_image
            let receiver_id = hasRecord[0].sender_id
            let sender_id = hasRecord[0].receiver
            let type = hasRecord[0].type
            if (receiver_image != null) {
              receiver_image = Connection + 'images/' + receiver_image
            }
            let room = hasRecord[0].room
            // console.log("calllllllll", room)
            if (type == "audio") {
              Actions.pick_audio_call({ receiver: receiver, receiver_image: receiver_image, room: room, sender_id: sender_id, receiver_id: receiver_id, role: role })
            }
            else {
              Actions.pick_video_call({ receiver: receiver, receiver_image: receiver_image, room: room, sender_id: sender_id, receiver_id: receiver_id, role: role })
            }
          }

        })
        .catch((error) => {
          console.error(error);
        })
    }

  }


  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!', nextAppState)
      // this.check_call()

    }
    this.setState({ appState: nextAppState });

    if (nextAppState === "active") {
      console.log("ggg", nextAppState)
      this.check_call()
      this.online()

    } else {
      console.log("hhh", nextAppState)
      this.offline()
    }



    console.log('22', nextAppState)

  }



  // componentDidMount = async () => {

  //   console.log("redux", this.props.Status2)
  //   let aa = "aas"
  //   this.props.Status1(aa)



  //   let user = await AsyncStorage.getItem('customer');

  //   let parsed = JSON.parse(user);
  //   let name = parsed[0].name;
  //   let id = parsed[0].id;
  //   let latitude = parsed[0].lat;
  //   let longitude = parsed[0].lng;
  //   let lat = parseFloat(latitude);
  //   let lng = parseFloat(longitude);
  //   let profile1 = parsed[0].profile;
  //   console.log("profile1", profile1);

  //   let profile = Connection + 'images/' + profile1
  //   console.log("hdbbh =>", profile)

  //   this.setState({
  //     name: name,
  //     id: id,
  //     image1: profile,
  //     lat: lat,
  //     lng: lng,

  //   })
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //   });

  //   const settings = await messaging().requestPermission();

  //   if (settings) {
  //     await messaging().registerDeviceForRemoteMessages();

  //     messaging().onNotificationOpenedApp(remoteMessage => {
  //       console.log(
  //         'Notification caused app to open from background state:',
  //         remoteMessage.notification,
  //       );
  //       console.log("Tapped")
  //     });
  //     messaging().onMessage((payload) => {
  //       console.log('payload', JSON.stringify(payload))
  //       // alert(JSON.stringify(payload))
  //       this.setState({ noti: JSON.stringify(payload) })
  //     });
  //     //  console.log(this.state.noti)

  //     messaging().getToken().then((currentToken) => {
  //       if (currentToken) {
  //         this.setState({ token: currentToken })
  //         this.update_fcm_token(id, currentToken)
  //         console.log('current tokens', currentToken)
  //         //   console.log('notificaiton data:',this.state.noti)
  //       } else {
  //         // alert(this.props.No_Instance_ID_token);
  //       }
  //     }).catch((err) => {
  //       // alert(this.props.An_error_occurred_while_retrieving_token + err);
  //       console.log(err)
  //     });
  //     console.log('Permission settings:', settings);
  //   } else {
  //     console.log('Permission settings:', settings);

  //   }

  //   this.doctors_all_fav()

  // }





  doctors_all_fav = () => {

    let api = Connection + "rest_apis.php?action=all_doctors";
    console.log("pass => ", api);
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        otherHeader: "foo",
      },
      // body: uploaddata,
    })
      .then((response) => response.json())
      .then((response) => {
        let table = [];
        let record = response.response
        let len = record.length;

        if (record != 'fail') {



          this.setState({
            data5: record,
            skalton: false
          })
        }

      })
      .catch((error) => {
        console.error(error);
      });

  };






  update_fcm_token = (val1, val2) => {

    let uploaddata = new FormData();
    uploaddata.append("id", val1);
    uploaddata.append("fcm_token", val2);

    let api = Connection + "rest_apis.php?action=update_fcm_token";
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        otherHeader: "foo",
      },
      body: uploaddata,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response.response);

        if (response.response == "fail") {
          this.setState({
            spinner: false,
          });
        } else {

          this.setState({
            spinner: false,
          });






        }
      })
      .catch((error) => {
        console.error(error);
      });

  };




  createtable1 = () => {
    let table = []
    let record1 = this.state.data5
    let len = record1.length
    if (record1 != 'fail') {
      for (let i = 0; i < len; i++) {
        let name = record1[i].name
        let category = record1[i].category
        let fee = record1[i].fee
        let address = record1[i].address
        let fcm_token = record1[i].fcm_token
        let doctor_id = record1[i].id
        let lat1 = record1[i].lat
        let lng1 = record1[i].lng
        let lat = parseFloat(lat1);
        let lng = parseFloat(lng1);
        let experience = record1[i].experience
        let avg_rating = record1[i].avg_rating
        let total_review = record1[i].total_review
        let a_r = Number(avg_rating).toFixed(2);
        let degree = record1[i].degree
        let license_number = record1[i].license_number
        let c_name = record1[i].c_name
        let appointment = record1[i].appointment
        let s_key = record1[i].s_key
        let paypal = record1[i].paypal
        let access = record1[i].access
        let online = record1[i].online
        let email = record1[i].email
        let app = record1[i].app
        let profile1 = record1[i].profile
        let profile = Connection + 'images/' + profile1
        table.push(<View>
          {

            <TouchableOpacity activeOpacity={0.8} onPress={() => Actions.Doctor_Appointment_Profile({ app: app, fcm_token: fcm_token, s_key: s_key, paypal: paypal, access: access, name1: name, profile: profile, category: category, doctor_id: doctor_id, experience: experience, fee: fee, address: address, lat: lat, lng: lng, total_review: total_review, a_r: a_r, license_number: license_number, degree: degree, c_name: c_name, appointment: appointment })}
              style={{ width: width / 1.1, alignSelf: 'center', backgroundColor: 'white', borderRadius: 8, flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 10, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginTop: 15, borderWidth: 1, borderColor: '#781517' }}>
              <View style={{ width: 70, height: 70, }}>
                <ImageLoad
                  style={{
                    width: 70, height: 70, borderRadius: 16, borderWidth: 3,
                    borderColor: '#781517'
                  }}
                  loadingStyle={{ size: 'large', color: 'blue' }}
                  source={{ uri: profile }}
                  borderRadius={12}
                  placeholderStyle={{
                    width: 70, height: 70, borderRadius: 16, borderWidth: 3,
                    borderColor: '#781517'
                  }}
                />

              </View>
              <View style={{ marginLeft: 10, width: '77%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingRight: 10 }}>
                  <View>
                    <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', }} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
                    <Text style={{ color: 'gray', fontSize: 13, fontWeight: '400' }}>{category}</Text>

                  </View>
                  <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                      <Icon name="star" type="AntDesign" style={{ color: "gold", fontSize: 13 }} />
                      <Text style={{ color: 'black', fontSize: 13, fontWeight: '400' }}> {a_r}</Text>
                    </View>
                    <View style={{ width: 60, height: 26, backgroundColor: '#781517', marginTop: 10, borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>

                      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>View</Text>
                    </View>
                  </View>

                </View>


              </View>
            </TouchableOpacity>




          }
        </View>
        )
      }
      return table
    }
    else {
      let img = []
      img.push(<View style={{ flex: 1, justifyContent: 'center' }} >
        {
          <View>

          </View>
        }</View>)
      return img
    }
  }








  CheckConnectivity = () => {
    // For Android devices
    if (Platform.OS === "android") {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          alert("You are online!");
        } else {
          alert("You are offline!");
        }
      });
    } else {
      // For iOS devices
      NetInfo.isConnected.addEventListener(
        "connectionChange",
        this.handleFirstConnectivityChange
      );
    }
  };

  handleFirstConnectivityChange = isConnected => {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );

    if (isConnected === false) {
      alert("You are offline!");
    } else {
      alert("You are online!");
    }
  };




  render() {


    return (
      <View style={{ flex: 1, backgroundColor:'white'  }}>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',paddingHorizontal:15,paddingVertical:7 }}>
        
          <Image style={{width:45,height:45, }} resizeMode="contain" source={require('../assets/Speak2Med_logo.png')}/>
        
          <Text style={{ color: '#781517', fontSize: 20, fontWeight: 'bold' }}>Home</Text>
         
          <Text style={{ color: '#781517', fontSize: 20, fontWeight: 'bold' }}>   </Text>

     
 
            {/* <Icon    name="search" type="FontAwesome" style={{ color: '#781517', fontSize: 25, borderRadius: 10 }} /> */}


          </View>
     

          <Text style={{ color: '#781517', fontWeight: 'bold', fontSize: 18,paddingHorizontal:15 }}>Hello, Hamza Bashir</Text>
          
          <View style={{width:width/1.1,alignSelf:'center', borderRadius:10,flexDirection:'row', paddingVertical:20,marginTop:20,}}>
                      <View style={{width:'33%', paddingHorizontal:15, alignSelf:'center', alignItems:'center',flexDirection:'row', borderRightWidth:0.3,borderColor:'#bebebe'}}>
                     
                        <View style={{ width:'100%'}}> 
                        <Text style={{color:'#781517',fontSize:20,fontWeight:'bold', }}>08+</Text>

                          <Text style={{color:'#781517',fontSize:12,fontWeight:'400', }}>Active Orders</Text>

                        </View>
                      </View>


                      <View style={{ borderRightWidth:0.3,borderColor:'#bebebe'}}></View>


                      <View style={{width:'33%', paddingHorizontal:15, alignSelf:'center', alignItems:'center',flexDirection:'row', borderRightWidth:0.3,borderColor:'#bebebe'}}>
                     
                     <View style={{ width:'100%'}}> 
                     <Text style={{color:'#781517',fontSize:20,fontWeight:'bold', }}>12+</Text>

                       <Text style={{color:'#781517',fontSize:12,fontWeight:'400', }}>Deliver Orders</Text>

                     </View>
                   </View>

                   <View style={{width:'33%', paddingHorizontal:15, alignSelf:'center', alignItems:'center',flexDirection:'row',}}>
                     
                     <View style={{ width:'100%'}}> 
                     <Text style={{color:'#781517',fontSize:20,fontWeight:'bold', }}>$120</Text>

                       <Text style={{color:'#781517',fontSize:12,fontWeight:'400', }}>Total Earning</Text>

                     </View>
                   </View>
                  </View>
          
          
        

          <View style={{ paddingHorizontal: 15, marginTop: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

<Text style={{ color: '#781517', fontWeight: 'bold', fontSize: 18, }}>Medicine Requests</Text>
<Text style={{ color: '#781517', fontWeight: 'bold', fontSize: 16, }}>    </Text>
</View>
<ScrollView>
<View style={{backgroundColor:'white',width:width/1.1,alignSelf:'center',borderRadius:8,paddingHorizontal:15,paddingVertical:10,shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,marginTop:15}}>
<View style={{flexDirection:'row',alignItems:'center', }}>
 
<Image style={{ width:50, height:50, borderRadius: 8}} source={require('../assets/carlo.jpg')} />
 
    <View style={{marginLeft:10}}>
        <Text style={{color:'#781517',fontWeight:'bold',fontSize:16}}>Sheikar Dawan</Text>
        <View style={{flexDirection:'row',alignItems:'center', }}>
                 <Icon name="location-pin" type="Entypo" style={{ color: "gray", fontSize: 16}} />                                 
    
    
             <View style={{marginLeft:5}}>
                 <Text style={{color:'gray', fontSize:12,fontWeight:'bold'}}>Taimoor Chok, Gujrat</Text>
              
             </View>
         </View>
        {/* <Text style={{color:'#bebebe',fontSize:14}}>$25</Text> */}

    </View>
 
</View>


<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',paddingHorizontal:15,  }}>

 
<TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.product_detail() }}
          style={{ width:  '47%', marginBottom:10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, borderRadius: 100, backgroundColor: '#781517',borderWidth:1, borderColor: '#781517', marginTop:20,  marginTop:20, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3,   }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>View Details</Text>
        </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8}  
          style={{ width:  '47%', marginBottom:10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, borderRadius: 100,borderWidth:2, borderColor: '#781517', marginTop:20,    }}>
          <Text style={{ color: '#781517', fontWeight: 'bold', fontSize: 15 }}>Reject</Text>
        </TouchableOpacity>


        </View>
 
</View>




<View style={{backgroundColor:'white',width:width/1.1,alignSelf:'center',borderRadius:8,paddingHorizontal:15,paddingVertical:10,shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,marginTop:15}}>
<View style={{flexDirection:'row',alignItems:'center', }}>
 
<Image style={{ width:50, height:50, borderRadius: 8}} source={require('../assets/carlo.jpg')} />
 
<View style={{marginLeft:10}}>
        <Text style={{color:'#781517',fontWeight:'bold',fontSize:16}}>Sheikar Dawan</Text>
        <View style={{flexDirection:'row',alignItems:'center', }}>
                 <Icon name="location-pin" type="Entypo" style={{ color: "gray", fontSize: 16}} />                                 
    
    
             <View style={{marginLeft:5}}>
                 <Text style={{color:'gray', fontSize:12,fontWeight:'bold'}}>Taimoor Chok, Gujrat</Text>
              
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

<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',paddingHorizontal:15,  }}>

 
<TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.product_detail() }}
          style={{ width:  '47%', marginBottom:10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, borderRadius: 100, backgroundColor: '#781517',borderWidth:1, borderColor: '#781517', marginTop:20,  marginTop:20, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3,   }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>View Details</Text>
        </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8}  
          style={{ width:  '47%', marginBottom:10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, borderRadius: 100,borderWidth:2, borderColor: '#781517', marginTop:20,    }}>
          <Text style={{ color: '#781517', fontWeight: 'bold', fontSize: 15 }}>Reject</Text>
        </TouchableOpacity>


        </View>



 
 
</View>



<View style={{backgroundColor:'white',marginBottom:60, width:width/1.1,alignSelf:'center',borderRadius:8,paddingHorizontal:15,paddingVertical:10,shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,marginTop:15}}>
<View style={{flexDirection:'row',alignItems:'center', }}>
 
<Image style={{ width:50, height:50, borderRadius: 8}} source={require('../assets/carlo.jpg')} />
 
<View style={{marginLeft:10}}>
        <Text style={{color:'#781517',fontWeight:'bold',fontSize:16}}>Sheikar Dawan</Text>
        <View style={{flexDirection:'row',alignItems:'center', }}>
                 <Icon name="location-pin" type="Entypo" style={{ color: "gray", fontSize: 16}} />                                 
    
    
             <View style={{marginLeft:5}}>
                 <Text style={{color:'gray', fontSize:12,fontWeight:'bold'}}>Taimoor Chok, Gujrat</Text>
              
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


<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',paddingHorizontal:15,  }}>

 
<TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.product_detail() }}
          style={{ width:  '47%', marginBottom:10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, borderRadius: 100, backgroundColor: '#781517',borderWidth:1, borderColor: '#781517', marginTop:20,  marginTop:20, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3,   }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>View Details</Text>
        </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8}  
          style={{ width:  '47%', marginBottom:10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, borderRadius: 100,borderWidth:2, borderColor: '#781517', marginTop:20,    }}>
          <Text style={{ color: '#781517', fontWeight: 'bold', fontSize: 15 }}>Reject</Text>
        </TouchableOpacity>


        </View>



 
 
</View>
</ScrollView>
 




        {this.state.spinner == true &&
          <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(2, 2, 2, 0.8)', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              width: width / 1.2, height: height / 9 - 20, backgroundColor: "white", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
              borderRadius: 6
            }}>
              <UIActivityIndicator color='#781517' />
              <Text style={{ fontSize: 16, color: '#781517', fontWeight: 'bold' }}>Progressing your request</Text>
            </View>
          </View>
        }
      </View>

    )
  }
}

const styles = StyleSheet.create({

  active_button: {
    justifyContent: 'center', alignItems: 'center', paddingVertical: 8, width: width / 2.2, borderBottomWidth: 2, borderColor: '#781517'
  },
  in_active_button: {
    justifyContent: 'center', alignItems: 'center', paddingVertical: 8, width: width / 2.2
  },


  active_text: {
    color: '#781517', fontWeight: '500', fontSize: 14
  },
  in_active_text: {
    color: 'gray', fontWeight: '500', fontSize: 14
  },

})

const mapStateToProps = (state) => {
  return {

    Status2: state.Status2,

  }
}
const mapDispatchToProps = (dispatch) => {
  return {

    Status1: (Status2) => { dispatch({ type: "Status1", payload: Status2 }) },

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Patient_Home);
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
  Modal,
  AsyncStorage,
  ImageBackground,
  Dimensions,
  Picker,
  BackHandler,
  PermissionsAndroid,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Actions } from 'react-native-router-flux';
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';
import { connect } from "react-redux";
import ImageLoad from 'react-native-image-placeholder';
import RBSheet from "react-native-raw-bottom-sheet";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import Connection from "../connection";
// import messaging from '@react-native-firebase/messaging'
import * as ImagePicker from "react-native-image-picker";
import Toast from 'react-native-simple-toast';
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
} from "react-native-popup-dialog";
import LinearGradient from 'react-native-linear-gradient';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

class doctor_Signup extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      email: '',

      password: "",
      name: "",
      image1: null,
      spinner: false,
      imagecheck: false,
      // gender: "",
      currency: "",
      city: "",
      address: "",
      p_name: '',
      license_number: "",
      degree: "",
      category: "Select Category",
      experience: "",
      mobile_number: '',
      multi_image_check: 'false',
      multi_Images: [],
      clinic_name: '',
      fee: '',
      toekn: '',
      image2: null,
      token: '',
      clinic: '',
      r_code: '',
      age: 'Age',
      gender: 'Select Gender',
      visible: false,
      dob: "Date of Birth",
      passhide:true,





    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  onButtonPress = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    // then navigate
    navigate("NewScreen");
  };
  handleBackButtonClick() {
    // BackHandler.exitApp();
    // Actions.pop()
    return true;
  }




  componentDidMount = async () => {
    this.opt_generate()
    // messaging().setBackgroundMessageHandler(async remoteMessage => {
    //   console.log('Message handled in the background!', remoteMessage);
    // });

    // const settings = await messaging().requestPermission();

    // if (settings) {
    //   await messaging().registerDeviceForRemoteMessages();

    //   messaging().onNotificationOpenedApp(remoteMessage => {
    //     console.log(
    //       'Notification caused app to open from background state:',
    //       remoteMessage.notification,
    //     );
    //     console.log("Tapped")
    //   });
    //   messaging().onMessage((payload) => {
    //     console.log('payload', JSON.stringify(payload))
    //     // alert(JSON.stringify(payload))
    //     this.setState({ noti: JSON.stringify(payload) })
    //   });
    //   //  console.log(this.state.noti)

    //   messaging().getToken().then((currentToken) => {
    //     if (currentToken) {
    //       this.setState({ token: currentToken })

    //       console.log('current tokens', currentToken)
    //       //   console.log('notificaiton data:',this.state.noti)
    //     } else {
    //       // alert(this.props.No_Instance_ID_token);
    //     }
    //   }).catch((err) => {
    //     // alert(this.props.An_error_occurred_while_retrieving_token + err);
    //     console.log(err)
    //   });
    //   console.log('Permission settings:', settings);
    // } else {
    //   console.log('Permission settings:', settings);

    // }

  }




  uploadimage1 = async () => {
    ImagePicker.launchImageLibrary({ noData: true, mediaType: 'photo', allowsEditing: true, quality: 0.7 }, (response) => {
      // console.log('response =', response);
      if (response.didCancel) {
        console.log('user cancelled  image picker');
      } else if (response.error) {
        console.log('imagepicker error : ', response.error);
      } else if (response.customButton) {
        console.log('user tapped  custom button : ', response.customButton);
      } else {
        console.log("outdoor image ", response.assets[0].uri)

        let text = response.assets[0].uri
        console.log("outdoor image1111111111 ", text)

        this.setState({ image1: text, imagecheck: true })




      }
      this.RBSheet1.close()

    });
  }



  uploadimage_Camera_1 = async () => {
    ImagePicker.launchCamera({ noData: true, mediaType: 'photo', allowsEditing: true, quality: 0.7 }, (response) => {
      // console.log('response =', response);
      if (response.didCancel) {
        console.log('user cancelled  image picker');
      } else if (response.error) {
        console.log('imagepicker error : ', response.error);
      } else if (response.customButton) {
        console.log('user tapped  custom button : ', response.customButton);
      } else {
        console.log("outdoor image ", response.assets[0].uri)

        let text = response.assets[0].uri
        console.log("outdoor image1111111111 ", text)


        this.setState({ image1: text, imagecheck: true })

      }
      this.RBSheet1.close()

    });
  }





  uploadimage2 = async () => {
    ImagePicker.launchImageLibrary({ noData: true, mediaType: 'photo', allowsEditing: true, quality: 0.7 }, (response) => {
      // console.log('response =', response);
      if (response.didCancel) {
        console.log('user cancelled  image picker');
      } else if (response.error) {
        console.log('imagepicker error : ', response.error);
      } else if (response.customButton) {
        console.log('user tapped  custom button : ', response.customButton);
      } else {
        console.log("outdoor image ", response.assets[0].uri)

        let text = response.assets[0].uri
        console.log("outdoor image1111111111 ", text)

        this.setState({ image2: text, imagecheck: true })




      }
      this.RBSheet6.close()

    });
  }



  uploadimage_Camera_2 = async () => {
    ImagePicker.launchCamera({ noData: true, mediaType: 'photo', allowsEditing: true, quality: 0.7 }, (response) => {
      // console.log('response =', response);
      if (response.didCancel) {
        console.log('user cancelled  image picker');
      } else if (response.error) {
        console.log('imagepicker error : ', response.error);
      } else if (response.customButton) {
        console.log('user tapped  custom button : ', response.customButton);
      } else {
        console.log("outdoor image ", response.assets[0].uri)

        let text = response.assets[0].uri
        console.log("outdoor image1111111111 ", text)


        this.setState({ image2: text, imagecheck: true })

      }
      this.RBSheet6.close()

    });
  }





  requestCameraPermission_1 = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        this.uploadimage_Camera_1();
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };



  Check_PlatForm_1 = () => {
    if (Platform.OS === "ios") {
      this.uploadimage_Camera_1();
      console.log("Platform Ios")
    }
    else {
      this.requestCameraPermission_1();
      console.log("Platform Android")
    }
  }


  requestCameraPermission_2 = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        this.uploadimage_Camera_2();
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };


  Check_PlatForm_2 = () => {
    if (Platform.OS === "ios") {
      this.uploadimage_Camera_2();
      console.log("Platform Ios")
    }
    else {
      this.requestCameraPermission_2();
      console.log("Platform Android")
    }
  }



  select_gender = (val_3) => {
    console.log("valvalvalvalvalvalvalvalvalvalvalval ", val_3)
    this.setState({
      gender: val_3
    })
    this.RBSheet5.close()
  }



  Get_address() {

    let name = this.state.name;
    let password = this.state.password;
    let email = this.state.email;
    let address = this.state.address;
    let gender = this.state.gender;
    let license_number = this.state.license_number;
    let degree = this.state.degree;
    let experience = this.state.experience;
    let mobile_number = this.state.mobile_number;
    let role = this.props.role;
    let fee = this.state.fee;
    let fcm_token = this.state.token;
    let category = this.state.category;
    let dob = this.state.dob;
    let age = this.state.age;

    if (this.state.image1 == null) {
      alert("Please upload your profile image.")

    }
    else if (name == "") {
      alert("Please enter your name");
    } else if (email == "") {
      alert("Please enter your email");
    }

    else if (password == "") {
      alert("Please_enter_your_password");
    }

    else if (address == "") {
      alert('Please enter your address');
    }
    else if (mobile_number == "") {
      alert("Please enter your mobile number.");
    }
    else if (gender == "Select Gender") {
      alert("Please select your gender.");
    }
    else if (category == "Select Category") {
      alert("Please select your category.");
    }

    else if (license_number == "") {
      alert("Please enter your license number.");

    }


    else if (degree == "") {
      alert('Please enter your education.');
    }
    else if (experience == "") {
      alert("Please enter your experience");
    }

    else if (dob == "Date of Birth") {
      alert("Please select your date of birth.");
    }
    else if (gender == "Select Gender") {
      alert("Please select your gender.");
    }
    else if (age == "") {
      alert("Please enter your age.");
    }

    else if (this.state.clinic == '') {
      alert("Please write about your self.")

    } else {


      this.setState({ spinner: true });
      let address = this.state.address;
      let api =
        "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAr6YRTjfl2eKXIJZd97_uw9KpStXFRiCE";

      console.log("pass => ", api);
      fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          otherHeader: "foo",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("pass => ", response);
          let result = response["results"];
          if (result == "") {
            this.setState({
              spinner: false
            })
            alert("Invalid address")
          } else {
            let all = result[0].geometry;
            let location = all.location;
            let lat = location["lat"];
            let lng = location["lng"];

            this.setState({
              lat: lat,
              lng: lng,
            });
            this.setState({ spinner: false });

            this.Sign_Up(lat, lng)


          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

  }

  select_Date = (date) => {

    let dd = date.toISOString().split('T')
    let d1 = dd[0]
    let getAge = Math.floor((new Date() - new Date(d1).getTime()) / 3.15576e+10)

    console.log('getAgegetAgegetAgegetAgegetAge', getAge)
    console.log(d1);
    let d2 = d1.split('-')
    let mm = d2[1]
    let dd_dd = d2[2]
    let yy = d2[0]
    let final_date = mm + '-' + dd_dd + '-' + yy



    console.log(date.toISOString().split('.')[0] + "Z");

    this.setState({
      show: false,
      dob: final_date,
      age: getAge
    })

  }


  showtimepicker1() {
    this.setState({
      show: true,

    })
  };





  select_category = (val_3) => {
    console.log("valvalvalvalvalvalvalvalvalvalvalval ", val_3)
    this.setState({
      category: val_3
    })
    this.RBSheet2.close()
  }





  select_state = (val_3) => {
    console.log("valvalvalvalvalvalvalvalvalvalvalval ", val_3)
    this.setState({
      city: val_3
    })
    this.RBSheet3.close()
  }






  Sign_Up = (val, val1) => {

    const newImage = {
      uri: this.state.image1,
      name: "my_photo.jpg",
      type: "image/jpg",
    };

    let uploaddata = new FormData();
    let dob = this.state.dob;
    let age = this.state.age;
    this.setState({ spinner: true });
    uploaddata.append("name", this.state.name);
    uploaddata.append("email", this.state.email);
    uploaddata.append("mobile_number", this.state.mobile_number);
    uploaddata.append("city", this.state.city);
    uploaddata.append("address", this.state.address);
    uploaddata.append("license_number", this.state.license_number);
    uploaddata.append("degree", this.state.degree);
    uploaddata.append("category", this.state.category);
    uploaddata.append("experience", this.state.experience);
    uploaddata.append("role", this.props.role);
    uploaddata.append("password", this.state.password);
    uploaddata.append("fcm_token", this.state.token);
    uploaddata.append("image", newImage);
    uploaddata.append("lat", val);
    uploaddata.append("lng", val1);
    uploaddata.append("clinic", this.state.clinic);
    uploaddata.append("age", age);
    uploaddata.append("dob", dob);
    uploaddata.append("gender", this.state.gender);


    let api = Connection + "rest_apis.php?action=Add_doctor";
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
        console.log("response", response.response);

        if (response.response == "repeat") {
          this.setState({
            spinner: false,
          });
          alert("This email already exist");
        } else {

          this.setState({
            spinner: false,
          });

          Toast.show("You successfully registered as Doctor!");
          this.opendialogue()
        }
      })
      .catch((error) => {
        console.error(error);
      });

  };







  done = () => {
    this.setState({
      visible: false,
    });
    setTimeout(() => {
      Actions.Patient_Login_Screen({ role: this.props.role });

    }, 100);
  }


  opendialogue = () => {
    this.setState({
      visible: true,
    });
  };



  seePassword = () => {
    console.log("eeeeeeeeeeeee");
    this.setState({
       passhide: !this.state.passhide,
    });
  };

  render() {

    return (


      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : ""}
        style={{ flex: 1 }}>

        <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, backgroundColor: 'white', paddingHorizontal: 15, }}>
                    <Icon onPress={() => Actions.Patient_Login_Screen({role:'pharmacy'})} name="arrow-back" type="MaterialIcons" style={{ color: "#781517", fontSize: 24 }} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#781517', }}>Sign Up</Text>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', }}>    </Text>
                </View>


          <ScrollView>

            <View style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 20, borderRadius: 100, }}>


              {this.state.image1 == null ?
                <TouchableOpacity style={{width:100,height:100,borderRadius:100,alignItems:'center',justifyContent:'center',backgroundColor:'#e6e6e6'}} activeOpacity={0.8}>
            <Icon  name="camera" type="AntDesign" style={{ color: "gray", fontSize: 40 }} />
                 
                </TouchableOpacity>

                :

                <TouchableOpacity activeOpacity={0.8}>
                  <ImageLoad
                    style={{
                      width: 100, height: 100, borderWidth: 2, borderRadius: 150, alignSelf: 'center',
                      borderColor: '#781517'
                    }}
                    loadingStyle={{ size: 'large', color: 'blue' }}
                    source={{ uri: this.state.image1 }}
                    borderRadius={150}
                    placeholderStyle={{
                      width: 100, height: 100, borderWidth: 2, borderRadius: 150,
                      borderColor: '#781517'
                    }}
                  />
                </TouchableOpacity>
              }
              {/* <TouchableOpacity onPress={() => this.RBSheet1.open()} style={{ width: 30, height: 30, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#781517', position: 'absolute', bottom: -10, right: 5 }}>
                <Icon name="camera" type="Entypo" style={{ color: "white", fontSize: 13 }} />
              </TouchableOpacity> */}
            </View>



            <View style={{width: width / 1.1,marginTop:20, height: 50,alignItems:'center',alignSelf:'center'}} >
          <TextInput  onChangeText={name => this.setState({ name })} style={{marginTop: 10,width: width / 1.1, height: 50, backgroundColor: '#e6e6e6', paddingLeft: 20, borderRadius: 28,  alignSelf:'center', color: '#781517', fontWeight: 'bold' }} placeholder="Full Name" placeholderTextColor='gray' />
          {/* <Icon name="email" type="MaterialCommunityIcons" style={{ color: "#781517", fontSize: 24,position:'absolute',left:10,top:20 }} /> */}

            </View>

            <View style={{width: width / 1.1,marginTop:10, height: 50,alignItems:'center',alignSelf:'center'}} >
          <TextInput  onChangeText={email => this.setState({ email })} style={{marginTop: 10,width: width / 1.1, height: 50, backgroundColor: '#e6e6e6', paddingLeft: 20, borderRadius: 28,  alignSelf:'center', color: '#781517', fontWeight: 'bold' }} placeholder="Email" placeholderTextColor='gray' />
          {/* <Icon name="email" type="MaterialCommunityIcons" style={{ color: "#781517", fontSize: 24,position:'absolute',left:10,top:20 }} /> */}

            </View>

            <View style={{width: width / 1.1,marginTop:10, height: 50,alignItems:'center',alignSelf:'center'}} >
          <TextInput  onChangeText={password => this.setState({ password })}   style={{marginTop: 10,width: width / 1.1, height: 50, backgroundColor: '#e6e6e6', paddingLeft: 20, borderRadius: 28,  alignSelf:'center', color: '#781517', fontWeight: 'bold' }} placeholder="Password" placeholderTextColor='gray' />
          {/* <Icon name="lock-outline" type="MaterialCommunityIcons" style={{ color: "#781517", fontSize: 24,position:'absolute',left:10,top:20 }} /> */}

            </View>

            <View style={{width: width / 1.1,marginTop:10, height: 50,alignItems:'center',alignSelf:'center'}} >
          <TextInput  onChangeText={mobile_number => this.setState({ mobile_number })}   style={{marginTop: 10,width: width / 1.1, height: 50, backgroundColor: '#e6e6e6', paddingLeft: 20, borderRadius: 28,  alignSelf:'center', color: '#781517', fontWeight: 'bold' }} placeholder="Phone Number" placeholderTextColor='gray' />
          {/* <Icon name="lock-outline" type="MaterialCommunityIcons" style={{ color: "#781517", fontSize: 24,position:'absolute',left:10,top:20 }} /> */}

            </View>

            <View style={{width: width / 1.1,marginTop:10, height: 50,alignItems:'center',alignSelf:'center'}} >
          <TextInput  onChangeText={gender => this.setState({ gender })}   style={{marginTop: 10,width: width / 1.1, height: 50, backgroundColor: '#e6e6e6', paddingLeft: 20, borderRadius: 28,  alignSelf:'center', color: '#781517', fontWeight: 'bold' }} placeholder="Select Gender" placeholderTextColor='gray' />
          {/* <Icon name="lock-outline" type="MaterialCommunityIcons" style={{ color: "#781517", fontSize: 24,position:'absolute',left:10,top:20 }} /> */}

            </View>

            <View style={{width: width / 1.1,marginTop:10, height: 50,alignItems:'center',alignSelf:'center'}} >
          <TextInput  onChangeText={country => this.setState({ country })}   style={{marginTop: 10,width: width / 1.1, height: 50, backgroundColor: '#e6e6e6', paddingLeft: 20, borderRadius: 28,  alignSelf:'center', color: '#781517', fontWeight: 'bold' }} placeholder="Select Country" placeholderTextColor='gray' />
          {/* <Icon name="lock-outline" type="MaterialCommunityIcons" style={{ color: "#781517", fontSize: 24,position:'absolute',left:10,top:20 }} /> */}

            </View>
            <View style={{width: width / 1.1,marginTop:10, height: 50,alignItems:'center',alignSelf:'center'}} >
          <TextInput  onChangeText={address => this.setState({ address })}   style={{marginTop: 10,width: width / 1.1, height: 50, backgroundColor: '#e6e6e6', paddingLeft: 20, borderRadius: 28,  alignSelf:'center', color: '#781517', fontWeight: 'bold' }} placeholder="Address" placeholderTextColor='gray' />
          {/* <Icon name="lock-outline" type="MaterialCommunityIcons" style={{ color: "#781517", fontSize: 24,position:'absolute',left:10,top:20 }} /> */}

            </View>



            <View style={{width: width / 1.1,marginTop:10, height: 50,alignItems:'center',alignSelf:'center'}} >
          <TextInput  onChangeText={category => this.setState({ category })}   style={{marginTop: 10,width: width / 1.1, height: 50, backgroundColor: '#e6e6e6', paddingLeft: 20, borderRadius: 28,  alignSelf:'center', color: '#781517', fontWeight: 'bold' }} placeholder="Pharmacy Category" placeholderTextColor='gray' />
          {/* <Icon name="lock-outline" type="MaterialCommunityIcons" style={{ color: "#781517", fontSize: 24,position:'absolute',left:10,top:20 }} /> */}

            </View>

            <View style={{width: width / 1.1,marginTop:10, height: 50,alignItems:'center',alignSelf:'center'}} >
          <TextInput  onChangeText={experience => this.setState({ experience })}   style={{marginTop: 10,width: width / 1.1, height: 50, backgroundColor: '#e6e6e6', paddingLeft: 20, borderRadius: 28,  alignSelf:'center', color: '#781517', fontWeight: 'bold' }} placeholder="Shop Registration Number" placeholderTextColor='gray' />
          {/* <Icon name="lock-outline" type="MaterialCommunityIcons" style={{ color: "#781517", fontSize: 24,position:'absolute',left:10,top:20 }} /> */}

            </View>


       



            
            <View style={{width: width / 1.1,marginTop:10, height: 50,alignItems:'center',alignSelf:'center'}} >
          <TextInput  onChangeText={license_number => this.setState({ license_number })}   style={{marginTop: 10,width: width / 1.1, height: 50, backgroundColor: '#e6e6e6', paddingLeft: 20, borderRadius: 28,  alignSelf:'center', color: '#781517', fontWeight: 'bold' }} placeholder="Drug License Number" placeholderTextColor='gray' />
          {/* <Icon name="lock-outline" type="MaterialCommunityIcons" style={{ color: "#781517", fontSize: 24,position:'absolute',left:10,top:20 }} /> */}

            </View>
            <Text style={{ color: 'black', fontSize: 15,paddingHorizontal:15, fontWeight: '700',marginTop:20,marginLeft:10 }}>License Image</Text>

            <TouchableOpacity style={{width:width/1.1,height:180,borderRadius:12,marginTop:15,alignSelf:'center', alignItems:'center',justifyContent:'center',backgroundColor:'#e6e6e6'}} activeOpacity={0.8}>
            <Icon   name="camera" type="AntDesign" style={{ color: "gray", fontSize: 40 }} />
                 
                </TouchableOpacity>

           
            <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Patient_Login_Screen({role:'pharmacy'}) }}
              style={{ width: width / 1.1, alignSelf: 'center', height: 48, backgroundColor: '#781517', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 60 }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Sign Up</Text>
            </TouchableOpacity>




            <RBSheet
              ref={ref => {
                this.RBSheet1 = ref;
              }}
              height={230}
              openDuration={200}
              customStyles={{
                container: {
                  paddingHorizontal: 20
                }
              }}
            >
              <View>
                <Text style={{ fontSize: 18, color: 'black', marginTop: 20 }}>Choose an action</Text>

                <View style={{ flexDirection: 'row', marginTop: 30 }}>


                  <TouchableOpacity onPress={() => this.uploadimage1()} activeOpacity={0.6}>
                    <View style={{ flexDirection: 'column', marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                      <Icon name="images" type="Entypo" style={{ fontSize: 30, color: '#781517', }} />
                      <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', }}>Gallery</Text>
                    </View>
                  </TouchableOpacity>



                  <TouchableOpacity onPress={() => this.Check_PlatForm_1()} activeOpacity={0.6}>
                    <View style={{ flexDirection: 'column', marginLeft: 40, justifyContent: 'center', alignItems: 'center' }}>
                      <Icon name="camera" type="Entypo" style={{ fontSize: 30, color: '#781517', }} />
                      <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', }}>Camera</Text>
                    </View>
                  </TouchableOpacity>


                </View>

              </View>
            </RBSheet>

            <RBSheet
              ref={ref => {
                this.RBSheet6 = ref;
              }}
              height={230}
              openDuration={200}
              customStyles={{
                container: {
                  paddingHorizontal: 20
                }
              }}
            >
              <View>
                <Text style={{ fontSize: 18, color: 'black', marginTop: 20 }}>Choose an action</Text>

                <View style={{ flexDirection: 'row', marginTop: 30 }}>

                  <TouchableOpacity onPress={() => this.uploadimage2()} activeOpacity={0.6}>
                    <View style={{ flexDirection: 'column', marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                      <Icon name="images" type="Entypo" style={{ fontSize: 30, color: '#781517', }} />
                      <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', }}>Gallery</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.Check_PlatForm_2()} activeOpacity={0.6}>
                    <View style={{ flexDirection: 'column', marginLeft: 40, justifyContent: 'center', alignItems: 'center' }}>
                      <Icon name="camera" type="Entypo" style={{ fontSize: 30, color: '#781517', }} />
                      <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', }}>Camera</Text>
                    </View>
                  </TouchableOpacity>


                </View>

              </View>
            </RBSheet>

            <RBSheet
              ref={ref => {
                this.RBSheet5 = ref;
              }}
              height={120}
              openDuration={120}
              customStyles={{
                container: {
                  paddingHorizontal: 20
                }
              }}
            >
              <View>
                <TouchableOpacity onPress={() => this.select_gender('Male')} activeOpacity={0.8}>
                  <Text style={{ fontSize: 18, color: 'black', marginTop: 20, textAlign: 'center' }}>Male</Text>
                </TouchableOpacity>

                <View style={{ borderBottomWidth: 1, borderColor: 'lightgray', marginTop: 10 }}></View>

                <TouchableOpacity onPress={() => this.select_gender('Female')} activeOpacity={0.8}>
                  <Text style={{ fontSize: 18, color: 'black', textAlign: 'center', marginTop: 10 }}>Female</Text>
                </TouchableOpacity>
              </View>
            </RBSheet>


          </ScrollView>
          <RBSheet
            ref={ref => {
              this.RBSheet2 = ref;
            }}
            closeOnDragDown={true}
            height={150}
            openDuration={120}
            customStyles={{
              container: {
                paddingHorizontal: 20
              },
              draggableIcon: {
                backgroundColor: "lightgray",
              },
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity onPress={() => this.select_category('Mental Health')} activeOpacity={0.8}>
                <Text style={{ fontSize: 18, color: 'black', marginTop: 20, textAlign: 'center' }}>Mental Health</Text>
              </TouchableOpacity>

              <View style={{ borderBottomWidth: 1, borderColor: 'lightgray', marginTop: 10 }}></View>

              <TouchableOpacity onPress={() => this.select_category('SUD')} activeOpacity={0.8}>
                <Text style={{ fontSize: 18, color: 'black', textAlign: 'center', marginTop: 10 }}>SUD</Text>
              </TouchableOpacity>
              <View style={{ borderBottomWidth: 1, borderColor: 'lightgray', marginTop: 10 }}></View>

            </ScrollView>
          </RBSheet>

          <Dialog
            style={{ backgroundColor: 'black', padding: 0 }}
            width={"90%"}
            visible={this.state.visible}
            dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}>

            <DialogContent style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
              <Image source={require("../assets/Neuro_Logo-removebg-preview.png")} style={{ width: 80, height: 80, alignSelf: 'center', marginTop: 20, }} />
              <Text style={{ fontSize: 20, textAlign: 'center', color: 'black', fontWeight: 'bold', marginTop: 10 }}>Congratulation!</Text>
              <Text style={{ fontSize: 13, textAlign: 'center', color: 'gray', fontWeight: 'bold', marginTop: 20 }}>Your account has been successfully created</Text>
              <Text style={{ fontSize: 13, textAlign: 'center', color: 'gray', fontWeight: 'bold', marginTop: 3 }}>Now you can give consult to your patients</Text>
              <TouchableOpacity onPress={() => { this.done() }}
                style={{ width: "85%", marginBottom: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: '#781517', paddingVertical: 15, alignSelf: 'center', marginTop: 20 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Done</Text>
              </TouchableOpacity>
            </DialogContent>
          </Dialog>







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
      </KeyboardAvoidingView>

    )
  }
}


const styles = StyleSheet.create({
  textipu: {
    borderWidth: 1, color: 'black', borderColor: 'lightgray', height: 40, marginTop: 10, borderRadius: 6, padding: 10
  },
  textipu1: {
    borderWidth: 1, color: 'black', borderColor: 'lightgray', height: 80, textAlignVertical: 'top', marginTop: 10, borderRadius: 6, padding: 10
  },
  picker: {
    borderWidth: 1, color: 'black', borderColor: 'lightgray', height: 40,
  },
  ImageAvater3: {
    width: '100%',
    height: 150,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 12
  },
  ImageAvater4: {
    width: '100%',
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 12,
    backgroundColor: 'lightgray',
    paddingVertical: 5
  },
})




export default doctor_Signup;
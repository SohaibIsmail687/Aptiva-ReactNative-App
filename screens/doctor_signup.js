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
  Modal,
  AsyncStorage,
  ImageBackground,
  Dimensions,
  Picker,
  BackHandler,
  PermissionsAndroid,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {Actions} from 'react-native-router-flux';
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
import {connect} from 'react-redux';
import ImageLoad from 'react-native-image-placeholder';
import RBSheet from 'react-native-raw-bottom-sheet';
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
import Connection from '../connection';
import messaging from '@react-native-firebase/messaging';
import * as ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
} from 'react-native-popup-dialog';
import LinearGradient from 'react-native-linear-gradient';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class doctor_Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',

      password: '',
      name: '',
      image1: null,
      spinner: false,
      imagecheck: false,
      passhide: true,
      // gender: "",
      currency: '',
      city: '',
      address: '',
      p_name: '',
      license_number: '',
      degree: '',
      category: 'Select Category',
      experience: '',
      mobile_number: '',
      multi_image_check: 'false',
      multi_Images: [],
      clinic_name: '',
      fee: 'Insurances Accepted',
      toekn: '',
      image2: null,
      token: '',
      clinic: '',
      r_code: '',
      age: 'Age',
      gender: 'Select Gender',
      visible: false,
      dob: 'Date of Birth',
      passhide: true,
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
    // BackHandler.exitApp();
    // Actions.pop()
    return true;
  }

  componentDidMount = async () => {
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
  };

  uploadimage1 = async () => {
    ImagePicker.launchImageLibrary(
      {noData: true, mediaType: 'photo', allowsEditing: true, quality: 0.7},
      response => {
        // console.log('response =', response);
        if (response.didCancel) {
          console.log('user cancelled  image picker');
        } else if (response.error) {
          console.log('imagepicker error : ', response.error);
        } else if (response.customButton) {
          console.log('user tapped  custom button : ', response.customButton);
        } else {
          console.log('outdoor image ', response.assets[0].uri);

          let text = response.assets[0].uri;
          console.log('outdoor image1111111111 ', text);

          this.setState({image1: text, imagecheck: true});
        }
        this.RBSheet1.close();
      },
    );
  };

  uploadimage_Camera_1 = async () => {
    ImagePicker.launchCamera(
      {noData: true, mediaType: 'photo', allowsEditing: true, quality: 0.7},
      response => {
        // console.log('response =', response);
        if (response.didCancel) {
          console.log('user cancelled  image picker');
        } else if (response.error) {
          console.log('imagepicker error : ', response.error);
        } else if (response.customButton) {
          console.log('user tapped  custom button : ', response.customButton);
        } else {
          console.log('outdoor image ', response.assets[0].uri);

          let text = response.assets[0].uri;
          console.log('outdoor image1111111111 ', text);

          this.setState({image1: text, imagecheck: true});
        }
        this.RBSheet1.close();
      },
    );
  };

  uploadimage2 = async () => {
    ImagePicker.launchImageLibrary(
      {noData: true, mediaType: 'photo', allowsEditing: true, quality: 0.7},
      response => {
        // console.log('response =', response);
        if (response.didCancel) {
          console.log('user cancelled  image picker');
        } else if (response.error) {
          console.log('imagepicker error : ', response.error);
        } else if (response.customButton) {
          console.log('user tapped  custom button : ', response.customButton);
        } else {
          console.log('outdoor image ', response.assets[0].uri);

          let text = response.assets[0].uri;
          console.log('outdoor image1111111111 ', text);

          this.setState({image2: text, imagecheck: true});
        }
        this.RBSheet6.close();
      },
    );
  };

  uploadimage_Camera_2 = async () => {
    ImagePicker.launchCamera(
      {noData: true, mediaType: 'photo', allowsEditing: true, quality: 0.7},
      response => {
        // console.log('response =', response);
        if (response.didCancel) {
          console.log('user cancelled  image picker');
        } else if (response.error) {
          console.log('imagepicker error : ', response.error);
        } else if (response.customButton) {
          console.log('user tapped  custom button : ', response.customButton);
        } else {
          console.log('outdoor image ', response.assets[0].uri);

          let text = response.assets[0].uri;
          console.log('outdoor image1111111111 ', text);

          this.setState({image2: text, imagecheck: true});
        }
        this.RBSheet6.close();
      },
    );
  };

  requestCameraPermission_1 = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        this.uploadimage_Camera_1();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  Check_PlatForm_1 = () => {
    if (Platform.OS === 'ios') {
      this.uploadimage_Camera_1();
      console.log('Platform Ios');
    } else {
      this.requestCameraPermission_1();
      console.log('Platform Android');
    }
  };

  requestCameraPermission_2 = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        this.uploadimage_Camera_2();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  Check_PlatForm_2 = () => {
    if (Platform.OS === 'ios') {
      this.uploadimage_Camera_2();
      console.log('Platform Ios');
    } else {
      this.requestCameraPermission_2();
      console.log('Platform Android');
    }
  };

  select_gender = val_3 => {
    console.log('valvalvalvalvalvalvalvalvalvalvalval ', val_3);
    this.setState({
      gender: val_3,
    });
    this.RBSheet5.close();
  };

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

    if (address == '') {
      alert('Please enter your address');
    } else {
      this.setState({spinner: true});
      let address = this.state.address;
      let api =
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        address +
        '&key=AIzaSyAr6YRTjfl2eKXIJZd97_uw9KpStXFRiCE';

      console.log('pass => ', api);
      fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          otherHeader: 'foo',
        },
      })
        .then(response => response.json())
        .then(response => {
          console.log('pass => ', response);
          let result = response['results'];
          if (result == '') {
            this.setState({
              spinner: false,
            });
            alert('Invalid address');
          } else {
            let all = result[0].geometry;
            let location = all.location;
            let lat = location['lat'];
            let lng = location['lng'];

            this.setState({
              lat: lat,
              lng: lng,
            });
            this.setState({spinner: false});

            this.Sign_Up(lat, lng);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  select_Date = date => {
    let dd = date.toISOString().split('T');
    let d1 = dd[0];
    let getAge = Math.floor((new Date() - new Date(d1).getTime()) / 3.15576e10);

    console.log('getAgegetAgegetAgegetAgegetAge', getAge);
    console.log(d1);
    let d2 = d1.split('-');
    let mm = d2[1];
    let dd_dd = d2[2];
    let yy = d2[0];
    let final_date = mm + '-' + dd_dd + '-' + yy;

    console.log(date.toISOString().split('.')[0] + 'Z');

    this.setState({
      show: false,
      dob: final_date,
      age: getAge,
    });
  };

  showtimepicker1() {
    this.setState({
      show: true,
    });
  }

  select_category = val_3 => {
    console.log('valvalvalvalvalvalvalvalvalvalvalval ', val_3);
    this.setState({
      category: val_3,
    });
    if (val_3 == 'Mental Wellness' || val_3 == 'Urgent Medical Care') {
      this.setState({
        doctor_type: 'Generalist',
      });
    } else {
      this.setState({
        doctor_type: 'Specialist',
      });
    }
    this.RBSheet2.close();
  };

  Insurances_Accepted = val_3 => {
    console.log('valvalvalvalvalvalvalvalvalvalvalval ', val_3);
    this.setState({
      fee: val_3,
    });
    this.RBSheet7.close();
  };

  select_state = val_3 => {
    console.log('valvalvalvalvalvalvalvalvalvalvalval ', val_3);
    this.setState({
      city: val_3,
    });
    this.RBSheet3.close();
  };

  Sign_Up = (val, val1) => {
    const newImage = {
      uri: this.state.image1,
      name: 'my_photo.jpg',
      type: 'image/jpg',
    };

    const newImage2 = {
      uri: this.state.image2,
      name: 'my_photo.jpg',
      type: 'image/jpg',
    };

    let uploaddata = new FormData();
    this.setState({spinner: true});

    uploaddata.append('image', newImage);
    uploaddata.append('name', this.state.name);
    uploaddata.append('email', this.state.email);
    uploaddata.append('password', this.state.password);
    uploaddata.append('mobile_number', this.state.mobile_number);
    uploaddata.append('gender', this.state.gender);
    uploaddata.append('disable', 'false');
    uploaddata.append('country', this.state.country);
    uploaddata.append('address', this.state.address);
    uploaddata.append('category', this.state.category);
    uploaddata.append('doctor_type', this.state.doctor_type);
    uploaddata.append('experience', this.state.experience);
    uploaddata.append('degree', this.state.degree);
    uploaddata.append('license_number', this.state.license_number);
    uploaddata.append('image2', newImage2);
    uploaddata.append('fee', this.state.fee);
    uploaddata.append('clinic', this.state.clinic);
    uploaddata.append('role', 'doctor');
    uploaddata.append('lat', val);
    uploaddata.append('lng', val1);
    uploaddata.append('fcm_token', this.state.token);

    // uploaddata.append('fcm_token', this.state.token);

    let api = Connection + 'rest_apis.php?action=Add_doctor';
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

        if (response.response == 'repeat') {
          this.setState({
            spinner: false,
          });
          alert('This email already exist');
        } else {
          this.setState({
            spinner: false,
          });

          Toast.show('You successfully registered as Doctor!');
          Actions.Patient_Login_Screen();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  done = () => {
    this.setState({
      visible: false,
    });
    setTimeout(() => {
      Actions.Patient_Login_Screen({role: this.props.role});
    }, 100);
  };

  opendialogue = () => {
    this.setState({
      visible: true,
    });
  };

  seePassword = () => {
    console.log('eeeeeeeeeeeee');
    this.setState({
      passhide: !this.state.passhide,
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
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 15,
              backgroundColor: 'white',
              paddingHorizontal: 15,
            }}>
            <Icon
              onPress={() => Actions.Patient_Login_Screen({role: 'doctor'})}
              name="arrow-back"
              type="MaterialIcons"
              style={{color: '#27aae0', fontSize: 24}}
            />
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#27aae0'}}>
              Sign Up
            </Text>
            <Text style={{fontSize: 22, fontWeight: 'bold', color: 'black'}}>
              {' '}
            </Text>
          </View>

          <ScrollView>
            <View
              style={{
                width: 100,
                height: 100,
                alignSelf: 'center',
                marginTop: 20,
                borderRadius: 100,
              }}>
              {this.state.image1 == null ? (
                <TouchableOpacity
                  onPress={() => this.RBSheet1.open()}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#e6e6e6',
                  }}
                  activeOpacity={0.8}>
                  <Icon
                    name="camera"
                    type="AntDesign"
                    style={{color: 'gray', fontSize: 40}}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity activeOpacity={0.8}>
                  <ImageLoad
                    style={{
                      width: 100,
                      height: 100,
                      borderWidth: 2,
                      borderRadius: 150,
                      alignSelf: 'center',
                      borderColor: '#27aae0',
                    }}
                    loadingStyle={{size: 'large', color: 'blue'}}
                    source={{uri: this.state.image1}}
                    borderRadius={150}
                    placeholderStyle={{
                      width: 100,
                      height: 100,
                      borderWidth: 2,
                      borderRadius: 150,
                      borderColor: '#27aae0',
                    }}
                  />
                </TouchableOpacity>
              )}
              {/* <TouchableOpacity onPress={() => this.RBSheet1.open()} style={{ width: 30, height: 30, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#27aae0', position: 'absolute', bottom: -10, right: 5 }}>
                <Icon name="camera" type="Entypo" style={{ color: "white", fontSize: 13 }} />
              </TouchableOpacity> */}
            </View>

            <View
              style={{
                width: width / 1.1,
                marginTop: 20,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <TextInput
                onChangeText={name => this.setState({name})}
                style={{
                  marginTop: 10,
                  width: width / 1.1,
                  height: 50,
                  backgroundColor: '#e6e6e6',
                  paddingLeft: 20,
                  borderRadius: 28,
                  alignSelf: 'center',
                  color: '#27aae0',
                  fontWeight: 'bold',
                }}
                placeholder="Full Name"
                placeholderTextColor="gray"
              />

              {/* <Icon name="email" type="MaterialCommunityIcons" style={{ color: "#27aae0", fontSize: 24,position:'absolute',left:10,top:20 }} /> */}
            </View>

            <View
              style={{
                width: width / 1.1,
                marginTop: 10,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <TextInput
                onChangeText={email => this.setState({email})}
                style={{
                  marginTop: 10,
                  width: width / 1.1,
                  height: 50,
                  backgroundColor: '#e6e6e6',
                  paddingLeft: 20,
                  borderRadius: 28,
                  alignSelf: 'center',
                  color: '#27aae0',
                  fontWeight: 'bold',
                }}
                placeholder="Email"
                placeholderTextColor="gray"
              />
              {/* <Icon name="email" type="MaterialCommunityIcons" style={{ color: "#27aae0", fontSize: 24,position:'absolute',left:10,top:20 }} /> */}
            </View>

            <View
              style={{
                width: width / 1.1,
                marginTop: 10,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <TextInput
                onChangeText={password => this.setState({password})}
                secureTextEntry={this.state.passhide}
                style={{
                  marginTop: 10,
                  width: width / 1.1,
                  height: 50,
                  backgroundColor: '#e6e6e6',
                  paddingLeft: 20,
                  borderRadius: 28,
                  alignSelf: 'center',
                  color: '#27aae0',
                  fontWeight: 'bold',
                }}
                placeholder="Password"
                placeholderTextColor="gray"
              />
              {this.state.passhide == true ? (
                <Icon
                  name="eye"
                  type="Ionicons"
                  color="white"
                  onPress={() => this.seePassword()}
                  style={{
                    fontSize: 25,
                    color: '#27aae0',
                    position: 'absolute',
                    right: 10,
                    bottom: 3,
                  }}
                />
              ) : (
                <Icon
                  name="eye-off"
                  type="Ionicons"
                  color="white"
                  onPress={() => this.seePassword()}
                  style={{
                    fontSize: 25,
                    color: '#27aae0',
                    position: 'absolute',
                    right: 10,
                    bottom: 3,
                  }}
                />
              )}
              {/* <Icon name="lock-outline" type="MaterialCommunityIcons" style={{ color: "#27aae0", fontSize: 24,position:'absolute',left:10,top:20 }} /> */}
            </View>

            <View
              style={{
                width: width / 1.1,
                marginTop: 10,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <TextInput
                onChangeText={mobile_number => this.setState({mobile_number})}
                style={{
                  marginTop: 10,
                  width: width / 1.1,
                  height: 50,
                  backgroundColor: '#e6e6e6',
                  paddingLeft: 20,
                  borderRadius: 28,
                  alignSelf: 'center',
                  color: '#27aae0',
                  fontWeight: 'bold',
                }}
                placeholder="Phone Number"
                placeholderTextColor="gray"
              />
              {/* <Icon name="lock-outline" type="MaterialCommunityIcons" style={{ color: "#27aae0", fontSize: 24,position:'absolute',left:10,top:20 }} /> */}
            </View>

            <TouchableOpacity
              onPress={() => this.RBSheet5.open()}
              style={{
                width: width / 1.1,
                marginTop: 15,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              {this.state.gender == 'Select Gender' ? (
                <Text
                  style={{
                    marginTop: 10,
                    justifyContent: 'center',
                    width: '100%',
                    height: 50,
                    backgroundColor: '#e6e6e6',
                    paddingLeft: 20,
                    borderRadius: 28,
                    alignSelf: 'center',
                    textAlignVertical: 'center',
                    color: 'gray',
                    fontWeight: 'bold',
                  }}>
                  {this.state.gender}
                </Text>
              ) : (
                <Text
                  style={{
                    marginTop: 10,
                    justifyContent: 'center',
                    width: '100%',
                    height: 50,
                    backgroundColor: '#e6e6e6',
                    paddingLeft: 20,
                    borderRadius: 28,
                    alignSelf: 'center',
                    textAlignVertical: 'center',
                    color: '#27aae0',
                    fontWeight: 'bold',
                  }}>
                  {this.state.gender}
                </Text>
              )}
              <Icon
                name="down"
                type="AntDesign"
                style={{
                  color: '#27aae0',
                  fontSize: 20,
                  position: 'absolute',
                  right: 20,
                  top: 20,
                }}
              />
            </TouchableOpacity>

            <View
              style={{
                width: width / 1.1,
                marginTop: 5,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <TextInput
                onChangeText={country => this.setState({country})}
                style={{
                  marginTop: 10,
                  width: width / 1.1,
                  height: 50,
                  backgroundColor: '#e6e6e6',
                  paddingLeft: 20,
                  borderRadius: 28,
                  alignSelf: 'center',
                  color: '#27aae0',
                  fontWeight: 'bold',
                }}
                placeholder="Type Your Country"
                placeholderTextColor="gray"
              />
              {/* <Icon name="lock-outline" type="MaterialCommunityIcons" style={{ color: "#27aae0", fontSize: 24,position:'absolute',left:10,top:20 }} /> */}
            </View>
            <View
              style={{
                width: width / 1.1,
                marginTop: 10,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <TextInput
                onChangeText={address => this.setState({address})}
                style={{
                  marginTop: 10,
                  width: width / 1.1,
                  height: 50,
                  backgroundColor: '#e6e6e6',
                  paddingLeft: 20,
                  borderRadius: 28,
                  alignSelf: 'center',
                  color: '#27aae0',
                  fontWeight: 'bold',
                }}
                placeholder="Address"
                placeholderTextColor="gray"
              />
              {/* <Icon name="lock-outline" type="MaterialCommunityIcons" style={{ color: "#27aae0", fontSize: 24,position:'absolute',left:10,top:20 }} /> */}
            </View>

            <TouchableOpacity
              onPress={() => this.RBSheet2.open()}
              style={{
                width: width / 1.1,
                marginTop: 15,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              {this.state.category == 'Select Category' ? (
                <Text
                  style={{
                    marginTop: 10,
                    justifyContent: 'center',
                    width: '100%',
                    height: 50,
                    backgroundColor: '#e6e6e6',
                    paddingLeft: 20,
                    borderRadius: 28,
                    alignSelf: 'center',
                    textAlignVertical: 'center',
                    color: 'gray',
                    fontWeight: 'bold',
                  }}>
                  {this.state.category}
                </Text>
              ) : (
                <Text
                  style={{
                    marginTop: 10,
                    justifyContent: 'center',
                    width: '100%',
                    height: 50,
                    backgroundColor: '#e6e6e6',
                    paddingLeft: 20,
                    borderRadius: 28,
                    alignSelf: 'center',
                    textAlignVertical: 'center',
                    color: '#27aae0',
                    fontWeight: 'bold',
                  }}>
                  {this.state.category}
                </Text>
              )}

              <Icon
                name="down"
                type="AntDesign"
                style={{
                  color: '#27aae0',
                  fontSize: 20,
                  position: 'absolute',
                  right: 20,
                  top: 20,
                }}
              />
            </TouchableOpacity>

            <View
              style={{
                width: width / 1.1,
                marginTop: 5,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <TextInput
                onChangeText={experience => this.setState({experience})}
                keyboardType="numeric"
                style={{
                  marginTop: 10,
                  width: width / 1.1,
                  height: 50,
                  backgroundColor: '#e6e6e6',
                  paddingLeft: 20,
                  borderRadius: 28,
                  alignSelf: 'center',
                  color: '#27aae0',
                  fontWeight: 'bold',
                }}
                placeholder="Years of Experience"
                placeholderTextColor="gray"
              />
              {/* <Icon name="lock-outline" type="MaterialCommunityIcons" style={{ color: "#27aae0", fontSize: 24,position:'absolute',left:10,top:20 }} /> */}
            </View>

            <View
              style={{
                width: width / 1.1,
                marginTop: 10,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <TextInput
                onChangeText={degree => this.setState({degree})}
                style={{
                  marginTop: 10,
                  width: width / 1.1,
                  height: 50,
                  backgroundColor: '#e6e6e6',
                  paddingLeft: 20,
                  borderRadius: 28,
                  alignSelf: 'center',
                  color: '#27aae0',
                  fontWeight: 'bold',
                }}
                placeholder="Licensure"
                placeholderTextColor="gray"
              />
              {/* <Icon name="lock-outline" type="MaterialCommunityIcons" style={{ color: "#27aae0", fontSize: 24,position:'absolute',left:10,top:20 }} /> */}
            </View>

            <View
              style={{
                width: width / 1.1,
                marginTop: 10,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <TextInput
                onChangeText={license_number => this.setState({license_number})}
                style={{
                  marginTop: 10,
                  width: width / 1.1,
                  height: 50,
                  backgroundColor: '#e6e6e6',
                  paddingLeft: 20,
                  borderRadius: 28,
                  alignSelf: 'center',
                  color: '#27aae0',
                  fontWeight: 'bold',
                }}
                placeholder="License Number"
                placeholderTextColor="gray"
              />
              {/* <Icon name="lock-outline" type="MaterialCommunityIcons" style={{ color: "#27aae0", fontSize: 24,position:'absolute',left:10,top:20 }} /> */}
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                paddingHorizontal: 15,
                fontWeight: '700',
                marginTop: 20,
                marginLeft: 10,
              }}>
              License Image
            </Text>

            {this.state.image2 == null ? (
              <TouchableOpacity
                onPress={() => this.RBSheet6.open()}
                style={{
                  width: width / 1.1,
                  height: 180,
                  borderRadius: 12,
                  marginTop: 15,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#e6e6e6',
                }}
                activeOpacity={0.8}>
                <Icon
                  name="camera"
                  type="AntDesign"
                  style={{color: 'gray', fontSize: 40}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => this.RBSheet6.open()}
                activeOpacity={0.8}>
                <ImageLoad
                  style={{
                    width: width / 1.1,
                    height: 180,
                    borderRadius: 12,
                    marginTop: 15,
                    alignSelf: 'center',
                  }}
                  loadingStyle={{size: 'large', color: 'blue'}}
                  source={{uri: this.state.image2}}
                  borderRadius={12}
                  placeholderStyle={{
                    width: width / 1.1,
                    height: 180,
                    borderRadius: 12,
                    marginTop: 15,
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity>
            )}

            {/* <View
              style={{
                width: width / 1.1,
                marginTop: 10,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
              }}>
            <TextInput
                onChangeText={fee => this.setState({fee})}
                keyboardType="numeric"
                style={{
                  marginTop: 10,
                  width: width / 1.1,
                  height: 50,
                  backgroundColor: '#e6e6e6',
                  paddingLeft: 20,
                  borderRadius: 28,
                  alignSelf: 'center',
                  color: '#27aae0',
                  fontWeight: 'bold',
                }}
                placeholder="Insurances Accepted"
                placeholderTextColor="gray"
              />
            </View> */}

            {/* <TouchableOpacity
              onPress={() => this.RBSheet7.open()}
              style={{
                width: width / 1.1,
                marginTop: 15,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              {this.state.fee == 'Insurances Accepted' ? (
                <Text
                  style={{
                    marginTop: 10,
                    justifyContent: 'center',
                    width: '100%',
                    height: 50,
                    backgroundColor: '#e6e6e6',
                    paddingLeft: 20,
                    borderRadius: 28,
                    alignSelf: 'center',
                    textAlignVertical: 'center',
                    color: 'gray',
                    fontWeight: 'bold',
                  }}>
                  {this.state.fee}
                </Text>
              ) : (
                <Text
                  style={{
                    marginTop: 10,
                    justifyContent: 'center',
                    width: '100%',
                    height: 50,
                    backgroundColor: '#e6e6e6',
                    paddingLeft: 20,
                    borderRadius: 28,
                    alignSelf: 'center',
                    textAlignVertical: 'center',
                    color: '#27aae0',
                    fontWeight: 'bold',
                  }}>
                  {this.state.fee}
                </Text>
              )}

              <Icon
                name="down"
                type="AntDesign"
                style={{
                  color: '#27aae0',
                  fontSize: 20,
                  position: 'absolute',
                  right: 20,
                  top: 20,
                }}
              />
            </TouchableOpacity> */}

            <View
              style={{
                width: width / 1.1,
                marginTop: 10,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <TextInput
                onChangeText={clinic => this.setState({clinic})}
                multiline={true}
                style={{
                  textAlignVertical: 'top',
                  marginTop: 10,
                  width: width / 1.1,
                  height: 80,
                  backgroundColor: '#e6e6e6',
                  paddingLeft: 20,
                  borderRadius: 12,
                  alignSelf: 'center',
                  color: '#27aae0',
                  fontWeight: 'bold',
                }}
                placeholder="Bio..."
                placeholderTextColor="gray"
              />
              {/* <Icon name="lock-outline" type="MaterialCommunityIcons" style={{ color: "#27aae0", fontSize: 24,position:'absolute',left:10,top:20 }} /> */}
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                this.Get_address();
              }}
              style={{
                width: width / 1.1,
                alignSelf: 'center',
                height: 48,
                backgroundColor: '#27aae0',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 60,
                marginBottom: 10,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Sign Up</Text>
            </TouchableOpacity>

            <RBSheet
              ref={ref => {
                this.RBSheet1 = ref;
              }}
              height={230}
              openDuration={200}
              customStyles={{
                container: {
                  paddingHorizontal: 20,
                },
              }}>
              <View>
                <Text style={{fontSize: 18, color: 'black', marginTop: 20}}>
                  Choose an action
                </Text>

                <View style={{flexDirection: 'row', marginTop: 30}}>
                  <TouchableOpacity
                    onPress={() => this.uploadimage1()}
                    activeOpacity={0.6}>
                    <View
                      style={{
                        flexDirection: 'column',
                        marginLeft: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        name="images"
                        type="Entypo"
                        style={{fontSize: 30, color: '#27aae0'}}
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          fontWeight: 'bold',
                        }}>
                        Gallery
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.Check_PlatForm_1()}
                    activeOpacity={0.6}>
                    <View
                      style={{
                        flexDirection: 'column',
                        marginLeft: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        name="camera"
                        type="Entypo"
                        style={{fontSize: 30, color: '#27aae0'}}
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          fontWeight: 'bold',
                        }}>
                        Camera
                      </Text>
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
                  paddingHorizontal: 20,
                },
              }}>
              <View>
                <Text style={{fontSize: 18, color: 'black', marginTop: 20}}>
                  Choose an action
                </Text>

                <View style={{flexDirection: 'row', marginTop: 30}}>
                  <TouchableOpacity
                    onPress={() => this.uploadimage2()}
                    activeOpacity={0.6}>
                    <View
                      style={{
                        flexDirection: 'column',
                        marginLeft: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        name="images"
                        type="Entypo"
                        style={{fontSize: 30, color: '#27aae0'}}
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          fontWeight: 'bold',
                        }}>
                        Gallery
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.Check_PlatForm_2()}
                    activeOpacity={0.6}>
                    <View
                      style={{
                        flexDirection: 'column',
                        marginLeft: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        name="camera"
                        type="Entypo"
                        style={{fontSize: 30, color: '#27aae0'}}
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          fontWeight: 'bold',
                        }}>
                        Camera
                      </Text>
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
                  paddingHorizontal: 20,
                },
              }}>
              <View>
                <TouchableOpacity
                  onPress={() => this.select_gender('Male')}
                  activeOpacity={0.8}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'black',
                      marginTop: 20,
                      textAlign: 'center',
                    }}>
                    Male
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: 'lightgray',
                    marginTop: 10,
                  }}></View>

                <TouchableOpacity
                  onPress={() => this.select_gender('Female')}
                  activeOpacity={0.8}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'black',
                      textAlign: 'center',
                      marginTop: 10,
                    }}>
                    Female
                  </Text>
                </TouchableOpacity>
              </View>
            </RBSheet>
          </ScrollView>

          <RBSheet
            ref={ref => {
              this.RBSheet2 = ref;
            }}
            closeOnDragDown={true}
            height={500}
            openDuration={120}
            customStyles={{
              container: {
                paddingHorizontal: 20,
              },
              draggableIcon: {
                backgroundColor: 'lightgray',
              },
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                onPress={() =>
                  this.select_category('General Orthopedic Surgery')
                }
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    marginTop: 20,
                    textAlign: 'center',
                  }}>
                  General Orthopedic Surgery
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => this.select_category('Orthopedic Spine Surgery')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Orthopedic Spine Surgery
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => this.select_category('Sports Medicine')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Sports Medicine
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => this.select_category('Physical Medicine')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Physical Medicine
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => this.select_category('Pain Management')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Pain Management
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => this.select_category('Urgent Medical Care')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Urgent Medical Care
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => this.select_category('Neuropsychology')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Neuropsychology
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => this.select_category('Mental Wellness')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Mental Wellness
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => this.select_category('Physical Therapy')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Physical Therapy
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => this.select_category('Wellness')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Wellness
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>
            </ScrollView>
          </RBSheet>

          <RBSheet
            ref={ref => {
              this.RBSheet7 = ref;
            }}
            closeOnDragDown={true}
            height={400}
            openDuration={120}
            customStyles={{
              container: {
                paddingHorizontal: 20,
              },
              draggableIcon: {
                backgroundColor: 'lightgray',
              },
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                onPress={() => this.Insurances_Accepted('Anthem')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    marginTop: 20,
                    textAlign: 'center',
                  }}>
                  Anthem
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => this.Insurances_Accepted('Aetna')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Aetna
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => this.Insurances_Accepted('Auto')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Auto
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => this.Insurances_Accepted('Cigna')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Cigna
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => this.Insurances_Accepted('Lien')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Lien
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => this.Insurances_Accepted('Medicare')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Medicare
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => this.Insurances_Accepted('United Healthcare')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  United Healthcare
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>
            </ScrollView>
          </RBSheet>

          <Dialog
            style={{backgroundColor: 'black', padding: 0}}
            width={'90%'}
            visible={this.state.visible}
            dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}>
            <DialogContent
              style={{paddingLeft: 0, paddingRight: 0, paddingBottom: 0}}>
              <Image
                source={require('../assets/Neuro_Logo-removebg-preview.png')}
                style={{
                  width: 80,
                  height: 80,
                  alignSelf: 'center',
                  marginTop: 20,
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  color: 'black',
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                Congratulation!
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  textAlign: 'center',
                  color: 'gray',
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>
                Your account has been successfully created
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  textAlign: 'center',
                  color: 'gray',
                  fontWeight: 'bold',
                  marginTop: 3,
                }}>
                Now you can give consult to your patients
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.done();
                }}
                style={{
                  width: '85%',
                  marginBottom: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                  backgroundColor: '#27aae0',
                  paddingVertical: 15,
                  alignSelf: 'center',
                  marginTop: 20,
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Done</Text>
              </TouchableOpacity>
            </DialogContent>
          </Dialog>

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
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  textipu: {
    borderWidth: 1,
    color: 'black',
    borderColor: 'lightgray',
    height: 40,
    marginTop: 10,
    borderRadius: 6,
    padding: 10,
  },
  textipu1: {
    borderWidth: 1,
    color: 'black',
    borderColor: 'lightgray',
    height: 80,
    textAlignVertical: 'top',
    marginTop: 10,
    borderRadius: 6,
    padding: 10,
  },
  picker: {
    borderWidth: 1,
    color: 'black',
    borderColor: 'lightgray',
    height: 40,
  },
  ImageAvater3: {
    width: '100%',
    height: 150,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 12,
  },
  ImageAvater4: {
    width: '100%',
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 12,
    backgroundColor: 'lightgray',
    paddingVertical: 5,
  },
});

export default doctor_Signup;

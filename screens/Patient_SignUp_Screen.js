import {Row} from 'native-base';
import React, {Component} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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
  PermissionsAndroid,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
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
import messaging from '@react-native-firebase/messaging';
import Connection from '../connection';
import * as ImagePicker from 'react-native-image-picker';
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
} from 'react-native-popup-dialog';

import Toast from 'react-native-simple-toast';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Patient_SignUp_Screen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gallrey_di_image: null,
      email: '',
      password: '',
      passhide: true,
      name: '',
      image1: null,
      image2: null,
      image3: null,
      have_insurance: '',
      spinner: false,
      imagecheck: false,
      region: '',
      currency: '',
      city: '',
      address: '',
      mobile_number: '',
      lat: 0,
      lng: 0,
      token: '',
      currency: '',
      country: '',
      isDatePickerVisible: false,
      data1: [],
      visible: false,
      r_code: '',
      Butun_Hide: true,
      gender: 'Select Gender',
      insurance_name: 'Select Insurance Option',
      insurance_number: '',
      policy: '',
      dob: 'Date of Birth',
      show_date: false,
      placeholder: '+1',
      passhide: true,
    };
  }

  keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
    // alert('Keyboard is open')
    this.setState({Butun_Hide: false});
  });
  keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
    // alert('Keyboard is closed')
    this.setState({Butun_Hide: true});
  });

  backAction = () => {
    // Actions.pop()
    return true;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  selectcountry(value) {
    let n = value['callingCode'];
    console.log('value => ', n[0]);
    this.setState({
      placeholder: '+' + n[0],
    });
  }

  select_gender = val_3 => {
    console.log('valvalvalvalvalvalvalvalvalvalvalval ', val_3);
    this.setState({
      gender: val_3,
    });
    this.RBSheet5.close();
  };

  componentDidMount = async () => {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
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

  selectcountry(value) {
    let n = value['callingCode'];
    console.log('value => ', n[0]);
    this.setState({
      placeholder: '+' + n[0],
    });
  }

  opt_generate = () => {
    var length = 8,
      charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      retVal = '';
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    console.log('OOOOOOOOOOOOOOOOO', retVal);
    this.setState({
      user_r_code: retVal,
    });
  };

  uploadimage1 = async () => {
    this.RBSheet1.close();
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

          this.setState({gallrey_di_image: text, imagecheck: true});
        }
      },
    );
  };

  uploadimage_Camera_1 = async () => {
    this.RBSheet1.close();
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

          // this.state.multi_Images.push(text)
          // Actions.form({ multi_Images: this.state.multi_Images })
          this.setState({gallrey_di_image: text, imagecheck: true});
        }
      },
    );
  };

  uploadimage2 = async () => {
    this.RBSheet2.close();
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

          this.setState({image2: text});
        }
      },
    );
  };

  uploadimage_Camera_2 = async () => {
    this.RBSheet2.close();
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

          // this.state.multi_Images.push(text)
          // Actions.form({ multi_Images: this.state.multi_Images })
          this.setState({image2: text});
        }
      },
    );
  };

  uploadimage3 = async () => {
    this.RBSheet3.close();
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

          this.setState({image3: text});
        }
      },
    );
  };

  uploadimage_Camera_3 = async () => {
    this.RBSheet3.close();
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

          // this.state.multi_Images.push(text)
          // Actions.form({ multi_Images: this.state.multi_Images })
          this.setState({image3: text, imagecheck: true});
        }
      },
    );
  };

  handleDelete = () => {
    this.setState({
      visible: false,
    });
  };

  select_yes_no = val_3 => {
    this.setState({
      have_insurance: val_3,
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

  requestCameraPermission_3 = async () => {
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
        this.uploadimage_Camera_3();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  Check_PlatForm = () => {
    if (Platform.OS === 'ios') {
      this.uploadimage_Camera_1();
      console.log('Platform Ios');
    } else {
      this.requestCameraPermission_1();
      console.log('Platform Android');
    }
  };

  Check_PlatForm2 = () => {
    if (Platform.OS === 'ios') {
      this.uploadimage_Camera_2();
      console.log('Platform Ios');
    } else {
      this.requestCameraPermission_2();
      console.log('Platform Android');
    }
  };

  Check_PlatForm3 = () => {
    if (Platform.OS === 'ios') {
      this.uploadimage_Camera_3();
      console.log('Platform Ios');
    } else {
      this.requestCameraPermission_3();
      console.log('Platform Android');
    }
  };

  select_DOB = date => {
    console.log(date);
    let dd = date.toISOString().split('T');
    let d1 = dd[0];

    let getAge = Math.floor((new Date() - new Date(d1).getTime()) / 3.15576e10);

    console.log(d1);
    let d2 = d1.split('-');
    let mm = d2[1];
    let dd_dd = d2[2];
    let yy = d2[0];
    let final_date = mm + '-' + dd_dd + '-' + yy;

    console.log(final_date);
    console.log('datedatedatedatedatedate', getAge);

    // console.log(date.toISOString().split('.')[0] + 'Z');

    this.setState({
      show_date: false,
      dob: final_date,
      age: getAge,
    });
  };

  cancel = () => {
    this.setState({
      show_date: false,
    });
  };

  showtimepicker1() {
    this.setState({
      show_date: true,
    });
  }

  Sign_Up = (val1, val2) => {
    const newImage = {
      uri: this.state.gallrey_di_image,
      name: 'my_photo.jpg',
      type: 'image/jpg',
    };

    const newImage2 = {
      uri: this.state.image2,
      name: 'my_photo.jpg',
      type: 'image/jpg',
    };

    const newImage3 = {
      uri: this.state.image3,
      name: 'my_photo.jpg',
      type: 'image/jpg',
    };
    let uploaddata = new FormData();

    if (this.state.imagecheck == false) {
      console.log('image not');
      uploaddata.append('photo', 'false');
    } else {
      console.log('image');

      uploaddata.append('photo', 'true');

      uploaddata.append('image', newImage);
    }

    if (this.state.have_insurance == 'No') {
    } else {
      console.log('image2');

      uploaddata.append('image2', newImage2);
      uploaddata.append('image3', newImage3);
    }

    let name = this.state.name;

    let email = this.state.email;
    let password = this.state.password;

    let mobile_number = this.state.mobile_number;
    let dob = this.state.dob;
    let age = this.state.age;
    let gender = this.state.gender;
    let country = this.state.country;
    let address = this.state.address;
    let insurance_name = this.state.insurance_name;
    let have_insurance = this.state.have_insurance;
    let role = 'user';

    if (name == '') {
      alert('Please enter your name');
    } else if (email == '') {
      alert('Please enter your email');
    } else if (password == '') {
      alert('Please_enter_your_password');
    } else if (mobile_number == '') {
      alert('Please enter your mobile number.');
    } else if (dob == 'Date of Birth') {
      alert('Please enter your date of birth.');
    } else if (age == '') {
      alert('Please enter your Age.');
    } else if (gender == '') {
      alert('Please select your gender.');
    } else if (insurance_name == 'Select Insurance Option') {
      alert('Please Enter your Insurance Method.');
    } else if (address == '') {
      alert('Please enter your address');
    } else {
      this.setState({spinner: true});

      uploaddata.append('name', name);
      uploaddata.append('email', email);
      uploaddata.append('password', password);
      uploaddata.append('mobile_number', mobile_number);
      uploaddata.append('dob', dob);
      uploaddata.append('age', age);
      uploaddata.append('gender', gender);
      uploaddata.append('insurance_name', insurance_name);
      uploaddata.append('have_insurance', have_insurance);
      uploaddata.append('address', address);
      uploaddata.append('role', role);
      uploaddata.append('lat', val1);
      uploaddata.append('lng', val2);
      uploaddata.append('fcm_token', this.state.token);

      console.log(
        'Gendergendergendergendergendergendergender Lat',
        have_insurance,
      );
      // console.log('Gendergendergendergendergendergendergender Lat', val1);
      // console.log('Gendergendergendergendergendergendergender LNG', val2);

      let api = Connection + 'rest_apis.php?action=Add_user';
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
          } else if (response.response == 'fail') {
            this.setState({
              spinner: false,
            });
            // alert(this.props.Something_went_wrong);
          } else {
            this.setState({
              spinner: false,
            });

            Toast.show('You successfully registered as patient.');
            Actions.Patient_Login_Screen();

            // this.opendialogue();
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  Get_address() {
    let address = this.state.address;

    if (address == '') {
      alert('Please_enter_your_address');
    } else {
      this.setState({spinner: true});

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

            console.log(
              'Latitude/LatitudeLatitudeLatitudeLatitudeLatitude ',
              lat,
            );
            console.log(
              'Longitude/LongitudeLongitudeLongitudeLongitudeLongitude',
              lng,
            );

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

  select_gender = val_3 => {
    this.setState({
      gender: val_3,
    });
    this.RBSheet5.close();
  };

  select_Date = date => {
    let dd = date.toISOString().split('T');
    let d1 = dd[0];

    let getAge = Math.floor((new Date() - new Date(d1).getTime()) / 3.15576e10);

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

  insurance_name = val_3 => {
    this.setState({
      insurance_name: val_3,
    });
    this.RBSheet7.close();
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
              onPress={() => Actions.Patient_Login_Screen({role: 'user'})}
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
            <Text
              style={{
                color: 'black',
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 20,
              }}>
              Create Account
            </Text>
            <Text style={{color: 'gray', fontSize: 15, textAlign: 'center'}}>
              Create a new account
            </Text>

            <View
              style={{
                width: 100,
                height: 100,
                alignSelf: 'center',
                marginTop: 20,
                borderRadius: 100,
              }}>
              {this.state.gallrey_di_image == null ? (
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
                    source={{uri: this.state.gallrey_di_image}}
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

            <View
              style={{
                width: width / 1.1,
                marginTop: 10,
                height: 50,
                // alignItems: 'center',
                // justifyContent:'center',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.showtimepicker1()}
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
                  justifyContent: 'center',
                }}>
                <Text
                  style={
                    this.state.dob == 'Date of Birth'
                      ? {color: 'gray', fontWeight: 'bold'}
                      : {color: '#27aae0', fontWeight: 'bold'}
                  }>
                  {this.state.dob}
                </Text>
              </TouchableOpacity>
            </View>

            <DateTimePickerModal
              isVisible={this.state.show_date}
              // date={new Date('1985-01-17',)}

              mode="date"
              // format='YYYY'
              onConfirm={date => this.select_DOB(date)}
              onCancel={() => this.cancel()}
              timeZoneOffsetInMinutes={0}
              display="spinner"
            />

            {/* <View
              style={{
                width: width / 1.1,
                marginTop: 20,
                height: 50,
                // alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                backgroundColor: '#e6e6e6',
                paddingLeft: 20,
                borderRadius: 28,
              }}>
              {this.state.age == 'Age' ? (
                <Text style={{color: 'grey', fontWeight: 'bold'}}>
                  {this.state.age}
                </Text>
              ) : (
                <Text style={{color: '#27aae0', fontWeight: 'bold'}}>
                  {this.state.age}
                </Text>
              )}
            </View> */}

            <TouchableOpacity
              onPress={() => this.RBSheet7.open()}
              style={{
                width: width / 1.1,
                marginTop: 15,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              {this.state.insurance_name == 'Insurance' ? (
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
                  {this.state.insurance_name}
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
                  {this.state.insurance_name}
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

            {this.state.insurance_name != 'Select Insurance Option' && (
              <View>
                <Text
                  style={{
                    color: '#27aae0',
                    fontSize: 14,
                    fontWeight: 'bold',
                    paddingHorizontal: 20,
                    marginTop: 35,
                  }}>
                  Do you have any Insurance Card ?
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 15,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => this.select_yes_no('Yes')}
                    style={
                      this.state.have_insurance != 'Yes'
                        ? {
                            height: 50,
                            borderRadius: 6,
                            width: '20%',
                            color: 'black',
                            borderWidth: 1,
                            borderColor: 'lightgray',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }
                        : {
                            height: 50,
                            borderRadius: 6,
                            width: '20%',
                            backgroundColor: '#27aae0',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }
                    }>
                    <Text
                      style={
                        this.state.have_insurance != 'Yes'
                          ? {color: 'gray'}
                          : {color: 'white'}
                      }>
                      Yes
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => this.select_yes_no('No')}
                    style={
                      this.state.have_insurance != 'No'
                        ? {
                            height: 50,
                            borderRadius: 6,
                            marginLeft: 10,
                            width: '25%',
                            color: 'black',
                            borderWidth: 1,
                            borderColor: 'lightgray',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }
                        : {
                            height: 50,
                            marginLeft: 10,
                            borderRadius: 6,
                            width: '25%',
                            backgroundColor: '#27aae0',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }
                    }>
                    <Text
                      style={
                        this.state.have_insurance != 'No'
                          ? {color: 'gray'}
                          : {color: 'white'}
                      }>
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {this.state.have_insurance == 'Yes' && (
              <View>
                <View
                  style={{
                    width: width / 1.1,
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    borderRadius: 12,
                    borderColor: 'black',
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    marginTop: 20,
                  }}>
                  {this.state.image2 == null ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      {/* <Image
                    style={{width: 60, height: 60, tintColor: '#27aae0'}}
                    resizeMode="contain"
                    source={require('../assets/3_doctor.png')}
                  /> */}

                      <Icon
                        // onPress={() => Actions.pop()}
                        name="drivers-license-o"
                        type="FontAwesome"
                        style={{color: 'black', fontSize: 30, marginTop: 20}}
                      />

                      <View style={{width: '80%', marginTop: 15}}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 16,
                            fontWeight: 'bold',
                          }}>
                          Front Photo
                        </Text>
                        <Text style={{color: 'gray', fontSize: 14}}>
                          Please upload front photo of your valid insurance
                          card.
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <ImageLoad
                      style={{
                        width: '100%',
                        height: 120,
                        borderRadius: 5,
                        alignSelf: 'center',
                      }}
                      loadingStyle={{size: 'large', color: 'blue'}}
                      source={{uri: this.state.image2}}
                      borderRadius={6}
                      placeholderStyle={{
                        width: '100%',
                        height: 120,
                        borderRadius: 6,
                      }}
                    />
                  )}

                  <TouchableOpacity
                    onPress={() => this.RBSheet2.open()}
                    activeOpacity={0.8}
                    style={{
                      width: '90%',
                      alignSelf: 'center',
                      height: 50,
                      borderColor: '#27aae0',
                      borderWidth: 1,
                      borderRadius: 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 20,
                      marginBottom: 30,
                    }}>
                    <Text style={{color: '#27aae0', fontWeight: 'bold'}}>
                      Take a photo
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    width: width / 1.1,
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    borderRadius: 12,
                    borderColor: 'black',
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    marginTop: 20,
                  }}>
                  {this.state.image3 == null ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      {/* <Image
                    style={{
                      width: 60,
                      height: 50,
                      tintColor: '#27aae0',
                      marginTop: 20,
                    }}
                    resizeMode="contain"
                    source={require('../assets/3_doctor.png')}
                  /> */}

                      <Icon
                        // onPress={() => Actions.pop()}
                        name="drivers-license"
                        type="FontAwesome"
                        style={{color: 'black', fontSize: 30, marginTop: 20}}
                      />

                      <View style={{width: '80%', marginTop: 20}}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 16,
                            fontWeight: 'bold',
                          }}>
                          Back Photo
                        </Text>
                        <Text style={{color: 'gray', fontSize: 14}}>
                          Please upload back photo of your valid license card.
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <ImageLoad
                      style={{
                        width: '100%',
                        height: 120,
                        borderRadius: 5,
                        alignSelf: 'center',
                      }}
                      loadingStyle={{size: 'large', color: 'blue'}}
                      source={{uri: this.state.image3}}
                      borderRadius={6}
                      placeholderStyle={{
                        width: '100%',
                        height: 120,
                        borderRadius: 6,
                      }}
                    />
                  )}
                  <TouchableOpacity
                    onPress={() => this.RBSheet3.open()}
                    activeOpacity={0.8}
                    style={{
                      width: '90%',
                      alignSelf: 'center',
                      height: 50,
                      borderColor: '#27aae0',
                      borderWidth: 1,
                      borderRadius: 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 20,
                      marginBottom: 30,
                    }}>
                    <Text style={{color: '#27aae0', fontWeight: 'bold'}}>
                      Take a photo
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <TouchableOpacity
              onPress={() => this.RBSheet5.open()}
              style={{
                width: width / 1.1,
                marginTop: 10,
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

            {/* <View
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
            </View> */}
            <View
              style={{
                width: width / 1.1,
                marginTop: 5,
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
              activeOpacity={0.8}
              onPress={() => {
                this.Get_address();
              }}
              style={{
                width: width / 1.1,
                alignSelf: 'center',
                height: 48,
                backgroundColor: '#27aae0',
                borderRadius: 24,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                marginBottom: 20,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Sign Up</Text>
            </TouchableOpacity>
            {this.state.Butun_Hide == true ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginBottom: 20,
                }}>
                <Text style={{color: 'gray'}}>Have an account?</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    Actions.Patient_Login_Screen({role: this.props.role});
                  }}>
                  <Text style={{color: '#27aae0', fontWeight: 'bold'}}>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View></View>
            )}
          </ScrollView>

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

          <RBSheet
            ref={ref => {
              this.RBSheet7 = ref;
            }}
            closeOnDragDown={true}
            height={430}
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
                onPress={() => this.insurance_name('Anthem')}
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
                onPress={() => this.insurance_name('Aetna')}
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
                onPress={() => this.insurance_name('Auto')}
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
                onPress={() => this.insurance_name('Cigna')}
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
                onPress={() => this.insurance_name('Lien')}
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
                onPress={() => this.insurance_name('Medicare')}
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
                onPress={() => this.insurance_name('Self-Pay')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Self-Pay
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => this.insurance_name('United Healthcare')}
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
                      color="white"
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
                  onPress={() => this.Check_PlatForm()}
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
                      color="white"
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
              this.RBSheet2 = ref;
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
                      color="white"
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
                  onPress={() => this.Check_PlatForm2()}
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
                      color="white"
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
              this.RBSheet3 = ref;
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
                  onPress={() => this.uploadimage3()}
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
                      color="white"
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
                  onPress={() => this.Check_PlatForm3()}
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
                      color="white"
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
                Now you can book appointment with doctors
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
  phoneinput2: {
    width: width / 1.1,
    alignSelf: 'center',
    backgroundColor: '#e6e6ed',
    height: 40,
    borderRadius: 8,
    color: 'black',
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },

  phoneinput: {
    paddingHorizontal: 15,
  },
});

export default Patient_SignUp_Screen;

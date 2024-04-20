import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
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
  BackHandler,
  Picker,
  PermissionsAndroid,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
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
import * as ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import RBSheet from 'react-native-raw-bottom-sheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {connect} from 'react-redux';
import Connection from '../connection';
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
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
} from 'react-native-popup-dialog';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class update_Patient_profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image1: null,
      spinner: false,
      imagecheck: false,
      visible: false,
      passhide: true,
      dob: 'Date of Birth',
      show_date: false,
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
    Actions.pop();
    return true;
  }

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

          this.setState({image1: text, imagecheck: true});
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
          this.setState({image1: text, imagecheck: true});
        }
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

  Check_PlatForm = () => {
    if (Platform.OS === 'ios') {
      this.uploadimage_Camera_1();
      console.log('Platform Ios');
    } else {
      this.requestCameraPermission_1();
      console.log('Platform Android');
    }
  };

  componentDidMount = async () => {
    let user = await AsyncStorage.getItem('customer');

    console.log('aaaaaaaaaaaaa', user);
    let parsed = JSON.parse(user);
    let name = parsed[0].name;
    let id = parsed[0].id;
    let address = parsed[0].address;
    let password = parsed[0].password;
    let email = parsed[0].email;
    let dob = parsed[0].dob;
    let mobile_number = parsed[0].mobile_number;
    let age = parsed[0].age;
    let insurance_name = parsed[0].insurance_name;
    let insurance_number = parsed[0].insurance_number;
    let policy = parsed[0].policy;
    let profile1 = parsed[0].profile;
    if (profile1 == null) {
      this.setState({
        image1: null,
      });
    } else {
      let profile = Connection + 'images/' + profile1;
      console.log('hdbbh =>', profile);

      this.setState({
        image1: profile,
      });
    }

    this.setState({
      name: name,
      id: id,
      address: address,
      email: email,
      dob: dob,
      password: password,
      insurance_name: insurance_name,
      insurance_number: insurance_number,
      policy: policy,
      mobile_number: mobile_number,
      age: age,
    });

  };

  handleDelete = () => {
    this.setState({
      visible: false,
    });
  };

  done = () => {
    this.setState({
      visible: false,
    });
    setTimeout(() => {
      Actions.pop();
    }, 100);
  };

  opendialogue = () => {
    this.setState({
      visible: true,
    });
  };

  selectcountry(value) {
    let n = value['currency'];
    let n1 = value['name'];
    console.log('llllllllllllllllllll', n1);

    console.log('value => ', n[0]);
    this.setState({
      placeholder: n1,
      currency: n[0],
      country: n1,
    });
  }

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
    // console.log('datedatedatedatedatedate', dob);

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

  Get_address() {
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
          alert('Invalid_address');
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

          this.update_patient(lat, lng);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  update_patient = (lat, lng) => {
    let uploaddata = new FormData();

    let name = this.state.name;
    let email = this.state.email;
    let address = this.state.address;
    let password = this.state.password;

    this.setState({spinner: true});
    console.log('nameeeeeeee =>', name);
    //   console.log("password =>", password);
    //   console.log("eamilllllllllll =>", email);
    //   console.log("eamilllllllllll =>", this.state.currency);

    uploaddata.append('name', name);
    uploaddata.append('email', email);
    uploaddata.append('password', password);
    uploaddata.append('lat', lat);
    uploaddata.append('lng', lng);
    uploaddata.append('address', address);
    uploaddata.append('user_id', this.state.id);
    uploaddata.append('mobile_number', this.state.mobile_number);
    uploaddata.append('dob', this.state.dob);
    uploaddata.append('age', this.state.age);

    let api = Connection + 'rest_apis.php?action=update_patient';
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
          // alert(this.props.Please_try_agin_later);
        } else {
          this.setState({
            spinner: false,
          });
          AsyncStorage.setItem('customer', JSON.stringify(response.response));

          Toast.show('You successfully updated your profile');

          // this.opendialogue();
          Actions.Patient_Tab_Screen();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  select_category = val_3 => {
    console.log('valvalvalvalvalvalvalvalvalvalvalval ', val_3);
    this.setState({
      insurance_name: val_3,
    });
    this.RBSheet2.close();
  };

  seePassword = () => {
    console.log('eeeeeeeeeeeee');
    this.setState({
      passhide: !this.state.passhide,
    });
  };

  render() {
    // let AppComponent1 = Drawer_Screen;

    return (
      // <Drawer
      // ref={(ref) => { this.drawer = ref; }}
      //   content={<AppComponent1 />}
      //   openDrawerOffset={120}
      //   tapToClose={true}
      //   >

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
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
              Edit Profile
            </Text>
            <Text> </Text>
          </View>

          <ScrollView>
            <Text
              style={{
                color: 'gray',
                marginTop: 30,
                fontWeight: '600',
                paddingHorizontal: 20,
              }}>
              You can edit your personal data as well as insurance data.
            </Text>

            <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 13,
                  paddingHorizontal: 4,
                  marginTop: 10,
                }}>
                Full Name
              </Text>

              <View
                style={{
                  width: width / 1.1,
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  paddingVertical: 5,
                  borderRadius: 8,
                  color: 'black',
                  paddingHorizontal: 10,
                  marginTop: 10,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                }}>
                <TextInput
                  value={this.state.name}
                  onChangeText={name => this.setState({name})}
                  style={{
                    height: 45,
                    backgroundColor: 'white',
                    paddingLeft: 10,
                    borderRadius: 8,
                    width: '90%',
                    color: '#27aae0',
                    fontWeight: 'bold',
                  }}
                  placeholderTextColor="gray"
                />
              </View>

              <Text
                style={{
                  color: 'gray',
                  fontSize: 13,
                  paddingHorizontal: 4,
                  marginTop: 10,
                }}>
                Email
              </Text>

              <View
                style={{
                  width: width / 1.1,
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  paddingVertical: 5,
                  borderRadius: 8,
                  color: 'black',
                  paddingHorizontal: 10,
                  marginTop: 10,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                }}>
                <TextInput
                  value={this.state.email}
                  onChangeText={email => this.setState({email})}
                  style={{
                    height: 45,
                    backgroundColor: 'white',
                    paddingLeft: 10,
                    borderRadius: 8,
                    width: '90%',
                    color: '#27aae0',
                    fontWeight: 'bold',
                  }}
                  placeholderTextColor="gray"
                />
              </View>

              <Text
                style={{
                  color: 'gray',
                  fontSize: 13,
                  paddingHorizontal: 4,
                  marginTop: 10,
                }}>
                Password
              </Text>

              <View
                style={{
                  width: width / 1.1,
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  paddingVertical: 5,
                  borderRadius: 8,
                  color: 'black',
                  flexDirection: 'row',
                  alignItem: 'center',
                  paddingHorizontal: 10,
                  marginTop: 10,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                }}>
                <TextInput
                  secureTextEntry={this.state.passhide}
                  value={this.state.password}
                  onChangeText={password => this.setState({password})}
                  style={{
                    height: 45,
                    backgroundColor: 'white',
                    paddingLeft: 10,
                    borderRadius: 8,
                    width: '90%',
                    color: '#27aae0',
                    fontWeight: 'bold',
                  }}
                  placeholderTextColor="gray"
                />

                {this.state.passhide == true ? (
                  <Icon
                    name="eye"
                    type="Ionicons"
                    color="white"
                    onPress={() => this.seePassword()}
                    style={{marginTop: 8, fontSize: 25, color: '#27aae0'}}
                  />
                ) : (
                  <Icon
                    name="eye-off"
                    type="Ionicons"
                    color="white"
                    onPress={() => this.seePassword()}
                    style={{marginTop: 8, fontSize: 25, color: '#27aae0'}}
                  />
                )}
              </View>

              <Text
                style={{
                  color: 'gray',
                  fontSize: 13,
                  paddingHorizontal: 4,
                  marginTop: 10,
                }}>
                Phone Number
              </Text>

              <View
                style={{
                  width: width / 1.1,
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  paddingVertical: 5,
                  borderRadius: 8,
                  color: 'black',
                  paddingHorizontal: 10,
                  marginTop: 10,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                }}>
                <TextInput
                  value={this.state.mobile_number}
                  onChangeText={mobile_number => this.setState({mobile_number})}
                  style={{
                    height: 45,
                    backgroundColor: 'white',
                    paddingLeft: 10,
                    borderRadius: 8,
                    width: '90%',
                    color: '#27aae0',
                    fontWeight: 'bold',
                  }}
                  placeholderTextColor="gray"
                />
              </View>

              <Text
                style={{
                  color: 'gray',
                  fontSize: 13,
                  paddingHorizontal: 4,
                  marginTop: 10,
                }}>
                Address
              </Text>

              <View
                style={{
                  width: width / 1.1,
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  paddingVertical: 5,
                  borderRadius: 8,
                  color: 'black',
                  paddingHorizontal: 10,
                  marginTop: 10,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                }}>
                <TextInput
                  value={this.state.address}
                  onChangeText={address => this.setState({address})}
                  style={{
                    height: 45,
                    backgroundColor: 'white',
                    paddingLeft: 10,
                    borderRadius: 8,
                    width: '90%',
                    color: '#27aae0',
                    fontWeight: 'bold',
                  }}
                  placeholderTextColor="gray"
                />
              </View>

              <Text
                style={{
                  color: 'gray',
                  fontSize: 13,
                  paddingHorizontal: 4,
                  marginTop: 10,
                }}>
                Date of Birth
              </Text>

              <TouchableOpacity
                onPress={() => this.showtimepicker1()}
                style={{
                  width: width / 1.1,
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  paddingVertical: 5,
                  borderRadius: 8,
                  color: 'black',
                  paddingHorizontal: 10,
                  marginTop: 10,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                }}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    height: 45,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={
                      this.state.dob == 'Date of Birth'
                        ? {
                            backgroundColor: 'white',
                            paddingLeft: 10,
                            borderRadius: 8,
                            width: '90%',
                            color: 'gray',
                            fontWeight: 'bold',
                          }
                        : {
                            backgroundColor: 'white',
                            paddingLeft: 10,
                            borderRadius: 8,
                            width: '90%',
                            color: '#27aae0',
                            fontWeight: 'bold',
                          }
                    }>
                    {this.state.dob}
                  </Text>
                </View>
              </TouchableOpacity>

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

              <Text
                style={{
                  color: 'gray',
                  fontSize: 13,
                  paddingHorizontal: 4,
                  marginTop: 10,
                }}>
                Age
              </Text>

              <View
                style={{
                  width: width / 1.1,
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  paddingVertical: 5,
                  borderRadius: 8,
                  color: 'black',
                  paddingHorizontal: 10,
                  marginTop: 10,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                }}>
                <TextInput
                  value={this.state.age}
                  onChangeText={age => this.setState({age})}
                  style={{
                    height: 45,
                    backgroundColor: 'white',
                    paddingLeft: 10,
                    borderRadius: 8,
                    width: '90%',
                    color: '#27aae0',
                    fontWeight: 'bold',
                  }}
                  placeholderTextColor="gray"
                />
              </View>

              {/* 
              <Text
                style={{
                  color: 'gray',
                  fontSize: 13,
                  paddingHorizontal: 4,
                  marginTop: 10,
                }}>
                Insurance Name
              </Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.RBSheet2.open()}
                style={{
                  width: width / 1.1,
                  height: 55,
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  paddingVertical: 5,
                  borderRadius: 8,
                  color: 'black',
                  paddingHorizontal: 10,
                  marginTop: 10,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                  justifyContent: 'center',
                }}>
                <Text style={{fontWeight: 'bold', color: '#27aae0'}}>
                  {this.state.insurance_name}
                </Text>
              </TouchableOpacity>

              <Text
                style={{
                  color: 'gray',
                  fontSize: 13,
                  paddingHorizontal: 4,
                  marginTop: 10,
                }}>
                Insurance Number
              </Text>

              <View
                style={{
                  width: width / 1.1,
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  paddingVertical: 5,
                  borderRadius: 8,
                  color: 'black',
                  paddingHorizontal: 10,
                  marginTop: 10,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                }}>
                <TextInput
                  value={this.state.insurance_number}
                  onChangeText={insurance_number =>
                    this.setState({insurance_number})
                  }
                  style={{
                    height: 45,
                    backgroundColor: 'white',
                    paddingLeft: 10,
                    borderRadius: 8,
                    width: '90%',
                    color: '#27aae0',
                    fontWeight: 'bold',
                  }}
                  placeholderTextColor="gray"
                />
              </View>

              <Text
                style={{
                  color: 'gray',
                  fontSize: 13,
                  paddingHorizontal: 4,
                  marginTop: 10,
                }}>
                Policy
              </Text>

              <View
                style={{
                  width: width / 1.1,
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  paddingVertical: 5,
                  borderRadius: 8,
                  color: 'black',
                  paddingHorizontal: 10,
                  marginTop: 10,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                }}>
                <TextInput
                  value={this.state.policy}
                  onChangeText={policy => this.setState({policy})}
                  style={{
                    height: 45,
                    backgroundColor: 'white',
                    paddingLeft: 10,
                    borderRadius: 8,
                    width: '90%',
                    color: '#27aae0',
                    fontWeight: 'bold',
                  }}
                  placeholderTextColor="gray"
                />
              </View> */}

              <TouchableOpacity
                onPress={() => {
                  this.Get_address();
                }}
                style={{
                  width: width / 1.1,
                  borderRadius: 20,
                  backgroundColor: '#27aae0',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  paddingVertical: 10,
                  marginVertical: 30,
                }}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>

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
                  activeOpacity={0.8}
                  onPress={() => {
                    this.select_category('MEDICAID (MA)');
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}>
                  <Text style={{color: 'black', fontSize: 14}}>
                    MEDICAID (MA)
                  </Text>

                  <Icon
                    name="chevron-right"
                    type="Entypo"
                    style={{color: 'gray', fontSize: 20}}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    width: width / 1.1,
                    alignSelf: 'flex-end',
                    borderBottomWidth: 0.7,
                    borderColor: 'lightgray',
                    marginVertical: 10,
                  }}></View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.select_category('UCARE');
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={{color: 'black', fontSize: 14}}>UCARE</Text>

                  <Icon
                    name="chevron-right"
                    type="Entypo"
                    style={{color: 'gray', fontSize: 20}}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    width: width / 1.1,
                    alignSelf: 'flex-end',
                    borderBottomWidth: 0.7,
                    borderColor: 'lightgray',
                    marginVertical: 10,
                  }}></View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.select_category('HENNEPIN HEALTH');
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={{color: 'black', fontSize: 14}}>
                    UHENNEPIN HEALTHCARE
                  </Text>

                  <Icon
                    name="chevron-right"
                    type="Entypo"
                    style={{color: 'gray', fontSize: 20}}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    width: width / 1.1,
                    alignSelf: 'flex-end',
                    borderBottomWidth: 0.7,
                    borderColor: 'lightgray',
                    marginVertical: 10,
                  }}></View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.select_category('BLUE CROSS BLUE SHIELD');
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={{color: 'black', fontSize: 14}}>
                    BLUE CROSS BLUE SHIELD
                  </Text>

                  <Icon
                    name="chevron-right"
                    type="Entypo"
                    style={{color: 'gray', fontSize: 20}}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    width: width / 1.1,
                    alignSelf: 'flex-end',
                    borderBottomWidth: 0.7,
                    borderColor: 'lightgray',
                    marginVertical: 10,
                  }}></View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.select_category('BLUE PLUS');
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={{color: 'black', fontSize: 14}}>BLUE PLUS</Text>

                  <Icon
                    name="chevron-right"
                    type="Entypo"
                    style={{color: 'gray', fontSize: 20}}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    width: width / 1.1,
                    alignSelf: 'flex-end',
                    borderBottomWidth: 0.7,
                    borderColor: 'lightgray',
                    marginVertical: 10,
                  }}></View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.select_category('HEALTH PARTNERS');
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={{color: 'black', fontSize: 14}}>
                    HEALTH PARTNERS
                  </Text>

                  <Icon
                    name="chevron-right"
                    type="Entypo"
                    style={{color: 'gray', fontSize: 20}}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    width: width / 1.1,
                    alignSelf: 'flex-end',
                    borderBottomWidth: 0.7,
                    borderColor: 'lightgray',
                    marginVertical: 10,
                  }}></View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.select_category('MDICA');
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={{color: 'black', fontSize: 14}}>MDICA</Text>

                  <Icon
                    name="chevron-right"
                    type="Entypo"
                    style={{color: 'gray', fontSize: 20}}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    width: width / 1.1,
                    alignSelf: 'flex-end',
                    borderBottomWidth: 0.7,
                    borderColor: 'lightgray',
                    marginVertical: 10,
                  }}></View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.select_category('OOSA');
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={{color: 'black', fontSize: 14}}>OOSA</Text>

                  <Icon
                    name="chevron-right"
                    type="Entypo"
                    style={{color: 'gray', fontSize: 20}}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    width: width / 1.1,
                    alignSelf: 'flex-end',
                    borderBottomWidth: 0.7,
                    borderColor: 'lightgray',
                    marginVertical: 10,
                  }}></View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.select_category('SOUTH COUNTRY HEALTH ALLIANCE');
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={{color: 'black', fontSize: 14}}>
                    SOUTH COUNTRY HEALTH ALLIANCE
                  </Text>

                  <Icon
                    name="chevron-right"
                    type="Entypo"
                    style={{color: 'gray', fontSize: 20}}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    width: width / 1.1,
                    alignSelf: 'flex-end',
                    borderBottomWidth: 0.7,
                    borderColor: 'lightgray',
                    marginVertical: 10,
                  }}></View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.select_category('UNITEDHEALTH CARE-MN');
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={{color: 'black', fontSize: 14}}>
                    UNITEDHEALTH CARE-MN
                  </Text>

                  <Icon
                    name="chevron-right"
                    type="Entypo"
                    style={{color: 'gray', fontSize: 20}}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    width: width / 1.1,
                    alignSelf: 'flex-end',
                    borderBottomWidth: 0.7,
                    borderColor: 'lightgray',
                    marginVertical: 10,
                  }}></View>
              </ScrollView>
            </RBSheet>

            <RBSheet
              ref={ref => {
                this.RBSheet1 = ref;
              }}
              height={300}
              openDuration={250}
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
                        style={{fontSize: 30, color: '#1878f3'}}
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
                        style={{fontSize: 30, color: '#1878f3'}}
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
          </ScrollView>

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
                  fontSize: 18,
                  textAlign: 'center',
                  color: 'black',
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>
                Congratulaions!
              </Text>
              {/* <Text style={{ fontSize: 18, textAlign: 'center',color:'black',fontWeight:'bold',marginTop:3 }}>{this.props.updated_your_Profile}</Text> */}

              <Text
                style={{
                  fontSize: 13,
                  textAlign: 'center',
                  color: 'gray',
                  fontWeight: 'bold',
                  marginTop: 20,
                  paddingHorizontal: 50,
                }}>
                Your profile has been updated successfully, Next time updated
                data will be display in App
              </Text>
              {/* <Text style={{ fontSize: 13, textAlign: 'center',color:'gray',fontWeight:'bold',marginTop:3 }}>{this.props.will_be_shown_App}</Text> */}
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
  phoneinput: {
    fontSize: 14,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.7,
    alignSelf: 'center',
    height: 38,
    width: '94%',
    alignSelf: 'center',
  },
  phoneinput_date: {
    fontSize: 16,
    width: '95%',
    // backgroundColor: 'white',
    borderBottomWidth: 0.5,
    paddingHorizontal: 10,

    alignSelf: 'center',
    paddingVertical: 5,

    borderBottomColor: 'gray',

    marginLeft: 6,
    marginTop: 5,
  },
  picker: {
    borderWidth: 1,
    color: 'black',
    borderColor: 'lightgray',
    height: 40,
  },
});

export default update_Patient_profile;

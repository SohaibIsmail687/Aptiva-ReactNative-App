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
  PermissionsAndroid,
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
import RBSheet from 'react-native-raw-bottom-sheet';
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
import Toast from 'react-native-simple-toast';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class update_doctor_profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image1: null,
      spinner: false,
      imagecheck: false,
      gender: 'Select Gender',
      passhide: true,
    };
  }

  backAction = () => {
    Actions.pop();
    return true;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

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

          // this.state.multi_Images.push(text)
          // Actions.form({ multi_Images: this.state.multi_Images })
          this.setState({image1: text, imagecheck: true});
        }
        this.RBSheet1.close();
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

  componentDidMount = async () => {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );

    let user = await AsyncStorage.getItem('customer');

    console.log('aaaaaaaaaaaaa', user);
    let parsed = JSON.parse(user);
    let name = parsed[0].name;
    let id = parsed[0].id;
    let mobile_number = parsed[0].mobile_number;
    let address = parsed[0].address;
    let password = parsed[0].password;
    let gender = parsed[0].gender;
    let email = parsed[0].email;
    let experience = parsed[0].experience;
    let degree = parsed[0].degree;
    let category = parsed[0].category;
    let fee = parsed[0].fee;
    let city = parsed[0].city;
    let clinic = parsed[0].clinic;

    let profile1 = parsed[0].profile;
    let profile = Connection + 'images/' + profile1;
    console.log('profile1', profile1);

    this.setState({
      name: name,
      id: id,
      address: address,
      image1: profile,
      email: email,
      password: password,
      gender: gender,
      category: category,
      degree: degree,
      experience: experience,
      fee: fee,
      city: city,
      clinic: clinic,
      mobile_number: mobile_number,
    });
  };

  select_gender = val_3 => {
    this.setState({
      gender: val_3,
    });
    this.RBSheet5.close();
  };

  select_category = val_3 => {
    this.setState({
      category: val_3,
    });
    this.RBSheet2.close();
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

          this.update_doctor(lat, lng);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  update_doctor = (lat, lng) => {
    let uploaddata = new FormData();

    let name = this.state.name;
    let email = this.state.email;
    let password = this.state.password;
    let mobile_number = this.state.mobile_number;
    let address = this.state.address;
    let gender = this.state.gender;
    let category = this.state.category;
    let experience = this.state.experience;
    let degree = this.state.degree;
    let fee = this.state.fee;
    let clinic = this.state.clinic;

    this.setState({spinner: true});

    uploaddata.append('user_id', this.state.id);
    uploaddata.append('name', name);
    uploaddata.append('email', email);
    uploaddata.append('password', password);
    uploaddata.append('mobile_number', mobile_number);
    uploaddata.append('address', address);
    uploaddata.append('gender', gender);
    uploaddata.append('category', category);
    uploaddata.append('experience', experience);
    uploaddata.append('degree', degree);
    uploaddata.append('fee', this.state.fee);
    uploaddata.append('clinic', clinic);
    uploaddata.append('lat', lat);
    uploaddata.append('lng', lng);

    console.log('MobileNumberMobileNumberMobileNumber', mobile_number);

    let api = Connection + 'rest_apis.php?action=update_doctor';
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
          Actions.Doctor_Tab_Screen();
        }
      })
      .catch(error => {
        console.error(error);
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
              paddingHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 15,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              backgroundColor: '#27aae0',
            }}>
            <Icon
              onPress={() => Actions.pop()}
              name="chevron-left"
              type="Entypo"
              style={{color: 'white', fontSize: 20}}
            />
            <Text style={{color: 'white', fontSize: 15, fontWeight: '700'}}>
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
              Here you can edit your profile, change your preferences.
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
                Gender
              </Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.RBSheet5.open()}
                style={{
                  alignItems: 'center',
                  paddingVertical: 15,
                  width: width / 1.1,
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  borderRadius: 8,
                  color: 'black',
                  paddingHorizontal: 10,
                  marginTop: 15,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                }}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={
                      this.state.category == 'Select Gender'
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
                    {this.state.gender}
                  </Text>
                  <Icon
                    name="down"
                    type="AntDesign"
                    style={{fontSize: 15, color: '#27aae0'}}
                  />
                </View>
              </TouchableOpacity>

              <Text
                style={{
                  color: 'gray',
                  fontSize: 13,
                  paddingHorizontal: 4,
                  marginTop: 10,
                }}>
                Category
              </Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.RBSheet2.open()}
                style={{
                  alignItems: 'center',
                  paddingVertical: 15,
                  width: width / 1.1,
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  borderRadius: 8,
                  color: 'black',
                  paddingHorizontal: 10,
                  marginTop: 15,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                }}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={
                      this.state.category == 'Select Category'
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
                    {this.state.category}
                  </Text>
                  <Icon
                    name="down"
                    type="AntDesign"
                    style={{fontSize: 15, color: '#27aae0'}}
                  />
                </View>
              </TouchableOpacity>

              <Text
                style={{
                  color: 'gray',
                  fontSize: 13,
                  paddingHorizontal: 4,
                  marginTop: 10,
                }}>
                Experience (Only Digits)
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
                  value={this.state.experience}
                  onChangeText={experience => this.setState({experience})}
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
                Education
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
                  value={this.state.degree}
                  onChangeText={degree => this.setState({degree})}
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
                Fee (Only Digits)
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
                  value={this.state.fee}
                  onChangeText={fee => this.setState({fee})}
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
                About
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
                  multiline={true}
                  value={this.state.clinic}
                  onChangeText={clinic => this.setState({clinic})}
                  style={{
                    height: 70,
                    textAlignVertical: 'top',
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
                  marginTop: 30,
                  marginBottom: 20,
                }}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
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
  textipu1: {
    height: 80,
    textAlignVertical: 'top',
    width: width / 1.1,
    alignSelf: 'center',
    backgroundColor: '#e6e6ed',
    borderRadius: 8,
    paddingLeft: 15,
    color: 'black',
    marginTop: 7,
  },
});

export default update_doctor_profile;

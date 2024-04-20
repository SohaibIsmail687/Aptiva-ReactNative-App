import React, {Component} from 'react';
import * as ImagePicker from 'react-native-image-picker';
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
  Pressable,
  Dimensions,
  BackHandler,
  PermissionsAndroid,
  Linking,
  AsyncStorage,
  Platform,
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
import Toast from 'react-native-simple-toast';
import {NavigationEvents} from 'react-navigation';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Patient_Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image1: null,
    };
  }

  backAction = () => {
    Actions.Patient_Tab_Screen();
    return true;
  };

  componentWillUnmount() {
    // this.backHandler.remove();
  }

  componentDidMount = async () => {
    // this.backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   this.backAction
    // );
    let user = await AsyncStorage.getItem('customer');

    console.log('aaaaaaaaaaaaa', user);
    let parsed = JSON.parse(user);
    let name = parsed[0].name;
    let id = parsed[0].id;

    let address = parsed[0].address;
    let city = parsed[0].city;
    let email = parsed[0].email;
    let mobile_number = parsed[0].mobile_number;
    let profile1 = parsed[0].profile;
    let gender = parsed[0].gender;
    let age = parsed[0].age;

    if (profile1 == null) {
      console.log('profile1111111', profile1);

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
      city: city,
      mobile_number: mobile_number,

      email: email,
      address: address,
      gender: gender,
      age: age,
    });
  };

  logout = () => {
    this.RBSheet2.close();
    AsyncStorage.removeItem('customer');
    this.setState({
      check_login: false,
    });
    // this.offline()
    Actions.Patient_Login_Screen({role: 'user'});
  };

  update_photo = val => {
    const newImage = {
      uri: val,
      name: 'my_photo.jpg',
      type: 'image/jpg',
    };

    let uploaddata = new FormData();
    // this.setState({spinner: true});
    uploaddata.append('image', newImage);
    uploaddata.append('user_id', this.state.id);

    let api = Connection + 'rest_apis.php?action=update_photo';
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
          alert(this.props.Please_try_agin_later);
        } else {
          this.setState({
            spinner: false,
          });
          AsyncStorage.setItem('customer', JSON.stringify(response.response));

          Toast.show('You successfully updated your Profile');

          Actions.Patient_Tab_Screen();
        }
      })
      .catch(error => {
        console.error(error);
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

          this.setState({image1: text, imagecheck: true});

          this.update_photo(text);
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
          this.update_photo(text);
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

  dd = () => {
    this.componentDidMount();
  };

  offline = () => {
    let uploaddata = new FormData();
    uploaddata.append('id', this.state.id);
    let api = Connection + 'rest_apis.php?action=update_offline';
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
      .then(response => {})
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <NavigationEvents onDidFocus={payload => this.dd()} />

        <View
          style={{
            paddingHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: 'white',
          }}>
          <Text style={{color: '#27aae0', fontSize: 20, fontWeight: 'bold'}}>
            Profile
          </Text>

          <Image
            style={{width: '50%', height: 60}}
            source={require('../assets/ic_launcher.png')}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: width / 1,
              backgroundColor: 'white',
              marginTop: 10,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              paddingHorizontal: 15,
              paddingVertical: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: '73%'}}>
                <Text
                  style={{color: '#27aae0', fontWeight: 'bold', fontSize: 18}}>
                  {this.state.name}
                </Text>

                <View
                  style={{
                    width: '90%',
                    borderWidth: 1,
                    borderColor: 'lightgray',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    marginTop: 10,
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{color: '#27aae0', width: '90%'}}>
                    {this.state.address}
                  </Text>
                  {/* <Text style={{color: '#27aae0'}}>
                    {this.state.gender} | {this.state.age}
                  </Text> */}
                </View>

                <Text style={{color: '#27aae0', marginTop: 10}}>
                  Mobile No: {this.state.mobile_number}
                </Text>
              </View>
              <View
                style={{
                  width: 100,
                  height: 100,
                  alignSelf: 'center',
                  borderRadius: 100,
                }}>
                <ImageLoad
                  style={{width: 100, height: 100, borderRadius: 100}}
                  loadingStyle={{size: 'large', color: 'blue'}}
                  source={{uri: this.state.image1}}
                  borderRadius={100}
                  placeholderStyle={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                  }}
                />

                <TouchableOpacity
                  onPress={() => this.RBSheet1.open()}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#27aae0',
                    position: 'absolute',
                    bottom: -10,
                    right: 5,
                  }}>
                  <Icon
                    name="camera"
                    type="Entypo"
                    style={{color: 'white', fontSize: 13}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* <View style={{ borderBottomWidth: 1.2, borderColor: 'lightgray', marginTop: 20 }}></View> */}

          <TouchableOpacity
            onPress={() => Actions.update_patient_profile()}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              width: width / 1.1,
              alignSelf: 'center',
              paddingHorizontal: 5,
              marginTop: 15,
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: '#27aae0',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
              }}>
              <Icon
                name="user-alt"
                type="FontAwesome5"
                style={{color: 'white', fontSize: 16}}
              />
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '600',
                marginLeft: 12,
              }}>
              Account Setting
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => Actions.favourite_doctors()}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              width: width / 1.1,
              alignSelf: 'center',
              paddingHorizontal: 5,
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: '#27aae0',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
              }}>
              <Icon
                name="bookmark"
                type="FontAwesome"
                style={{color: 'white', fontSize: 16}}
              />
            </View>

            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '600',
                marginLeft: 12,
              }}>
              Favourite Doctors
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => Actions.Patient_Wallet()}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              width: width / 1.1,
              alignSelf: 'center',
              paddingHorizontal: 5,
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: '#27aae0',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
              }}>
              <Icon
                name="dollar"
                type="Foundation"
                style={{color: 'white', fontSize: 25}}
              />
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '600',
                marginLeft: 10,
              }}>
              Payment History
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Actions.Notifications()}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              width: width / 1.1,
              alignSelf: 'center',
              paddingHorizontal: 5,
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: '#27aae0',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
              }}>
              <Icon
                name="bell"
                type="FontAwesome"
                style={{color: 'white', fontSize: 16}}
              />
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '600',
                marginLeft: 10,
              }}>
              Notification
            </Text>
          </TouchableOpacity>

          {/* onPress={() => Linking.openURL('mailto:IT@Neurolifetherapy.com')} */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              width: width / 1.1,
              alignSelf: 'center',
              paddingHorizontal: 5,
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: '#27aae0',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
              }}>
              <Icon
                name="help-buoy-sharp"
                type="Ionicons"
                style={{color: 'white', fontSize: 16}}
              />
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '600',
                marginLeft: 12,
              }}>
              Help & Support
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              width: width / 1.1,
              alignSelf: 'center',
              paddingHorizontal: 5,
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: '#27aae0',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
              }}>
              <Icon
                name="tag"
                type="AntDesign"
                style={{color: 'white', fontSize: 16}}
              />
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '600',
                marginLeft: 12,
              }}>
              About Us
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              width: width / 1.1,
              alignSelf: 'center',
              paddingHorizontal: 5,
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: '#27aae0',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
              }}>
              <Icon
                name="info-with-circle"
                type="Entypo"
                style={{color: 'white', fontSize: 16}}
              />
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '600',
                marginLeft: 12,
              }}>
              Terms & Conditions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Actions.Delete_Account()}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              width: width / 1.1,
              alignSelf: 'center',
              paddingHorizontal: 5,
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: '#27aae0',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
              }}>
              <Icon
                name="delete"
                type="MaterialCommunityIcons"
                style={{color: 'white', fontSize: 16}}
              />
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '600',
                marginLeft: 12,
              }}>
              Delete Account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.RBSheet2.open()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              width: width / 1.1,
              alignSelf: 'center',
              paddingHorizontal: 5,
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: '#27aae0',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
              }}>
              <Icon
                name="log-out"
                type="Entypo"
                style={{color: 'white', fontSize: 16}}
              />
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '600',
                marginLeft: 12,
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </ScrollView>

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
                    style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
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
                    style={{fontSize: 30, color: '#27aae0'}}
                  />
                  <Text
                    style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
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
          height={220}
          closeOnDragDown={true}
          openDuration={220}
          customStyles={{
            container: {
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            },
            draggableIcon: {
              backgroundColor: 'lightgray',
            },
          }}>
          <View>
            <Text
              style={{
                fontSize: 18,
                color: 'red',
                marginTop: 5,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Logout
            </Text>
            <View
              style={{
                width: width / 1 - 50,
                borderBottomWidth: 1,
                borderColor: '#d2d5da',
                marginVertical: 20,
                alignSelf: 'center',
              }}></View>

            <Text style={{color: 'black', fontSize: 15, alignSelf: 'center'}}>
              Are you sure you want to logout?
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 25,
                marginBottom: 10,
                paddingHorizontal: 17,
              }}>
              <TouchableOpacity
                onPress={() => this.RBSheet2.close()}
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

              <TouchableOpacity
                onPress={() => this.logout()}
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
                  Yes Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>

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
    );
  }
}

export default Patient_Profile;

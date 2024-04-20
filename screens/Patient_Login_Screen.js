import {Row} from 'native-base';
import React, {Component} from 'react';
import {connect} from 'react-redux';

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
  Keyboard,
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
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Patient_Login_Screen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile_number: '',
      Butun_Hide: true,
      checked: true,
      email: '',
      password: '',
      passhide: true,
      role: 'user',
      text1: 2,
      text2: 1,
      text3: 1,
      text4: 1,
      text5: 1,
      text6: 1,
      text7: 1,
    };
  }

  backAction = () => {
    Actions.Roll_Screen();
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
  };

  login = () => {
    let uploaddata = new FormData();
    let email = this.state.email;
    let password = this.state.password;

    if (email == '') {
      alert('Please enter email.');
    } else if (password == '') {
      alert('Please enter password.');
    } else {
      this.setState({spinner: true});
      uploaddata.append('email', email);
      uploaddata.append('password', password);
      uploaddata.append('role', this.state.role);

      console.log('RoleRoleRoleRoleRole', this.state.role);
      let api = Connection + 'rest_apis.php?action=login';

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
          if (response.response == 'fail') {
            this.setState({spinner: false});
            alert('Invalid email or password');
          } else {
            let record = response.response;
            let role = record[0].role;
            if (role == 'user') {
              this.setState({spinner: false});
              AsyncStorage.setItem(
                'customer',
                JSON.stringify(response.response),
              );

              Actions.Patient_Tab_Screen({update: true});
            } else {
              let record = response.response;
              let status = record[0].status;

              if (status == 'approved') {
                if (this.state.checked == true) {
                  let table = [];
                  table.push(email, password, 'doctor');
                  AsyncStorage.setItem('remember_1', JSON.stringify(table));
                } else {
                  AsyncStorage.removeItem('remember_1');
                }
                this.setState({spinner: false});
                AsyncStorage.setItem(
                  'customer',
                  JSON.stringify(response.response),
                );

                Actions.Doctor_Tab_Screen({update: true});
              } else {
                this.setState({spinner: false});
                alert(
                  'You have successfully registered but your account is under review.',
                );
              }
            }
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
    // alert('Keyboard is open')
    this.setState({Butun_Hide: false});
  });
  keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
    // alert('Keyboard is closed')
    this.setState({Butun_Hide: true});
  });

  seePassword = () => {
    console.log('eeeeeeeeeeeee');
    this.setState({
      passhide: !this.state.passhide,
    });
  };

  changebtn(value, val) {
    console.log('valvalvalval', val);

    this.setState({
      role: val,
    });

    if (this.state[value] == 2) {
      this.setState({
        text1: 1,
        text2: 1,
        text3: 1,
        text4: 1,
        text5: 1,
        text6: 1,
        text7: 1,
        text8: 1,
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
        text7: 1,
        text8: 1,
        [value]: 2,
      });
    }
    // this.dd(val)
  }

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
              onPress={() => Actions.pop()}
              name="arrow-back"
              type="MaterialIcons"
              style={{color: '#27aae0', fontSize: 24}}
            />
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#27aae0'}}>
              Sign In
            </Text>
            <Text style={{fontSize: 22, fontWeight: 'bold', color: 'black'}}>
              {' '}
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              source={require('../assets/ic_launcher.png')}
              style={{
                marginTop: 30,
                width: width / 1.5,
                height: 100,
                alignSelf: 'center',
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: width / 1.1,
                justifyContent: 'center',
                marginTop: 30,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 15,
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => this.changebtn('text1', 'user')}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 100,
                    borderColor: '#27aae0',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2,
                  }}>
                  <View
                    style={
                      this.state.text1 == 1 ? styles.uncheked : styles.checked
                    }></View>
                </TouchableOpacity>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontWeight: '500',
                    color: 'black',
                    fontFamily: 'DMSans-Bold',
                  }}>
                  {' '}
                  User
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 5,
                  marginHorizontal: 15,
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => this.changebtn('text2', 'doctor')}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 100,
                    borderColor: '#27aae0',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2,
                  }}>
                  <View
                    style={
                      this.state.text2 == 1 ? styles.uncheked : styles.checked
                    }></View>
                </TouchableOpacity>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontWeight: '500',
                    color: 'black',
                    fontFamily: 'DMSans-Bold',
                  }}>
                  {' '}
                  Doctor
                </Text>
              </View>
            </View>

            <Text
              style={{
                color: '#27aae0',
                fontSize: 22,
                fontWeight: 'bold',
                paddingHorizontal: 20,
                marginTop: 20,
              }}>
              Welcome Back
            </Text>
            <Text style={{color: 'gray', fontSize: 14, paddingHorizontal: 20}}>
              Sign In To Continue
            </Text>

            <View
              style={{
                width: width / 1.1,
                marginTop: 20,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <TextInput
                onChangeText={email => this.setState({email})}
                value={this.state.email}
                style={{
                  marginTop: 10,
                  width: width / 1.1,
                  height: 50,
                  backgroundColor: '#d9d9d9',
                  paddingLeft: 40,
                  borderRadius: 28,
                  alignSelf: 'center',
                  color: '#27aae0',
                  fontWeight: 'bold',
                }}
                placeholder="Example@yahoo.com"
                placeholderTextColor="gray"
              />
              <Icon
                name="email"
                type="MaterialCommunityIcons"
                style={{
                  color: '#27aae0',
                  fontSize: 24,
                  position: 'absolute',
                  left: 10,
                  top: 20,
                }}
              />
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
                value={this.state.password}
                style={{
                  marginTop: 10,
                  width: width / 1.1,
                  height: 50,
                  backgroundColor: '#d9d9d9',
                  paddingLeft: 40,
                  borderRadius: 28,
                  alignSelf: 'center',
                  color: '#27aae0',
                  fontWeight: 'bold',
                }}
                placeholder="*************"
                placeholderTextColor="gray"
              />
              <Icon
                name="lock-outline"
                type="MaterialCommunityIcons"
                style={{
                  color: '#27aae0',
                  fontSize: 24,
                  position: 'absolute',
                  left: 10,
                  top: 20,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 18,
                marginVertical: 20,
              }}>
              <Text> </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => Actions.Patient_Forgot_Screen()}>
                <Text
                  style={{color: '#27aae0', fontSize: 13, fontWeight: 'bold'}}>
                  Forgot Password
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.login()}
              style={{
                width: width / 1.1,
                alignSelf: 'center',
                height: 50,
                backgroundColor: '#27aae0',
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 40,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Sign In</Text>
            </TouchableOpacity>
          </ScrollView>
          {this.state.Butun_Hide == true ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                position: 'absolute',
                bottom: 15,
              }}>
              <Text style={{color: 'gray'}}>Don't have account?</Text>

              {this.state.role == 'user' ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    Actions.Patient_SignUp_Screen({role: this.state.role});
                  }}>
                  <Text style={{color: '#27aae0', fontWeight: 'bold'}}>
                    {' '}
                    Create a new account
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    Actions.doctor_signup({role: this.state.role});
                  }}>
                  <Text style={{color: '#27aae0', fontWeight: 'bold'}}>
                    {' '}
                    Create a new account
                  </Text>
                </TouchableOpacity>
              )}
              {/* {this.props.role == 'user' ?

                <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Patient_SignUp_Screen({ role: this.props.role }) }}>
                  <Text style={{ color: '#27aae0', fontWeight: 'bold' }}> Creat a new account</Text>
                </TouchableOpacity>

                :

                <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.doctor_signup({ role: this.props.role }) }}>
                  <Text style={{ color: '#27aae0', fontWeight: 'bold' }}> Creat a new account</Text>
                </TouchableOpacity>

              } */}
            </View>
          ) : (
            <View></View>
          )}

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
  text1: {
    color: 'gray',
  },
  text: {
    color: 'white',
  },
  view1: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
  },
  view: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: '#27aae0',
  },
  unselect: {
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#27aae0',
    borderWidth: 1,
    marginLeft: 10,
    paddingVertical: 10,
  },
  select: {
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#27aae0',
    backgroundColor: '#27aae0',
    marginLeft: 10,
    paddingVertical: 10,
  },
  unselect_text: {
    color: '#27aae0',
    fontFamily: 'DMSans-Bold',
  },
  select_text: {
    color: 'white',
    fontFamily: 'DMSans-Bold',
  },
  select_text_red: {
    color: 'white',
    fontFamily: 'DMSans-Bold',
    fontSize: 15,
  },
  unselect_text_red: {
    color: 'white',
    fontFamily: 'DMSans-Bold',
    fontSize: 15,
  },
  select_red: {
    width: 130,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFD242',
    marginLeft: 10,
    paddingVertical: 10,
  },
  unselect_red: {
    width: 130,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFD242',
    marginLeft: 10,
    paddingVertical: 10,
  },
  checked: {
    width: 17,
    height: 17,
    backgroundColor: '#27aae0',
    borderRadius: 30,
  },

  uncheked: {
    width: 17,
    height: 17,
    borderRadius: 100,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 500,
  },
});

export default Patient_Login_Screen;

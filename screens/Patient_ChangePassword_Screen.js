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
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import Connection from '../connection';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Patient_ChangePassword_Screen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      confirmpassword: '',
      //  receiver_email:'mehar.umer543@gmail.com',
      sender_email: 'mehar.umer543@gmail.com',
      subject: 'Forgot Password',
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
  };

  Update_Data = () => {
    let uploaddata = new FormData();

    let password = this.state.password;
    let confirmpassword = this.state.confirmpassword;

    if (password == '') {
      alert('Please enter new password.');
    } else if (confirmpassword == '') {
      alert('Please enter confirm password');

      //   alert("Password is not match")
    } else if (confirmpassword != password) {
      alert('Password not matched.');
    } else {
      this.setState({spinner: true});
      console.log('EMAILLLLLL', this.props.Email);
      //   console.log('this.props.idthis.props.idthis.props.id', this.props.id);
      console.log('this.props.idthis.props.idthis.props.id', this.state.id);

      uploaddata.append('email', this.props.Email);
      uploaddata.append('password', password);
      uploaddata.append('id', this.props.id);

      let api = Connection + 'rest_apis.php?action=change_password';

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
            alert('Password not changed');
          } else {
            // this.send_email()
            Toast.show('Your password changed');
            setTimeout(() => {
              this.setState({
                spinner: false,
              });
              Actions.Patient_Login_Screen({role: this.props.role});
              //   this.opendialogue();
            }, 100);
          }
        })

        .catch(error => {
          console.error(error);
        });
    }
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
      Actions.Roll_Screen();
    }, 100);
  };

  opendialogue = () => {
    this.setState({
      visible: true,
    });
  };

  seePassword = () => {
    this.setState({
      passhide: !this.state.passhide,
    });
  };

  hidePassword = () => {
    this.setState({
      passhide: false,
    });
  };

  seePassword1 = () => {
    this.setState({
      passhide1: !this.state.passhide1,
    });
  };

  hidePassword1 = () => {
    console.log('yyyyyyyy');

    this.setState({
      passhide1: false,
    });
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <ScrollView>
            <View style={{width: width, height: height / 10}}></View>
            <Image
              source={require('../assets/ic_launcher.png')}
              style={{width: 200, height: 140, alignSelf: 'center'}}
              resizeMode="contain"
            />
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Create New Password
            </Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 13,
                textAlign: 'center',
                paddingHorizontal: 15,
              }}>
              Please enter strong password and make sure both password fields
              are same
            </Text>

            <View
              style={{
                width: width / 1.1,
                alignSelf: 'center',
                backgroundColor: 'white',
                paddingVertical: 15,
                borderRadius: 8,
                color: 'black',
                paddingHorizontal: 10,
                marginTop: 30,
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 3,
                marginBottom: 30,
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  borderRadius: 12,
                  paddingHorizontal: 15,
                }}>
                <TextInput
                  onChangeText={password => this.setState({password})}
                  style={{
                    height: 45,
                    backgroundColor: 'white',
                    paddingLeft: 10,
                    borderRadius: 8,
                    width: '93%',
                    color: '#27aae0',
                    fontWeight: 'bold',
                  }}
                  placeholder="New Password"
                  placeholderTextColor="gray"
                />
                {this.state.password == '' ? (
                  <View>
                    <Icon
                      name="lock-outline"
                      type="MaterialCommunityIcons"
                      style={{color: 'gray', fontSize: 24}}
                    />
                  </View>
                ) : (
                  <View>
                    <Icon
                      name="lock-outline"
                      type="MaterialCommunityIcons"
                      style={{color: '#27aae0', fontSize: 24}}
                    />
                  </View>
                )}
              </View>

              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  marginTop: 20,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  borderRadius: 12,
                  paddingHorizontal: 15,
                }}>
                <TextInput
                  onChangeText={confirmpassword =>
                    this.setState({confirmpassword})
                  }
                  style={{
                    height: 45,
                    backgroundColor: 'white',
                    paddingLeft: 10,
                    borderRadius: 8,
                    width: '93%',
                    color: '#27aae0',
                    fontWeight: 'bold',
                  }}
                  placeholder="Confirm Password"
                  placeholderTextColor="gray"
                />
                {this.state.confirmpassword == '' ? (
                  <View>
                    <Icon
                      name="lock-outline"
                      type="MaterialCommunityIcons"
                      style={{color: 'gray', fontSize: 24}}
                    />
                  </View>
                ) : (
                  <View>
                    <Icon
                      name="lock-outline"
                      type="MaterialCommunityIcons"
                      style={{color: '#27aae0', fontSize: 24}}
                    />
                  </View>
                )}
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.Update_Data();
                }}
                style={{
                  width: width / 1.2,
                  alignSelf: 'center',
                  height: 48,
                  backgroundColor: '#27aae0',
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Reset Password
                </Text>
              </TouchableOpacity>
            </View>
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
                  fontSize: 20,
                  textAlign: 'center',
                  color: 'black',
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                CONGRATULATION!
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  textAlign: 'center',
                  color: 'gray',
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>
                Your password has been changed succesfully
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  textAlign: 'center',
                  color: 'gray',
                  fontWeight: 'bold',
                  marginTop: 3,
                }}>
                Now you will use new password for login.
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

export default Patient_ChangePassword_Screen;

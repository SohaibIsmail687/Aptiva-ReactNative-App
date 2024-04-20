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
import ImageLoad from 'react-native-image-placeholder';
import Connection from '../connection';
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
} from 'react-native-popup-dialog';
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
import {connect} from 'react-redux';
import moment from 'moment';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

var hobbies = [
  {label: 'I want to change to another doctor', value: 0},
  {label: 'I want to change pacakage', value: 1},
  {label: 'I dont want to consult', value: 2},
  {label: 'I have recovered the disease', value: 3},
  {label: 'I have found a suitable medicine', value: 4},
  {label: 'I just want to cancel', value: 5},
  {label: 'I dont want to tell', value: 6},
  {label: 'Others', value: 7},
];

class cancel_appointment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      skalton: true,
      other: false,
      cancel_reason: '',
      show_keyboard: false,
      Butun_Hide: true,
      text1: 1,
      text2: 1,
      text3: 1,
      text4: 1,
      text5: 1,
      text6: 1,
      text7: 1,
      text8: 1,
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
    Actions.pop();
    return true;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  componentDidMount = async () => {
    let aa = moment(new Date()).format('YYYY-MM-DD hh:mm a');
    console.log('QQQQQQQQQQQQ,AA', this.props.fcm_token);
    let split = aa.split(' ');
    let date = split[0];
    let time = split[1];
    let am_pm = split[2];
    let final_time = time + ' ' + am_pm;
    let today = new Date();
    let today_date = today.setHours(0, 0, 0, 0);
    let date2 = new Date(this.props.date);
    if (today_date >= date2) {
      this.setState({
        cancel_app: false,
      });
    } else {
      this.setState({
        cancel_app: true,
      });
    }

    this.setState({
      time: final_time,
      date: date,
    });

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
    console.log('KKKKKKKKKKKKKKKK', this.props.status);
    let user = await AsyncStorage.getItem('customer');

    let parsed = JSON.parse(user);
    let name = parsed[0].name;
    let id = parsed[0].id;

    let address = parsed[0].address;
    let mobile_number = parsed[0].mobile_number;

    this.setState({
      id: id,
      address: address,
      mobile_number: mobile_number,
      name: name,
    });
  };

  handleDelete = () => {
    this.setState({
      visible: false,
    });
    setTimeout(() => {
      // Actions.Patient_All_Appointment();
      Actions.Patient_Tab_Screen();
    }, 100);
  };

  opendialogue = () => {
    this.setState({
      visible: true,
    });
  };

  notification = async () => {
    let to = this.props.fcm_token;
    console.log('To is => ', to);
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'key= AAAA2XtYsuc:APA91bELnEWCV3Z12HxIOdU56f767wfoJaKR1tlqfOTzvWSqhSwWvkrkOgLOw9TPgaoKP8PhvGKgr7D1i6qfPUV8dbf64EkoqlPfeXYRgCWlT91eXFEwikCFngSYoZIT_Xzd3MooB5Vn', //cloud server key
      },
      body: JSON.stringify({
        to: to,
        priority: 'high',
        notification: {
          title: 'AptivaNow',
          body: this.state.name + ' is cancelled appointment with you',
          sound: 'default',
          icon: 'myicon',
        },
      }),
    })
      .then(res => res.json())
      .then(resjson => console.log('test', resjson))
      .catch(err => console.log('error =>', err));
  };

  cancel_appointment = () => {
    if (this.state.cancel_reason == '') {
      alert('Please select reason.');
    } else {
      this.setState({spinner: true, visible: false});
      let uploaddata = new FormData();

      uploaddata.append('user_id', this.state.id);
      uploaddata.append('appointment_id', this.props.appointment_id);
      uploaddata.append('cancel_reason', this.state.cancel_reason);

      let api = Connection + 'rest_apis.php?action=cancel_appointment';
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
            this.setState({
              spinner: false,
            });
            alert(this.props.Something_went_wrong);
          } else {
            this.setState({
              spinner: false,
            });

            this.notification();
            this.add_notification();
            this.opendialogue();
            // Actions.Patient_All_Appointment();
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  add_notification = () => {
    let uploaddata = new FormData();

    uploaddata.append('user_id', this.state.id);
    uploaddata.append('time', this.state.time);
    uploaddata.append('type', 'cancel');
    uploaddata.append('doctor_id', this.props.doctor_id);
    uploaddata.append('date', this.state.date);
    uploaddata.append('appointment_id', this.props.appointment_id);

    let api = Connection + 'rest_apis.php?action=add_notification';
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
        if (record == 'fail') {
          this.setState({
            spinner: false,
          });
        } else {
          this.setState({
            spinner: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  changebtn(value, val) {
    if (val == 'Others') {
      this.setState({
        other: true,
        cancel_reason: '',
      });
    } else {
      this.setState({
        cancel_reason: val,
        other: false,
      });
    }

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
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor="#27aae0" barStyle="light-content" />

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
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                Cancel Appointment
              </Text>

              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                {' '}
              </Text>
            </View>
            <ScrollView>
              <View style={{paddingHorizontal: 20}}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginTop: 10,
                  }}>
                  Reason for Cancel Appointment
                </Text>

                <View style={{marginTop: 20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 5,
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        this.changebtn(
                          'text1',
                          'I want to change to another doctor',
                        )
                      }
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
                          this.state.text1 == 1
                            ? styles.uncheked
                            : styles.checked
                        }></View>
                    </TouchableOpacity>
                    <Text style={{marginLeft: 8, color: 'black'}}>
                      I no longer need an appointment
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 5,
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        this.changebtn('text2', 'I want to change pacakage')
                      }
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
                          this.state.text2 == 1
                            ? styles.uncheked
                            : styles.checked
                        }></View>
                    </TouchableOpacity>
                    <Text style={{marginLeft: 8, color: 'black'}}>
                      I need to reschedule an appointment
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 5,
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        this.changebtn('text3', 'I dont want to consult')
                      }
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
                          this.state.text3 == 1
                            ? styles.uncheked
                            : styles.checked
                        }></View>
                    </TouchableOpacity>
                    <Text style={{marginLeft: 8, color: 'black', width: '90%'}}>
                      I want to schedule an appointment with another doctor
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 5,
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => this.changebtn('text8', 'Others')}
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
                          this.state.text8 == 1
                            ? styles.uncheked
                            : styles.checked
                        }></View>
                    </TouchableOpacity>
                    <Text style={{marginLeft: 8, color: 'black'}}>Others</Text>
                  </View>
                </View>

                {this.state.other == true && (
                  <View
                    style={{
                      width: '100%',
                      height: 120,
                      marginTop: 40,
                      alignSelf: 'center',
                      marginBottom: 10,
                    }}>
                    <TextInput
                      onChangeText={cancel_reason =>
                        this.setState({cancel_reason})
                      }
                      multiline={true}
                      style={{
                        width: '100%',
                        textAlignVertical: 'top',
                        alignSelf: 'center',
                        backgroundColor: '#f1f1f1',
                        height: 120,
                        borderRadius: 10,
                        paddingHorizontal: 15,
                        color: 'black',
                      }}
                      placeholder="Please describe your reason"
                      placeholderTextColor="gray"
                    />
                  </View>
                )}
              </View>
            </ScrollView>
            {this.state.Butun_Hide == true && (
              <TouchableOpacity
                onPress={() => this.cancel_appointment()}
                activeOpacity={0.8}
                style={{
                  width: width / 1.1,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 13,
                  position: 'absolute',
                  bottom: 10,
                  borderRadius: 100,
                  backgroundColor: '#27aae0',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                }}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
                  Submit
                </Text>
              </TouchableOpacity>
            )}

            <Dialog
              style={{backgroundColor: 'black', padding: 0}}
              width={'85%'}
              visible={this.state.visible}
              dialogAnimation={
                new SlideAnimation({
                  slideFrom: 'bottom',
                })
              }
              onTouchOutside={() => this.handleDelete()}>
              <DialogContent
                style={{paddingLeft: 0, paddingRight: 0, borderRadius: 12}}>
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={require('../assets/ic_launcher.png')}
                    style={{
                      width: 250,
                      height: 250,
                      alignSelf: 'center',
                      marginTop: 10,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 22,
                      color: '#27aae0',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      paddingHorizontal: 40,
                      marginTop: 10,
                    }}
                    numberOfLines={2}>
                    Cancel Appointment Success!
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'gray',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      paddingHorizontal: 30,
                      marginTop: 20,
                    }}>
                    We are very sad that you have cancel your appointment. We
                    will always improve our services to satisfy you in the next
                    appointment.
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.handleDelete()}
                    activeOpacity={0.8}
                    style={{
                      width: '80%',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 13,
                      marginTop: 30,
                      marginBottom: 10,
                      borderRadius: 100,
                      backgroundColor: '#27aae0',
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 3,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 15,
                      }}>
                      OK
                    </Text>
                  </TouchableOpacity>
                </View>
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
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
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
                    style={{
                      fontSize: 16,
                      color: '#27aae0',
                      fontWeight: 'bold',
                    }}>
                    Progressing Your Request
                  </Text>
                </View>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </>
    );
  }
}

const styles = StyleSheet.create({
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
});

export default cancel_appointment;

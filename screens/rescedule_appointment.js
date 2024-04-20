import {Row} from 'native-base';
import React, {Component} from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
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

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

var hobbies = [
  {label: 'I am having schedule clash', value: 0},
  {label: 'I am not available on schedule', value: 1},
  {label: 'I have an activity that can not be left behind', value: 2},
  {label: 'I dont want to tell', value: 3},
  {label: 'Others', value: 4},
];

class rescedule_appointment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      main_array: [],
      visible: false,
      user_rating: 0,
      comment: '',
      data1: [],
      skalton: true,
      rescedule_reason: '',
      Butun_Hide: true,
      text1: 1,
      text2: 1,
      text3: 1,
      text4: 1,
      text5: 1,
      text6: 1,
      text7: 1,
      text8: 1,
      text9: 1,
    };
  }

  backAction = () => {
    Actions.pop();
    return true;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
    // alert('Keyboard is open')
    this.setState({Butun_Hide: false});
  });
  keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
    // alert('Keyboard is closed')
    this.setState({Butun_Hide: true});
  });

  componentDidMount = async () => {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
    console.log('KKKKKKKKKKKKKKKK', this.props.status);
    let user = await AsyncStorage.getItem('customer');

    console.log('aaaaaaaaaaaaa', user);
    let parsed = JSON.parse(user);
    let name = parsed[0].name;
    let id = parsed[0].id;
    // this.Check_Review(id)

    let address = parsed[0].address;
    let mobile_number = parsed[0].mobile_number;

    if (this.props.perscription == null) {
      this.setState({
        p_image: null,
      });
    } else {
      let perscription1 =
        Connection + 'perscription/' + this.props.perscription;
      this.setState({
        p_image: perscription1,
      });
    }
    this.setState({
      id: id,
      address: address,
      mobile_number: mobile_number,
    });
  };

  rescedule_reason = () => {
    if (this.state.rescedule_reason == '') {
      alert('Please select reason for reschedule appoitment.');
    } else {
      this.setState({
        spinner: true,
      });
      setTimeout(() => {
        this.setState({
          spinner: false,
        });
        Actions.rescedule_appointment_calendar({
          fcm_token: this.props.fcm_token,
          time: this.props.time,
          final_date_1: this.props.date,
          day_1: this.props.day,
          appointment_id: this.props.appointment_id,
          user_id: this.state.id,
          doctor_id: this.props.doctor_id,
          rescedule_reason: this.state.rescedule_reason,
          fcm_token: this.props.fcm_token,
          doctor_profile: this.props.doctor_profile,
          doctor_name: this.props.doctor_name,
          category: this.props.category,
        });
      }, 100);
    }
  };

  changebtn(value, val) {
    if (val == 'Others') {
      this.setState({
        other: true,
        rescedule_reason: '',
      });
    } else {
      this.setState({
        rescedule_reason: val,
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
        text9: 1,

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
        text9: 1,

        [value]: 2,
      });
    }
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
              paddingHorizontal: 15,
              paddingVertical: 15,
              backgroundColor: '#5DA545',
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
              Rescedule Appointment
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
                  marginTop: 20,
                }}>
                Reason for Reschedule Appointment
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
                        'text3',
                        'I want to change to another provider',
                      )
                    }
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 100,
                      borderColor: '#5DA545',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                    }}>
                    <View
                      style={
                        this.state.text3 == 1 ? styles.uncheked : styles.checked
                      }></View>
                  </TouchableOpacity>
                  <Text style={{marginLeft: 8}}>
                    I want to change to another provider
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
                      this.changebtn(
                        'text5',
                        'I want to change my appointment reason',
                      )
                    }
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 100,
                      borderColor: '#5DA545',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                    }}>
                    <View
                      style={
                        this.state.text5 == 1 ? styles.uncheked : styles.checked
                      }></View>
                  </TouchableOpacity>
                  <Text style={{marginLeft: 8}}>
                    I want to change my appointment reason
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
                      this.changebtn('text6', 'I won’t be available')
                    }
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 100,
                      borderColor: '#5DA545',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                    }}>
                    <View
                      style={
                        this.state.text6 == 1 ? styles.uncheked : styles.checked
                      }></View>
                  </TouchableOpacity>
                  <Text style={{marginLeft: 8}}>I won’t be available</Text>
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
                      this.changebtn(
                        'text7',
                        'I’m having technical difficulties',
                      )
                    }
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 100,
                      borderColor: '#5DA545',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                    }}>
                    <View
                      style={
                        this.state.text7 == 1 ? styles.uncheked : styles.checked
                      }></View>
                  </TouchableOpacity>
                  <Text style={{marginLeft: 8}}>
                    I’m having technical difficulties
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
                      this.changebtn('text9', 'I don’t want to disclose')
                    }
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 100,
                      borderColor: '#5DA545',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                    }}>
                    <View
                      style={
                        this.state.text9 == 1 ? styles.uncheked : styles.checked
                      }></View>
                  </TouchableOpacity>
                  <Text style={{marginLeft: 8}}>I don’t want to disclose</Text>
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
                      borderColor: '#5DA545',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                    }}>
                    <View
                      style={
                        this.state.text8 == 1 ? styles.uncheked : styles.checked
                      }></View>
                  </TouchableOpacity>
                  <Text style={{marginLeft: 8}}>Others</Text>
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
                    onChangeText={rescedule_reason =>
                      this.setState({rescedule_reason})
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
              onPress={() => this.rescedule_reason()}
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
                backgroundColor: '#5DA545',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 3,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
                Submit
              </Text>
            </TouchableOpacity>
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
                <UIActivityIndicator color="#5DA545" />
                <Text
                  style={{fontSize: 16, color: '#5DA545', fontWeight: 'bold'}}>
                  Progressing Your Request
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
  checked: {
    width: 17,
    height: 17,
    backgroundColor: '#5DA545',
    borderRadius: 30,
  },

  uncheked: {
    width: 17,
    height: 17,
    borderRadius: 100,
  },
});

export default rescedule_appointment;

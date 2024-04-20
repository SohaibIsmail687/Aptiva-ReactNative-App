import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Alert,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  BackHandler,
  SafeAreaView,
  AsyncStorage,
  AppState,
} from 'react-native';

// import { Actions } from "react-native-router-flux";
import {
  Container,
  Header,
  Content,
  Icon,
  Footer,
  FooterTab,
  Badge,
  Right,
  Picker,
  Left,
  Button,
} from 'native-base';
// import LoginScreen from './LoginScreen';
// import SignUpScreen from './SignUpScreen';
// import SocialScreen from './SocialScreen';
// import SplashScreen from './SplashScreen';
// import Patient_profile from "./Patient_profile";
import {connect} from 'react-redux';

import Patient_Home from './Patient_Home';
import Patient_All_Appointment from './Patient_All_Appointment';
import chat from './chat';
import Patient_Profile from './Patient_Profile';
import Patient_Orders from './Patient_Orders';

// import messaging from '@react-native-firebase/messaging'
import Connection from '../connection';

// import Drawer from "react-native-drawer";
// import Drawer_Screen from "./Drawer_Screen";

class Patient_Tab_Screen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedbtn: '1',
      name: '',
      id: '',
      appState: AppState.currentState,
    };
  }

  offline = () => {
    let uploaddata = new FormData();
    uploaddata.append('id', this.state.id);
    let api = Connection + 'rest_apis.php?action=update_offline';
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

  backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  componentDidMount = async () => {
    // let user = await AsyncStorage.getItem('customer');

    // console.log("aaaaaaaaaaaaa", user);
    // let parsed = JSON.parse(user);
    // let name = parsed[0].name;
    // let id = parsed[0].id;

    // this.setState({
    //     name: name,
    //     id: id,

    // })
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
    // messaging().setBackgroundMessageHandler(async remoteMessage => {
    //     console.log('Message handled in the background!', remoteMessage);
    // });

    // const settings = await messaging().requestPermission();

    // if (settings) {
    //     await messaging().registerDeviceForRemoteMessages();

    //     messaging().onNotificationOpenedApp(remoteMessage => {
    //         console.log(
    //             'Notification caused app to open from background state:',
    //             remoteMessage.notification,
    //         );
    //         console.log("Tapped")
    //     });
    //     messaging().onMessage((payload) => {
    //         console.log('payload', JSON.stringify(payload))
    //         // alert(JSON.stringify(payload))
    //         this.setState({ noti: JSON.stringify(payload) })
    //     });
    //     //  console.log(this.state.noti)

    //     messaging().getToken().then((currentToken) => {
    //         if (currentToken) {
    //             this.setState({ token: currentToken })
    //             if (this.props.update == true) {
    //                 // this.Online()
    //             }
    //             console.log('current tokens', currentToken)
    //         } else {
    //         }
    //     }).catch((err) => {
    //         console.log(err)
    //     });
    //     console.log('Permission settings:', settings);
    // } else {
    //     console.log('Permission settings:', settings);

    // }
    // this.online();
  };

  online = () => {
    let uploaddata = new FormData();

    console.log('ttttttttttttttttttttttt', this.state.id);

    uploaddata.append('id', this.state.id);

    let api = Connection + 'rest_apis.php?action=update_online';
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
        console.log(
          'KKKKKKKKKKKKKKKKKKKresponseeeeKKKKKKKKKKKKKK',
          response.response,
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  update_fcm_token = (val1, val2) => {
    let uploaddata = new FormData();

    console.log(
      'nameeeeeggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggeee =>',
      val1,
    );
    console.log('nameeeeeeee =>', val2);

    uploaddata.append('id', val1);
    uploaddata.append('fcm_token', val2);

    let api = Connection + 'rest_apis.php?action=update_fcm_token';
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
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };
  render() {
    let AppComponent = null;

    if (this.state.selectedbtn == '1') {
      AppComponent = Patient_Home;
    }

    if (this.state.selectedbtn == '2') {
      AppComponent = Patient_All_Appointment;
    }
    if (this.state.selectedbtn == '3') {
      AppComponent = chat;
    }
    if (this.state.selectedbtn == '4') {
      AppComponent = Patient_Profile;
    }
    if (this.state.selectedbtn == '5') {
      AppComponent = Patient_Orders;
    }

    return (
      <>
        <StatusBar backgroundColor="white" barStyle="light-content" />
        <View style={styles.container}>
          <Content contentContainerStyle={{flex: 1}}>
            <AppComponent />
          </Content>
          <Footer>
            <FooterTab style={styles.footer}>
              <Button
                vertical
                style={
                  this.state.selectedbtn == '1'
                    ? styles.btnactive
                    : styles.btnsegment
                }
                onPress={() => this.setState({selectedbtn: '1'})}>
                <Icon
                  style={
                    this.state.selectedbtn == '1'
                      ? styles.activeicone
                      : styles.inactiveicone
                  }
                  name="home-sharp"
                  type="Ionicons"
                />
                <Text
                  numberOfLines={1}
                  style={
                    this.state.selectedbtn == '1'
                      ? styles.activeText
                      : styles.inactiveText
                  }>
                  Home
                </Text>
              </Button>
              <Button
                vertical
                style={
                  this.state.selectedbtn == '2'
                    ? styles.btnactive
                    : styles.btnsegment
                }
                onPress={() => this.setState({selectedbtn: '2'})}>
                <Icon
                  style={
                    this.state.selectedbtn == '2'
                      ? styles.activeicone
                      : styles.inactiveicone
                  }
                  name="calendar"
                  type="Entypo"
                />
                <Text
                  numberOfLines={1}
                  style={
                    this.state.selectedbtn == '2'
                      ? styles.activeText
                      : styles.inactiveText
                  }>
                  Appointments
                </Text>
              </Button>
              <Button
                verticalstyle={
                  this.state.selectedbtn == '3'
                    ? styles.btnactive
                    : styles.btnsegment
                }
                onPress={() => this.setState({selectedbtn: '3'})}>
                <Icon
                  style={
                    this.state.selectedbtn == '3'
                      ? styles.activeicone
                      : styles.inactiveicone
                  }
                  name="chatbox"
                  type="Ionicons"
                />
                <Text
                  numberOfLines={1}
                  style={
                    this.state.selectedbtn == '3'
                      ? styles.activeText
                      : styles.inactiveText
                  }>
                  Chat
                </Text>
              </Button>

              {/* <Button
                                verticalstyle={
                                    this.state.selectedbtn == "5"
                                        ? styles.btnactive
                                        : styles.btnsegment
                                }
                                onPress={() => this.setState({ selectedbtn: "5" })}
                            >
                                <Icon
                                    style={
                                        this.state.selectedbtn == "5"
                                            ? styles.activeicone
                                            : styles.inactiveicone
                                    }
                                    name="clipboard-list" type="FontAwesome5"
                                />
                                <Text numberOfLines={1}
                                    style={
                                        this.state.selectedbtn == "5"
                                            ? styles.activeText
                                            : styles.inactiveText
                                    }
                                >Orders</Text>

                            </Button> */}
              <Button
                verticalstyle={
                  this.state.selectedbtn == '4'
                    ? styles.btnactive
                    : styles.btnsegment
                }
                onPress={() => this.setState({selectedbtn: '4'})}>
                <Icon
                  style={
                    this.state.selectedbtn == '4'
                      ? styles.activeicone
                      : styles.inactiveicone
                  }
                  name="user-alt"
                  type="FontAwesome5"
                />
                <Text
                  numberOfLines={1}
                  style={
                    this.state.selectedbtn == '4'
                      ? styles.activeText
                      : styles.inactiveText
                  }>
                  My Profile
                </Text>
              </Button>
            </FooterTab>
          </Footer>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },

  inactiveicone: {
    color: 'lightgray',
    fontSize: 22,
  },
  activeicone: {
    color: '#27aae0',
    fontSize: 25,
  },
  footer: {
    backgroundColor: 'white',
    paddingVertical: 3,
  },
  icon: {
    marginTop: 5,
    marginLeft: 10,
    fontSize: 40,
    color: 'white',
  },
  name: {
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 50,
    color: 'white',
  },

  inactiveText: {
    color: 'lightgray',
    fontSize: 11,
    fontWeight: 'bold',
    maxWidth: '100%',
  },
  activeText: {
    color: '#27aae0',
    fontSize: 11,
    maxWidth: '100%',
    fontWeight: 'bold',
  },
});

export default Patient_Tab_Screen;

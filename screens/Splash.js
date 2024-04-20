import {Row} from 'native-base';
import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
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
  AppState,
  PermissionsAndroid,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
// import TouchID from 'react-native-touch-id';
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
import {connect} from 'react-redux';
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
} from 'react-native-popup-dialog';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Splash extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      touchhh: false,
      visible: false,
      spinner: true,
      // appState:AppState.currentState
    };
  }

  backAction = () => {
    BackHandler.exitApp();
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
    let user = await AsyncStorage.getItem('customer');
    console.log('RoleRoleRoleRoleRoleRole', user);
    // let app_intro = await AsyncStorage.getItem('app_intro');

    // let lang = await AsyncStorage.getItem('lang');
    if (user != null) {
      let parsed = JSON.parse(user);
      let id = parsed[0].id;
      let role = parsed[0].role;

      if (role == 'user') {
        setTimeout(() => {
          Actions.Patient_Tab_Screen();
        }, 100);
      } else {
        setTimeout(() => {
          Actions.Doctor_Tab_Screen();
        }, 100);
      }
    } else {
      setTimeout(() => {
        Actions.Patient_Login_Screen();
      }, 3000);
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        {this.state.touchhh == false ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '80%',
              height: '90%',
            }}>
            <Image
              source={require('../assets/ic_launcher.png')}
              style={styles.textage}
              resizeMode="contain"
            />

            <View
              style={{
                position: 'absolute',
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                width: width,
              }}>
              {this.state.spinner == true && <SkypeIndicator color="#27aae0" />}
            </View>
          </View>
        ) : (
          <View style={{flex: 1, backgroundColor: 'white'}}></View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textage: {
    width: '100%',
    height: '100%',
    // tintColor: "#ac73fe",
  },
});

export default Splash;

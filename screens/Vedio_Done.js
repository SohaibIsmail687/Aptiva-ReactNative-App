import {Row} from 'native-base';
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
  Modal,
  AsyncStorage,
  ImageBackground,
  Dimensions,
  BackHandler,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Connection from '../connection';
import {connect} from 'react-redux';
import ImageLoad from 'react-native-image-placeholder';
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

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Video_Call extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  backAction = () => {
    BackHandler.exitApp();

    return true;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  componentDidMount = async () => {
    console.log('rolerolerolerolerolerolerole', this.props.role);
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
    if (this.props.consult == 'true') {
      // this.complete_appointment()
    }
  };

  Navigate = () => {
    if (this.props.role == 'user') {
      Actions.Patient_Tab_Screen();
    } else {
      Actions.Doctor_Tab_Screen();
    }
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginTop: 25,
            marginBottom: 15,
          }}>
          <Icon
            onPress={() => this.Navigate()}
            name="arrowleft"
            type="AntDesign"
            style={{color: 'black', fontSize: 23}}
          />
        </View>

        <ScrollView>
          <View
            style={{
              width: 120,
              height: 120,
              marginTop: 10,
              borderRadius: 100,
              backgroundColor: '#27aae0',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 3,
            }}>
            <Icon
              name="clockcircle"
              type="AntDesign"
              style={{color: 'white', fontSize: 45}}
            />
          </View>

          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              color: 'black',
              fontWeight: 'bold',
              maxWidth: '90%',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            Your Consultation is finished
          </Text>

          <View
            style={{
              width: width / 1.1,
              borderWidth: 2,
              borderColor: '#f8f8f9',
              marginVertical: 15,
              alignSelf: 'center',
            }}></View>

          <ImageLoad
            style={{
              width: 150,
              borderRadius: 150,
              height: 150,
              alignSelf: 'center',
              marginTop: 10,
            }}
            loadingStyle={{size: 'large', color: 'blue'}}
            source={{uri: this.props.doctor_profile}}
            borderRadius={150}
            placeholderStyle={{
              width: 150,
              borderRadius: 150,
              height: 150,
              alignSelf: 'center',
              marginTop: 10,
            }}
          />

          {this.props.role == 'doctor' ? (
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 20,
                marginTop: 15,
                textAlign: 'center',
              }}>
              {this.props.doctor_name}
            </Text>
          ) : (
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 20,
                marginTop: 15,
                textAlign: 'center',
              }}>
              {this.props.doctor_name}
            </Text>
          )}

          <View
            style={{
              width: width / 1.1,
              borderWidth: 2,
              borderColor: '#f8f8f9',
              marginVertical: 15,
              alignSelf: 'center',
            }}></View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
              width: width / 1.1,
              marginBottom: 20,
              paddingHorizontal: 15,
            }}>
            <TouchableOpacity
              onPress={() => this.Navigate()}
              activeOpacity={0.8}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                paddingVertical: 12,
                borderRadius: 100,
                backgroundColor: '#27aae0',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 3,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                Back To Home
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default Video_Call;

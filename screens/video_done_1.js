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
import {connect} from 'react-redux';
import ImageLoad from 'react-native-image-placeholder';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Vedio_Done extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
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
            onPress={() => {
              Actions.pop();
            }}
            name="arrowleft"
            type="AntDesign"
            style={{color: 'black', fontSize: 23}}
          />
        </View>

        <ScrollView>
          <Image
            source={require('../assets/Vertical.png')}
            resizeMode='stretch'
            style={{
              width: 120,
              height: 120,
              alignSelf: 'center',
              marginTop: 40,
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
            The appointment has been completed, Please submit your review.
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
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              textAlign: 'center',
              marginTop: 3,
            }}>
            {this.props.category}
          </Text>
          <Text style={{color: 'black', fontSize: 13, textAlign: 'center'}}>
            {this.props.doctor_address}
          </Text>

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
              marginTop: 30,
              width: width / 1.1,
              marginBottom: 20,
              paddingHorizontal: 15,
            }}>
            <TouchableOpacity
              onPress={() => Actions.Patient_Tab_Screen()}
              activeOpacity={0.8}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '47%',
                paddingVertical: 12,
                borderRadius: 100,
                backgroundColor: '#c2ecfc',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 3,
              }}>
              <Text style={{color: '#27aae0', fontWeight: 'bold'}}>
                Back to home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                Actions.give_review({
                  doctor_name: this.props.doctor_name,
                  doctor_profile: this.props.doctor_profile,
                  doctor_id: this.props.doctor_id,
                  appointment_id: this.props.appointment_id,
                  category: this.props.category,
                  doctor_address: this.props.doctor_address,
                  fcm_token: this.props.fcm_token,
                })
              }
              activeOpacity={0.8}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '48%',
                paddingVertical: 12,
                backgroundColor: '#27aae0',
                borderRadius: 100,
                borderWidth: 1,
                borderColor: '#27aae0',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 3,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                Leave a review
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Vedio_Done;

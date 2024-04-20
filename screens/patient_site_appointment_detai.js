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
  Linking,
  PermissionsAndroid,
  Platform,
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
import RBSheet from 'react-native-raw-bottom-sheet';
import * as ImagePicker from 'react-native-image-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import ImageLoad from 'react-native-image-placeholder';
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
import moment from 'moment';
import Toast from 'react-native-simple-toast';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class patient_site_appointment_detai extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      images: [
        'https://media.istockphoto.com/photos/accessible-information-is-crucial-for-current-medical-research-picture-id1287845968?b=1&k=20&m=1287845968&s=170667a&w=0&h=B3ucd3Y_G2SqLgz1wjKtEUY6brC0gRAx1bQUypz8nmc=',
        'https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWVkaWNhbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60r',
        'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvdmlkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://media.istockphoto.com/photos/mass-testing-for-covid19-sarscov2-infection-concept-several-rapid-picture-id1304108977?b=1&k=20&m=1304108977&s=170667a&w=0&h=lfBQM5amAwL3vfirxKGfZL6C6UvS1xYa-pQmKwXtkQg=', // Network image
      ],
      multi_images: [],
      spinner: false,
      filepath: this.props.perscription1,
      fileuri: this.props.perscription1,
      profile1: null,
      p_image: null,
      sender_email: 'masclinicas121@gmail.com',
      subject: 'Perscription Form',

      fileName: this.props.perscription,
      visible2: false,
    };
  }

  backAction = () => {
    Actions.pop();
    return true;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  onClickImage = async item => {
    this.selectedImage = [
      {
        url: item,
        props: {
          source: item,
        },
      },
    ];
    this.setState({
      visible2: true,
    });
  };

  onSwipeDown = () => {
    this.setState({
      visible2: false,
    });
  };

  componentDidMount = async () => {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );

    let user = await AsyncStorage.getItem('customer');
    let parsed = JSON.parse(user);
    let name = parsed[0].name;
    let mobile_number = parsed[0].mobile_number;
    let id = parsed[0].id;
    let profile = parsed[0].profile;
    let email = parsed[0].email;
    this.setState({
      id: id,
      name: name,
      image2: profile,
      email: email,
      mobile_number: mobile_number,
      // image2:profile1
    });

    var today = new Date();

    var nextweek_T = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    let date0 = nextweek_T.toString();
    let ddd = date0.split(' ');
    let day_1 = ddd[0];
    let dd_2 = ddd[1];
    let dd_3 = ddd[2];
    let dd_4 = ddd[3];
    let final_date_1 = dd_2 + ' ' + dd_3 + ', ' + dd_4;
    console.log('sssssssssss', final_date_1);
    this.setState({
      day_1: day_1,
      final_date_1: final_date_1,
    });

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
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingVertical: 15,
            backgroundColor: '#27aae0',
          }}>
          <TouchableOpacity onPress={() => Actions.pop()}>
            <Icon
              name="arrowleft"
              type="AntDesign"
              style={{color: 'white', fontSize: 25}}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Appointment Details
          </Text>
          <Text></Text>
        </View>

        <View style={{borderWidth: 0.5, borderColor: 'lightgray'}}></View>

        <ScrollView>
          <Text
            style={{
              color: '#27aae0',
              fontWeight: 'bold',
              fontSize: 20,
              paddingHorizontal: 15,
              marginTop: 15,
            }}>
            Your Appointment Detail
          </Text>

          <Icon
            name="dots-three-horizontal"
            type="Entypo"
            style={{color: '#27aae0', fontSize: 25, paddingHorizontal: 15}}
          />

          <View
            style={{
              width: width / 1.1,
              alignSelf: 'center',
              backgroundColor: 'white',
              borderRadius: 8,
              paddingVertical: 15,
              paddingHorizontal: 15,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              marginTop: 20,
              borderWidth: 1,
              borderColor: '#27aae0',
            }}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              Provider Details
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text style={{color: 'gray'}}>Name: </Text>

              <Text
                style={{color: 'black', marginLeft: 15, fontWeight: 'bold'}}>
                {' '}
                {this.props.doctor_name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={{color: 'gray'}}>Category:</Text>

              <Text
                style={{color: 'black', marginLeft: 15, fontWeight: 'bold'}}>
                {this.props.category}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={{color: 'gray'}}>Phone :</Text>

              <Text
                style={{color: 'black', marginLeft: 15, fontWeight: 'bold'}}>
                {' '}
                {this.props.doc_mobile}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: width / 1.1,
              alignSelf: 'center',
              backgroundColor: 'white',
              borderRadius: 8,
              paddingVertical: 15,
              paddingHorizontal: 15,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              marginTop: 20,
              borderWidth: 1,
              borderColor: '#27aae0',
            }}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              Patient Details
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text style={{color: 'gray'}}>Name: </Text>

              <Text
                style={{color: 'black', marginLeft: 15, fontWeight: 'bold'}}>
                {this.state.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={{color: 'gray'}}>Email: </Text>

              <Text
                style={{color: 'black', marginLeft: 15, fontWeight: 'bold'}}>
                {' '}
                {this.state.email}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={{color: 'gray'}}>Phone :</Text>

              <Text
                style={{color: 'black', marginLeft: 15, fontWeight: 'bold'}}>
                {this.state.mobile_number}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: width / 1.1,
              alignSelf: 'center',
              backgroundColor: 'white',
              borderRadius: 8,
              paddingVertical: 15,
              paddingHorizontal: 15,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              marginTop: 20,
              borderWidth: 1,
              borderColor: '#27aae0',
            }}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              Appointment Summary
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text style={{color: 'gray'}}>Date:</Text>

              <Text
                style={{color: 'black', marginLeft: 15, fontWeight: 'bold'}}>
                {' '}
                {this.props.day}, {this.props.date}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={{color: 'gray'}}>Time: </Text>

              <Text
                style={{color: 'black', marginLeft: 15, fontWeight: 'bold'}}>
                {' '}
                {this.props.time}
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 15,
              color: 'black',
              fontWeight: 'bold',
              marginTop: 20,
              marginBottom: 10,
              paddingLeft: 20,
            }}>
            Your Perscription
          </Text>

          {this.state.p_image == null ? (
            <View
              style={{
                width: width / 1.1,
                alignSelf: 'center',
                borderStyle: 'dashed',
                borderRadius: 10,
                height: height / 4,
                borderWidth: 2,
                borderColor: '#27aae0',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 20,
              }}>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#27aae0',
                  }}>
                  <Icon
                    name="image"
                    type="Entypo"
                    style={{color: 'white', fontSize: 22}}
                  />
                </TouchableOpacity>

                <Text style={{color: 'black', marginTop: 10}}>
                  No perscription uploaded yet
                </Text>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => this.onClickImage(this.state.p_image)}>
              <ImageLoad
                style={{
                  width: width / 1.1,
                  height: height / 4,
                  alignSelf: 'center',
                }}
                loadingStyle={{size: 'large', color: 'blue'}}
                source={{uri: this.state.p_image}}
                borderRadius={10}
                placeholderStyle={{width: '90%', height: height / 4.3}}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => Actions.pop()}
            style={{
              width: width / 1.1,
              backgroundColor: '#27aae0',
              borderRadius: 8,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 15,
              marginVertical: 15,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Home</Text>
          </TouchableOpacity>
        </ScrollView>

        <Modal visible={this.state.visible2} transparent={true}>
          <ImageViewer
            enableSwipeDown
            onSwipeDown={this.onSwipeDown}
            imageUrls={this.selectedImage}
          />
        </Modal>

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

const styles = StyleSheet.create({
  four: {
    width: width / 1.1,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 15,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#27aae0',
  },
  unselect_date: {
    width: 100,
    height: 50,
    paddingVertical: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: 'white',
    marginHorizontal: 5,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  select_date: {
    width: 100,
    height: 50,
    paddingVertical: 5,
    backgroundColor: '#04B08D',
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginHorizontal: 5,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  unselect_time: {
    height: 40,
    paddingVertical: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  select_time: {
    height: 40,
    paddingVertical: 5,
    backgroundColor: '#04B08D',
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  patient: {
    height: 50,
    paddingVertical: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: 'white',
    marginHorizontal: 5,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileview: {
    paddingHorizontal: 20,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default patient_site_appointment_detai;

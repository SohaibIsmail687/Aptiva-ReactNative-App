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
  ImageBackground,
  Dimensions,
  BackHandler,
  Pressable,
  AsyncStorage,
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
import RadioForm from 'react-native-simple-radio-button';
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
import {Rating, AirbnbRating} from 'react-native-ratings';
import Toast from 'react-native-simple-toast';
import moment from 'moment';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

var hobbies = [
  {label: 'Yes', value: 0},
  {label: 'No', value: 1},
];

class give_review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      main_array: [],
      visible: false,
      user_rating: 0,
      comment: '',
      data1: [],
      skalton: true,
      recommend: 'Yes',
    };
  }

  Role_change(value) {
    console.log(value);
    if (value == 0) {
      this.setState({recommend: 'yes'});
    } else if (value == 1) {
      this.setState({recommend: 'No'});
    } else {
    }
  }

  handleDelete = () => {
    this.setState({
      visible: false,
    });
    setTimeout(() => {
      Actions.Patient_Tab_Screen();
    }, 100);
  };

  opendialogue = () => {
    this.setState({
      visible: true,
    });
  };

  ratingCompleted = value => {
    this.setState({
      user_rating: value,
    });
  };

  Add_Review = () => {
    if (this.state.user_rating == 0) {
      alert('Please give rating.');
    } else if (this.state.comment == '') {
      alert('Please enter your feedback.');
    } else {
      this.setState({visible1: false});
      this.setState({spinner: true});

      let uploaddata = new FormData();

      this.setState({spinner: true});
      uploaddata.append('user_id', this.state.id);
      uploaddata.append('doctor_id', this.props.doctor_id);
      uploaddata.append('appointment_id', this.props.appointment_id);
      uploaddata.append('rating', this.state.user_rating);
      uploaddata.append('comment', this.state.comment);
      uploaddata.append('recomend', this.state.recommend);

      let api = Connection + 'rest_apis.php?action=Add_Review';
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
          if (response.response != 'fail') {
            this.setState({spinner: false});
            this.add_notification();
            this.notification();
            Toast.show('Your reviews successfully added.');

            // this.opendialogue();
            Actions.Patient_Tab_Screen();
          } else {
            setTimeout(() => {
              this.setState({
                spinner: false,
              });
            }, 100);
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
    uploaddata.append('type', 'review');
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

  notification = async () => {
    let to = this.props.fcm_token;
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
          body: this.state.name + ' has successfully submitted review',
          sound: 'default',
          icon: 'myicon',
        },
      }),
    })
      .then(res => res.json())
      .then(resjson => console.log('test', resjson))
      .catch(err => console.log('error =>', err));
  };

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

    let aa = moment(new Date()).format('YYYY-MM-DD hh:mm a');
    let split = aa.split(' ');
    let date = split[0];

    let time = split[1];
    let am_pm = split[2];
    let final_time = time + ' ' + am_pm;

    this.setState({
      time: final_time,
      date: date,
    });
    let user = await AsyncStorage.getItem('customer');

    let parsed = JSON.parse(user);

    let id = parsed[0].id;
    let name = parsed[0].name;

    this.setState({
      id: id,
      name: name,
    });
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            paddingHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 15,
            backgroundColor: 'white',
            width: width,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              onPress={() => Actions.pop()}
              name="arrowleft"
              type="AntDesign"
              style={{color: 'black', fontSize: 25}}
            />

            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '700',
                marginLeft: 15,
              }}
              numberOfLines={1}>
              Write a Review
            </Text>
          </View>
        </View>
        <ScrollView>
          <Image
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

          {/* <ImageLoad
            style={{ width: 150, borderRadius: 150, height: 150, alignSelf: 'center', marginTop: 10 }}
            loadingStyle={{ size: 'large', color: 'blue' }}
            source={{ uri: this.props.doctor_profile }}
            borderRadius={150}
            placeholderStyle={{ width: 150, borderRadius: 150, height: 150, alignSelf: 'center', marginTop: 10 }}


          /> */}
          {/* <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, marginTop: 15, textAlign: 'center' }}>{this.props.doctor_name}</Text>
          <Text style={{ color: 'black', fontSize: 14, textAlign: 'center', marginTop: 3 }}>{this.props.category}</Text> */}
          <AirbnbRating
            count={5}
            reviews={['', '', '', ' ', '']}
            size={30}
            onFinishRating={this.ratingCompleted}
            selectedColor="#27aae0"
            unSelectedColor="lightgray"
            reviewSize={4}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 18,
              marginTop: 30,
            }}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
              Write Your Review
            </Text>
          </View>

          <View
            style={{
              width: '90%',
              height: 120,
              marginTop: 10,
              alignSelf: 'center',
            }}>
            <TextInput
              onChangeText={comment => this.setState({comment})}
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
              placeholder="Write your review"
              placeholderTextColor="gray"
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 18,
              marginTop: 30,
            }}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
              Would you recommend {this.props.doctor_name} to your friends?
            </Text>
          </View>

          <View style={{marginTop: 20, marginLeft: 20}}>
            <RadioForm
              onPress={value => {
                this.Role_change(value);
              }}
              labelHorizontal={true}
              formHorizontal={true}
              selectedButtonColor={'#27aae0'}
              buttonSize={10}
              disabled={false}
              hobbies
              initial={0}
              buttonColor={'#27aae0'}
              buttonOuterColor={'#27aae0'}
              labelStyle={{color: 'black', marginRight: 25}}
              radio_props={hobbies}
              animation={false}
              radioStyle={{paddingTop: 10}}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'space-between',
              marginTop: 60,
              width: width / 1.1,
              marginBottom: 20,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => Actions.Patient_Tab_Screen()}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '45%',
                paddingVertical: 10,
                borderRadius: 20,
                backgroundColor: '#c2ecfc',
              }}>
              <Text style={{color: '#27aae0', fontWeight: 'bold'}}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.Add_Review()}
              activeOpacity={0.8}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '45%',
                paddingVertical: 10,
                backgroundColor: '#27aae0',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#27aae0',
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

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
                source={require('../assets/Neuro_Logo-removebg-preview.png')}
                style={{
                  width: 100,
                  height: 100,
                  alignSelf: 'center',
                  marginTop: 40,
                }}
              />
              <Text
                style={{
                  fontSize: 22,
                  color: '#27aae0',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  paddingHorizontal: 40,
                  marginTop: 30,
                }}
                numberOfLines={2}>
                Review Successfull!
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
                Your review has been successfully sumitted. Thank you very much.
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
                  style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
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

export default give_review;

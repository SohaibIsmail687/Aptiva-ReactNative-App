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
  Pressable,
  BackHandler,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Toast from 'react-native-simple-toast';
import Connection from '../connection';
import ImageLoad from 'react-native-image-placeholder';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class add_scheduling extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      date1: new Date(),
      mode1: 'time',
      dateshow1: '',
      timeshow1: '',
      timeshow2: '',
      dateshow2: '',

      arr: [],
      arr1: [],
      arr2: [],
      arr3: [],
      arr4: [],
      arr5: [],
      arr6: [],

      record1: [],
      record2: [],
      data4: [],

      timeSelected: false,
      timeSelected1: false,

      category: 'Monday',
      text1: 2,
      text2: 1,
      text3: 1,
      text4: 1,
      text5: 1,
      text6: 1,
      text7: 1,
      main_array: [],
      profile: null,

      show1: false,

      slides: ['5:00', '4:00', '3:00'],
    };
  }
  backAction = () => {
    Actions.pop();
    return true;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  showtimepicker1() {
    this.setState({
      show: true,
      mode1: 'time',
    });
  }

  showtimepicker2() {
    this.setState({
      show1: true,
      mode2: 'time',
    });
  }

  componentDidMount = async () => {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );

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
    this.setState({
      day_1: day_1,
      final_date_1: final_date_1,
    });

    let user = await AsyncStorage.getItem('customer');

    let parsed = JSON.parse(user);
    let name = parsed[0].name;
    let id = parsed[0].id;

    let email = parsed[0].email;
    let degree = parsed[0].degree;
    let category_1 = parsed[0].category;

    let profile1 = parsed[0].profile;

    let profile = Connection + 'images/' + profile1;
    this.setState({
      name: name,
      email: email,
      id: id,
      profile: profile,
      degree: degree,
      category_1: category_1,
    });
  };

  timeSelect = date => {
    let a = moment.utc(date, 'YYYY-MM-DDTHH:mm:ss Z').format('HH:mma');

    let val1 = date.getUTCHours() + ':' + date.getUTCMinutes();
    let val = moment(val1, ['HH.mm']).format('hh:mm a');

    if (this.state.category == 'Monday') {
      let index1 = this.state.arr.indexOf(val);

      if (index1 >= 0) {
        alert('You already added this slot');
      } else {
        this.state.arr.push(val);

        this.setState({
          main_array: this.state.arr,
          record1: this.state.main_array,
        });
      }
    } else if (this.state.category == 'Tuesday') {
      let index1 = this.state.arr1.indexOf(val);

      if (index1 >= 0) {
        alert('You already added this slot');
      } else {
        this.state.arr1.push(val);
        this.setState({
          main_array: this.state.arr1,
          record1: this.state.main_array,
        });
      }
    } else if (this.state.category == 'Wednesday') {
      let index1 = this.state.arr2.indexOf(val);

      if (index1 >= 0) {
        alert('You already added this slot');
      } else {
        this.state.arr2.push(val);

        this.setState({
          main_array: this.state.arr2,
          record1: this.state.main_array,
        });
      }
    } else if (this.state.category == 'Thursday') {
      let index1 = this.state.arr3.indexOf(val);

      if (index1 >= 0) {
        alert('You already added this slot');
      } else {
        this.state.arr3.push(val);

        this.setState({
          main_array: this.state.arr3,
          record1: this.state.main_array,
        });
      }
    } else if (this.state.category == 'Friday') {
      let index1 = this.state.arr4.indexOf(val);

      if (index1 >= 0) {
        alert('You already added this slot');
      } else {
        this.state.arr4.push(val);

        this.setState({
          main_array: this.state.arr4,
          record1: this.state.main_array,
        });
      }
    } else if (this.state.category == 'Saturday') {
      let index1 = this.state.arr5.indexOf(val);
      if (index1 >= 0) {
        alert('You already added this slot');
      } else {
        this.state.arr5.push(val);

        this.setState({
          main_array: this.state.arr5,
          record1: this.state.main_array,
        });
      }
    } else if (this.state.category == 'Sunday') {
      let index1 = this.state.arr6.indexOf(val);
      if (index1 >= 0) {
        alert('You already added this slot');
      } else {
        this.state.arr6.push(val);

        this.setState({
          main_array: this.state.arr6,
          record1: this.state.main_array,
        });
      }
    }

    this.setState({
      timeSelected: true,
      show: false,
    });
  };

  array_index_for_delete = val => {
    let index1 = this.state.main_array.indexOf(val);

    this.state.main_array.splice(index1, 1);
  };

  array_index = val => {
    let index1 = this.state.arr.indexOf(val);
    this.state.arr.splice(index1, 1),
      this.setState({
        record1: this.state.arr.splice(index1, 1),
      });
  };

  array_index_1 = (val, val1) => {
    let index1 = this.state.slides.indexOf(val);
    this.state.slides[index1] = val1;
  };

  createtable1 = () => {
    let table = [];

    let record1 = this.state.main_array;
    let len = record1.length;
    if (record1 != 'fail') {
      for (let i = 0; i < len; i++) {
        let doctor_time = record1[i];

        table.push(
          <View>
            {
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 5,
                }}>
                <Pressable
                  onPress={() => this.array_index(doctor_time)}
                  style={{
                    width: 130,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    borderColor: '#27aae0',
                    borderWidth: 1,
                    marginLeft: 10,
                    paddingVertical: 10,
                  }}>
                  <Text style={{color: '#27aae0', fontWeight: 'bold'}}>
                    {doctor_time}
                  </Text>
                </Pressable>
                <Icon
                  name="cross"
                  type="Entypo"
                  onPress={() => this.array_index_for_delete(doctor_time)}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    color: '#27aae0',
                    fontSize: 23,
                  }}
                />
              </View>
            }
          </View>,
        );
      }
      return table;
    } else {
      let img = [];
      img.push(
        <View style={{flex: 1, justifyContent: 'center'}}>
          {<View></View>}
        </View>,
      );
      return img;
    }
  };

  changebtn2(value, value2) {
    if (this.state[value] == 2) {
      this.setState({
        text1: 1,
        text2: 1,
        text3: 1,
        text4: 1,
        text5: 1,
        text6: 1,
        text7: 1,
        [value]: 2,
        category: '',
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

        [value]: 2,
        category: value2,
      });
    }

    if (value2 == 'Monday') {
      this.setState({
        main_array: this.state.arr,
      });
    } else if (value2 == 'Tuesday') {
      this.setState({
        main_array: this.state.arr1,
      });
    } else if (value2 == 'Wednesday') {
      this.setState({
        main_array: this.state.arr2,
      });
    } else if (value2 == 'Thursday') {
      this.setState({
        main_array: this.state.arr3,
      });
    } else if (value2 == 'Friday') {
      this.setState({
        main_array: this.state.arr4,
      });
    } else if (value2 == 'Saturday') {
      this.setState({
        main_array: this.state.arr5,
      });
    } else if (value2 == 'Sunday') {
      this.setState({
        main_array: this.state.arr6,
      });
    }
  }

  Add_shedule = () => {
    let uploaddata = new FormData();

    if (
      this.state.arr == '' &&
      this.state.arr1 == '' &&
      this.state.arr2 == '' &&
      this.state.arr3 == '' &&
      this.state.arr4 == '' &&
      this.state.arr5 == '' &&
      this.state.arr6 == ''
    ) {
      alert('Please add schedule.');
    } else {
      let brr = JSON.stringify(this.state.arr);
      let brr1 = JSON.stringify(this.state.arr1);
      let brr2 = JSON.stringify(this.state.arr2);
      let brr3 = JSON.stringify(this.state.arr3);
      let brr4 = JSON.stringify(this.state.arr4);
      let brr5 = JSON.stringify(this.state.arr5);
      let brr6 = JSON.stringify(this.state.arr6);

      this.setState({spinner: true});

      uploaddata.append('doctor_id', this.state.id);
      uploaddata.append('arr', brr);
      uploaddata.append('arr1', brr1);
      uploaddata.append('arr2', brr2);
      uploaddata.append('arr3', brr3);
      uploaddata.append('arr4', brr4);
      uploaddata.append('arr5', brr5);
      uploaddata.append('arr6', brr6);

      let api = Connection + 'rest_apis.php?action=Add_shedule';
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
          if (response.response == 'repeat') {
            this.setState({
              spinner: false,
            });
            alert(this.props.You_already_added_your_schedule);
          } else if (response.response == 'fail') {
            this.setState({
              spinner: false,
            });
            alert(this.props.Please_try_again_later);
          } else {
            this.setState({
              spinner: false,
            });
            Toast.show(this.props.You_have_successfully_added_your_schedule);

            Actions.Doctor_Tab_Screen({role: 'doctor'});
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  cancel = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            width: width / 1,
            backgroundColor: '#27aae0',
            justifyContent: 'center',
            paddingHorizontal: 15,
            paddingVertical: 5,
            flexDirection: 'row',
          }}>
          <ImageLoad
            style={{width: 55, borderRadius: 80, height: 55}}
            loadingStyle={{size: 'large', color: 'blue'}}
            source={{uri: this.state.profile}}
            borderRadius={40}
            placeholderStyle={{width: 55, borderRadius: 80, height: 55}}
          />
          <View
            style={{width: '75%', marginLeft: 10, justifyContent: 'center'}}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
              {this.state.name}
            </Text>
            <Text numberOfLines={1} style={{color: 'white', maxWidth: '100%'}}>
              {this.state.category_1}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: width / 1.1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            flexDirection: 'row',
          }}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            Add your availability so that patient can book appointment with you.
          </Text>
        </View>

        <ScrollView>
          <View
            style={{
              width: width / 1.1,
              backgroundColor: 'white',
              borderRadius: 15,
              alignSelf: 'center',
              paddingHorizontal: 15,
              paddingVertical: 20,
              marginTop: 20,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              marginBottom: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 17}}>
                Select Day
              </Text>
              <Text style={{color: 'gray'}}>{this.state.final_date_1}</Text>
            </View>

            <View style={{paddingVertical: 10}}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
                <Pressable
                  onPress={() => this.changebtn2('text1', 'Monday')}
                  style={this.state.text1 == 1 ? styles.view1 : styles.view}>
                  <Text
                    style={this.state.text1 == 1 ? styles.text1 : styles.text}>
                    {' '}
                  </Text>

                  <Text
                    style={this.state.text1 == 1 ? styles.text1 : styles.text}>
                    Mon
                  </Text>
                  <Text
                    style={this.state.text1 == 1 ? styles.text1 : styles.text}>
                    {' '}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => this.changebtn2('text2', 'Tuesday')}
                  style={this.state.text2 == 1 ? styles.view1 : styles.view}>
                  <Text
                    style={this.state.text2 == 1 ? styles.text1 : styles.text}>
                    Tue
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => this.changebtn2('text3', 'Wednesday')}
                  style={this.state.text3 == 1 ? styles.view1 : styles.view}>
                  <Text
                    style={this.state.text3 == 1 ? styles.text1 : styles.text}>
                    Wed
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => this.changebtn2('text4', 'Thursday')}
                  style={this.state.text4 == 1 ? styles.view1 : styles.view}>
                  <Text
                    style={this.state.text4 == 1 ? styles.text1 : styles.text}>
                    Thu
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => this.changebtn2('text5', 'Friday')}
                  style={this.state.text5 == 1 ? styles.view1 : styles.view}>
                  <Text
                    style={this.state.text5 == 1 ? styles.text1 : styles.text}>
                    Fri
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => this.changebtn2('text6', 'Saturday')}
                  style={this.state.text6 == 1 ? styles.view1 : styles.view}>
                  <Text
                    style={this.state.text6 == 1 ? styles.text1 : styles.text}>
                    Sat
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => this.changebtn2('text7', 'Sunday')}
                  style={this.state.text7 == 1 ? styles.view1 : styles.view}>
                  <Text
                    style={this.state.text7 == 1 ? styles.text1 : styles.text}>
                    Sun
                  </Text>
                </Pressable>
              </ScrollView>
            </View>

            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 17}}>
              Add Slots
            </Text>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginVertical: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#27aae0',
                  width: 130,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  marginLeft: 10,
                  paddingVertical: 10,
                  marginTop: 10,
                  borderColor: '#27aae0',
                }}
                onPress={() => this.showtimepicker1()}>
                <Text style={{color: 'white'}}>Add Time</Text>
              </TouchableOpacity>

              {this.createtable1()}
            </View>
          </View>

          {this.state.show == true ? (
            <DateTimePickerModal
              is24Hour={false}
              isVisible={this.state.show}
              date={new Date('1985-01-17')}
              mode="time"
              onConfirm={date => this.timeSelect(date)}
              onCancel={() => this.cancel()}
              timeZoneOffsetInMinutes={0}
              display="spinner"
            />
          ) : (
            <View></View>
          )}
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.Add_shedule()}
          style={{
            width: width / 1.1,
            backgroundColor: '#27aae0',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            paddingVertical: 10,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            marginVertical: 15,
          }}>
          <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
            Next
          </Text>
        </TouchableOpacity>

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
});

export default add_scheduling;

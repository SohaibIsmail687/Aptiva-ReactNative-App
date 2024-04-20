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
import {connect} from 'react-redux';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Toast from 'react-native-simple-toast';
import Connection from '../connection';
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

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class update_Schedule extends React.Component {
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

      record1: [],
      record2: [],
      data4: [],
      monday1: [],
      tuesday1: [],
      wednesday1: [],
      thursday1: [],
      saturday1: [],
      friday1: [],
      sunday1: [],

      main_array: [],

      category: 'Monday',
      text1: 2,
      text2: 1,
      text3: 1,
      text4: 1,
      text5: 1,
      text6: 1,
      text7: 1,

      timeSelected: false,
      timeSelected1: false,
      add_new: false,
      profile: null,

      show1: false,
      updated_time: '',
      value_for_updating_index: '',
      changes_time_for_specific_day: 'Monday',

      slides: ['5:00', '4:00', '3:00'],
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // then navigate
    navigate('NewScreen');
  };
  handleBackButtonClick() {
    // BackHandler.exitApp();
    Actions.pop();
    return true;
  }

  showtimepicker1 = val => {
    this.setState({
      show: true,
      mode1: 'time',
      value_for_updating_index: val,
      add_new: false,
    });
  };

  showtimepicker2() {
    this.setState({
      show: true,
      mode1: 'time',
      add_new: true,
    });
  }

  componentDidMount = async () => {
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
    // console.log('sssssssssss', final_date_1)
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
    let category = parsed[0].category;

    console.log('aaaaaaaaaaaaa', name);

    let profile1 = parsed[0].profile;
    console.log('profile1', profile1);

    // console.log("hdbbh =>",profile)
    let profile = Connection + 'images/' + profile1;
    this.setState({
      name: name,
      email: email,
      id: id,
      profile: profile,
      degree: degree,
      category: category,
    });
    this.get_shedule();
  };

  get_shedule = () => {
    let uploaddata = new FormData();

    uploaddata.append('doctor_id', this.state.id);

    let api = Connection + 'rest_apis.php?action=Get_shedule';
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
        let record4 = response.response;

        if (record4 != 'fail') {
          let monday = record4[0].monday;
          let tuesday = record4[0].tuesday;
          let wednesday = record4[0].wednesday;
          let thursday = record4[0].thursday;
          let friday = record4[0].friday;
          let saturday = record4[0].saturday;
          let sunday = record4[0].sunday;

          let array_mon = JSON.parse(monday);
          let array_tue = JSON.parse(tuesday);
          let array_wed = JSON.parse(wednesday);
          let array_thu = JSON.parse(thursday);
          let array_fri = JSON.parse(friday);
          let array_sat = JSON.parse(saturday);
          let array_sun = JSON.parse(sunday);

          this.setState({
            monday1: array_mon,
            tuesday1: array_tue,
            wednesday1: array_wed,
            thursday1: array_thu,
            friday1: array_fri,
            saturday1: array_sat,
            sunday1: array_sun,

            main_array: array_mon,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  add_newslot_in_existing = val => {
    console.log('BBBBBBBBBBBBBBBBBBBBBBBB');

    if (this.state.changes_time_for_specific_day == 'Monday') {
      let index1 = this.state.main_array.indexOf(val);
      console.log('index1index1index1index1', index1);
      if (index1 >= 0) {
        alert('You have already add this slot.');
      } else {
        this.state.main_array.push(val);
        //  this.state.monday1.push(val)

        this.setState({
          record1: this.state.main_array,
        });
      }
    } else if (this.state.changes_time_for_specific_day == 'Tuesday') {
      let index1 = this.state.main_array.indexOf(val);
      console.log('index1index1index1index1', index1);
      if (index1 >= 0) {
        alert('You have already add this slot.');
      } else {
        this.state.main_array.push(val);
        // this.state.tuesday1.push(val)

        this.setState({
          record1: this.state.main_array,
        });
      }
    } else if (this.state.changes_time_for_specific_day == 'Wednesday') {
      let index1 = this.state.main_array.indexOf(val);
      console.log('index1index1index1index1', index1);
      if (index1 >= 0) {
        alert('You have already add this slot.');
      } else {
        this.state.main_array.push(val);
        // this.state.wednesday1.push(val)

        this.setState({
          record1: this.state.main_array,
        });
      }
    } else if (this.state.changes_time_for_specific_day == 'Thursday') {
      let index1 = this.state.main_array.indexOf(val);
      console.log('index1index1index1index1', index1);
      if (index1 >= 0) {
        alert('You have already add this slot.');
      } else {
        this.state.main_array.push(val);
        // this.state.thursday1.push(val)

        this.setState({
          record1: this.state.main_array,
        });
      }
    } else if (this.state.changes_time_for_specific_day == 'Friday') {
      let index1 = this.state.main_array.indexOf(val);
      console.log('index1index1index1index1', index1);
      if (index1 >= 0) {
        alert('You have already add this slot.');
      } else {
        this.state.main_array.push(val);
        // this.state.friday1.push(val)

        this.setState({
          record1: this.state.main_array,
        });
      }
    } else if (this.state.changes_time_for_specific_day == 'Saturday') {
      let index1 = this.state.main_array.indexOf(val);
      console.log('index1index1index1index1', index1);
      if (index1 >= 0) {
        alert('You have already add this slot.');
      } else {
        this.state.main_array.push(val);
        // this.state.saturday1.push(val)

        this.setState({
          record1: this.state.main_array,
        });
      }
    } else if (this.state.changes_time_for_specific_day == 'Sunday') {
      let index1 = this.state.main_array.indexOf(val);
      console.log('index1index1index1index1', index1);
      if (index1 >= 0) {
        alert('You have already add this slot.');
      } else {
        this.state.main_array.push(val);
        // this.state.sunday1.push(val)

        this.setState({
          record1: this.state.main_array,
        });
      }
    }
  };

  cancel = () => {
    this.setState({
      show: false,
    });
  };

  timeSelect = date => {
    let val1 = date.getUTCHours() + ':' + date.getUTCMinutes();
    let val = moment(val1, ['HH.mm']).format('hh:mm a');
    this.setState({
      timeSelected1: true,
      updated_time: val,
      show: false,
      // monday:this.state.arrd
    });

    if (this.state.changes_time_for_specific_day == 'Monday') {
      let index1 = this.state.main_array.indexOf(
        this.state.value_for_updating_index,
      );
      let index2 = this.state.monday1.indexOf(
        this.state.value_for_updating_index,
      );

      this.state.main_array[index1] = val;
      this.state.monday1[index2] = val;

      this.setState({
        record1: this.state.main_array,
      });
    } else if (this.state.changes_time_for_specific_day == 'Tuesday') {
      let index1 = this.state.main_array.indexOf(
        this.state.value_for_updating_index,
      );
      let index2 = this.state.tuesday1.indexOf(
        this.state.value_for_updating_index,
      );

      this.state.main_array[index1] = val;
      this.state.tuesday1[index2] = val;

      this.setState({
        record1: this.state.main_array,
      });
    } else if (this.state.changes_time_for_specific_day == 'Wednesday') {
      let index1 = this.state.main_array.indexOf(
        this.state.value_for_updating_index,
      );
      let index2 = this.state.wednesday1.indexOf(
        this.state.value_for_updating_index,
      );
      this.state.main_array[index1] = val;
      this.state.wednesday1[index2] = val;
      this.setState({
        record1: this.state.main_array,
      });
    } else if (this.state.changes_time_for_specific_day == 'Thursday') {
      let index1 = this.state.main_array.indexOf(
        this.state.value_for_updating_index,
      );
      let index2 = this.state.thursday1.indexOf(
        this.state.value_for_updating_index,
      );

      this.state.main_array[index1] = val;
      this.state.thursday1[index2] = val;
      this.setState({
        record1: this.state.main_array,
      });
    } else if (this.state.changes_time_for_specific_day == 'Friday') {
      let index1 = this.state.main_array.indexOf(
        this.state.value_for_updating_index,
      );
      let index2 = this.state.friday1.indexOf(
        this.state.value_for_updating_index,
      );

      this.state.main_array[index1] = val;
      this.state.friday1[index2] = val;
      this.setState({
        record1: this.state.main_array,
      });
    } else if (this.state.changes_time_for_specific_day == 'Saturday') {
      let index1 = this.state.main_array.indexOf(
        this.state.value_for_updating_index,
      );
      let index2 = this.state.saturday1.indexOf(
        this.state.value_for_updating_index,
      );

      this.state.main_array[index1] = val;
      this.state.saturday1[index2] = val;

      this.setState({
        record1: this.state.main_array,
      });
    } else if (this.state.changes_time_for_specific_day == 'Sunday') {
      let index1 = this.state.main_array.indexOf(
        this.state.value_for_updating_index,
      );
      let index2 = this.state.sunday1.indexOf(
        this.state.value_for_updating_index,
      );

      this.state.main_array[index1] = val;
      this.state.sunday1[index2] = val;
      this.setState({
        record1: this.state.main_array,
      });
    }

    // this.array_index(val)
    if (this.state.add_new == true) {
      this.add_newslot_in_existing(val);
    }
  };

  array_index = val => {
    let index1 = this.state.main_array.indexOf(
      this.state.value_for_updating_index,
    );

    this.state.main_array[index1] = val;
    //   this.state.arr.splice(index1,1),
    this.setState({
      record1: (this.state.main_array[index1] = val),
    });
  };

  array_index_1 = (val, val1) => {
    let index1 = this.state.slides.indexOf(val);

    this.state.slides[index1] = val1;

    setTimeout(() => {}, 122);
  };

  array_index_for_delete = val => {
    let index1 = this.state.main_array.indexOf(val);

    this.state.main_array.splice(index1, 1), this.setState({});
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
              <View style={{marginVertical: 5}}>
                <Pressable
                  onPress={() => this.showtimepicker1(doctor_time)}
                  style={{
                    width: 120,
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
    this.setState({
      changes_time_for_specific_day: value2,
    });

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
        main_array: this.state.monday1,
      });
    } else if (value2 == 'Tuesday') {
      this.setState({
        main_array: this.state.tuesday1,
      });
    } else if (value2 == 'Wednesday') {
      this.setState({
        main_array: this.state.wednesday1,
      });
    } else if (value2 == 'Thursday') {
      this.setState({
        main_array: this.state.thursday1,
      });
    } else if (value2 == 'Friday') {
      this.setState({
        main_array: this.state.friday1,
      });
    } else if (value2 == 'Saturday') {
      this.setState({
        main_array: this.state.saturday1,
      });
    } else if (value2 == 'Sunday') {
      this.setState({
        main_array: this.state.sunday1,
      });
    }
  }

  Update_Shedule = () => {
    let uploaddata = new FormData();

    let brr = JSON.stringify(this.state.monday1);
    let brr1 = JSON.stringify(this.state.tuesday1);
    let brr2 = JSON.stringify(this.state.wednesday1);
    let brr3 = JSON.stringify(this.state.thursday1);
    let brr4 = JSON.stringify(this.state.friday1);
    let brr5 = JSON.stringify(this.state.saturday1);
    let brr6 = JSON.stringify(this.state.sunday1);

    this.setState({spinner: true});

    uploaddata.append('arr', brr);
    uploaddata.append('arr1', brr1);
    uploaddata.append('arr2', brr2);
    uploaddata.append('arr3', brr3);
    uploaddata.append('arr4', brr4);
    uploaddata.append('arr5', brr5);
    uploaddata.append('arr6', brr6);
    uploaddata.append('doctor_id', this.state.id);

    let api = Connection + 'rest_apis.php?action=update_shedule';
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
          // alert(this.props.Please_try_again_later);
        } else {
          this.setState({
            spinner: false,
          });
          Toast.show('Your schedule successfully updated');

          Actions.Doctor_Tab_Screen();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <>
        <StatusBar backgroundColor="#27aae0" barStyle="light-content" />
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 15,
              backgroundColor: '#27aae0',
              paddingHorizontal: 15,
              borderBottomColor: 'gray',
              borderBottomWidth: 0.5,
            }}>
            <Icon
              onPress={() => Actions.pop()}
              name="arrow-back"
              type="MaterialIcons"
              style={{color: 'white', fontSize: 24}}
            />

            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
              Update Schedule
            </Text>
            <Text style={{fontSize: 22, fontWeight: 'bold', color: 'black'}}>
              {' '}
            </Text>
          </View>

          <View
            style={{
              width: width / 1,
              paddingVertical: 10,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                marginHorizontal: 10,
              }}>
              Add your availability so that patient can book appointment with
              you.
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
                borderColor: '#27aae0',
                borderWidth: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{color: 'black', fontWeight: 'bold', fontSize: 17}}>
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
                      style={
                        this.state.text1 == 1 ? styles.text1 : styles.text
                      }>
                      {' '}
                    </Text>

                    <Text
                      style={
                        this.state.text1 == 1 ? styles.text1 : styles.text
                      }>
                      Mon
                    </Text>
                    <Text
                      style={
                        this.state.text1 == 1 ? styles.text1 : styles.text
                      }>
                      {' '}
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => this.changebtn2('text2', 'Tuesday')}
                    style={this.state.text2 == 1 ? styles.view1 : styles.view}>
                    <Text
                      style={
                        this.state.text2 == 1 ? styles.text1 : styles.text
                      }>
                      Tue
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => this.changebtn2('text3', 'Wednesday')}
                    style={this.state.text3 == 1 ? styles.view1 : styles.view}>
                    <Text
                      style={
                        this.state.text3 == 1 ? styles.text1 : styles.text
                      }>
                      Wed
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => this.changebtn2('text4', 'Thursday')}
                    style={this.state.text4 == 1 ? styles.view1 : styles.view}>
                    <Text
                      style={
                        this.state.text4 == 1 ? styles.text1 : styles.text
                      }>
                      Thu
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => this.changebtn2('text5', 'Friday')}
                    style={this.state.text5 == 1 ? styles.view1 : styles.view}>
                    <Text
                      style={
                        this.state.text5 == 1 ? styles.text1 : styles.text
                      }>
                      Fri
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => this.changebtn2('text6', 'Saturday')}
                    style={this.state.text6 == 1 ? styles.view1 : styles.view}>
                    <Text
                      style={
                        this.state.text6 == 1 ? styles.text1 : styles.text
                      }>
                      Sat
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => this.changebtn2('text7', 'Sunday')}
                    style={this.state.text7 == 1 ? styles.view1 : styles.view}>
                    <Text
                      style={
                        this.state.text7 == 1 ? styles.text1 : styles.text
                      }>
                      Sun
                    </Text>
                  </Pressable>
                </ScrollView>
              </View>

              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 17}}>
                Add Slots
              </Text>

              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    paddingHorizontal: 10,
                    marginVertical: 10,
                    alignItems: 'center',
                  }}>
                  <Pressable
                    style={{
                      backgroundColor: '#27aae0',
                      width: 120,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      marginLeft: 10,
                      paddingVertical: 10,
                      marginTop: 10,
                    }}
                    onPress={() => this.showtimepicker2()}>
                    <Text style={{color: 'white'}}>Add Time</Text>
                  </Pressable>

                  {this.createtable1()}
                </View>
              </View>
            </View>

            {this.state.show == true ? (
              <DateTimePickerModal
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
            onPress={() => this.Update_Shedule()}
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
              Update
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
      </>
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

export default update_Schedule;

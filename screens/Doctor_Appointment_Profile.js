import React, {Component} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
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
  Modal,
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
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
  MarkerAnimated,
  Animated,
  Polyline,
} from 'react-native-maps';
import ImageLoad from 'react-native-image-placeholder';
import Connection from '../connection';
import {Rating, AirbnbRating} from 'react-native-ratings';
import moment from 'moment';
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
import StarRating from 'react-native-star-rating';
import {connect} from 'react-redux';
import ImageViewer from 'react-native-image-zoom-viewer';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Doctor_Appointment_Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      main_array: [],
      appointment_time: '',
      appointment_date: '',
      visible: false,
      user_rating: 0,
      comment: '',
      data1: [],
      skalton: true,
      total_patient: '',
      my_like: '',
      visible2: false,
      skalton: true,
      text1: 2,
      text2: 1,
      text3: 1,
      text4: 1,
      text5: 1,
      text6: 1,
      text7: 1,
      monday1: [],
      tuesday1: [],
      wednesday1: [],
      thursday1: [],
      saturday1: [],
      friday1: [],
      sunday1: [],
    };
  }

  backAction = () => {
    Actions.pop();
    return true;
  };

  changebtn2(value, value2, value3) {
    this.setState({
      changes_time_for_specific_day: value2,
      appointment_date: value3,
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

    if (value2 == 'Mon') {
      this.setState({
        main_array: this.state.monday1,
      });
    } else if (value2 == 'Tue') {
      this.setState({
        main_array: this.state.tuesday1,
      });
    } else if (value2 == 'Wed') {
      this.setState({
        main_array: this.state.wednesday1,
      });
    } else if (value2 == 'Thu') {
      this.setState({
        main_array: this.state.thursday1,
      });
    } else if (value2 == 'Fri') {
      this.setState({
        main_array: this.state.friday1,
      });
    } else if (value2 == 'Sat') {
      this.setState({
        main_array: this.state.saturday1,
      });
    } else if (value2 == 'Sun') {
      this.setState({
        main_array: this.state.sunday1,
      });
    }

    // this.Get_appointments_with_doctor_id(value2, value3);
  }

  selected_time = (val, val1) => {
    let record1 = this.state.main_array;
    let len = record1.length;
    let boxes = 'box' + val;

    if (this.state[boxes] == false) {
      for (let i = 0; i < len; i++) {
        let doctor_time = record1[i];
        let boxes = 'box' + doctor_time;
        this.setState({[boxes]: false});
      }
    } else {
    }

    setTimeout(() => {
      if (this.state[boxes] == false) {
        this.setState({[boxes]: true});
        this.setState({
          appointment_time: val,
          daybox: this.state.changes_time_for_specific_day,
        });
      } else {
        this.setState({[boxes]: false});

        this.setState({
          appointment_time: '',
          daybox: '',
        });
      }
    }, 100);
  };

  book_appointment = () => {
    if (this.state.appointment_time == '') {
      alert('Please Select Appointment Time.');
    } else {
      Actions.appointment_checkout({
        email: this.props.email,
        stripe_key: this.props.stripe_key,
        experience: this.props.experience,
        a_r: this.props.a_r,
        address: this.props.address,
        s_key: this.props.s_key,
        paypal: this.props.paypal,
        access: this.props.access,
        category: this.props.category,
        doctor_id: this.props.doctor_id,
        time: this.state.appointment_time,
        date: this.state.appointment_date,
        day: this.state.changes_time_for_specific_day,
        fee: this.props.fee,
        fcm_token: this.props.fcm_token,
        doctor_name: this.props.name1,
        city: this.props.city,
        doctor_type: this.props.doctor_type,
        doctor_profile: this.props.profile,
        p_age: this.state.p_age,
      });
    }
  };

  createtable1 = () => {
    let table = [];

    let record1 = this.state.main_array;
    let len = record1.length;

    if (record1 != 'fail') {
      for (let i = 0; i < len; i++) {
        let doctor_time = record1[i];
        let boxes = 'box' + doctor_time;
        let boxred = 'boxred' + doctor_time;

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
                  onPress={() => this.selected_time(doctor_time, 'selected')}
                  style={
                    this.state[boxes] == true ? styles.select : styles.unselect
                  }>
                  <Text
                    style={
                      this.state[boxes] == true
                        ? styles.select_text
                        : styles.unselect_text
                    }>
                    {doctor_time}
                  </Text>
                </Pressable>
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

  // componentWillUnmount() {
  //     this.backHandler.remove();
  // }
  componentDidMount = async () => {
    let aa = moment(new Date()).format('YYYY-MM-DD hh:mm A');
    console.log('QQQQQQQQQQQQ,AA', aa);
    let split = aa.split(' ');
    let date = split[0];

    let time = split[1];
    let am_pm = split[2];
    let final_time = time + '' + am_pm;

    this.setState({
      time: final_time,
      date: date,
    });

    let user = await AsyncStorage.getItem('customer');

    let parsed = JSON.parse(user);
    let aaa = new Date();
    let id = parsed[0].id;

    console.log(
      'fcm_token,fcm_token,fcm_token,fcm_token',
      this.props.fcm_token,
    );
    this.setState({
      id: id,
    });

    var today = new Date();

    var nextweek_T = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    // console.log('TODAYTODAYTODAYTODAYTODAYTODAYTODAYTODAY', today)
    // console.log('TODAYTODAYTODAYTODAYTODAYTODAYTODAYTODAY', nextweek_T)

    let date0 = nextweek_T.toString();
    let ddd = date0.split(' ');
    let day_1 = ddd[0];
    let dd_2 = ddd[1];
    let dd_3 = ddd[2];
    let dd_4 = ddd[3];

    let final_date_1 = dd_2 + ' ' + dd_3 + ', ' + dd_4;

    this.setState({
      appointment_date: final_date_1,
      changes_time_for_specific_day: day_1,
    });
    console.log(
      'FinalDateFinalDateFinalDateFinalDateFinalDateFinalDate',
      final_date_1,
    );

    var nextweek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
    );
    let date1 = nextweek.toString();
    let ccc = date1.split(' ');
    let day_2 = ccc[0];
    let cc_2 = ccc[1];
    let cc_3 = ccc[2];
    let cc_4 = ccc[3];

    let final_date_2 = cc_2 + ' ' + cc_3 + ', ' + cc_4;

    var nextweek1 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 2,
    );
    let date2 = nextweek1.toString();
    let eee = date2.split(' ');
    let day_3 = eee[0];
    let ee_2 = eee[1];
    let ee_3 = eee[2];
    let ee_4 = eee[3];

    let final_date_3 = ee_2 + ' ' + ee_3 + ', ' + ee_4;

    var nextweek2 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 3,
    );
    let date3 = nextweek2.toString();
    let fff = date3.split(' ');
    let day_4 = fff[0];
    let ff_2 = fff[1];
    let ff_3 = fff[2];
    let ff_4 = fff[3];

    let final_date_4 = ff_2 + ' ' + ff_3 + ', ' + ff_4;

    var nextweek3 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 4,
    );
    let date4 = nextweek3.toString();
    let ggg = date4.split(' ');
    let day_5 = ggg[0];
    let gg_2 = ggg[1];
    let gg_3 = ggg[2];
    let gg_4 = ggg[3];

    let final_date_5 = gg_2 + ' ' + gg_3 + ', ' + gg_4;

    var nextweek4 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 5,
    );
    let date5 = nextweek4.toString();
    let hhh = date5.split(' ');
    let day_6 = hhh[0];
    let hh_2 = hhh[1];
    let hh_3 = hhh[2];
    let hh_4 = hhh[3];

    let final_date_6 = hh_2 + ' ' + hh_3 + ', ' + hh_4;

    var nextweek5 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 6,
    );
    let date6 = nextweek5.toString();
    let iii = date6.split(' ');
    let day_7 = iii[0];
    let ii_2 = iii[1];
    let ii_3 = iii[2];
    let ii_4 = iii[3];

    let final_date_7 = ii_2 + ' ' + ii_3 + ', ' + ii_4;

    this.setState({
      day_1: day_1,
      day_2: day_2,
      day_3: day_3,
      day_4: day_4,
      day_5: day_5,
      day_6: day_6,
      day_7: day_7,

      date_1: final_date_1,
      date_2: final_date_2,
      date_3: final_date_3,
      date_4: final_date_4,
      date_5: final_date_5,
      date_6: final_date_6,
      date_7: final_date_7,

      date_1_1: dd_3,
      date_2_2: cc_3,
      date_3_3: ee_3,
      date_4_4: ff_3,
      date_5_5: gg_3,
      date_6_6: hh_3,
      date_7_7: ii_3,

      m1: cc_2,
      m2: dd_2,
      m3: ee_2,
      m4: ff_2,
      m5: gg_2,
      m6: hh_2,
      m7: ii_2,
    });

    this.get_shedule();
    this.get_total_patient();
    this.get_liked_doctor();
  };

  get_shedule = () => {
    let uploaddata = new FormData();

    uploaddata.append('doctor_id', this.props.doctor_id);

    console.log('Record4Record4Record4Record4Record4', this.props.doctor_id);

    let api = Connection + 'rest_apis.php?action=Get_shedule';
    //   console.log("pass => ", api);
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

        console.log('Record4Record4Record4Record4Record4', record4);

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

          console.log('monnnnnnnnnn', array_mon);
          let len_mon = array_mon.length;
          for (let i = 0; i < len_mon; i++) {
            let doctor_time = array_mon[i];
            let boxes = 'box' + doctor_time;
            this.setState({[boxes]: false});
          }

          let len_tue = array_tue.length;
          for (let i = 0; i < len_tue; i++) {
            let doctor_time = array_tue[i];
            let boxes = 'box' + doctor_time;
            this.setState({[boxes]: false});
          }

          let len_wed = array_wed.length;
          for (let i = 0; i < len_wed; i++) {
            let doctor_time = array_wed[i];
            let boxes = 'box' + doctor_time;
            this.setState({[boxes]: false});
          }

          let len_thu = array_thu.length;
          for (let i = 0; i < len_thu; i++) {
            let doctor_time = array_thu[i];
            let boxes = 'box' + doctor_time;
            this.setState({[boxes]: false});
          }

          let len_fri = array_fri.length;
          for (let i = 0; i < len_fri; i++) {
            let doctor_time = array_fri[i];
            let boxes = 'box' + doctor_time;
            this.setState({[boxes]: false});
          }

          let len_sat = array_sat.length;
          for (let i = 0; i < len_sat; i++) {
            let doctor_time = array_sat[i];
            let boxes = 'box' + doctor_time;
            this.setState({[boxes]: false});
          }

          let len_sun = array_sun.length;
          for (let i = 0; i < len_sun; i++) {
            let doctor_time = array_sun[i];
            let boxes = 'box' + doctor_time;
            this.setState({[boxes]: false});
          }

          if (this.props.day_1 == 'Fri') {
            this.setState({
              main_array: array_fri,
            });
          } else if (this.props.day_1 == 'Sat') {
            this.setState({
              main_array: array_sat,
            });
          } else if (this.props.day_1 == 'Sun') {
            this.setState({
              main_array: array_sun,
            });
          } else if (this.props.day_1 == 'Mon') {
            this.setState({
              main_array: array_mon,
            });
          } else if (this.props.day_1 == 'Tue') {
            this.setState({
              main_array: array_tue,
            });
          } else if (this.props.day_1 == 'Wed') {
            this.setState({
              main_array: array_wed,
            });
          } else if (this.props.day_1 == 'Thu') {
            this.setState({
              main_array: array_thu,
            });
          }

          this.setState({
            monday1: array_mon,
            tuesday1: array_tue,
            wednesday1: array_wed,
            thursday1: array_thu,
            friday1: array_fri,
            saturday1: array_sat,
            sunday1: array_sun,
            skalton: false,
          });

          //   this.Get_appointments_with_doctor_id(
          //     this.props.day_1,
          //     this.props.final_date_1,
          //   );
        } else {
          this.setState({
            main_array: [],
            skalton: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  Get_appointments_with_doctor_id = (val1, val2) => {
    let uploaddata = new FormData();

    uploaddata.append('doctor_id', this.props.doctor_id);
    uploaddata.append('date', val2);
    uploaddata.append('day', val1);

    let api =
      Connection + 'rest_apis.php?action=Get_appointments_with_doctor_id';
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

        if (record != 'fail') {
          let record1 = this.state.main_array;

          let len1 = record1.length;
          if (record1 != 'fail') {
            for (let i = 0; i < len1; i++) {
              let s_rec_1 = record1[i];
              let len = record.length;
              for (let i = 0; i < len; i++) {
                let app_rec_1 = record[i];

                if (s_rec_1 == app_rec_1) {
                  this.setState({
                    booked_time: s_rec_1,
                  });

                  let boxred = 'boxred' + app_rec_1;
                  this.setState({[boxred]: true, skalton: false});
                }
              }
            }
          }

          this.setState({
            data: record,
            spinner12: true,
          });
        } else {
          let boxred = 'boxred' + this.state.booked_time;
          this.setState({[boxred]: false});
          this.setState({
            spinner12: true,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  check_doctor_sheduling = () => {
    this.setState({
      spinner: true,
    });

    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.props.doctor_id);
    let api = Connection + 'rest_apis.php?action=check_doctor_sheduling';

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

          alert('Doctor has not signed up for Telemedicine');
        } else {
          this.setState({
            spinner: false,
          });
          this.book_appointment();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  Get_Data_1 = () => {
    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.props.doctor_id);
    let api = Connection + 'rest_apis.php?action=Get_Reviews_with_user';
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

        if (record != 'fail') {
          let total_review = record[0].total_review;
          let avg_rating = record[0].avg_rating;
          let a_r = Number(avg_rating).toFixed(2);
          this.setState({
            data1: record,
            total_review: total_review,
            avg_rating: a_r,
            skalton: false,
          });
        } else {
          this.setState({
            data1: [],
            skalton: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  Like_Station = () => {
    this.RBSheet.close();

    this.setState({
      my_like: true,
      spinner: true,
    });

    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.props.doctor_id);
    uploaddata.append('user_id', this.state.id);
    let api = Connection + 'rest_apis.php?action=doctor_like';

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
        if (record != 'fail') {
          this.get_liked_doctor();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  Unlike_Station = () => {
    this.RBSheet.close();

    this.setState({
      my_like: false,
      spinner: true,
    });

    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.props.doctor_id);
    uploaddata.append('user_id', this.state.id);
    let api = Connection + 'rest_apis.php?action=doctor_unlike';

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
        if (record != 'fail') {
          this.get_liked_doctor();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  get_liked_doctor = () => {
    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.props.doctor_id);
    uploaddata.append('user_id', this.state.id);

    let api = Connection + 'rest_apis.php?action=get_liked_doctor';

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
        if (record != 'fail') {
          this.setState({
            my_like: true,
            spinner: false,
          });
        } else {
          this.setState({
            my_like: false,
            spinner: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  get_total_patient = () => {
    let uploaddata = new FormData();
    console.log('doctor_id', this.props.doctor_id);
    uploaddata.append('doctor_id', this.props.doctor_id);
    let api = Connection + 'rest_apis.php?action=get_total_patient';

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

        if (record != 'fail') {
          let t_p = record[0];
          this.setState({
            total_patient: t_p,
          });
        } else {
          this.setState({
            total_patient: 0,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  createtable2 = () => {
    let table = [];

    let record1 = this.state.data1;
    let len = record1.length;
    if (record1 != 'fail') {
      for (let i = 0; i < len; i++) {
        let name = record1[i].name;
        let profile1 = record1[i].profile;
        let profile = Connection + 'images/' + profile1;
        let comment = record1[i].comment;
        let rating = record1[i].rating;
        let date = record1[i].date;
        let ss = date.split(' ');
        let date_1 = ss[0];
        let time_1 = ss[1];
        table.push(
          <View>
            {
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <ImageLoad
                    style={{width: 44, borderRadius: 44, height: 44}}
                    loadingStyle={{size: 'large', color: 'blue'}}
                    source={{uri: profile}}
                    borderRadius={150}
                    placeholderStyle={{width: 44, borderRadius: 44, height: 44}}
                  />
                  <View style={{marginLeft: 10, width: '60%'}}>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 15,
                        maxWidth: '100%',
                      }}>
                      {name}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={{color: 'gray', fontSize: 14, maxWidth: '100%'}}>
                      {comment}
                    </Text>
                  </View>
                </View>

                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: '#565759'}}>{date_1}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 3,
                    }}>
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      rating={rating}
                      // selectedStar={(rating) => this.onStarRatingPress(rating)}
                      containerStyle={{width: width / 4.8}}
                      starSize={14}
                      fullStarColor={'gold'}
                    />
                  </View>
                </View>
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

  ratingCompleted = value => {
    this.setState({
      user_rating: value,
    });
  };

  open = (val, val1, val2) => {
    this.RBSheet.open();

    this.setState({
      appointment_type: val,
      appointment_price: val1,
      tappointment_timeime: val2,
    });
  };

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

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 15,
              paddingVertical: 15,
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
              style={{color: 'black', fontSize: 28}}
            />
            <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
              {this.props.name1}
            </Text>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
              {' '}
            </Text>
          </View>

          <View
            style={{
              width: width / 1.1,
              alignSelf: 'center',
              backgroundColor: '#27aae0',
              borderRadius: 8,
              paddingVertical: 15,
              paddingHorizontal: 10,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ImageLoad
                style={{
                  width: 100,
                  height: 120,
                  borderRadius: 8,
                  //   resizeMode:'stretch',
                }}
                loadingStyle={{size: 'large', color: 'blue'}}
                source={{uri: this.props.profile}}
                borderRadius={8}
                placeholderStyle={{
                  width: 100,
                  height: 120,
                  borderRadius: 8,
                }}
              />

              {/* <Image
                source={require('../assets/doctor-12.jpg')}
                style={{width: 100, height: 120, borderRadius: 8}}
              /> */}

              <View style={{marginLeft: 10, width: '80%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingRight: 10,
                  }}>
                  <View>
                    <Text
                      style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {this.props.name1}
                    </Text>
                    <Text
                      style={{
                        color: 'lightgray',
                        fontSize: 12,
                        fontWeight: '600',
                      }}>
                      {this.props.category}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 5,
                      }}>
                      <Icon
                        name="location-pin"
                        type="Entypo"
                        style={{color: 'lightgray', fontSize: 20}}
                      />
                      <Text
                        style={{
                          color: 'lightgray',
                          fontSize: 12,
                          fontWeight: '400',
                          width: '75%',
                        }}
                        numberOfLines={1}>
                        {this.props.address}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 8,
                      }}>
                      <View
                        style={{
                          width: 75,
                          borderRadius: 8,
                          height: 35,
                          backgroundColor: 'white',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'row',
                        }}>
                        <Icon
                          name="star"
                          type="AntDesign"
                          style={{color: 'gold', fontSize: 16}}
                        />
                        <Text
                          style={{
                            color: '#27aae0',
                            fontSize: 15,
                            fontWeight: 'bold',
                          }}>
                          {' '}
                          {this.props.a_r}
                        </Text>
                      </View>

                      {/* {this.state.my_like == true ? (
                        <View
                          style={{
                            width: 50,
                            borderRadius: 8,
                            height: 35,
                            backgroundColor: 'white',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 15,
                          }}>
                          <Icon
                            onPress={() => this.RBSheet.open()}
                            name="heart"
                            type="AntDesign"
                            style={{color: 'red', fontSize: 20}}
                          />
                        </View>
                      ) : (
                        <View
                          style={{
                            width: 50,
                            borderRadius: 8,
                            height: 35,
                            backgroundColor: 'white',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 15,
                          }}>
                          <Icon
                            onPress={() => this.RBSheet.open()}
                            name="heart"
                            type="AntDesign"
                            style={{color: 'lightgray', fontSize: 20}}
                          />
                        </View>
                      )} */}
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>
                  {this.props.a_r}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'lightgray',
                    fontSize: 15,
                  }}>
                  Reviews
                </Text>
              </View>

              <View>
                <Text
                  style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>
                  {this.props.experience}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'lightgray',
                    fontSize: 15,
                  }}>
                  Year Exp
                </Text>
              </View>

              <View>
                <Text
                  style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>
                  {this.state.total_patient}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'lightgray',
                    fontSize: 15,
                  }}>
                  Patients
                </Text>
              </View>
            </View>
          </View>

          <Text
            style={{
              fontSize: 15,
              color: 'black',
              fontWeight: 'bold',
              paddingHorizontal: 20,
              marginTop: 15,
              marginBottom: 10,
            }}>
            Biography
          </Text>
          <Text style={{fontSize: 14, color: 'black', paddingHorizontal: 20}}>
            A doctor is someone who is experienced and certified to practice
            medicine to help maintain or restore physical and mental health. A
            doctor is tasked with interacting with patients, diagnosing medical
            problems
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: 'black',
              fontWeight: 'bold',
              paddingHorizontal: 20,
              marginTop: 15,
              marginBottom: 10,
            }}>
            Schedule
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              marginVertical: 15,
              width: width,
            }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <Pressable
                onPress={() =>
                  this.changebtn2('text1', this.state.day_1, this.state.date_1)
                }
                style={this.state.text1 == 1 ? styles.view1 : styles.view}>
                {/* <Text style={this.state.text1 == 1 ? styles.text1 : styles.text}>{this.state.m1}</Text> */}
                <Text
                  style={this.state.text1 == 1 ? styles.text1 : styles.text}>
                  {this.state.day_1}
                </Text>

                <Text
                  style={this.state.text1 == 1 ? styles.text1 : styles.text}>
                  {this.state.date_1_1}
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  this.changebtn2('text2', this.state.day_2, this.state.date_2)
                }
                style={this.state.text2 == 1 ? styles.view1 : styles.view}>
                <Text
                  style={this.state.text2 == 1 ? styles.text1 : styles.text}>
                  {this.state.day_2}
                </Text>

                <Text
                  style={this.state.text2 == 1 ? styles.text1 : styles.text}>
                  {this.state.date_2_2}
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  this.changebtn2('text3', this.state.day_3, this.state.date_3)
                }
                style={this.state.text3 == 1 ? styles.view1 : styles.view}>
                <Text
                  style={this.state.text3 == 1 ? styles.text1 : styles.text}>
                  {this.state.day_3}
                </Text>

                <Text
                  style={this.state.text3 == 1 ? styles.text1 : styles.text}>
                  {this.state.date_3_3}
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  this.changebtn2('text4', this.state.day_4, this.state.date_4)
                }
                style={this.state.text4 == 1 ? styles.view1 : styles.view}>
                <Text
                  style={this.state.text4 == 1 ? styles.text1 : styles.text}>
                  {this.state.day_4}
                </Text>

                <Text
                  style={this.state.text4 == 1 ? styles.text1 : styles.text}>
                  {this.state.date_4_4}
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  this.changebtn2('text5', this.state.day_5, this.state.date_5)
                }
                style={this.state.text5 == 1 ? styles.view1 : styles.view}>
                <Text
                  style={this.state.text5 == 1 ? styles.text1 : styles.text}>
                  {this.state.day_5}
                </Text>

                <Text
                  style={this.state.text5 == 1 ? styles.text1 : styles.text}>
                  {this.state.date_5_5}
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  this.changebtn2('text6', this.state.day_6, this.state.date_6)
                }
                style={this.state.text6 == 1 ? styles.view1 : styles.view}>
                <Text
                  style={this.state.text6 == 1 ? styles.text1 : styles.text}>
                  {this.state.day_6}
                </Text>

                <Text
                  style={this.state.text6 == 1 ? styles.text1 : styles.text}>
                  {this.state.date_6_6}
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  this.changebtn2('text7', this.state.day_7, this.state.date_7)
                }
                style={this.state.text7 == 1 ? styles.view1 : styles.view}>
                <Text
                  style={this.state.text7 == 1 ? styles.text1 : styles.text}>
                  {this.state.day_7}
                </Text>
                <Text
                  style={this.state.text7 == 1 ? styles.text1 : styles.text}>
                  {this.state.date_7_7}
                </Text>
              </Pressable>
            </ScrollView>
          </View>

          <Text
            style={{
              fontSize: 15,
              color: 'black',
              fontWeight: 'bold',
              paddingHorizontal: 20,
              marginBottom: 10,
            }}>
            Select Time
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            {this.state.skalton == true ? (
              <SkeletonPlaceholder>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    marginHorizontal: 10,
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      width: width / 3.8,
                      borderWidth: 1,
                      borderColor: '#235fa9',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 8,
                      borderRadius: 12,
                      marginTop: 10,
                      height: 50,
                      marginHorizontal: 5,
                    }}></View>
                  <View
                    style={{
                      width: width / 3.8,
                      borderWidth: 1,
                      borderColor: '#235fa9',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 8,
                      borderRadius: 12,
                      marginTop: 10,
                      height: 50,
                      marginHorizontal: 5,
                    }}></View>
                  <View
                    style={{
                      width: width / 3.8,
                      borderWidth: 1,
                      borderColor: '#235fa9',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 8,
                      borderRadius: 12,
                      marginTop: 10,
                      height: 50,
                      marginHorizontal: 5,
                    }}></View>
                  <View
                    style={{
                      width: width / 3.8,
                      borderWidth: 1,
                      borderColor: '#235fa9',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 8,
                      borderRadius: 12,
                      marginTop: 10,
                      height: 50,
                      marginHorizontal: 5,
                    }}></View>
                  <View
                    style={{
                      width: width / 3.8,
                      borderWidth: 1,
                      borderColor: '#235fa9',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 8,
                      borderRadius: 12,
                      marginTop: 10,
                      height: 50,
                      marginHorizontal: 5,
                    }}></View>
                  <View
                    style={{
                      width: width / 3.8,
                      borderWidth: 1,
                      borderColor: '#235fa9',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 8,
                      borderRadius: 12,
                      marginTop: 10,
                      height: 50,
                      marginHorizontal: 5,
                    }}></View>
                  <View
                    style={{
                      width: width / 3.8,
                      borderWidth: 1,
                      borderColor: '#235fa9',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 8,
                      borderRadius: 12,
                      marginTop: 10,
                      height: 50,
                      marginHorizontal: 5,
                    }}></View>
                </View>
              </SkeletonPlaceholder>
            ) : (
              <View>
                {this.state.main_array == '' ? (
                  <View>
                    <Text
                      style={{
                        marginTop: 30,
                        marginLeft: 20,
                        alignSelf: 'center',
                      }}>
                      No slot available
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      paddingHorizontal: 10,
                      marginTop: 10,
                    }}>
                    {this.createtable1()}
                  </View>
                )}
              </View>
            )}
          </View>

          {/* <View style={{ backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingVertical: 20, height: '80%', paddingHorizontal: 20 }}>
                           
                            <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, }}>Reviews</Text>
                                <Text style={{ color: '#27aae0', fontWeight: 'bold', fontSize: 16, }}>See All</Text>
                            </View>

                            {this.state.skalton == true ?

                                <SkeletonPlaceholder>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, marginTop: 10 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ width: 44, borderRadius: 150, height: 44 }}></View>

                                            <View style={{ marginLeft: 10, width: '60%' }}>
                                                <View style={{ width: 90, height: 16, borderRadius: 8 }}></View>
                                                <View style={{ width: 130, height: 15, borderRadius: 8, marginTop: 3 }}></View>
                                            </View>
                                        </View>

                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: 80, height: 15, borderRadius: 8 }}></View>
                                            <View style={{ width: 80, height: 15, borderRadius: 8, marginTop: 3 }}></View>
                                        </View>
                                    </View>
                                </SkeletonPlaceholder>
                                :

                                <View>
                                    {this.state.data1 == "" ?
                                        <View style={{ alignItems: 'center', justifyContent: 'center', height: 30 }}>
                                            <Text style={{}}>You don't have any review.</Text>
                                        </View>
                                        :
                                        <View>
                                            {this.createtable2()}
                                        </View>
                                    }
                                </View>

                            }

                        </View> */}
        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            position: 'absolute',
            bottom: 0,
            width: width,
            paddingVertical: 4,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.book_appointment()}
            style={{
              width: width / 1.1,
              borderRadius: 24,
              height: 45,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#27aae0',
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Book Appointment
            </Text>
          </TouchableOpacity>
        </View>

        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={320}
          openDuration={250}
          closeOnDragDown={true}
          customStyles={{
            container: {
              paddingHorizontal: 20,
              backgroundColor: '#f9f9fa',
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            },
            draggableIcon: {
              backgroundColor: 'lightgray',
            },
          }}>
          <View>
            {this.state.my_like == false ? (
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  marginTop: 30,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Mark as Favourites?
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  marginTop: 30,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Remove from Favourites?
              </Text>
            )}
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: 'lightgray',
                marginVertical: 15,
              }}></View>

            <View
              style={{
                width: width / 1.1,
                alignSelf: 'center',
                backgroundColor: 'white',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                shadowOffset: {width: 1, height: 1},
                shadowOpacity: 0,
                shadowRadius: 1,
                elevation: 1,
              }}>
              <ImageLoad
                style={{width: 90, height: 90, borderRadius: 15}}
                loadingStyle={{size: 'large', color: 'blue'}}
                source={{uri: this.props.profile}}
                borderRadius={15}
                placeholderStyle={{width: 90, height: 90, borderRadius: 15}}
              />

              <View style={{marginLeft: 13, width: '65%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
                    {this.props.name1}
                  </Text>

                  {this.state.my_like == false ? (
                    <Icon
                      name="hearto"
                      type="AntDesign"
                      style={{color: '#27aae0', fontSize: 20}}
                    />
                  ) : (
                    <Icon
                      name="heart"
                      type="AntDesign"
                      style={{color: '#27aae0', fontSize: 20}}
                    />
                  )}
                </View>

                <View
                  style={{
                    borderBottomWidth: 2,
                    borderColor: '#f8f8f9',
                    marginVertical: 13,
                  }}></View>

                <Text numberOfLines={1} style={{color: 'gray', fontSize: 13}}>
                  {this.props.category} | {this.props.address}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 7,
                  }}>
                  <Icon
                    name="star-half-empty"
                    type="FontAwesome"
                    style={{color: '#27aae0', fontSize: 18}}
                  />
                  <Text style={{color: 'gray', fontSize: 13, marginLeft: 5}}>
                    {this.props.a_r} (Total Reviews {this.props.a_r})
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => this.RBSheet.close()}
                activeOpacity={0.8}
                style={{
                  width: width / 2.3,
                  paddingVertical: 13,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                  backgroundColor: '#eef3ff',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                }}>
                <Text style={{color: '#27aae0', fontWeight: 'bold'}}>
                  Cancel
                </Text>
              </TouchableOpacity>
              {this.state.my_like == false ? (
                <TouchableOpacity
                  onPress={() => this.Like_Station()}
                  activeOpacity={0.8}
                  style={{
                    width: width / 2.3,
                    paddingVertical: 13,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    backgroundColor: '#27aae0',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 3,
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Yes, Mark
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => this.Unlike_Station()}
                  activeOpacity={0.8}
                  style={{
                    width: width / 2.3,
                    paddingVertical: 13,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    backgroundColor: '#27aae0',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 3,
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Yes, Unmark
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </RBSheet>

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
              width: width / 1,
              height: height / 1,
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
  map: {
    width: width,
    height: height / 3.5,
  },
  phoneinput: {
    fontSize: 16,
    paddingLeft: 15,
    // textAlign: 'center',
    width: '100%',
    marginTop: 15,
  },
  unselect: {
    width: width / 3.2,
    marginHorizontal: 4,
    backgroundColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  select: {
    width: width / 3.2,
    marginHorizontal: 4,
    backgroundColor: '#27aae0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  unselect_text: {
    color: '#27aae0',
    fontWeight: 'bold',
  },
  select_text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },

  select_text_red: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  unselect_text_red: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  select_red: {
    width: width / 2.4,
    marginHorizontal: 4,
    backgroundColor: '#FFD242',
    borderColor: '#FFD242',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 12,
  },
  unselect_red: {
    width: width / 2.4,
    marginHorizontal: 4,
    backgroundColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 12,
  },
  text1: {
    color: 'gray',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 5,
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 5,
  },
  view1: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#d9d9d9',
  },
  view: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#27aae0',
  },
});

export default Doctor_Appointment_Profile;

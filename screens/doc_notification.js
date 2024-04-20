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
  PermissionsAndroid,
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
import Connection from '../connection';
import {connect} from 'react-redux';
import ImageLoad from 'react-native-image-placeholder';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import moment from 'moment';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class doc_notification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      skalton: true,
      data1: [],
    };
  }

  backAction = () => {
    Actions.pop();
    return true;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

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

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );

    let user = await AsyncStorage.getItem('customer');
    let parsed = JSON.parse(user);
    let id = parsed[0].id;
    this.setState({
      id: id,
    });
    this.get_appointments_user(this.state.check_design);
  };

  get_appointments_user = val => {
    let uploaddata = new FormData();
    this.setState({
      skalton: true,
    });
    uploaddata.append('user_id', this.state.id);
    uploaddata.append('status', val);
    let api = Connection + 'rest_apis.php?action=display_notification_doctor';
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
          this.setState({
            data1: record4,
            skalton: false,
          });
        } else {
          this.setState({
            data1: [],
          });
        }

        this.setState({
          skalton: false,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  createtable1 = () => {
    let table = [];
    let record1 = this.state.data1;
    let len = record1.length;
    if (record1 != 'fail') {
      for (let i = 0; i < len; i++) {
        let date = record1[i].date;
        let doctor_name = record1[i].doctor_name;
        let user_name = record1[i].user_name;
        let app_time = record1[i].app_time;
        let app_date = record1[i].app_date;
        let type = record1[i].type;
        let time = record1[i].time;
        let app_cancel_reason = record1[i].app_cancel_reason;
        let app_resecdule_reason = record1[i].app_resecdule_reason;

        table.push(
          <View>
            {
              <View style={{marginTop: 25}}>
                <View>
                  {type == 'cancel' && (
                    <View style={{paddingHorizontal: 20}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 100,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#fccbce',
                            }}>
                            <Icon
                              name="close-box"
                              type="MaterialCommunityIcons"
                              style={{color: '#ff637e', fontSize: 27}}
                            />
                          </View>

                          <View style={{marginLeft: 10}}>
                            <Text
                              numberOfLines={1}
                              style={{
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: 16,
                                maxWidth: '100%',
                              }}>
                              Appointment Cancelled
                            </Text>
                            <Text
                              style={{
                                color: 'gray',
                                fontSize: 13,
                                marginTop: 3,
                              }}>
                              {date} | {time}
                            </Text>
                          </View>
                        </View>
                        {this.state.date == date ? (
                          <View
                            style={{
                              paddingHorizontal: 10,
                              height: 26,
                              borderRadius: 8,
                              backgroundColor: '#27aae0',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'row',
                            }}>
                            <Text
                              style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 13,
                              }}>
                              New
                            </Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              paddingHorizontal: 10,
                              height: 26,
                              borderRadius: 8,
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'row',
                            }}></View>
                        )}
                      </View>

                      <Text
                        style={{
                          color: 'gray',
                          maxWidth: '100%',
                          marginTop: 8,
                          fontSize: 13,
                          paddingHorizontal: 12,
                        }}>
                        {user_name} have successfully cancelled appointment with
                        you on {app_date}, {app_time}.
                      </Text>
                      <Text
                        style={{
                          color: 'gray',
                          marginTop: 3,
                          fontSize: 13,
                          fontWeight: 'bold',
                          paddingHorizontal: 12,
                        }}>
                        Reason: {app_cancel_reason}
                      </Text>
                    </View>
                  )}

                  {type == 'reschedule' && (
                    <View style={{paddingHorizontal: 20}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 100,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#f4f4f5',
                            }}>
                            <Icon
                              name="calendar"
                              type="Ionicons"
                              style={{color: '#42cfb4', fontSize: 27}}
                            />
                          </View>

                          <View style={{marginLeft: 10}}>
                            <Text
                              numberOfLines={1}
                              style={{
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: 16,
                                maxWidth: '100%',
                              }}>
                              Schedule Changed
                            </Text>
                            <Text
                              style={{
                                color: 'gray',
                                fontSize: 13,
                                marginTop: 3,
                              }}>
                              {date} | {time}
                            </Text>
                          </View>
                        </View>

                        {this.state.date == date ? (
                          <View
                            style={{
                              paddingHorizontal: 10,
                              height: 26,
                              borderRadius: 8,
                              backgroundColor: '#27aae0',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'row',
                            }}>
                            <Text
                              style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 13,
                              }}>
                              New
                            </Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              paddingHorizontal: 10,
                              height: 26,
                              borderRadius: 8,
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'row',
                            }}></View>
                        )}
                      </View>

                      <Text
                        style={{
                          color: 'gray',
                          maxWidth: '100%',
                          marginTop: 8,
                          fontSize: 13,
                          paddingHorizontal: 12,
                        }}>
                        {user_name} have successfully reschedule appointment
                        with you on {app_date}, {app_time}.
                      </Text>
                      <Text
                        style={{
                          color: 'gray',
                          marginTop: 3,
                          fontSize: 13,
                          fontWeight: 'bold',
                          paddingHorizontal: 12,
                        }}>
                        Reason: {app_resecdule_reason}
                      </Text>
                    </View>
                  )}

                  {type == 'success' && (
                    <View style={{paddingHorizontal: 20}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 100,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#edf3ff',
                            }}>
                            <Icon
                              name="calendar"
                              type="Ionicons"
                              style={{color: '#4481fe', fontSize: 27}}
                            />
                          </View>

                          <View style={{marginLeft: 10}}>
                            <Text
                              numberOfLines={1}
                              style={{
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: 16,
                                maxWidth: '100%',
                              }}>
                              Appointment Success!
                            </Text>
                            <Text
                              style={{
                                color: 'gray',
                                fontSize: 13,
                                marginTop: 3,
                              }}>
                              {' '}
                              {date} | {time}
                            </Text>
                          </View>
                        </View>

                        {this.state.date == date ? (
                          <View
                            style={{
                              paddingHorizontal: 10,
                              height: 26,
                              borderRadius: 8,
                              backgroundColor: '#27aae0',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 13,
                              }}>
                              New
                            </Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              paddingHorizontal: 10,
                              height: 26,
                              borderRadius: 8,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}></View>
                        )}
                      </View>

                      <Text
                        style={{
                          color: 'gray',
                          maxWidth: '100%',
                          marginTop: 8,
                          fontSize: 12,
                          paddingHorizontal: 12,
                        }}>
                        {user_name} have successfully booked appointment with
                        you on{app_date}, {app_time}.
                      </Text>
                    </View>
                  )}

                  {type == 'complete' && (
                    <View style={{paddingHorizontal: 20}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 100,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#e4f5e4',
                            }}>
                            <Icon
                              name="checkmark-done-circle"
                              type="Ionicons"
                              style={{color: '#94e394', fontSize: 27}}
                            />
                          </View>

                          <View style={{marginLeft: 10}}>
                            <Text
                              numberOfLines={1}
                              style={{
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: 16,
                                maxWidth: '100%',
                              }}>
                              Appointment Completed!
                            </Text>
                            <Text
                              style={{
                                color: 'gray',
                                fontSize: 13,
                                marginTop: 3,
                              }}>
                              {' '}
                              {date} | {time}
                            </Text>
                          </View>
                        </View>

                        {this.state.date == date ? (
                          <View
                            style={{
                              paddingHorizontal: 10,
                              height: 26,
                              borderRadius: 8,
                              backgroundColor: '#27aae0',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'row',
                            }}>
                            <Text
                              style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 13,
                              }}>
                              New
                            </Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              paddingHorizontal: 10,
                              height: 26,
                              borderRadius: 8,
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'row',
                            }}></View>
                        )}
                      </View>

                      <Text
                        style={{
                          color: 'gray',
                          maxWidth: '100%',
                          marginTop: 8,
                          fontSize: 13,
                          paddingHorizontal: 12,
                        }}>
                        {doctor_name} You have successfuly completed an
                        appointment with {user_name} on {app_date}, {app_time}.
                      </Text>
                    </View>
                  )}

                  {type == 'review' && (
                    <View style={{paddingHorizontal: 20}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 100,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#F7ED99',
                            }}>
                            <Icon
                              name="star-half-outline"
                              type="Ionicons"
                              style={{color: '#E1C900', fontSize: 27}}
                            />
                          </View>

                          <View style={{marginLeft: 10}}>
                            <Text
                              numberOfLines={1}
                              style={{
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: 16,
                                maxWidth: '100%',
                              }}>
                              Review Submitted!
                            </Text>
                            <Text
                              style={{
                                color: 'gray',
                                fontSize: 13,
                                marginTop: 3,
                              }}>
                              {' '}
                              {date} | {time}
                            </Text>
                          </View>
                        </View>

                        {this.state.date == date ? (
                          <View
                            style={{
                              paddingHorizontal: 10,
                              height: 26,
                              borderRadius: 8,
                              backgroundColor: '#27aae0',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'row',
                            }}>
                            <Text
                              style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 13,
                              }}>
                              New
                            </Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              paddingHorizontal: 10,
                              height: 26,
                              borderRadius: 8,
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'row',
                            }}></View>
                        )}
                      </View>

                      <Text
                        style={{
                          color: 'gray',
                          maxWidth: '100%',
                          marginTop: 8,
                          fontSize: 13,
                          paddingHorizontal: 12,
                        }}>
                        {user_name} have successfully submitted review for you.
                      </Text>
                    </View>
                  )}
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

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
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
            Notification
          </Text>
          <Text style={{fontSize: 22, fontWeight: 'bold', color: 'black'}}>
            {' '}
          </Text>
        </View>

        {this.state.skalton == true ? (
          <SkeletonPlaceholder>
            <View style={{paddingHorizontal: 20, marginTop: 15}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#e4f5e4',
                    }}></View>

                  <View style={{marginLeft: 10}}>
                    <View
                      style={{width: 130, height: 16, borderRadius: 8}}></View>
                    <View
                      style={{
                        width: 90,
                        height: 13,
                        borderRadius: 8,
                        marginTop: 3,
                      }}></View>
                  </View>
                </View>

                <View style={{width: 50, height: 26, borderRadius: 8}}></View>
              </View>

              <View
                style={{
                  width: width / 1.1,
                  marginTop: 10,
                  height: 40,
                  borderRadius: 10,
                }}></View>
            </View>

            <View style={{paddingHorizontal: 20, marginTop: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#e4f5e4',
                    }}></View>

                  <View style={{marginLeft: 10}}>
                    <View
                      style={{width: 130, height: 16, borderRadius: 8}}></View>
                    <View
                      style={{
                        width: 90,
                        height: 13,
                        borderRadius: 8,
                        marginTop: 3,
                      }}></View>
                  </View>
                </View>

                <View style={{width: 50, height: 26, borderRadius: 8}}></View>
              </View>

              <View
                style={{
                  width: width / 1.1,
                  marginTop: 10,
                  height: 40,
                  borderRadius: 10,
                }}></View>
            </View>

            <View style={{paddingHorizontal: 20, marginTop: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#e4f5e4',
                    }}></View>

                  <View style={{marginLeft: 10}}>
                    <View
                      style={{width: 130, height: 16, borderRadius: 8}}></View>
                    <View
                      style={{
                        width: 90,
                        height: 13,
                        borderRadius: 8,
                        marginTop: 3,
                      }}></View>
                  </View>
                </View>

                <View style={{width: 50, height: 26, borderRadius: 8}}></View>
              </View>

              <View
                style={{
                  width: width / 1.1,
                  marginTop: 10,
                  height: 40,
                  borderRadius: 10,
                }}></View>
            </View>

            <View style={{paddingHorizontal: 20, marginTop: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#e4f5e4',
                    }}></View>

                  <View style={{marginLeft: 10}}>
                    <View
                      style={{width: 130, height: 16, borderRadius: 8}}></View>
                    <View
                      style={{
                        width: 90,
                        height: 13,
                        borderRadius: 8,
                        marginTop: 3,
                      }}></View>
                  </View>
                </View>

                <View style={{width: 50, height: 26, borderRadius: 8}}></View>
              </View>

              <View
                style={{
                  width: width / 1.1,
                  marginTop: 10,
                  height: 40,
                  borderRadius: 10,
                }}></View>
            </View>

            <View style={{paddingHorizontal: 20, marginTop: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#e4f5e4',
                    }}></View>

                  <View style={{marginLeft: 10}}>
                    <View
                      style={{width: 130, height: 16, borderRadius: 8}}></View>
                    <View
                      style={{
                        width: 90,
                        height: 13,
                        borderRadius: 8,
                        marginTop: 3,
                      }}></View>
                  </View>
                </View>

                <View style={{width: 50, height: 26, borderRadius: 8}}></View>
              </View>

              <View
                style={{
                  width: width / 1.1,
                  marginTop: 10,
                  height: 40,
                  borderRadius: 10,
                }}></View>
            </View>

            <View style={{paddingHorizontal: 20, marginTop: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#e4f5e4',
                    }}></View>

                  <View style={{marginLeft: 10}}>
                    <View
                      style={{width: 130, height: 16, borderRadius: 8}}></View>
                    <View
                      style={{
                        width: 90,
                        height: 13,
                        borderRadius: 8,
                        marginTop: 3,
                      }}></View>
                  </View>
                </View>

                <View style={{width: 50, height: 26, borderRadius: 8}}></View>
              </View>

              <View
                style={{
                  width: width / 1.1,
                  marginTop: 10,
                  height: 40,
                  borderRadius: 10,
                }}></View>
            </View>

            <View style={{paddingHorizontal: 20, marginTop: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#e4f5e4',
                    }}></View>

                  <View style={{marginLeft: 10}}>
                    <View
                      style={{width: 130, height: 16, borderRadius: 8}}></View>
                    <View
                      style={{
                        width: 90,
                        height: 13,
                        borderRadius: 8,
                        marginTop: 3,
                      }}></View>
                  </View>
                </View>

                <View style={{width: 50, height: 26, borderRadius: 8}}></View>
              </View>

              <View
                style={{
                  width: width / 1.1,
                  marginTop: 10,
                  height: 40,
                  borderRadius: 10,
                }}></View>
            </View>

            <View style={{paddingHorizontal: 20, marginTop: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#e4f5e4',
                    }}></View>

                  <View style={{marginLeft: 10}}>
                    <View
                      style={{width: 130, height: 16, borderRadius: 8}}></View>
                    <View
                      style={{
                        width: 90,
                        height: 13,
                        borderRadius: 8,
                        marginTop: 3,
                      }}></View>
                  </View>
                </View>

                <View style={{width: 50, height: 26, borderRadius: 8}}></View>
              </View>

              <View
                style={{
                  width: width / 1.1,
                  marginTop: 10,
                  height: 40,
                  borderRadius: 10,
                }}></View>
            </View>
          </SkeletonPlaceholder>
        ) : (
          <ScrollView>
            {this.state.data1 == '' ? (
              <View>
                <Image
                  source={require('../assets/No_appointment.png')}
                  style={{
                    width: width / 1.3,
                    height: height / 3.7,
                    alignSelf: 'center',
                    marginTop: 90,
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 30,
                    fontSize: 16,
                  }}>
                  You dont have any notification yet.
                </Text>

                <Text
                  style={{
                    color: 'gray',
                    textAlign: 'center',
                    marginTop: 10,
                    fontSize: 13,
                    maxWidth: '78%',
                    alignSelf: 'center',
                  }}>
                  You don't have any notification present at the moment.
                </Text>
              </View>
            ) : (
              <View style={{paddingBottom: 20}}>{this.createtable1()}</View>
            )}
          </ScrollView>
        )}
      </View>
    );
  }
}

export default doc_notification;

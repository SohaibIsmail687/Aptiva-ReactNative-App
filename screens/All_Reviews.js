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
import StarRating from 'react-native-star-rating';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class All_Reviews extends React.Component {
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

    this.Get_Data_1();
  };

  Get_Data_1 = () => {
    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.state.id);
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
                  width: width / 1.1,
                  alignSelf: 'center',
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'gray',
                  paddingBottom: 10,
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
            All Reviews
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
                  You haven't got any review yet.
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
                  Once patients book appointments with you then they will submit
                  review.
                </Text>
              </View>
            ) : (
              <View style={{paddingBottom: 20}}>{this.createtable2()}</View>
            )}
          </ScrollView>
        )}
      </View>
    );
  }
}

export default All_Reviews;

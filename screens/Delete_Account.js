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
  Pressable,
  Dimensions,
  BackHandler,
  AsyncStorage,
  KeyboardAvoidingView,
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
import Toast from 'react-native-simple-toast';
import RBSheet from 'react-native-raw-bottom-sheet';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Delete_Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      spinner: false,
      passhide: true,
      password: '',
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

  componentDidMount = async () => {
    let user = await AsyncStorage.getItem('customer');

    console.log('aaaaaaaaaaaaa', user);
    let parsed = JSON.parse(user);

    let id = parsed[0].id;

    this.setState({
      id: id,
    });
  };

  delete_account = () => {
    this.setState({spinner: true, visible: false});
    this.RBSheet6.close();
    let uploaddata = new FormData();

    console.log('idididididididididididididid => ', this.state.id);
    uploaddata.append('user_id', this.state.id);
    // uploaddata.append("appointment_id", this.props.appointment_id);

    let api = Connection + 'rest_apis.php?action=delete_Account';
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
          Toast.show('You succesfully deleted your account');
          AsyncStorage.removeItem('customer');
          Actions.Patient_Login_Screen();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleDelete = () => {
    this.setState({
      visible: false,
    });
  };

  opendialogue = () => {
    this.setState({
      visible: true,
    });
  };

  seePassword = () => {
    console.log('eeeeeeeeeeeee');
    this.setState({
      passhide: !this.state.passhide,
    });
  };

  Password_Check = () => {
    let uploaddata = new FormData();
    let id = this.state.id;
    let password = this.state.password;

    if (password == '') {
      alert(this.props.Please_enter_your_password);
    } else {
      this.setState({spinner: true});

      uploaddata.append('id', id);
      uploaddata.append('password', password);

      let api = Connection + 'rest_apis.php?action=Password_Check';

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
          console.log('responseaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', response);

          if (response.response == 'fail') {
            this.setState({spinner: false});
            alert('Invalid Password');
          } else {
            // AsyncStorage.setItem('customer', JSON.stringify(response.response));

            // let record = response.response
            // let role = record[0].role
            this.setState({spinner: false});

            this.RBSheet6.open();
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
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
            backgroundColor: '#27aae0',
            borderBottomWidth: 1,
            borderColor: 'lightgray',
          }}>
          <TouchableOpacity onPress={() => Actions.pop()}>
            <Icon
              name="arrowleft"
              type="AntDesign"
              style={{color: 'white', fontSize: 25}}
            />
          </TouchableOpacity>
          <Text style={{color: 'white', fontSize: 15, fontWeight: '700'}}>
            Delete Account
          </Text>
          <Text style={{color: 'white', fontSize: 15, fontWeight: '700'}}>
            {' '}
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              paddingHorizontal: 15,
              marginTop: 10,
              color: 'black',
              fontSize: 15,
            }}>
            Please enter your password for delete your account. You can not able
            to login after deleting your account.
          </Text>

          <View
            style={{
              width: width / 1.1,
              alignSelf: 'center',
              backgroundColor: 'white',
              paddingVertical: 5,
              borderRadius: 8,
              color: 'black',
              paddingHorizontal: 10,
              marginTop: 25,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 3,
            }}>
            {this.state.password == '' ? <View></View> : <Text>Password</Text>}
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {this.state.password == '' ? (
                <View>
                  <Icon
                    name="lock-outline"
                    type="MaterialCommunityIcons"
                    style={{color: 'gray', fontSize: 24}}
                  />
                </View>
              ) : (
                <View>
                  <Icon
                    name="lock-outline"
                    type="MaterialCommunityIcons"
                    style={{color: '#27aae0', fontSize: 24}}
                  />
                </View>
              )}
              <TextInput
                secureTextEntry={this.state.passhide}
                type="password"
                value={this.state.password}
                onChangeText={password => this.setState({password})}
                style={{
                  height: 45,
                  backgroundColor: 'white',
                  paddingLeft: 10,
                  borderRadius: 8,
                  width: '85%',
                  color: '#27aae0',
                  fontWeight: 'bold',
                }}
                placeholder="Password"
                placeholderTextColor="gray"
              />
              {this.state.passhide == true ? (
                <Icon
                  name="eye"
                  type="Ionicons"
                  color="white"
                  onPress={() => this.seePassword()}
                  style={{fontSize: 25, color: '#27aae0'}}
                />
              ) : (
                <Icon
                  name="eye-off"
                  type="Ionicons"
                  color="white"
                  onPress={() => this.seePassword()}
                  style={{fontSize: 25, color: '#27aae0'}}
                />
              )}
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              this.Password_Check();
            }}
            style={{
              width: width / 1.1,
              alignSelf: 'center',
              height: 48,
              backgroundColor: '#27aae0',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 40,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Delete Account
            </Text>
          </TouchableOpacity>

          <Image
            source={require('../assets/ic_launcher.png')}
            style={{width: 300, height: 400, alignSelf: 'center'}}
            resizeMode="contain"
          />
        </ScrollView>

        <RBSheet
          ref={ref => {
            this.RBSheet6 = ref;
          }}
          closeOnDragDown={true}
          height={200}
          openDuration={270}
          customStyles={{
            container: {
              paddingHorizontal: 20,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            },
            draggableIcon: {
              backgroundColor: 'lightgray',
            },
          }}>
          <View>
            <Text
              style={{
                fontSize: 18,
                color: 'red',
                marginTop: 5,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Delete Account
            </Text>

            <View
              style={{
                width: '100%',
                backgroundColor: 'lightgray',
                height: 1,
                marginVertical: 15,
              }}></View>
            <Text
              style={{
                fontSize: 14,
                color: 'gray',
                textAlign: 'center',
                fontWeight: 'bold',
                paddingHorizontal: 30,
              }}>
              Are you sure to want delete your account?
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
                marginBottom: 10,
              }}>
              <TouchableOpacity
                onPress={() => this.RBSheet6.close()}
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
                  Close
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.delete_account()}
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
                  Yes, Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>

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

export default Delete_Account;

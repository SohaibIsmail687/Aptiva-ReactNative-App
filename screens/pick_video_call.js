import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  TouchableHighlight,
  BackHandler,
  AsyncStorage,
} from 'react-native';
import {
  TwilioVideoLocalView, // to get local view
  TwilioVideoParticipantView, //to get participant view
  TwilioVideo,
} from 'react-native-twilio-video-webrtc';
import Connection from '../connection';
import {Icon} from 'native-base';

// make sure you install vector icons and its dependencies
import ImageLoad from 'react-native-image-placeholder';
import normalize from 'react-native-normalize';
import InCallManager from 'react-native-incall-manager';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Actions} from 'react-native-router-flux';
// import messaging from '@react-native-firebase/messaging'
import LinearGradient from 'react-native-linear-gradient';
// const AccessToken = require('twilio').jwt.AccessToken;
// const VideoGrant = AccessToken.VideoGrant;
export async function GetAllPermissions() {
  // it will ask the permission for user
  try {
    // if (Platform.OS === "android") {
    const userResponse = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    return userResponse;
    // }
  } catch (err) {
    console.log(err);
  }
  return null;
}
class Pick_Call extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAudioEnabled: true,
      isVideoEnabled: false,
      isButtonDisplay: true,
      status: 'disconnected',
      participants: new Map(),
      videoTracks: new Map(),
      roomName: this.props.sender + '1',
      token: '',
      waiting: true,
      closedisable: true,
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
    return true;
  }

  call_record() {
    let uploaddata = new FormData();
    let room = this.props.sender + this.props.sender_id;
    uploaddata.append('sender_id', this.props.sender_id);
    uploaddata.append('receiver', this.props.receiver_id);
    uploaddata.append('sender_name', this.state.sender_name);
    uploaddata.append('sender_image', this.state.sender_image);
    uploaddata.append('room', room);

    let api = Connection + 'rest_apis.php?action=call_record';
    console.log(api);
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
        console.log(response.response);

        //let len = hasRecord
      })
      .catch(error => {
        console.error(error);
      });
  }
  call_delete() {
    let uploaddata = new FormData();
    let room = this.props.receiver + this.props.receiver_id;

    console.log('roooooooooooooooooooommmmmmmmm', room);
    console.log('senderrrr____idddddd', this.props.receiver_id);
    console.log('receiverrrrrr______iddd', this.props.sender_id);

    uploaddata.append('sender_id', this.props.receiver_id);
    uploaddata.append('receiver_id', this.props.sender_id);
    uploaddata.append('room', room);

    let api = Connection + 'rest_apis.php?action=call_delete';
    console.log(api);
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
        console.log(response.response);

        //let len = hasRecord
      })
      .catch(error => {
        console.error(error);
      });
  }
  checkcall = async () => {
    let id = this.state.id;
    let uploaddata = new FormData();

    uploaddata.append('receiver_id', id);

    let api = Connection + 'rest_apis.php?action=check_call';
    //console.log(api)
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
        console.log('call check');

        let hasRecord = response.response;
        if (hasRecord == 'fail') {
          clearInterval(this.state.timmer);
          InCallManager.stop();

          this.setState({status: 'disconnected'});
          this._onEndButtonPress();
          //         if(this.props.splash)
          //         {
          //           // Actions.User_Home()
          // Actions.pop()

          //         }
          //         else
          //         {
          //           // Actions.popTo("User_Home")
          // Actions.pop()

          //         }
        } else {
        }

        //let len = hasRecord
      })
      .catch(error => {
        console.error(error);
      });
  };
  async componentDidMount() {
    InCallManager.start({media: 'audio', ringback: '_BUNDLE_'});
    InCallManager.setForceSpeakerphoneOn(true);
    let user = await AsyncStorage.getItem('customer');
    let parsed = JSON.parse(user);

    let id = parsed[0].id;
    let first_name = parsed[0].name;
    //       if(user!=null)
    //       {
    //         console.log(user)
    //         let parsed = JSON.parse(user);

    //         let id = parsed[0].id;
    //         let first_name = parsed[0].first_name;
    //         let last_name = parsed[0].last_name;
    //         let user_image = parsed[0].user_image;
    // let sender_name = "unknown"
    //         if(first_name !="" && last_name !="")
    //         {
    //           sender_name = first_name+" "+last_name
    //         }
    //         this.setState({
    //           sender_image:user_image,
    //           sender_name:sender_name,id:id

    //         })
    //       }
    //       else
    //       {

    //       }

    this.setState({
      id: id,
    });

    // console.log("sender => ", this.props.sender)
    // console.log("receiver => ", this.props.receiver)
    let timmer = setInterval(() => {
      this.checkcall();
      this.setState({
        timmer: timmer,
      });
    }, 2000);
    this.login(first_name);

    GetAllPermissions();
  }

  login(val) {
    let user = val;
    let room = this.props.room;
    // let uploaddata = new FormData();
    // uploaddata.append('phone',email);
    // uploaddata.append('password',password);
    let api =
      Connection + 'generate_twilio_token.php?user=' + user + '&room=' + room;
    console.log(api);
    fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
        otherHeader: 'foo',
      },
      // body: uploaddata,
    })
      .then(response => response.json())
      .then(response => {
        console.log('token =>', response.response);

        this.setState({
          token: response.response,
        });
        // this.onConnectButtonPress()
        //let len = hasRecord
      })
      .catch(error => {
        console.error(error);
      });
  }
  onConnectButtonPress = () => {
    InCallManager.stop();
    console.log('in on connect button preess');
    this.refs.twilioVideo.connect({
      roomName: this.state.roomName,
      accessToken: this.state.token,
    });
    this.setState({status: 'connecting'});
    console.log(this.state.status);
  };
  _onEndButtonPress = () => {
    this.setState({status: 'disconnected', sensordedect: false});
    InCallManager.stop();
    this.call_delete();
    clearInterval(this.state.timmer);
    this.refs.twilioVideo.disconnect();
    // Actions.pop()
    Actions.Vedio_Done({
      role: this.props.role,
      doctor_profile: this.props.receiver_image,
      doctor_name: this.props.receiver,
    });
  };
  _onMuteButtonPress = () => {
    // on cliking the mic button we are setting it to mute or viceversa
    this.refs.twilioVideo
      .setLocalAudioEnabled(!this.state.isAudioEnabled)
      .then(isEnabled => this.setState({isAudioEnabled: isEnabled}));
  };
  _onFlipButtonPress = () => {
    // switches between fronst camera and Rare camera
    this.refs.twilioVideo.flipCamera();
  };
  _onRoomDidConnect = () => {
    console.log('room did connected');
    // this.call_record()
    // this.notification()
    this.setState({status: 'connected', waiting: false});
    // console.log("over");
  };
  _onRoomDidDisconnect = ({roomName, error}) => {
    console.log('ERROR: ', JSON.stringify(error));
    console.log('disconnected');
    console.log('disconnected =>', this.props.splash);
    // this.call_delete()
    clearInterval(this.state.timmer);
    InCallManager.stop();
    this.setState({status: 'disconnected'});
    // Actions.pop()
    Actions.Vedio_Done({
      role: this.props.role,
      doctor_profile: this.props.receiver_image,
      doctor_name: this.props.receiver,
    });
  };
  _onRoomDidFailToConnect = error => {
    console.log('ERROR: ', JSON.stringify(error));
    console.log('failed to connect');
    this.setState({status: 'disconnected'});
  };
  _onParticipantAddedVideoTrack = ({participant, track}) => {
    // call everytime a participant joins the same room
    console.log('onParticipantAddedVideoTrack: ', participant, track);
    this.setState({
      waiting: false,
      closedisable: false,
      videoTracks: new Map([
        ...this.state.videoTracks,

        [
          track.trackSid,
          {participantSid: participant.sid, videoTrackSid: track.trackSid},
        ],
      ]),
    });

    console.log('this.state.videoTracks', this.state.videoTracks);
  };
  _onParticipantRemovedVideoTrack = ({participant, track}) => {
    // gets called when a participant disconnects.
    console.log('onParticipantRemovedVideoTrack: ', participant, track);
    const videoTracks = this.state.videoTracks;
    videoTracks.delete(track.trackSid);

    this.setState({videoTracks: {...videoTracks}});
    // Actions.pop()
    // if(this.props.splash)
    // {
    //   // Actions.User_Home()
    //   Actions.pop()

    // }
    // else
    // {
    //   // Actions.popTo("User_Home")
    //   Actions.pop()

    // }
  };

  //   notification=async()=>{
  //     let to = this.props.fcm_token;

  //     console.log("To is => ",to)
  //     fetch('https://fcm.googleapis.com/fcm/send', {
  //         method: 'POST',
  //         headers: {
  //             Accept: 'application/json',
  //             'Content-Type': 'application/json',
  //             'Authorization': 'key=AAAAGkuciGU:APA91bHt0MpICRxeYNhlXsv78PDng55db4_4BHjJH1GrrhcSYhC7G2sXTDqihATjIFKRAI9YyEBSEYqhQyxVPTBW3bxtdonf86mWlj28lrlnsqKvkGDv3iCWOfGuFOyICgM-oboW4F8y'//cloud server key
  //         },
  //         body: JSON.stringify({
  //              "to": to,
  //             "priority": "high",
  //             "notification": {
  //              "title": "Tusna app",
  //              "body": this.props.sender+" calling to you",
  //              "sound": 'default',
  //              "icon" : "myicon",

  //             }
  //         }
  //         )
  //     }).then(res => res.json())
  //         .then(resjson => console.log("test",resjson))
  //         .catch(err => console.log("error =>",err))
  // }
  render() {
    const CELL_COUNT = 5;

    // const [props, getCellOnLayoutHandler] = useClearByFocusCell({

    // });
    return (
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        colors={['#27aae0', '#85def2', '#b5e9f5']}
        style={styles.container}>
        {this.state.status === 'disconnected' && (
          <View>
            {this.state.waiting == true && (
              <View style={{height: '100%'}}>
                {this.props.receiver_image != null ? (
                  <ImageLoad
                    style={{
                      width: 140,
                      height: 140,
                      borderRadius: 70,
                      borderWidth: 2,
                      borderColor: 'black',
                      alignSelf: 'center',
                      marginTop: 130,
                    }}
                    loadingStyle={{size: 'large', color: 'black'}}
                    source={{uri: this.props.receiver_image}}
                    // placeholderSource={require('../assets/empty.png')}
                    // placeholderStyle={{width:140,height:140,borderRadius:70,borderWidth:2,borderColor:"black",alignSelf:'center',marginTop:130}}
                    borderRadius={70}
                  />
                ) : (
                  <Image
                    source={require('../assets/empty.png')}
                    style={{
                      width: 140,
                      height: 140,
                      borderRadius: 70,
                      borderWidth: 2,
                      borderColor: 'black',
                      alignSelf: 'center',
                      marginTop: 150,
                    }}
                  />
                )}
                {/* <Image source={require('./images/asset-6.png')} style={{width:140,height:140,borderRadius:70,borderWidth:2,borderColor:"black",alignSelf:'center',marginTop:'40%'}}/> */}
                <Text
                  style={{
                    color: 'white',
                    fontSize: 24,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  {this.props.receiver}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    textAlign: 'center',
                    marginTop: 5,
                  }}>
                  Calling...
                </Text>
                <View
                  style={{
                    display: this.state.isButtonDisplay ? 'flex' : 'none',
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    height: 100,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    // backgroundColor:"blue",
                    // zIndex: 2,
                    zIndex: this.state.isButtonDisplay ? 2 : 0,
                  }}>
                  <TouchableOpacity
                    style={{
                      display: this.state.isButtonDisplay ? 'flex' : 'none',
                      width: 60,
                      height: 60,
                      marginLeft: 10,
                      marginRight: 10,
                      borderRadius: 100 / 2,
                      backgroundColor: 'green',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={this.onConnectButtonPress}>
                    {/* <Text style={{fontSize: 12}}>End</Text> */}
                    <Icon
                      name="call-sharp"
                      type="Ionicons"
                      size={28}
                      style={{color: 'white'}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      display: this.state.isButtonDisplay ? 'flex' : 'none',
                      width: 60,
                      height: 60,
                      marginLeft: 10,
                      marginRight: 10,
                      borderRadius: 100 / 2,
                      backgroundColor: 'red',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={this._onEndButtonPress}>
                    {/* <Text style={{fontSize: 12}}>End</Text> */}
                    <Icon
                      name="call"
                      type="Ionicons"
                      style={{color: '#fff', fontSize: 28}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
        {(this.state.status === 'connected' ||
          this.state.status === 'connecting') && (
          <View style={styles.callContainer}>
            {this.state.status === 'connected' && (
              <View style={styles.remoteGrid}>
                <TouchableOpacity
                  style={styles.remoteVideo}
                  onPress={() => {
                    this.setState({
                      isButtonDisplay: !this.state.isButtonDisplay,
                    });
                  }}>
                  {Array.from(
                    this.state.videoTracks,
                    ([trackSid, trackIdentifier]) => {
                      return (
                        <TwilioVideoParticipantView
                          style={styles.remoteVideo}
                          key={trackSid}
                          trackIdentifier={trackIdentifier}
                        />
                      );
                    },
                  )}
                </TouchableOpacity>
                <TwilioVideoLocalView
                  enabled={true}
                  style={
                    this.state.isButtonDisplay
                      ? styles.localVideoOnButtonEnabled
                      : styles.localVideoOnButtonDisabled
                  }
                />
              </View>
            )}
            {this.state.waiting == true && (
              <View style={{height: '100%'}}>
                {this.props.receiver_image != null ? (
                  <ImageLoad
                    style={{
                      width: 140,
                      height: 140,
                      borderRadius: 70,
                      borderWidth: 2,
                      borderColor: 'black',
                      alignSelf: 'center',
                      marginTop: '40%',
                    }}
                    loadingStyle={{size: 'large', color: 'black'}}
                    source={{uri: this.props.receiver_image}}
                    // placeholderSource={require('../assets/empty.png')}
                    // placeholderStyle={{width:140,height:140,borderRadius:70,borderWidth:2,borderColor:"black",alignSelf:'center',marginTop:'40%'}}
                    borderRadius={70}
                  />
                ) : (
                  <Image
                    source={require('../assets/empty.png')}
                    style={{
                      width: 200,
                      height: 140,
                      borderRadius: 70,
                      borderWidth: 2,
                      borderColor: 'black',
                      alignSelf: 'center',
                      marginTop: 150,
                    }}
                  />
                )}

                {/* <Image source={require('./images/asset-6.png')} style={{width:140,height:140,borderRadius:70,borderWidth:2,borderColor:"black",alignSelf:'center',marginTop:'40%'}}/> */}
                <Text
                  style={{
                    color: 'white',
                    fontSize: 24,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  {this.props.receiver}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    textAlign: 'center',
                    marginTop: 5,
                  }}>
                  Calling...
                </Text>
              </View>
            )}
            {this.state.waiting == true && (
              <TwilioVideoLocalView
                enabled={true}
                style={
                  this.state.isButtonDisplay
                    ? styles.localVideoOnButtonEnabled
                    : styles.localVideoOnButtonDisabled
                }
              />
            )}
            <View
              style={{
                display: this.state.isButtonDisplay ? 'flex' : 'none',
                position: 'absolute',
                left: 0,
                bottom: 0,
                right: 0,
                height: 100,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                // backgroundColor:"blue",
                // zIndex: 2,
                zIndex: this.state.isButtonDisplay ? 2 : 0,
              }}>
              <TouchableOpacity
                style={{
                  display: this.state.isButtonDisplay ? 'flex' : 'none',
                  width: 60,
                  height: 60,
                  marginLeft: 10,
                  marginRight: 10,
                  borderRadius: 100 / 2,
                  backgroundColor: 'grey',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={this._onMuteButtonPress}>
                <Icon
                  name={
                    this.state.isAudioEnabled
                      ? 'microphone'
                      : 'microphone-slash'
                  }
                  type="FontAwesome"
                  style={{color: '#fff', fontSize: 24}}
                />

                {/* < MIcon name={this.state.isAudioEnabled ? "mic" : "mic-off"} size={24} color='#fff' /> */}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  display: this.state.isButtonDisplay ? 'flex' : 'none',
                  width: 60,
                  height: 60,
                  marginLeft: 10,
                  marginRight: 10,
                  borderRadius: 100 / 2,
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={this._onEndButtonPress}>
                {/* <Text style={{fontSize: 12}}>End</Text> */}
                {/* <Icon name="call" type="Ionicons" style={{ color: '#fff', fontSize: 28, }} /> */}
                <Icon
                  name="call-sharp"
                  type="Ionicons"
                  size={28}
                  style={{color: '#fff'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  display: this.state.isButtonDisplay ? 'flex' : 'none',
                  width: 60,
                  height: 60,
                  marginLeft: 10,
                  marginRight: 10,
                  borderRadius: 100 / 2,
                  backgroundColor: 'grey',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={this._onFlipButtonPress}>
                {/* <Text style={{fontSize: 12}}>Flip</Text> */}
                <Icon
                  name="camera-switch"
                  type="MaterialCommunityIcons"
                  style={{color: '#fff', fontSize: 28}}
                />
                {/* < MCIcon name="camera-switch" size={28} color='#fff' /> */}
              </TouchableOpacity>
            </View>
          </View>
        )}
        <TwilioVideo
          ref="twilioVideo"
          onRoomDidConnect={this._onRoomDidConnect}
          onRoomDidDisconnect={this._onRoomDidDisconnect}
          onRoomDidFailToConnect={this._onRoomDidFailToConnect}
          onParticipantAddedVideoTrack={this._onParticipantAddedVideoTrack}
          onParticipantRemovedVideoTrack={this._onParticipantRemovedVideoTrack}
        />
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#684994',
  },
  callContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    minHeight: '100%',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 50,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  button: {
    marginTop: 100,
  },
  localVideoOnButtonEnabled: {
    bottom: '40%',
    width: '35%',
    left: '64%',
    height: '25%',
    zIndex: 2,
  },
  localVideoOnButtonDisabled: {
    bottom: '30%',
    width: '35%',
    left: '64%',
    height: '25%',
    zIndex: 2,
  },
  remoteGrid: {
    flex: 1,
    flexDirection: 'column',
  },
  remoteVideo: {
    width: wp('100%'),
    height: hp('100%'),
    zIndex: 1,
  },
  optionsContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    zIndex: 2,
  },
  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacing: {
    padding: 10,
  },
  inputLabel: {
    fontSize: 18,
  },
  buttonContainer: {
    height: normalize(45),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: wp('90%'),
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#1E3378',
    width: wp('90%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 10,
  },
  Buttontext: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
  },
  inputBox: {
    borderBottomColor: '#cccccc',
    fontSize: 16,
    width: wp('95%'),
    borderBottomWidth: 1,
  },
});
export default Pick_Call;

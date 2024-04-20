import { Row } from 'native-base';
import React, { Component } from 'react';
import { connect } from "react-redux";
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
  AsyncStorage,
  ToastAndroid
} from 'react-native';
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Connection from "../connection";
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
import RBSheet from "react-native-raw-bottom-sheet";
import Dialog, { SlideAnimation, DialogContent, DialogFooter, DialogButton, DialogTitle } from 'react-native-popup-dialog';
import moment from 'moment';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

class Patient_Detail_Screen extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      p_name: '', p_age: '',
      p_gender: '',
      problem: '',
      reason: 'Select Reason'
    }
  }



  backAction = () => {
    Actions.pop()
    return true;
  };


  // componentWillUnmount() {
  //   this.backHandler.remove();
  // }

  // componentDidMount = async () => {

  //   let aa = moment(new Date()).format("YYYY-MM-DD hh:mm a");
  //   console.log('QQQQQQQQQQQQ,AA', this.props.fcm_token)
  //   let split = aa.split(' ')
  //   let date = split[0]
  //   let time = split[1]
  //   let am_pm = split[2]
  //   let final_time = time + " " + am_pm
  //   let user = await AsyncStorage.getItem('customer');
  //   let parsed = JSON.parse(user);
  //   let name = parsed[0].name;
  //   let id = parsed[0].id;
  //   let age = parsed[0].age;
  //   let gender = parsed[0].gender;
  //   this.setState({
  //     name: name,
  //     age: age,
  //     gender: gender,
  //     id: id,
  //     date: date,
  //     time: final_time
  //   })

  //   this.backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     this.backAction
  //   );
  // }

  select_gender = (val_3) => {
    console.log("valvalvalvalvalvalvalvalvalvalvalval ", val_3)
    this.setState({
      p_gender: val_3
    })
    this.RBSheet2.close()
  }

  handleDelete = () => {
    this.setState({
      visible: false,
    });
    setTimeout(() => {
      Actions.Patient_Tab_Screen()
    }, 100);
  };




  opendialogue = () => {
    this.setState({
      visible: true,
    });
  };



  traetment = () => {
    if (this.state.p_name == '') {
      alert("Please enter patient name.")


    } else if (this.state.p_age == '') {
      alert("Please enter patient age.")

    }
    else if (this.state.p_gender == '') {
      alert("Please select patient gender.")

    }
    else if (this.state.problem == '') {
      alert("Please enter patient problem.")

    }
    else {
      this.setState({ spinner: true })

      setTimeout(() => {
        this.setState({ spinner: false })
        Actions.Payment({
          fcm_token: this.props.fcm_token, category: this.props.category, doctor_id: this.props.doctor_id, time: this.props.time, date: this.props.date, day: this.props.day, fee: this.props.fee, fcm_token: this.props.fcm_token, doctor_name: this.props.doctor_name, city: this.props.city,
          appointment_type: this.props.appointment_type,
          appointment_fee: this.props.appointment_fee,
          duration: this.props.duration,
          price_multiply: this.props.price_multiply,

          p_name: this.state.p_name,
          p_age: this.state.p_age,
          p_gender: this.state.p_gender,
          problem: this.state.problem,
          address: this.props.address,
          doctor_profile: this.props.doctor_profile

        })

      }, 100);




    }

  }







  Add_appointment = () => {
    if (this.state.reason == "Select Reason") {
      alert("Please select reason for appointment.")
    }
    else {


      let uploaddata = new FormData();
      this.setState({ spinner: true });
      uploaddata.append("user_id", this.state.id);
      uploaddata.append("time", this.props.time);
      uploaddata.append("category", this.props.category);
      uploaddata.append("doctor_id", this.props.doctor_id);
      uploaddata.append("date", this.props.date);
      uploaddata.append("day", this.props.day);
      uploaddata.append("problem", this.state.problem);
      uploaddata.append("reason", this.state.reason);


      let api = Connection + "rest_apis.php?action=Add_Appointment";
      console.log("pass => ", api);
      fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          otherHeader: "foo",
        },
        body: uploaddata,
      })
        .then((response) => response.json())
        .then((response) => {
          let record = response.response
          if (record == "fail") {
            this.setState({
              spinner: false,
            });
          } else {

            let app_id = record[0]
            this.notification()
            this.add_notification(app_id)
            this.setState({
              spinner: false,
              app_id: app_id
            });

            setTimeout(() => {


            }, 100);


            this.opendialogue()

          }
        })
        .catch((error) => {
          console.error(error);
        });

    };

  }



  add_notification = (val) => {

    let uploaddata = new FormData();
    uploaddata.append("user_id", this.state.id);
    uploaddata.append("time", this.state.time);
    uploaddata.append("type", "success");
    uploaddata.append("doctor_id", this.props.doctor_id);
    uploaddata.append("date", this.state.date);
    uploaddata.append("appointment_id", val);


    let api = Connection + "rest_apis.php?action=add_notification";
    console.log("pass => ", api);
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        otherHeader: "foo",
      },
      body: uploaddata,
    })
      .then((response) => response.json())
      .then((response) => {
        let record = response.response
        if (record == "fail") {
          this.setState({
            spinner: false,
          });

        } else {



          this.setState({
            spinner: false,

          });


        }
      })
      .catch((error) => {
        console.error(error);
      });

  };




  select_category = (val_3) => {
    this.setState({
      reason: val_3
    })
    this.RBSheet1.close()
  }

  notification = async () => {
    let to = this.props.fcm_token;
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'key= AAAAUd3TRyo:APA91bG5J5r0nYRLiBsOtaCGLLbdfIyQUhoDaV8OyN4NVyR3JB0o8kXDg2S8igwTXQHZxPonJgDYeBVO2Fuf3hvisKRg5c1RbSS40_KU6LuyKaxlIfKFMYQBBnhQ9nXnjIiMJLDqHz-U'//cloud server key
      },
      body: JSON.stringify({
        "to": to,
        "priority": "high",
        "notification": {
          "title": "Neurolife",
          "body": this.state.name + " has booked an appointment with you.",
          "sound": 'default',
          "icon": "myicon",

        }
      }
      )
    }).then(res => res.json())
      .then(resjson => console.log("test", resjson))
      .catch(err => console.log("error =>", err))
  }


  render() {


    return (
      <>
      <StatusBar backgroundColor="#781517" barStyle="light-content" />

      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, backgroundColor: '#781517', paddingHorizontal: 15, borderBottomColor: 'gray', borderBottomWidth: 0.5 }}>
          <Icon onPress={() => Actions.pop()} name="arrow-back" type="MaterialIcons" style={{ color: "white", fontSize: 24 }} />


          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', }}>Patient Detail</Text>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white', }}>    </Text>

        </View>
        <ScrollView>

          <Text style={{ color: '#781517', fontSize: 16, fontWeight: 'bold', marginTop: 20, marginHorizontal: 20 }}>Full Name</Text>

            <TextInput value={this.state.name} editable={false} style={{marginTop: 10,width: width / 1.1, height: 50, backgroundColor: '#d9d9d9', paddingLeft: 10, borderRadius: 28,  alignSelf:'center', color: '#781517', fontWeight: 'bold' }} placeholder="Patient Name" placeholderTextColor='gray' />
      

          <Text style={{ color: '#781517', fontSize: 16, fontWeight: 'bold', marginTop: 20, marginHorizontal: 20 }}>Gender</Text>
          <TextInput value={this.state.name} editable={false} style={{marginTop: 10,width: width / 1.1, height: 50, backgroundColor: '#d9d9d9', paddingLeft: 10, borderRadius: 28,  alignSelf:'center', color: '#781517', fontWeight: 'bold' }} placeholder="Patient gender" placeholderTextColor='gray' />
       

          <Text style={{ color: '#781517', fontSize: 16, fontWeight: 'bold', marginTop: 20, marginHorizontal: 20 }}>Age</Text>
          <TextInput value={this.state.name} editable={false} style={{marginTop: 10,width: width / 1.1, height: 50, backgroundColor: '#d9d9d9', paddingLeft: 10, borderRadius: 28,  alignSelf:'center', color: '#781517', fontWeight: 'bold' }} placeholder="Patient Age" placeholderTextColor='gray' />

          <Text style={{ color: '#781517', fontSize: 16, fontWeight: 'bold', marginTop: 20, marginHorizontal: 20 }}>Relation with Patient</Text>
          <TextInput value={this.state.name} editable={false} style={{marginTop: 10,width: width / 1.1, height: 50, backgroundColor: '#d9d9d9', paddingLeft: 10, borderRadius: 28,  alignSelf:'center', color: '#781517', fontWeight: 'bold' }} placeholder="Your Relation with patient" placeholderTextColor='gray' />



          <Text style={{ color: '#781517', fontSize: 16, fontWeight: 'bold', marginTop: 20, marginHorizontal: 20 }}>Write Additional note for Provider</Text>
          <TextInput value={this.state.name}  multiline={true}  style={{marginTop:10, textAlignVertical:'top', width: width / 1.1, height: 120, backgroundColor: '#d9d9d9', paddingLeft: 10, borderRadius: 12,  alignSelf:'center', color: '#781517', fontWeight: 'bold' }} placeholder="Write Something..." placeholderTextColor='gray' />

          <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.appointment_checkout() }}
            style={{ width: width / 1.1, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', paddingVertical: 13, borderRadius: 100, backgroundColor: '#781517', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3, marginTop: 50, marginBottom: 20 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Next</Text>
          </TouchableOpacity>
        </ScrollView>







        {this.state.spinner == true &&
          <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(2, 2, 2, 0.8)', position: 'absolute', justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3 }}>
            <View style={{
              width: width / 1.2, height: height / 9 - 20, backgroundColor: "white", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
              borderRadius: 6
            }}>
              <UIActivityIndicator color='#781517' />
              <Text style={{ fontSize: 16, color: '#781517', fontWeight: 'bold' }}>Progressing Your Request</Text>
            </View>
          </View>
        }




        <RBSheet
          ref={ref => {
            this.RBSheet2 = ref;
          }}
          height={120}
          openDuration={120}
          customStyles={{
            container: {
              paddingHorizontal: 20
            }
          }}
        >
          <View>
            <TouchableOpacity onPress={() => this.select_gender('Male')} activeOpacity={0.8}>
              <Text style={{ fontSize: 18, color: 'black', marginTop: 20, textAlign: 'center' }}>Male</Text>
            </TouchableOpacity>

            <View style={{ borderBottomWidth: 1, borderColor: 'lightgray', marginTop: 10 }}></View>

            <TouchableOpacity onPress={() => this.select_gender('Female')} activeOpacity={0.8}>
              <Text style={{ fontSize: 18, color: 'black', textAlign: 'center', marginTop: 10 }}>Female</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>









        <RBSheet
          ref={ref => {
            this.RBSheet1 = ref;
          }}
          closeOnDragDown={true}
          height={300}
          openDuration={120}
          customStyles={{
            container: {
              paddingHorizontal: 20
            },
            draggableIcon: {
              backgroundColor: "lightgray",
            },
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => { this.select_category('Comprehensive Assessment') }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>

              <Text style={{ color: 'black', fontSize: 14 }}>Father / Mother</Text>




              <Icon name="chevron-right" type="Entypo" style={{ color: "gray", fontSize: 20 }} />
            </TouchableOpacity>

            <View style={{ width: width / 1.1, alignSelf: 'flex-end', borderBottomWidth: 0.7, borderColor: 'lightgray', marginVertical: 10 }}></View>
            <TouchableOpacity activeOpacity={0.8} onPress={() => { this.select_category('Diagnostic Assessment') }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>

              <Text style={{ color: 'black', fontSize: 14 }}>Diagnostic Assessment</Text>




              <Icon name="chevron-right" type="Entypo" style={{ color: "gray", fontSize: 20 }} />
            </TouchableOpacity>
            <View style={{ width: width / 1.1, alignSelf: 'flex-end', borderBottomWidth: 0.7, borderColor: 'lightgray', marginVertical: 10 }}></View>


            <TouchableOpacity activeOpacity={0.8} onPress={() => { this.select_category('Group Therapy') }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>

              <Text style={{ color: 'black', fontSize: 14 }}>Group Therapy</Text>




              <Icon name="chevron-right" type="Entypo" style={{ color: "gray", fontSize: 20 }} />
            </TouchableOpacity>

            <View style={{ width: width / 1.1, alignSelf: 'flex-end', borderBottomWidth: 0.7, borderColor: 'lightgray', marginVertical: 10 }}></View>


            <TouchableOpacity activeOpacity={0.8} onPress={() => { this.select_category('1-on-1 Therapy') }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>

              <Text style={{ color: 'black', fontSize: 14 }}>1-on-1 Therapy</Text>




              <Icon name="chevron-right" type="Entypo" style={{ color: "gray", fontSize: 20 }} />
            </TouchableOpacity>

            <View style={{ width: width / 1.1, alignSelf: 'flex-end', borderBottomWidth: 0.7, borderColor: 'lightgray', marginVertical: 10 }}></View>

            <TouchableOpacity activeOpacity={0.8} onPress={() => { this.select_category('Other') }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>

              <Text style={{ color: 'black', fontSize: 14 }}>Other</Text>




              <Icon name="chevron-right" type="Entypo" style={{ color: "gray", fontSize: 20 }} />
            </TouchableOpacity>







            <View style={{ width: width / 1.1, alignSelf: 'flex-end', borderBottomWidth: 0.7, borderColor: 'lightgray', marginVertical: 10 }}></View>



          </ScrollView>
        </RBSheet>


        <Dialog
          style={{ backgroundColor: 'black', padding: 0 }}
          width={"90%"}
          visible={this.state.visible}
          dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}>

          <DialogContent style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
            <Image source={require("../assets/Neuro_Logo-removebg-preview.png")} style={{ width: 80, height: 80, alignSelf: 'center', marginTop: 20, }} />



            <Text style={{ fontSize: 20, textAlign: 'center', color: 'black', fontWeight: 'bold', marginTop: 10 }}>Congratulation!</Text>

            <Text style={{ fontSize: 13, textAlign: 'center', color: 'gray', fontWeight: 'bold', marginTop: 20 }}>Your appointment has been successfully booked.</Text>
            <Text style={{ fontSize: 13, textAlign: 'center', color: 'gray', fontWeight: 'bold', marginTop: 3 }}>Please available at the time of appointment.</Text>

            <TouchableOpacity onPress={() => { this.handleDelete() }}

              style={{ width: "85%", marginBottom: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: '#781517', paddingVertical: 15, alignSelf: 'center', marginTop: 20 }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Done</Text>

            </TouchableOpacity>
          </DialogContent>
        </Dialog>
      </View>
      </>
    )
  }
}




export default Patient_Detail_Screen;
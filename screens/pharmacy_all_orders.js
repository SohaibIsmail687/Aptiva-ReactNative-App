
import { Row } from 'native-base';
import React, { Component } from 'react';
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
    AsyncStorage
} from 'react-native';
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Connection from "../connection";
import { connect } from "react-redux";
import ImageLoad from 'react-native-image-placeholder';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import RBSheet from "react-native-raw-bottom-sheet";
import { NavigationEvents } from 'react-navigation';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

class Patient_All_Appointment extends React.Component {

    constructor(props) {

        super(props)

        this.state = {

            text1: 2,
            text2: 1,
            text3: 1,
            //   text4:1,
            check_design: 'pending',
            visible: false,
            data1: [],
            skalton: false,
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener(
            "hardwareBackPress",
            this.handleBackButtonClick
        );
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            "hardwareBackPress",
            this.handleBackButtonClick
        );
    }
    onButtonPress = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
        // then navigate
        navigate("NewScreen");
    };
    handleBackButtonClick() {
        if (this.props.user == true) {
            Actions.pop()

        }
        else {
            BackHandler.exitApp();

        }
        return true;
    }


    changebtn(value, val) {
        this.setState({
            check_design: val,

        })

        if (this.state[value] == 2) {



            this.setState({
                text1: 1,
                text2: 1,
                text3: 1,


                [value]: 2,


            })
        }
        else {
            this.setState({
                text1: 1,
                text2: 1,
                text3: 1,

                [value]: 2,


            })

        }
        setTimeout(() => {
            this.get_appointments_user()

        }, 100);
    }



    backAction = () => {
        // BackHandler.exitApp()
        Actions.Patient_Tab_Screen()
        return true;
    };


    // componentWillUnmount() {
    //     this.backHandler.remove();
    // }




    // componentDidMount = async () => {
    //     this.backHandler = BackHandler.addEventListener(
    //         "hardwareBackPress",
    //         this.backAction
    //     );

    //     let user = await AsyncStorage.getItem('customer');
    //     let parsed = JSON.parse(user);
    //     let id = parsed[0].id;
    //     this.setState({

    //         id: id,



    //     })
    //     console.log('kkkkkkkkkkkk', this.state.id)
    //     this.get_appointments_user()

    // }






    get_appointments_user = () => {

        let uploaddata = new FormData();

        // this.setState({
        //     skalton: true
        // })

        uploaddata.append("user_id", this.state.id);
        uploaddata.append("status", this.state.check_design);

        let api = Connection + "rest_apis.php?action=display_appointments_user";
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

                let record4 = response.response
                console.log('reeeeeeeee',record4)
                if (record4 != 'fail') {

                    this.setState({
                        data1: record4,
                        skalton: false
                    })


                } else {
                    this.setState({
                        data1: "",
                        skalton: false,
                    })

                }
            })
            .catch((error) => {
                console.error(error);
            });

    };






    createtable1 = () => {
        let table = []
        let record1 = this.state.data1
        let len = record1.length
        if (record1 != 'fail') {
            for (let i = 0; i < len; i++) {

                let date = record1[i].date
                let doctor_name = record1[i].doctor_name
                let user_name = record1[i].user_name
                let doctor_address = record1[i].doctor_address
                let doctor_experience = record1[i].doctor_experience
                let doctor_degree = record1[i].doctor_degree
                let doc_mobile = record1[i].doc_mobile
                let category = record1[i].category
                let appointment_id = record1[i].id
                let doctor_id = record1[i].doctor_id
                let day = record1[i].day
                let fcm_token = record1[i].doc_fcm_token
                let fee = record1[i].fee
                let type = record1[i].type
                let time = record1[i].time
                let status = record1[i].status
                let payment_method = record1[i].payment_method
                let insurance_number = record1[i].insurance_number
                let policy = record1[i].policy
                let insurance_name = record1[i].insurance_name
                let age = record1[i].age
                let perscription = record1[i].perscription
                let review = record1[i].review
                let perscription1 = Connection + 'perscription/' + perscription
                let profile1 = record1[i].doctor_profile
                let profile = Connection + 'images/' + profile1
                table.push(<View>
                    {
                        <View>
                            {this.state.check_design == status ?

                                <View>

                                    {status == 'pending' &&


                                        <View style={{
                                            width: width / 1.1,
                                            backgroundColor: 'white',
                                            borderRadius: 10,
                                            alignSelf: 'center',
                                            marginTop: 20,
                                            marginBottom: 10,
                                            shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                                            paddingVertical: 10
                                        }}>
                                            <View style={{ flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center', justifyContent: 'space-between' }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text numberOfLines={1} style={{ maxWidth: '50%', color: 'black', fontSize: 15 }}> {user_name} </Text>
                                                    <Text style={{ color: '#781517', marginLeft: 5, fontSize: 12 }}>{date}</Text>
                                                </View>

                                                <TouchableOpacity onPress={() => Actions.patient_site_appointment_detai({ doc_mobile: doc_mobile, payment_method: payment_method, date: date, status: status, day: day, time: time, doctor_name: doctor_name, category: category, doctor_address: doctor_address, doctor_profile: profile, fee: fee, patient_name: user_name, perscription1: perscription1, perscription: perscription, doctor_experience: doctor_experience, appointment_id: appointment_id, app_type: type, s_currency: this.state.s_currency, doctor_id: doctor_id, fcm_token: fcm_token })}>
                                                    <Text style={{ color: 'gray', }}>More Details</Text>
                                                </TouchableOpacity>

                                            </View>

                                            <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10 }}>



                                                <ImageLoad
                                                    style={{
                                                        width: 60,
                                                        height: 60,
                                                        borderRadius: 100,
                                                    }}
                                                    loadingStyle={{ size: 'large', color: 'blue' }}
                                                    source={{ uri: profile }}
                                                    borderRadius={12}
                                                    placeholderStyle={{
                                                        width: 60,
                                                        height: 60,
                                                        borderRadius: 100,
                                                    }}


                                                />

                                                <View style={{ width: '80%', paddingHorizontal: 10 }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                                        <Text numberOfLines={1} style={{ color: 'black', fontWeight: 'bold', fontSize: 15, maxWidth: '70%' }}>{doctor_name}</Text>

                                                        <View style={{ width: 70, height: 25, marginLeft: 10, borderRadius: 20, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                                            <Text style={{ color: 'white', }}>Active</Text>

                                                        </View>


                                                    </View>
                                                    <Text numberOfLines={1} style={{ color: 'gray', maxWidth: '90%', marginLeft: 5 }}>{doctor_address}</Text>
                                                    <Text numberOfLines={1} style={{ color: 'gray', maxWidth: '90%', marginLeft: 5 }}>{day}-{time}</Text>

                                                    {/* <Text numberOfLines={1} style={{color:'gray',maxWidth:'100%',marginLeft:5}}>{this.props.Apollo_Hospitals}</Text>
<Text style={{color:'#946CFB',fontSize:15,fontWeight:'bold'}}>$ 1000</Text> */}
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent: 'space-between', marginVertical: 5, width: '95%' }}>
                                                <TouchableOpacity onPress={() => this.open(appointment_id, doctor_id, fcm_token, date, time, fee)} activeOpacity={0.8}
                                                    style={{ justifyContent: 'center', alignItems: 'center', width: "49%", paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#781517', }}>
                                                    <Text style={{ color: '#781517', fontWeight: 'bold' }}>Cancel Appointment</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => Actions.rescedule_appointment({ fcm_token: fcm_token, payment_method: payment_method, date: date, status: status, day: day, time: time, doctor_name: doctor_name, category: category, doctor_address: doctor_address, doctor_profile: profile, fee: fee, patient_name: user_name, perscription1: perscription1, perscription: perscription, doctor_experience: doctor_experience, appointment_id: appointment_id, app_type: type, s_currency: this.state.s_currency, doctor_id: doctor_id })} activeOpacity={0.8}
                                                    // {fcm_token:fcm_token, payment_method:payment_method, date: date, status: status, day: day, time: time, doctor_name: doctor_name, category: category, doctor_address: doctor_address, doctor_profile: profile, fee: fee, patient_name: user_name, perscription1: perscription1, perscription: perscription, doctor_experience: doctor_experience, appointment_id: appointment_id, app_type: type, s_currency: this.state.s_currency,doctor_id:doctor_id}

                                                    style={{ justifyContent: 'center', alignItems: 'center', width: '49%', paddingVertical: 6, backgroundColor: '#781517', borderRadius: 20, borderWidth: 1, borderColor: '#781517' }}>
                                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Reschedule</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>


                                    }


                                    {status == 'complete' &&






                                        <View style={{
                                            width: width / 1.1,
                                            backgroundColor: 'white',
                                            borderRadius: 10,
                                            alignSelf: 'center',
                                            marginTop: 20,
                                            marginBottom: 10,
                                            shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                                            paddingVertical: 10
                                        }}>
                                            <View style={{ flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center', justifyContent: 'space-between' }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text numberOfLines={1} style={{ maxWidth: '50%', color: 'black', fontSize: 15 }}> Hamza </Text>
                                                    <Text style={{ color: '#781517', marginLeft: 5, fontSize: 12 }}>29-9-2022 (10:00 AM)</Text>
                                                </View>

                                                <TouchableOpacity onPress={() => Actions.patient_site_appointment_detai({ payment_method: payment_method, date: date, status: status, day: day, time: time, doctor_name: doctor_name, category: category, doctor_address: doctor_address, doctor_profile: profile, fee: fee, patient_name: user_name, perscription1: perscription1, perscription: perscription, doctor_experience: doctor_experience, appointment_id: appointment_id, app_type: type, s_currency: this.state.s_currency, doctor_id: doctor_id })}>

                                                    <Text style={{ color: 'gray', }}>More Details</Text>
                                                </TouchableOpacity>

                                            </View>



                                            <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10 }}>

                                                <ImageLoad
                                                    style={{
                                                        width: 60,
                                                        height: 60,
                                                        borderRadius: 100,
                                                    }}
                                                    loadingStyle={{ size: 'large', color: 'blue' }}
                                                    source={{ uri: profile }}
                                                    borderRadius={12}
                                                    placeholderStyle={{
                                                        width: 60,
                                                        height: 60,
                                                        borderRadius: 100,
                                                    }}


                                                />


                                                <View style={{ width: '80%', paddingHorizontal: 10 }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                                        <Text numberOfLines={1} style={{ color: 'black', fontWeight: 'bold', fontSize: 15, maxWidth: '70%' }}>{doctor_name}</Text>

                                                        <View style={{ width: 100, height: 25, marginLeft: 10, borderRadius: 20, backgroundColor: '#781517', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                                            <Text style={{ color: 'white', }}>{status}</Text>

                                                        </View>


                                                    </View>
                                                    <Text numberOfLines={1} style={{ color: 'gray', maxWidth: '90%', marginLeft: 5 }}>{doctor_address}</Text>

                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent: 'space-between', marginVertical: 5, width: '95%' }}>
                                                {review == appointment_id ?

                                                    <TouchableOpacity activeOpacity={1}
                                                        // {fcm_token:fcm_token, payment_method:payment_method, date: date, status: status, day: day, time: time, doctor_name: doctor_name, category: category, doctor_address: doctor_address, doctor_profile: profile, fee: fee, patient_name: user_name, perscription1: perscription1, perscription: perscription, doctor_experience: doctor_experience, appointment_id: appointment_id, app_type: type, s_currency: this.state.s_currency,doctor_id:doctor_id}

                                                        style={{ justifyContent: 'center', alignItems: 'center', width: '100%', paddingVertical: 6, backgroundColor: 'lightgray', borderRadius: 20, borderWidth: 1, borderColor: 'lightgray' }}>
                                                        <Text style={{ color: 'black', fontWeight: 'bold' }}>Submitted Review</Text>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity onPress={() => Actions.video_done_1({ doctor_id: doctor_id, appointment_id: appointment_id, doctor_address: doctor_address, doctor_profile: profile, doctor_name: doctor_name, category: category, fcm_token: fcm_token })} activeOpacity={0.8}
                                                        // {fcm_token:fcm_token, payment_method:payment_method, date: date, status: status, day: day, time: time, doctor_name: doctor_name, category: category, doctor_address: doctor_address, doctor_profile: profile, fee: fee, patient_name: user_name, perscription1: perscription1, perscription: perscription, doctor_experience: doctor_experience, appointment_id: appointment_id, app_type: type, s_currency: this.state.s_currency,doctor_id:doctor_id}

                                                        style={{ justifyContent: 'center', alignItems: 'center', width: '100%', paddingVertical: 6, backgroundColor: '#781517', borderRadius: 20, borderWidth: 1, borderColor: '#781517' }}>
                                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Leave Review</Text>
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                        </View>



                                    }


                                    {status == 'cancel' &&




                                        <View style={{
                                            width: width / 1.1,
                                            backgroundColor: 'white',
                                            borderRadius: 10,
                                            alignSelf: 'center',
                                            marginTop: 20,
                                            marginBottom: 10,
                                            shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                                            paddingVertical: 10
                                        }}>
                                            <View style={{ flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center', justifyContent: 'space-between' }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text numberOfLines={1} style={{ maxWidth: '50%', color: 'black', fontSize: 15 }}> {user_name} </Text>
                                                    <Text style={{ color: '#781517', marginLeft: 5, fontSize: 12 }}>{date} ({day}-{time})</Text>
                                                </View>

                                                <TouchableOpacity onPress={() => Actions.patient_site_appointment_detai()}>
                                                    <Text style={{ color: 'gray', }}>More Details</Text>
                                                </TouchableOpacity>

                                            </View>



                                            <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10 }}>
                                                <ImageLoad
                                                    style={{
                                                        width: 60,
                                                        height: 60,
                                                        borderRadius: 100,
                                                    }}
                                                    loadingStyle={{ size: 'large', color: 'blue' }}
                                                    source={{ uri: profile }}
                                                    borderRadius={12}
                                                    placeholderStyle={{
                                                        width: 60,
                                                        height: 60,
                                                        borderRadius: 100,
                                                    }}


                                                />



                                                <View style={{ width: '80%', paddingHorizontal: 10 }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                                        <Text numberOfLines={1} style={{ color: 'black', fontWeight: 'bold', fontSize: 15, maxWidth: '70%' }}>{doctor_name}</Text>

                                                        <View style={{ width: 70, height: 25, marginLeft: 10, borderRadius: 20, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                                            <Text style={{ color: 'white', }}>{status}</Text>

                                                        </View>


                                                    </View>
                                                    <Text numberOfLines={1} style={{ color: 'gray', maxWidth: '90%', marginLeft: 5 }}>{doctor_address}</Text>

                                                </View>
                                            </View>


                                        </View>


                                    }
                                </View>

                                :
                                <View>
                                </View>

                            }

                        </View>
                    }
                </View>
                )
            }
            return table
        }
        else {
            let img = []
            img.push(<View style={{ flex: 1, justifyContent: 'center' }} >
                {
                    <View>

                    </View>
                }</View>)
            return img
        }
    }


    open = (val, val1, va3, val4, val5, val6) => {

        this.setState({
            appointment_id_cancel: val,
            doc_id_cancel: val1,
            fcm_token: va3,
            date: val4,
            time: val5,
            fee: val6

        })
        setTimeout(() => {
            this.RBSheet1.open()

        }, 100);
    }


    next = () => {
        this.RBSheet1.close()
        Actions.cancel_appointment({ fee: this.state.fee, time: this.state.time, date: this.state.date, appointment_id: this.state.appointment_id_cancel, doctor_id: this.state.doc_id_cancel, fcm_token: this.state.fcm_token })
    }

    dd = () => {
        this.get_appointments_user()
    }

    render() {


        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <NavigationEvents onDidFocus={payload => this.dd()} />

                {this.props.user == true ?
                    <View style={{ paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 13, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, backgroundColor: 'white' }}>
                        <Icon
                            onPress={() => Actions.pop()}
                            name="arrowleft"
                            type="AntDesign"
                            style={{ color: "black", fontSize: 25 }}
                        />

                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Orders</Text>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: '700' }}>       </Text>

                        {/* <Icon onPress={() => Actions.Patient_Wallet()} name="wallet-outline" type="Ionicons" style={{ color: "black", fontSize: 19 }} /> */}
                    </View>
                    :
                    <View style={{ paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 13, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, backgroundColor: 'white' }}>
            <Image style={{width:45,height:45, }} resizeMode="contain" source={require('../assets/Speak2Med_logo.png')}/>
                        
                        <Text style={{ color: '#781517', fontSize: 20, fontWeight: 'bold' }}>Orders</Text>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: '700' }}>       </Text>

                    </View>
                }

                <View style={{ width: width, paddingHorizontal: 10, borderRadius: 10, alignSelf: 'center', height: 50, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
                    <TouchableOpacity style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.changebtn("text1", 'pending')}  >
                        <View style={(this.state.text1 == 1 ? styles.in_active_button : styles.active_button)}>
                            <Text style={(this.state.text1 == 1 ? styles.in_active_text : styles.active_text)}>Active</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.changebtn("text2", 'complete')}  >
                        <View style={(this.state.text2 == 1 ? styles.in_active_button : styles.active_button)}>
                            <Text style={(this.state.text2 == 1 ? styles.in_active_text : styles.active_text)}>Completed</Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.changebtn("text3", 'cancel')}  >
                        <View style={(this.state.text3 == 1 ? styles.in_active_button : styles.active_button)}>
                            <Text style={(this.state.text3 == 1 ? styles.in_active_text : styles.active_text)}>Cancelled</Text>
                        </View>
                    </TouchableOpacity>
                </View>





                {this.state.skalton == true ?


                    <SkeletonPlaceholder>
                        <View
                            style={{
                                width: "90%",
                                alignSelf: "center",
                                height: 160,
                                borderRadius: 5,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginTop: 5,
                                backgroundColor: 'white'
                            }}
                        ></View>

                        <View
                            style={{
                                width: "90%",
                                alignSelf: "center",
                                height: 160,
                                borderRadius: 5,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginTop: 15,
                                backgroundColor: "white",
                            }}
                        ></View>


                        <View
                            style={{
                                width: "90%",
                                alignSelf: "center",
                                height: 160,
                                borderRadius: 5,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginTop: 15,
                                backgroundColor: "white",
                            }}
                        ></View>



                        <View
                            style={{
                                width: "90%",
                                alignSelf: "center",
                                height: 160,
                                borderRadius: 5,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginTop: 15,
                                backgroundColor: "white",
                            }}
                        ></View>


                        <View
                            style={{
                                width: "90%",
                                alignSelf: "center",
                                height: 160,
                                borderRadius: 5,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginTop: 15,
                                backgroundColor: "white",
                                marginBottom: 15
                            }}
                        ></View>

                    </SkeletonPlaceholder>


                    :


                    <ScrollView >
                        {this.state.check_design=='pending'&&
<View>

 

<View style={{backgroundColor:'white',width:width/1.1,marginBottom:10, alignSelf:'center',borderRadius:8,paddingHorizontal:15,paddingVertical:10,shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,marginTop:15}}>
<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between' }}>
 
 
    
        <Text style={{color:'#781517',fontWeight:'bold',fontSize:16}}>Sheikar Dawan</Text>
        <View style={{flexDirection:'row',alignItems:'center',}}>
<Image style={{ width:25, height:25,  }} resizeMode="contain" source={require('../assets/master.png')} />

        <Text style={{color:'black',fontSize:16,fontWeight:'bold'}}>  $25</Text>
        </View>
 
</View>
<View style={{flexDirection:'row',alignItems:'center',marginTop:5}}>
             <Icon name="location-pin" type="Entypo" style={{ color: "gray", fontSize: 16}} />                                 


         <View style={{marginLeft:8}}>
             <Text style={{color:'gray', fontSize:12,fontWeight:'bold'}}>Taimoor Chok, Gujrat</Text>
          
         </View>
     </View>

     <View style={{flexDirection:'row',alignItems:'center',marginTop:5,justifyContent:'space-between'}}>
        <View style={{flexDirection:'row',alignItems:'center',}}>
             <Icon name="calendar" type="Entypo" style={{ color: "gray", fontSize: 16}} />                                 


         <View style={{marginLeft:8}}>
             <Text style={{color:'gray', fontSize:12,fontWeight:'bold'}}>Tuesday, July 22</Text>
          
         </View>
         </View>
         <Text style={{color:'#781517', fontSize:12,fontWeight:'bold'}}>View Details</Text>

     </View>
 
 
</View>

 


<View style={{backgroundColor:'white',width:width/1.1,marginBottom:10, alignSelf:'center',borderRadius:8,paddingHorizontal:15,paddingVertical:10,shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,marginTop:15}}>
<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between' }}>
 
 
    
        <Text style={{color:'#781517',fontWeight:'bold',fontSize:16}}>Sheikar Dawan</Text>
        <View style={{flexDirection:'row',alignItems:'center',}}>
<Image style={{ width:25, height:25,  }} resizeMode="contain" source={require('../assets/paypal.png')} />

        <Text style={{color:'black',fontSize:16,fontWeight:'bold'}}> $25</Text>
        </View>
 
</View>
<View style={{flexDirection:'row',alignItems:'center',marginTop:5}}>
             <Icon name="location-pin" type="Entypo" style={{ color: "gray", fontSize: 16}} />                                 


         <View style={{marginLeft:8}}>
             <Text style={{color:'gray', fontSize:12,fontWeight:'bold'}}>Taimoor Chok, Gujrat</Text>
          
         </View>
     </View>
     <View style={{flexDirection:'row',alignItems:'center',marginTop:5,justifyContent:'space-between'}}>
        <View style={{flexDirection:'row',alignItems:'center',}}>
             <Icon name="calendar" type="Entypo" style={{ color: "gray", fontSize: 16}} />                                 


         <View style={{marginLeft:8}}>
             <Text style={{color:'gray', fontSize:12,fontWeight:'bold'}}>Tuesday, July 22</Text>
          
         </View>
         </View>
         <Text style={{color:'#781517', fontSize:12,fontWeight:'bold'}}>View Details</Text>

     </View>
 
 
</View>
 
</View>
    }


    {this.state.check_design=='complete'&&
   <View style={{backgroundColor:'white',width:width/1.1,marginBottom:10, alignSelf:'center',borderRadius:8,paddingHorizontal:15,paddingVertical:10,shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,marginTop:15}}>
   <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between' }}>
    
    
       
           <Text style={{color:'#781517',fontWeight:'bold',fontSize:16}}>Sheikar Dawan</Text>
           <View style={{flexDirection:'row',alignItems:'center',}}>
   <Image style={{ width:25, height:25,  }} resizeMode="contain" source={require('../assets/paypal.png')} />
   
           <Text style={{color:'black',fontSize:16,fontWeight:'bold'}}> $25</Text>
           </View>
    
   </View>
   <View style={{flexDirection:'row',alignItems:'center',marginTop:5}}>
                <Icon name="location-pin" type="Entypo" style={{ color: "gray", fontSize: 16}} />                                 
   
   
            <View style={{marginLeft:8}}>
                <Text style={{color:'gray', fontSize:12,fontWeight:'bold'}}>Taimoor Chok, Gujrat</Text>
             
            </View>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',marginTop:5,justifyContent:'space-between'}}>
           <View style={{flexDirection:'row',alignItems:'center',}}>
                <Icon name="calendar" type="Entypo" style={{ color: "gray", fontSize: 16}} />                                 
   
   
            <View style={{marginLeft:8}}>
                <Text style={{color:'gray', fontSize:12,fontWeight:'bold'}}>Tuesday, July 22</Text>
             
            </View>
            </View>
            <Text style={{color:'#781517', fontSize:12,fontWeight:'bold'}}>   </Text>
   
        </View>
    
    
   </View>
    
                    }    



{this.state.check_design=='cancel'&&
    <View style={{backgroundColor:'white',width:width/1.1,marginBottom:10, alignSelf:'center',borderRadius:8,paddingHorizontal:15,paddingVertical:10,shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,marginTop:15}}>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between' }}>
     
     
        
            <Text style={{color:'#781517',fontWeight:'bold',fontSize:16}}>Sheikar Dawan</Text>
            <View style={{flexDirection:'row',alignItems:'center',}}>
    <Image style={{ width:25, height:25,  }} resizeMode="contain" source={require('../assets/paypal.png')} />
    
            <Text style={{color:'black',fontSize:16,fontWeight:'bold'}}> $25</Text>
            </View>
     
    </View>
    <View style={{flexDirection:'row',alignItems:'center',marginTop:5}}>
                 <Icon name="location-pin" type="Entypo" style={{ color: "gray", fontSize: 16}} />                                 
    
    
             <View style={{marginLeft:8}}>
                 <Text style={{color:'gray', fontSize:12,fontWeight:'bold'}}>Taimoor Chok, Gujrat</Text>
              
             </View>
         </View>
         <View style={{flexDirection:'row',alignItems:'center',marginTop:5,justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',alignItems:'center',}}>
                 <Icon name="calendar" type="Entypo" style={{ color: "gray", fontSize: 16}} />                                 
    
    
             <View style={{marginLeft:8}}>
                 <Text style={{color:'gray', fontSize:12,fontWeight:'bold'}}>Tuesday, July 22</Text>
              
             </View>
             </View>
             <Text style={{color:'#781517', fontSize:12,fontWeight:'bold'}}>   </Text>
    
         </View>
     
     
    </View>

                    }
                        {/* {this.state.data1 == "" ?
                            <View style={{ alignItems: 'center', justifyContent: 'center', height: height / 1.5 }}>
                                <Text style={{}}>
                                    You don't have any appointment.
                                </Text>
                            </View>
                            :
                            <View style={{ paddingBottom: 10 }}>
                                {this.createtable1()}


                            </View>
                        } */}
                    </ScrollView>
                }




                <RBSheet
                    ref={ref => {
                        this.RBSheet1 = ref;
                    }}
                    closeOnDragDown={true}
                    height={220}
                    openDuration={270}
                    customStyles={{
                        container: {
                            paddingHorizontal: 20,
                            borderTopLeftRadius: 40,
                            borderTopRightRadius: 40,
                        },
                        draggableIcon: {
                            backgroundColor: "lightgray",
                        },
                    }}

                >
                    <View>
                        <Text style={{ fontSize: 18, color: 'red', marginTop: 5, textAlign: 'center', fontWeight: 'bold' }}>Cancel Appointment!</Text>

                        <View style={{ width: '100%', backgroundColor: 'lightgray', height: 1, marginVertical: 15 }}></View>
                        <Text style={{ fontSize: 14, color: 'gray', textAlign: 'center', fontWeight: 'bold', paddingHorizontal: 30 }}>Are you sure you want to cancel your appointment?</Text>
                        {/* <Text style={{ fontSize: 14, color: 'gray', marginTop: 10, textAlign: 'center', fontWeight: 'bold', paddingHorizontal: 30 }}>{this.props.Only_funds_will_return_your_accouont}</Text> */}

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, marginBottom: 10 }}>
                            <TouchableOpacity onPress={() => this.RBSheet1.close()} activeOpacity={0.8}
                                style={{ width: width / 2.3, paddingVertical: 13, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: '#eef3ff', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3 }}>
                                <Text style={{ color: '#781517', fontWeight: 'bold' }}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.next()} activeOpacity={0.8}
                                style={{ width: width / 2.3, paddingVertical: 13, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: '#781517', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Yes Cancel</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </RBSheet>


            </View>

        )
    }
}

const styles = StyleSheet.create({

    active_button: {
        width: '98%',
        height: 45,
        borderBottomColor: '#781517',
        borderBottomWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',

    },

    in_active_button: {
        width: '98%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },

    active_text: {
        color: '#781517',
        fontSize: 14,
        fontWeight: 'bold'
    },

    in_active_text: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold'


    },

})




export default Patient_All_Appointment;
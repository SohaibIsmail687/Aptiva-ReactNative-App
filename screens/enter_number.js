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
    Dimensions,
    BackHandler,
    AsyncStorage,
    ToastAndroid,
    KeyboardAvoidingView
} from 'react-native';
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';
import CountryPicker from 'react-native-country-picker-modal'
import { Actions } from 'react-native-router-flux';
import Connection from "../connection";
import { connect } from "react-redux";
// import auth from '@react-native-firebase/auth';
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
import { Open,Email } from 'react-native-openanything';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height



// export default class Patient_Login_Screen extends Component {

class enter_number extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            placeholder: '+92',
            email: "",
            password: "",
            spinner: false,
            mobile_number: '',
            number: "",

            token: '',

        }
    }


    backAction = () => {
        // BackHandler.exitApp()
        Actions.pop();
        return true;
    };


    componentWillUnmount() {
        this.backHandler.remove();
    }


    componentDidMount = async () => {

        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }


    selectcountry(value) {
        let n = value["callingCode"]
        console.log("value => ", n[0])
        this.setState({
            placeholder: "+" + n[0]
        })

    }







    signInWithPhoneNumber = async () => {
        // this.setState({ spinner: true });
        var phoneno = /^\+?([0-9]{1})\)?[]?([0-9]{5})[]?([0-9]{5})$/;
        var number1 = this.state.number.replace(/\D/g, '').slice(-10);
        let number = this.state.placeholder + number1
        console.log("number is => ", number)
 
            // this.setState({ spinner: false });
            // ToastAndroid.show(`Please wait`, ToastAndroid.LONG);
            // setTimeout(() => {
            //   ToastAndroid.show(`Please wait`, ToastAndroid.LONG);
            // }, 5000)
            const confirmation = await auth().signInWithPhoneNumber(number)

            console.log("code -> ", confirmation)
            this.setState({ spinner: false });
            console.log("confirmation => ", confirmation)
            // this.add_User();

            Actions.Verification_Screen({ number: this.state.placeholder + this.state.number, confirm1: confirmation, role: this.props.role })



        // }
        // else {
        //     this.setState({ spinner: false });

        //     alert(this.props.Invalid_Number_Format);

        // }



    }











    login = () => {

        let uploaddata = new FormData();
        let mobile_number = this.state.placeholder + this.state.number
        let role = this.props.role

        if (this.state.number == "") {
            alert(this.props.Please_enter_mobile_number)
        }

        else {
            this.setState({ spinner: true });

            console.log("mobile_number =>", mobile_number)


            uploaddata.append('mobile_number', mobile_number);
            uploaddata.append('role', role);



            let api = Connection + 'rest_apis.php?action=login_user';

            console.log("pass => ", api)
            fetch(api, {
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data",
                    "otherHeader": "foo",
                },
                body: uploaddata,
            })
                .then((response) => response.json())
                .then((response) => {
                    console.log("responseaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", response)





                    if (response.response == "fail") {




                        // alert('gooooooooooooo')

                        this.setState({ spinner: true });
                        this.signInWithPhoneNumber()




                    }


                    else {
                        this.setState({ spinner: false });

                        alert(this.props.This_mumber_is_already_registered)

                    }


                })
                .catch((error) => {
                    console.error(error);

                });
        }

    }




    open_web = () => {
        Open("https://www.hhs.gov/hipaa/filing-a-complaint/what-to-expect/index.html")
      }




    render() {


        return (
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
            style={{flex:1}}>

            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <Icon onPress={() => Actions.pop()} name="chevron-left" type="Entypo" style={{ color: "#27aae0", fontSize: 20, paddingLeft: 15, marginTop: 20 }} />

                <ScrollView>


                {/* <View style={{ width: width, height: height / 10 }}></View> */}

<View style={{width:150,height:150,borderRadius:100,backgroundColor:'#c6c6ef', alignSelf:'center', marginTop:50,alignItems:'center',justifyContent:'center'}}>
<Icon onPress={() => Actions.pop()} name="phone" type="FontAwesome" style={{ color: "#27aae0", fontSize: 100,  }} />

</View>

{/* <Image source={require("../assets/autism.png")} style={{width:200,height:140, alignSelf:'center'}} resizeMode='contain' /> */}

<Text style={{ color: '#27aae0', fontSize: 20, fontWeight: 'bold',textAlign:'center' , marginTop:20}}>Registration</Text>
<Text style={{ color: 'gray', fontSize: 13, textAlign:'center', paddingHorizontal:15 }}>Add your phone number we'll send you a verification code so we now you are real </Text>


<View style={{width: width / 1.1, alignSelf: 'center',borderColor:'#27aae0',borderWidth:1, backgroundColor: 'white', paddingVertical:20, borderRadius: 8,  color: 'black', paddingHorizontal:10, marginTop: 30,shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3 }}>
 
<View style={{width:'100%',flexDirection:'row', alignItems:'center', backgroundColor: '#e6e6e6', borderRadius:24,paddingHorizontal:15}}>
 
    <CountryPicker
                        withFlagButton={true}
                        withFlag
                        onSelect={value => this.selectcountry(value)}
                        translation="eng"
                        placeholder={this.state.placeholder}
                    />

<TextInput value={this.state.number} onChangeText={number => this.setState({ number })} style={{height:48, paddingLeft: 10,borderRadius: 8,width:'84%',color:'black',fontWeight:'bold',  }} placeholder= 'Phone Number' placeholderTextColor='gray' />
 
 
<Icon   name="phone" type="Entypo" style={{ color: "#27aae0", fontSize: 24 }} />
 </View>
 
<TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Verification_Screen({role:this.props.role}) }}
                    style={{ width: width / 1.2, alignSelf: 'center', height: 48, backgroundColor: '#27aae0', borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Continue</Text>
                </TouchableOpacity>
</View>

                


                 

                {/* <TouchableOpacity activeOpacity={0.8} onPress={() => this.login()}
                    style={{ width: width / 1.1, alignSelf: 'center', paddingVertical: 10, borderRadius: 30, backgroundColor: '#27aae0', justifyContent: 'center', alignItems: 'center',marginTop:30,marginBottom:20 }}>
                    <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>{this.props.Continue}</Text>
                </TouchableOpacity> */}


<View style={{ width: width, height: height / 10 }}></View>

            


             </ScrollView>

 


                {this.state.spinner == true &&
                    <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(2, 2, 2, 0.8)', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{
                            width: width / 1.2, height: height / 9 - 20, backgroundColor: "white", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5,
                            borderRadius: 6
                        }}>
                            <UIActivityIndicator color='#27aae0' />
                            <Text style={{ fontSize: 16, color: '#27aae0', fontWeight: 'bold' }}>{this.props.Progressing_your_request}</Text>
                        </View>
                    </View>
                }


            </View>
            </KeyboardAvoidingView>

        )
    }
}


const styles = StyleSheet.create({
    phoneinput2: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: width / 1.1,
        alignSelf: 'center',
        marginTop: 30,
        backgroundColor: '#e6e6ed',
        height: 40,
        borderRadius: 8,
    },

    phoneinput: {
        fontSize: 15,
        paddingHorizontal: 10,
        fontWeight: '500',
        width: '100%',
        color: 'black'
    },
})


const mapStateToProps = (state) => {
    return {
        Let_Get_Started: state.Let_Get_Started,
        We_need_your_Phone_number_to_identify_you: state.We_need_your_Phone_number_to_identify_you,
        Phone_Number: state.Phone_Number,
        By_continue_you_agree_to_our: state.By_continue_you_agree_to_our,
        Terms_ofservice: state.Terms_ofservice,
        and: state.and,
        Privacy_Policy: state.Privacy_Policy,
        Login: state.Login,
        Invalid_Number_Format: state.Invalid_Number_Format,
        Please_enter_mobile_number: state.Please_enter_mobile_number,
        This_mumber_is_already_registered: state.This_mumber_is_already_registered,
        Continue:state.Continue,
        Progressing_your_request:state.Progressing_your_request
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        add_Vehicle: (vehicle) => { dispatch({ type: "add_Vehicle", payload: vehicle }) },
        spanish_lang: (Progressing_your_request,Continue,Let_Get_Started, We_need_your_Phone_number_to_identify_you, Phone_Number, By_continue_you_agree_to_our, Terms_ofservice, and, Privacy_Policy, Login, Invalid_Number_Format, Please_enter_mobile_number, This_mumber_is_already_registered,) => { dispatch({ type: "spanish_lang", payload: Progressing_your_request,Continue,Let_Get_Started, We_need_your_Phone_number_to_identify_you, Phone_Number, By_continue_you_agree_to_our, Terms_ofservice, and, Privacy_Policy, Login, Invalid_Number_Format, Please_enter_mobile_number, This_mumber_is_already_registered, }) },
        english_lang: (Progressing_your_request,Continue,Let_Get_Started, We_need_your_Phone_number_to_identify_you, Phone_Number, By_continue_you_agree_to_our, Terms_ofservice, and, Privacy_Policy, Login, Invalid_Number_Format, Please_enter_mobile_number, This_mumber_is_already_registered,) => { dispatch({ type: "english_lang", payload: Progressing_your_request,Continue,Let_Get_Started, We_need_your_Phone_number_to_identify_you, Phone_Number, By_continue_you_agree_to_our, Terms_ofservice, and, Privacy_Policy, Login, Invalid_Number_Format, Please_enter_mobile_number, This_mumber_is_already_registered, }) },
        add_Social_User: (social_user) => { dispatch({ type: "add_Social_User", payload: social_user }) },
        // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
        // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
        // addservice:(service)=>{dispatch({type:"addservice",payload:service})},






    }
}



export default connect(mapStateToProps, mapDispatchToProps)(enter_number);
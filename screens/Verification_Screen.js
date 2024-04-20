
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
    KeyboardAvoidingView
} from 'react-native';
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from "react-native-confirmation-code-field";
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

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

class Verification_Screen extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            code: '',
            icon: 'eye-with-line',
        }
    }

    backAction = () => {
        // BackHandler.exitApp()
        // Actions.Roll_Screen()
        return true;
    };


    componentWillUnmount() {
        this.backHandler.remove();
    }

    componentDidMount = async () => {
console.log('roleeeeeeeeeeeeeee',this.props.role)
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }




confirmmmmm=()=>{
    if (this.props.role == 'user') {
      
            this.setState({ spinner: false });
            Actions.Patient_SignUp_Screen({ mobile_number: this.props.number, role: this.props.role })
    
    } else if  (this.props.role == 'doctor') {
      
            this.setState({ spinner: false });
            Actions.doctor_signup({ mobile_number: this.props.number, role: this.props.role })
   
    }
    else {
        this.setState({ spinner: false });
        Actions.pharmacy_signup({ mobile_number: this.props.number, role: this.props.role })

    }
}





    confirmCode = async () => {
        this.setState({ spinner: true });

        //   console.log("spinnner ->",this.state.spinner)


        console.log("code is ->", this.state.code)
        console.log("phone ->", this.props.confirm1)




        this.props.confirm1.confirm(this.state.code).then((result) => {

            // User signed in successfully.
            const user = result.user;
            console.log("user", user);
            //   Actions.Home();

            if (this.props.role == 'user') {
                setTimeout(() => {
                    this.setState({ spinner: false });
                    Actions.Patient_SignUp_Screen({ mobile_number: this.props.number, role: this.props.role })
                }, 500)
            } else {
                setTimeout(() => {
                    this.setState({ spinner: false });
                    Actions.doctor_signup({ mobile_number: this.props.number, role: this.props.role })
                }, 500)
            }



        })


            .catch((error) => {

                this.setState({ spinner: false });
                console.log(error)
                alert(this.props.Verification_code_is_invalid)

            });
    }






    signInWithPhoneNumber = async () => {
        ToastAndroid.show(`Please wait we are seding you otp again.`, ToastAndroid.LONG);

        var phoneno = /^\+?([0-9]{2})\)?[]?([0-9]{5})[]?([0-9]{5})$/;
        var number1 = this.props.number.replace(/\D/g, '').slice(-10);
        let number = this.props.number
        console.log("number is => ", number)
        if (number.match(phoneno)) {
            this.setState({ spinner: false });
            // ToastAndroid.show(`Please wait`, ToastAndroid.LONG);
            setTimeout(() => {
                ToastAndroid.show(`Please wait we are verifying you.`, ToastAndroid.LONG);
            }, 5000)
            const confirmation = await auth().signInWithPhoneNumber(number)

            console.log("code -> ", confirmation)
            this.setState({ spinner: false });
            console.log("confirmation => ", confirmation)
            // this.add_User();

            //  Actions.Verification({ number: this.state.placeholder + this.state.number, confirm1: confirmation, role: this.props.role })



        }
        else {
            this.setState({ spinner: false });

            alert(this.props.Invalid_Number_Format);

        }



    }

    render() {
 
        const CELL_COUNT = 6;

        return (
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
            style={{flex:1}}>

            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <ScrollView>


{/* 
                <View style={{width:width,backgroundColor:'#0000FE',height:height/3,alignItems:'center',borderBottomLeftRadius:15,borderBottomRightRadius:15}}>
                   <View style={{width:width,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:13,marginTop:10}}>
                      <Icon onPress={() => { Actions.pop() }} name="keyboard-arrow-left" type="MaterialIcons" style={{ color: "white", fontSize: 33 }} />
                   </View>
                 
                   <Text style={{color:'white',fontSize:20,paddingHorizontal:15,marginTop:10,fontWeight:'bold'}}>Enter OTP</Text>
                   <Text style={{color:'white',fontSize:15,paddingHorizontal:15,marginTop:10,maxWidth:'90%',textAlign:'center'}}>Please enter 6 digit Code sent to your registered mobile number {this.props.mobile_number}</Text> 
                </View> */}

<View style={{width:150,height:150,borderRadius:100,backgroundColor:'#c6c6ef', alignSelf:'center', marginTop:50,alignItems:'center',justifyContent:'center'}}>
         <Image source={require("../assets/otp.png")} style={{tintColor:'#0000FE', height:100,width:100,alignSelf:'center', }} resizeMode='contain' />


</View>
{/* <Image source={require("../assets/otp.png")} style={{width:200,height:200, alignSelf:'center',marginTop:50}} resizeMode='contain' /> */}

<Text style={{ color: '#0000FE', fontSize: 20, fontWeight: 'bold',textAlign:'center' , marginTop:20}}>Verification Code</Text>
<Text style={{ color: 'gray', fontSize: 13, textAlign:'center', paddingHorizontal:60 }}>We have sent the verification code to your Mobile Number</Text>
<Text style={{ color: 'gray', fontSize: 18, fontWeight: 'bold',textAlign:'center' , marginTop:20}}>+923486694823</Text>


          <View style={{width:width/1.1,   alignSelf:'center',borderRadius:15,backgroundColor:'white',alignItems:'center',paddingVertical:13,paddingHorizontal:13, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3,marginTop:20 }}>
             <View style={{width:'100%', height: 45, marginTop: 10}}>
                 {/* <TextInput onChangeText={email => this.setState({ email })} style={{ width:'95%', alignSelf: 'center', backgroundColor: '#f1f1f1', height: 45, borderRadius: 6, paddingLeft: 35, color: 'black'  }} placeholder={this.props.Phone_Number} placeholderTextColor='gray' /> */}
                 <View style={styles.root}>
                    <CodeField
                        // ref={ref}
                        // {...props}
                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                        value={this.state.code}
                        onChangeText={(text) => {
                            this.setState({ code: text });
                        }}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                            >
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />
                </View>
             </View>

             <TouchableOpacity activeOpacity={0.8}  onPress={() => { this.confirmmmmm() }}
                 style={{width:'95%',justifyContent:'center',alignItems:'center',borderRadius:24,backgroundColor:'#0000FE',height:45,alignSelf:'center',marginTop:15}}>
                 <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Verify</Text>
             </TouchableOpacity>
         </View>
         {/* <Image source={require("../assets/Speak2Med_logo.png")} style={{height:100,width:100,alignSelf:'center', }} resizeMode='contain' /> */}

         <Image source={require("../assets/Vertical.png")} style={{height:height/6,width:width/1.5,alignSelf:'center',marginVertical:30}} resizeMode='contain' />

 
         
         </ScrollView>

         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center', paddingHorizontal: 18,position:'absolute',bottom:15,width:width }}>
                    <Text style={{ color: 'gray', fontSize: 13 }}>Not received?</Text>
                    <Text style={{ color: '#0000FE', fontSize: 13, fontWeight: 'bold' }}> Resend Code</Text>
         </View>

                {/* <View style={{ width: width, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: 'lightgray', paddingVertical: 13 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>{this.props.Verification_Number}</Text>
                </View>

                <Text style={{ color: 'black', fontWeight: '500', textAlign: 'center', marginTop: 40 }}>{this.props.We_ve_sent_your_verification_code_to}</Text>
                <Text style={{ color: 'black', fontWeight: '500', textAlign: 'center' }}>{this.props.number}</Text>

                <View style={styles.root}>
                    <CodeField
                        // ref={ref}
                        // {...props}
                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                        value={this.state.code}
                        onChangeText={(text) => {
                            this.setState({ code: text });
                        }}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                            >
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />
                </View>

                <TouchableOpacity activeOpacity={0.8} onPress={() => { this.confirmCode() }}
                    style={{ width: width / 1.1, alignSelf: 'center', height: 48, backgroundColor: '#0000FE', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{this.props.Verify}</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, marginVertical: 20 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 13 }}>{this.props.Resend_code}</Text>
                    <Text style={{ color: 'gray', fontSize: 13 }}>{this.props.one_min_left}</Text>
                </View> */}



                {this.state.spinner == true &&
                    <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(2, 2, 2, 0.8)', position: 'absolute', justifyContent: 'center', alignItems: 'center' , shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3}}>
                        <View style={{
                            width: width / 1.2, height: height / 9 - 20, backgroundColor: "white", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5,
                            borderRadius: 6
                        }}>
                            <UIActivityIndicator color='#0000FE' />
                            <Text style={{ fontSize: 16, color: '#0000FE', fontWeight: 'bold' }}>{this.props.Progressing_your_request}</Text>
                        </View>
                    </View>
                }
            </View>
      </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({

    root: { paddingHorizontal: 30, alignSelf: 'center' },

    // codeFieldRoot: { marginTop: 30 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 20,
        // borderWidth: 1,
        // borderColor: "gray",
        textAlign: "center",
        marginHorizontal: 5,
        borderRadius: 4,
        color: 'black',
        backgroundColor:'#e6e6e6',
        // borderColor:'#0000FE',
        // borderWidth:1
    },
})



const mapStateToProps = (state) => {
    return {
        Invalid_Number_Format: state.Invalid_Number_Format,
        Progressing_your_request: state.Progressing_your_request,
        Verification_code_is_invalid: state.Verification_code_is_invalid,
        Verification_Number: state.Verification_Number,
        We_ve_sent_your_verification_code_to: state.We_ve_sent_your_verification_code_to,
        Verify: state.Verify,
        Resend_code: state.Resend_code,
        one_min_left: state.one_min_left,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        add_Vehicle: (vehicle) => { dispatch({ type: "add_Vehicle", payload: vehicle }) },
        spanish_lang: (Invalid_Number_Format, Progressing_your_request, Verification_code_is_invalid, Verification_Number, We_ve_sent_your_verification_code_to, Verify, Resend_code, one_min_left) => { dispatch({ type: "spanish_lang", payload: Invalid_Number_Format, Progressing_your_request, Verification_code_is_invalid, Verification_Number, We_ve_sent_your_verification_code_to, Verify, Resend_code, one_min_left }) },
        english_lang: (Invalid_Number_Format, Progressing_your_request, Verification_code_is_invalid, Verification_Number, We_ve_sent_your_verification_code_to, Verify, Resend_code, one_min_left) => { dispatch({ type: "english_lang", payload: Invalid_Number_Format, Progressing_your_request, Verification_code_is_invalid, Verification_Number, We_ve_sent_your_verification_code_to, Verify, Resend_code, one_min_left }) },
        add_Social_User: (social_user) => { dispatch({ type: "add_Social_User", payload: social_user }) },
        // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
        // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
        // addservice:(service)=>{dispatch({type:"addservice",payload:service})},






    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Verification_Screen);
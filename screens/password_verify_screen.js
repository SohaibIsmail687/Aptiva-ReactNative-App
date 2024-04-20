
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
    BackHandler
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

class password_verify_screen extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            code: '',
            icon: 'eye-with-line',
        }
    }

    backAction = () => {
       
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



    confirmCode = async () => {
        this.setState({ spinner: true });


        if (this.props.otp == this.state.code) {
            setTimeout(() => {
                this.setState({
                    spinner: false
                })
                Actions.Patient_ChangePassword_Screen({ Email: this.props.Email, id: this.props.id })


            }, 100);


        } else {
            this.setState({
                spinner: false
            })
            alert("Invalid code")
        }




    }
 
    render() {

        const CELL_COUNT = 6;

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <Icon onPress={() => Actions.pop()} name="chevron-left" type="Entypo" style={{ color: "#1B2E59", fontSize: 20, paddingLeft: 15, marginTop: 20 }} />



                <ScrollView>


                    <View style={{ width: width, height: height / 10 }}></View>


                    <Image source={require("../assets/Neuro_Logo-removebg-preview.png")} style={{ width: 200, height: 140, alignSelf: 'center' }} resizeMode='contain' />

                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Verification</Text>
                    <Text style={{ color: 'gray', fontSize: 13, textAlign: 'center', paddingHorizontal: 15 }}>Enter your OTP code that we sent you on your email</Text>


                    <View style={{ marginBottom: 10, width: width / 1.1, alignSelf: 'center', backgroundColor: 'white', paddingBottom: 15, borderRadius: 8, color: 'black', paddingHorizontal: 10, marginTop: 30, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3 }}>





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
                            style={{ width: width / 1.2, alignSelf: 'center', height: 48, backgroundColor: '#5fa746', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Verify</Text>
                        </TouchableOpacity>
                    </View>






                    {/* 
<Text style={{ color: 'gray', fontSize: 14, fontWeight: 'bold',textAlign:'center' , marginTop:20}}>Didn't you receive any code?</Text>
<Text style={{ color: '#5fa746', fontSize: 16, textAlign:'center', paddingHorizontal:15, fontWeight:'bold' }}>Resend Code</Text> */}

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
                            <UIActivityIndicator color='#5fa746' />
                            <Text style={{ fontSize: 16, color: '#5fa746', fontWeight: 'bold' }}>Progressing your request</Text>
                        </View>
                    </View>
                }
            </View>

        )
    }
}

const styles = StyleSheet.create({

    root: { paddingHorizontal: 30, alignSelf: 'center', marginTop: 10 },

    codeFieldRoot: { marginTop: 30 },
    cell: {
        width: 45,
        height: 45,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 1,
        borderColor: "gray",
        textAlign: "center",
        marginHorizontal: 5,
        borderRadius: 4,
        color: 'black'
    },
})




export default password_verify_screen;
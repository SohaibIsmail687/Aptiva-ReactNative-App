
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
    Modal,
    AsyncStorage,
    ImageBackground,
    Dimensions,
    BackHandler
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

class Roll_Screen extends React.Component {




    constructor(props) {

        super(props)

        this.state = {

            text1: 2,
            text2: 1,
            text3: 1,
            check_design: 'user',
            lang: 0
        }
    }

    backAction = () => {
        BackHandler.exitApp()
        return true;
    };


    componentWillUnmount() {
        this.backHandler.remove();
    }



    componentDidMount = async () => {
        let lang = await AsyncStorage.getItem('lang');
        let parsed1 = JSON.parse(lang);
        console.log('llllllllllllll', lang)
        if (parsed1 != null) {
            let lang1 = parsed1[0].default
            if (lang1 == 'English') {
                this.setState({
                    lang: 0
                })
            } else {
                this.setState({
                    lang: 1
                })
            }
        } else {
            this.setState({
                lang: 0
            })
        }
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );

    }



    changebtn(value, val) {


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
        this.setState({
            check_design: val
        })
    }




    render() {


        return (

            <View style={{ flex: 1,backgroundColor:'white' }}>

                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 22, marginTop: 40, marginLeft: 20 }}>Select Role</Text>


                <Text style={{ color: 'black', fontSize: 15, paddingHorizontal: 20, marginTop: 5 }}>Who are You?</Text>


                <View style={{ width: width, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 35, marginTop: 50,flexWrap:'wrap' }}>
                    <TouchableOpacity style={(this.state.text1 == 1 ? styles.in_active_button : styles.active_button)} onPress={() => this.changebtn("text1", 'user')}>
                        <Image  resizeMode='contain' style={(this.state.text1 == 1 ? styles.in_active_image : styles.active_image)} source={require('../assets/patient.png')} />
                        <Text style={(this.state.text1 == 1 ? styles.in_active_text : styles.active_text)}>Patient</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={(this.state.text2 == 1 ? styles.in_active_button : styles.active_button)} onPress={() => this.changebtn("text2", 'doctor')}>
                        <Image resizeMode='contain' style={(this.state.text2 == 1 ? styles.in_active_image : styles.active_image)} source={require('../assets/doctor.png')} />
                        <Text style={(this.state.text2 == 1 ? styles.in_active_text : styles.active_text)}>Doctor</Text>
                    </TouchableOpacity>


                    {/* <TouchableOpacity style={(this.state.text3 == 1 ? styles.in_active_button : styles.active_button)} onPress={() => this.changebtn("text3", 'pharmacy')}>
                        <Image resizeMode='contain' style={(this.state.text3 == 1 ? styles.in_active_image : styles.active_image)} source={require('../assets/pharma.png')} />
                        <Text style={(this.state.text3 == 1 ? styles.in_active_text : styles.active_text)}>Pharmacist</Text>
                    </TouchableOpacity> */}
                </View>


{/* 
                <TouchableOpacity activeOpacity={0.8} onPress={() => Actions.Patient_Login_Screen({ role: 'user' })} style={{ width: width / 1.1, alignSelf: 'center', borderWidth: 1, borderColor: 'black', borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 7, marginTop: 50 }} >
                    <View style={{ width: 50, height: 50, borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0000FE' }}>
                        <Icon name="user-alt" type="FontAwesome5" style={{ color: "white", fontSize: 24 }} />

                    </View>


                    <Text style={{ fontSize: 16, fontWeight: 'bold', width: '65%' }}>Login as a Patient</Text>


                    <View style={{ width: 50, height: 50, borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0000FE' }}>
                        <Icon name="chevron-circle-right" type="FontAwesome5" style={{ color: "white", fontSize: 24 }} />

                    </View>

                </TouchableOpacity> */}


<TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Patient_Login_Screen({ role: this.state.check_design }) }}>
                        <View style={{ width: width / 1.5,marginTop:150, borderRadius: 15, justifyContent: 'center', alignItems: 'center', paddingVertical: 17,   backgroundColor: '#0000FE', alignSelf: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Continue</Text>
                        </View>
                    </TouchableOpacity>

 



 
            </View>

        )
    }
}

const styles = StyleSheet.create({

    active_button: {
        justifyContent: 'center', marginTop:10, alignItems: 'center', borderRadius: 20, backgroundColor: '#0000FE', width: '47%', height: height / 4, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3
    },
    in_active_button: {
        justifyContent: 'center',marginTop:10, alignItems: 'center', borderRadius: 20, backgroundColor: '#e6e6e6', width: '47%', height: height / 4
    },


    active_text: {
        color: 'white', fontWeight: 'bold', marginTop: 10, fontSize: 16
    },
    in_active_text: {
        color: 'black', fontWeight: 'bold', marginTop: 10, fontSize: 16
    },
    in_active_image:{
    borderRadius: 10, width: 100, height: 100  ,tintColor:'black'
    },
   active_image:{
        borderRadius: 10, width: 100, height: 100  ,tintColor:'white'
        }
    


})



export default Roll_Screen;
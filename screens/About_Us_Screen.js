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
    AsyncStorage,
    highlightText,
    Linking,
} from 'react-native';
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
import * as OpenAnything from 'react-native-openanything';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height


    
class About_Us_Screen extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            link:"info@masclinicas.com"
        }
    }

    backAction = () => {
        Actions.pop()
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


    render() {
        const text ='info@masclinicas.com';

        const brokenText = text.split('').map(word => (
            <TouchableOpacity onPress={() => OpenAnything.Email('info@masclinicas.com')}> 
          <Text style={{ color: '#5fa746', fontSize: 15,marginBottom:-5}}>{word}</Text>
          </TouchableOpacity>
        ));
  
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <View style={{ flex: 1 }}>
                    <View style={{ width: width / 1, flexDirection: 'row', alignItems: 'center', elevation: 3, backgroundColor: "#5fa746", paddingVertical: 18, paddingHorizontal: 15 }}>
                        <Icon onPress={() => Actions.pop()} name="arrowleft" type="AntDesign" style={{color:'white',fontSize:25}}/>
                        <Text style={{ color: 'white', fontSize: 20, marginLeft: 15, fontWeight: 'bold' }}>{this.props.About_Us}</Text>
                    </View>
                    <ScrollView>

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 20 }}>{this.props.About_Us}:</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18, paddingTop: 15 }}>Twin Cities Health Services is an independent clinic that specializes in providing
services for mental health and substance use disorders. We have been catering to the
needs of our community for several years by providing them with the treatment services that
they need to become the best version of themselves.</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18, paddingTop: 15 }}>Our mission at Twin Cities Health Services is to enhance the quality of life of clients
and their families by providing them with modern evidence-based therapies. We blend
traditional services [modern vs traditional in previous sentence] with culturally appropriate
practices to address the needs of our clients effectively. Twin Cities Health Services offers
intensive outpatient programming (IOP) alongside sober living environments to provide
comprehensive and compassionate care. Our home and community-based mental health
services offer individualized care and attention that clients need to make progress in their
healing.</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18, paddingTop: 15 }}>Twin Cities Health Services provides comprehensive care through screening, assessment,
referral, and recommendation. We work in collaboration with the client to develop a
personalized treatment plan geared to address client-centered goals. Our interprofessional
team of Licensed Alcohol and Drug Counselors, Mental Health Practitioners, and support
staff work alongside the client in their path to recovery.</Text>
                        {/* <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18, paddingTop: 15 }}>{this.props.For_any_questions_or} </Text> */}
                     
                                  {/* <Text style={{ color: '#5fa746', fontSize: 15, textAlign: 'justify' }}>info@masclinicas.com </Text>
                             </TouchableOpacity>     
                             <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify' }}>{this.props.and_review_Terms}</Text>
                        </View>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>{this.props.Conditions_before}</Text> */}

                    </ScrollView>


                </View>


            </View>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        About_Us: state.About_Us,
        Schedule_medical_appointment_online: state.Schedule_medical_appointment_online,
        No_more_ong_waits: state.No_more_ong_waits,
        MASCLINICAS_is_a_portal: state.MASCLINICAS_is_a_portal,
        For_any_questions_or: state.For_any_questions_or,
        and_review_Terms: state.and_review_Terms,
        Conditions_before: state.Conditions_before,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        add_Vehicle: (vehicle) => { dispatch({ type: "add_Vehicle", payload: vehicle }) },
        spanish_lang: (About_Us,Schedule_medical_appointment_online,No_more_ong_waits,MASCLINICAS_is_a_portal,For_any_questions_or,and_review_Terms,Conditions_before) => { dispatch({ type: "spanish_lang", payload: About_Us,Schedule_medical_appointment_online,No_more_ong_waits,MASCLINICAS_is_a_portal,For_any_questions_or,and_review_Terms,Conditions_before }) },
        english_lang: (About_Us,Schedule_medical_appointment_online,No_more_ong_waits,MASCLINICAS_is_a_portal,For_any_questions_or,and_review_Terms,Conditions_before) => { dispatch({ type: "english_lang", payload: About_Us,Schedule_medical_appointment_online,No_more_ong_waits,MASCLINICAS_is_a_portal,For_any_questions_or,and_review_Terms,Conditions_before }) },
        add_Social_User: (social_user) => { dispatch({ type: "add_Social_User", payload: social_user }) },
        // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
        // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
        // addservice:(service)=>{dispatch({type:"addservice",payload:service})},






    }
}



export default connect(mapStateToProps, mapDispatchToProps)(About_Us_Screen);
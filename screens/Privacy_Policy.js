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
import { connect } from "react-redux";
import { Open,Email } from 'react-native-openanything';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height



class Privacy_Policy extends React.Component {

    constructor(props) {

        super(props)

        this.state = {

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

     open_web = () => {
        Open("https://www.hhs.gov/hipaa/filing-a-complaint/what-to-expect/index.html")
      }

      open_Email = () => {
        Email("support@MASCLINICAS.org")
      }
    
    render() {
        const text ='www.hhs.gov/ocr/privacy/hipaa/complaints/.';
        const brokenText = text.split('').map(word => (
            <TouchableOpacity onPress={() => this.open_web()}> 
          <Text style={{ color: '#00acfc', fontSize: 15,marginBottom:-5,fontWeight:'bold'}}>{word}</Text>
          </TouchableOpacity>
        ));



        const text1 ='www.hhs.gov/ocr/privacy/hipaa/understanding/consumers/index.html.';
        const brokenText1 = text1.split('').map(word => (
            <TouchableOpacity onPress={() => this.open_web()}> 
          <Text style={{ color: '#00acfc', fontSize: 15,marginBottom:-5,fontWeight:'bold'}}>{word}</Text>
          </TouchableOpacity>
        ));



        const text2 ='www.hhs.gov/ocr/privacy/hipaa/understanding/consumers/noticepp.html.';
        const brokenText2 = text2.split('').map(word => (
            <TouchableOpacity onPress={() => this.open_web()}> 
          <Text style={{ color: '#00acfc', fontSize: 15,marginBottom:-5,fontWeight:'bold'}}>{word}</Text>
          </TouchableOpacity>
        ));



        const text3 ='support@MASCLINICAS.org.';
        const brokenText3 = text3.split('').map(word => (
            <TouchableOpacity onPress={() => this.open_Email()}> 
          <Text style={{ color: '#00acfc', fontSize: 15,marginBottom:-5,fontWeight:'bold'}}>{word}</Text>
          </TouchableOpacity>
        ));


        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <View style={{ flex: 1 }}>
                    <View style={{ width: width / 1, flexDirection: 'row', alignItems: 'center', elevation: 3, backgroundColor: "#874DAF", paddingVertical: 18, paddingHorizontal: 15 }}>
                        <Icon onPress={() => Actions.pop()} name="arrowleft" type="AntDesign" style={{color:'white',fontSize:25}}/>
                        {/* <Image style={{ width: 50, height: 50, tintColor: 'white' }} source={require('../assets/Terms.png')} /> */}
                        <Text style={{ color: 'white', fontSize: 20, marginLeft: 15, fontWeight: 'bold' }}>Privacy Policy</Text>
                    </View>
                    <ScrollView>
 
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 20 }}>Privacy Policy:</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18, paddingTop: 15 }}>Mas Clinicas values the privacy rights of its website users. This notice describes how information about you may be used and disclosed by Mas Clinicas and its affiliated groups and how you can get access to this information. Please review it carefully.</Text>

                        <Text style={{ color: '#00acfc', fontSize: 20, fontWeight: 'bold', marginHorizontal: 15, marginTop: 10 }}>Summary</Text>

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 10 }}>Your Rights</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>You have the right to:</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18,marginTop:4}}>⦁	Get a copy of your information in paper or electronically</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	Correct your personal information</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	Request confidential communication</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	Ask us to limit the information we share</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	Get a list of those with whom we’ve shared your information</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	Get a copy of this privacy notice</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	Choose someone to act for you</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	File a complaint if you believe your privacy rights have been violated</Text>
 

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 5 }}>Your Choices</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>You have some choices in the way that we use and share information as we:</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 ,marginTop:4}}>⦁	Tell family and friends about your condition</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	Provide disaster relief</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	Provide mental health care</Text>


                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 5 }}>Our Uses and Disclosures</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>We may use and share your information as we:</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18,marginTop:4}}>⦁	Treat you</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	Run our organization</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	Bill for your services</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	Help with public health and safety issues</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	Do research</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	Comply with the law</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	Work with a medical examiner or funeral director</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	Address workers’ compensation, law enforcement, and other government requests</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	Respond to lawsuits and legal actions</Text>
 

                        <Text style={{ color: '#00acfc', fontSize: 20, fontWeight: 'bold', marginHorizontal: 15, marginTop: 10 }}>Your Rights</Text>

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 10 }}>When it comes to your information, you have certain rights.</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>This section explains your rights and some of our responsibilities to help you.</Text>

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 10 }}>Get a copy of your information in paper or electronically</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	You can ask to see or get an electronic or paper copy of your medical record and other information we have about you. Ask us how to do this.</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	We will provide a copy or a summary of your health information, usually within 30 days of your request. We may charge a reasonable, cost-based fee.</Text>


                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop:5 }}>Ask us to correct your personal information</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	You can ask us to correct personal information about you that you think is incorrect or incomplete. Ask us how to do this.</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	We may say “no” to your request, but we’ll tell you why in writing within 60 days.</Text>

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 5 }}>Request confidential communications</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	You can ask us to contact you in a specific way (for example, home or office phone) or to send mail to a different address.</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	We will say “yes” to all reasonable requests.</Text>
 

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop:5 }}>Ask us to limit what we use or share</Text>

                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18}}>⦁	You can ask us not to use or share certain health information for treatment, payment, or our operations. We are not required to agree to your request, and we may say “no” if it would affect your care.</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18}}>⦁	If you pay for a service or health care item out-of-pocket in full, you can ask us not to share that information for the purpose of payment or our operations with your health insurer. We will say “yes” unless a law requires us to share that information.</Text>
 
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 5}}>Get a list of those with whom we’ve shared information</Text>

                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	You can ask for a list (accounting) of the times we’ve shared your health information for six years prior to the date you ask, who we shared it with, and why.</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	We will include all the disclosures except for those about treatment, payment, and health care operations, and certain other disclosures (such as any you asked us to make). We’ll provide one accounting a year for free but will charge a reasonable, cost-based fee if you ask for another one within 12 months.</Text>
 

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 5 }}>Get a copy of this privacy notice</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18}}>You can ask for a paper copy of this notice at any time, even if you have agreed to receive the notice electronically. We will provide you with a paper copy promptly.</Text>

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 5 }}>Choose someone to act for you</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	If you have given someone medical power of attorney or if someone is your legal guardian, that person can exercise your rights and make choices about your health information.</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	We will make sure the person has this authority and can act for you before we take any action.</Text>
 
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 5 }}>File a complaint if you feel your rights are violated</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	You can complain if you feel we have violated your rights by contacting us using the information on the bottom of this page.li.</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	You can file a complaint with the U.S. Department of Health and Human Services Office for Civil Rights by sending a letter to 200 Independence Avenue, S.W., Washington, D.C. 20201, calling 1-877-696-6775, or visiting {brokenText}</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>⦁	We will not retaliate against you for filing a complaint.</Text>
 
                        <Text style={{ color: '#00acfc', fontSize: 20, fontWeight: 'bold', marginHorizontal: 15, marginTop: 10 }}>Your Choices</Text>

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 10 }}>For certain health information, you can tell us your choices about what we share.</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>If you have a clear preference for how we share your information in the situations described below, talk to us. Tell us what you want us to do, and we will follow your instructions.</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18,marginTop:4}}>In these cases, you have both the right and choice to tell us to:</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18}}>⦁	Share information with your family, close friends, or others involved in your care</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18}}>⦁	Share information in a disaster relief situation</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18}}>If you are not able to tell us your preference, for example if you are unconscious, we may go ahead and share your information if we believe it is in your best interest. We may also share your information when needed to lessen a serious and imminent threat to health or safety.</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18}}>In these cases we never share your information unless you give us written permission:</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18}}>⦁	Most sharing of psychotherapy notes</Text>

                        <Text style={{  color: '#00acfc', fontSize: 20, fontWeight: 'bold', marginHorizontal: 15, marginTop: 10  }}>Our Uses and Disclosures</Text>

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 10 }}>How do we typically use or share your personal information?</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>We typically use or share your personal information in the following ways.</Text>

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 7 }}>Treat you</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18, marginTop: 5 }}>We can use your health information and share it with other professionals who are treating you.</Text>

                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18 }}>Example: A doctor treating you for an injury asks another doctor about your overall health condition.</Text>

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 20 }}>Run our organization</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18, marginTop: 5 }}>We can use and share your health information to run our practice, improve your care, and contact you when necessary.</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18,marginTop:7}}>Example: We use health information about you to manage your treatment and services.</Text>

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 20 }}>Bill for your services</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18, marginTop: 5 }}>We can use and share your health and billing information to bill and get payment from you, health plans or other third-party entities.</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18,marginTop:7}}>Example: We give information about you to your health insurance plan so it will pay for your services.</Text>

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 20 }}>How else can we use or share your information?</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18, marginTop: 5 }}>We are allowed or required to share your information in other ways – usually in ways that contribute to the public good, such as public health and research. We have to meet many conditions in the law before we can share your information for these purposes. For more information </Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18,marginTop:4}}>see: {brokenText1}</Text>

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 20 }}>Help with public health and safety issues</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18,marginTop:4}}>We can share health information about you for certain situations such as:</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18}}>⦁	Preventing disease</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18}}>⦁	Helping with product recalls</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18}}>⦁	Reporting adverse reactions to medications</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18}}>⦁	Reporting suspected abuse, neglect, or domestic violence</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18}}>⦁	Preventing or reducing a serious threat to anyone’s health or safety</Text>

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 20 }}>Do research</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18,marginTop:4}}>We can use or share your information for health research.</Text>

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 20 }}>Comply with the law</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18,marginTop:4}}>We will share information about you if state or federal laws require it, including with the Department of Health and Human Services if it wants to see that we’re complying with federal privacy law.</Text>

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 20 }}>Work with a medical examiner or funeral director</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18,marginTop:4}}>We can share health information with a coroner, medical examiner, or funeral director when an individual dies.</Text>

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 20 }}>Address workers’ compensation, law enforcement, and other government requests</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18,marginTop:4}}>We can use or share health information about you:</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18,marginTop:4}}>⦁	For workers’ compensation claims</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18}}>⦁	For law enforcement purposes or with a law enforcement official</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18}}>⦁	With health oversight agencies for activities authorized by law</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18,marginTop:4}}>For special government functions such as military, national security, and presidential protective</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18,marginTop:4}}>⦁	services</Text>

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 20 }}>Respond to lawsuits and legal actions</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18,marginTop:4}}>We can share health information about you in response to a court or administrative order, or in response to a subpoena.</Text>

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 20 }}>Our Responsibilities</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18,marginTop:4}}>⦁	We are required by law to maintain the privacy and security of your protected health information.</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18}}>⦁	We will let you know promptly if a breach occurs that may have compromised the privacy or security of your information.</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18}}>⦁	We must follow the duties and privacy practices described in this notice and give you a copy of it.</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18}}>⦁	We will not use or share your information other than as described here unless you tell us we can in writing. If you tell us we can, you may change your mind at any time. Let us know in writing if you change your mind.</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18,marginTop:4}}>For more information</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18,marginTop:4}}>see:{brokenText2}</Text>

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 20 }}>Changes to the Terms of this Notice</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18,marginTop:4}}>We can change the terms of this notice, and the changes will apply to all information we have about you. The new notice will be available upon request on our website.</Text>

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 20 }}>Questions</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18,marginTop:4}}>If you have any questions about this Notice, you may contact Mas Clinicas by emailing to {brokenText3}</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18,marginTop:4,marginBottom:20}}>Last Updated: May 8th, 2022</Text>


                    </ScrollView>


                </View>


            </View>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        Categories: state.Categories,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        add_Vehicle: (vehicle) => { dispatch({ type: "add_Vehicle", payload: vehicle }) },
        spanish_lang: (Categories,) => { dispatch({ type: "spanish_lang", payload: Categories, }) },
        english_lang: (Categories,) => { dispatch({ type: "english_lang", payload: Categories, }) },
        add_Social_User: (social_user) => { dispatch({ type: "add_Social_User", payload: social_user }) },
        // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
        // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
        // addservice:(service)=>{dispatch({type:"addservice",payload:service})},






    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Privacy_Policy);
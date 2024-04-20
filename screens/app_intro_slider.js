import React, { Component } from 'react';
import {
  SafeAreaView,
  BackHandler,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  AsyncStorage,
  Dimensions
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height



console.disableYellowBox = true;


const slides = [
  {
    key: 1,

    text1: 'Find the best doctor in your vicinity',
    text4: 'vicinity at total ease.',
    text3: 'now locate the best doctors around your',
    text2: 'With the help of our intelliginet algorithms,',
    image: require('../assets/Public_Opinion_Research_1200x666-removebg-preview.png'),
    backgroundColor: '#ee2b7a',
  },
  {
    key: 2,

    text1: 'Schedule appointments with expert doctors',
    text2: 'Find experienced specialist doctors with',
    text3: 'expert ratings and reviews and book your',
    text4: 'appointment hassle-free.',
    image: require('../assets/scheduling-annual-doctors-appointment-removebg-preview.png'),
    backgroundColor: '#ee2b7a',
  },
  {
    key: 3,

    text1: 'Book face-to-face appointments',
    text2: 'Can not go to hospital? Book video call',
    text3: ' appointments with your doctor within the',
    text4: 'app in a few minutes.',
    image: require('../assets/Mobile__9_-removebg-preview.png'),
    backgroundColor: '#ee2b7a',
  },
];

class app_intro_slider extends React.Component {

  constructor(props) {

    super(props)

    this.state = {

      showRealApp: false


    }

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    navigate('NewScreen');
  }
  handleBackButtonClick() {

    BackHandler.exitApp();

    return true;
  }




  onDone = () => {
    this.setState({


      showRealApp: true


    })
  };

  _renderItem = ({ item }) => {
    return (
      <View
        style={{ width: '100%', height: '100%', alignItems: 'center', backgroundColor: 'white' }}
      >
        <Image source={require("../assets/Neurolife.png")} resizeMode='contain' style={{ width: 120, height: 120, marginTop: 20 }} />

        <Text style={styles.text1}>{item.text1}</Text>
        <Text style={styles.text2}>{item.text2}</Text>
        <Text style={styles.text3}>{item.text3}</Text>
        <Text style={styles.text4}>{item.text4}</Text>
        <Image style={styles.image} source={item.image} resizeMode='cover' />

      </View>
    );
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    // this.setState({ showRealApp: true });
    Actions.Roll_Screen({ role: 'user' });
    let app_intro = "done"

    AsyncStorage.setItem('app_intro', JSON.stringify(app_intro));
  }


  _renderNextButton = () => {
    return (

      <View style={styles.buttonCircle}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Next</Text>

      </View>

    );
  };

  _renderDoneButton = () => {
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => this._onDone()}>
        <View style={styles.buttonCircle}>


          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Get Started</Text>


        </View>
      </TouchableOpacity>
    );
  };


  render() {

    return <AppIntroSlider activeDotStyle={{ backgroundColor: '#5fa746', marginBottom: 90 }} dotStyle={{ backgroundColor: 'lightgray', marginBottom: 90 }} renderItem={this._renderItem} data={slides} onDone={this._onDone} renderNextButton={this._renderNextButton} renderDoneButton={this._renderDoneButton} />;



  }
}



const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: '#ee2b7a',
  },
  image: {
    width: width / 1.1,
    height: height / 2.2,
    resizeMode: 'contain',
  },
  text1: {
    color: 'black',
    fontSize: 24,
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 60,
    textAlign: 'center'
  },
  text2: {
    color: 'gray',
    fontSize: 14,
    paddingHorizontal: 20

  },
  text3: {
    color: 'gray',
    fontSize: 14,
    paddingHorizontal: 20
  },
  buttonCircle: {
    width: width / 1.1, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', paddingVertical: 12, borderRadius: 100, backgroundColor: '#5fa746', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3, marginTop: 5
  },
  text4: {
    color: 'gray',
    fontSize: 14,
    paddingHorizontal: 20,
    marginBottom: 20
  }
});





export default app_intro_slider;
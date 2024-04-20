
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
  Pressable,
  AsyncStorage,
} from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';
import { Actions } from 'react-native-router-flux';
// import messaging from '@react-native-firebase/messaging'
import Connection from "../connection";
import ImageLoad from 'react-native-image-placeholder';
import { connect } from "react-redux";
import CheckBox from '@react-native-community/checkbox';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Rating, AirbnbRating } from 'react-native-ratings';
import CountryPicker from 'react-native-country-picker-modal'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height


class All_Providers extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      data5: [],
      search: this.props.search,
      skalton: false,
      placeholder: '+92',
      country:'Select Country',
      text19:2,
text20:1,
text21:1,
text22:1,
text23:1,
text24:1,
text25:1,

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
    // let user = await AsyncStorage.getItem('customer');

    // // console.log("aaaaaaaaaaaaa", this.prop);
    // let parsed = JSON.parse(user);
    // let name = parsed[0].name;
    // let id = parsed[0].id;


    // this.setState({
    //   name: name,
    //   id: id,

    // })

    // this.doctors_all_fav()

  }

  selectcountry(value) {
    let n = value["callingCode"]
    let n1 = value["name"]

    console.log("value => ", n1)
    this.setState({
        placeholder: "+" + n[0],
        country:n1
    })

}




  doctors_all_fav = () => {

    let api = Connection + "rest_apis.php?action=all_doctors_clinics";
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        otherHeader: "foo",
      },
      // body: uploaddata,
    })
      .then((response) => response.json())
      .then((response) => {

        let table = [];
        let record = response.response
        console.log('mondddddddddddayyyyyyyyyy', record)

        let len = record.length;

        if (record != 'fail') {
          for (let i = 0; i < len; i++) {


            let lat1 = record[i].lat
            let lng1 = record[i].lng
            let lat = parseFloat(lat1);
            let lng = parseFloat(lng1);

            if (lat1 != "" && lat1 != null) {
              table.push(record[i]);

            }
            else {
              this.setState({
                data5: [],
                skalton: false
              })
            }
          }


          this.setState({
            data5: table,
            skalton: false
          })
        }

      })
      .catch((error) => {
        console.error(error);
      });

  };



  createtable5 = () => {
    let table = []
    let record1 = this.state.data5
    let len = record1.length
    if (record1 != 'fail') {
      for (let i = 0; i < len; i++) {
        let name = record1[i].name
        let category = record1[i].category
        let fee = record1[i].fee
        let address = record1[i].address
        let fcm_token = record1[i].fcm_token
        let doctor_id = record1[i].id


        let lat1 = record1[i].lat
        let lng1 = record1[i].lng
        let lat = parseFloat(lat1);
        let lng = parseFloat(lng1);
        let experience = record1[i].experience
        let avg_rating = record1[i].avg_rating
        let total_review = record1[i].total_review

        let a_r = Number(avg_rating).toFixed(2);

        let degree = record1[i].degree
        let license_number = record1[i].license_number
        let c_name = record1[i].c_name
        let appointment = record1[i].appointment
        let s_key = record1[i].s_key
        let paypal = record1[i].paypal
        let access = record1[i].access
        let online = record1[i].online
        let app = record1[i].app
        let profile1 = record1[i].profile
        let profile = Connection + 'images/' + profile1

        table.push(<View>
          {

            <TouchableOpacity activeOpacity={0.8} onPress={() => Actions.Doctor_Appointment_Profile({ app: app, fcm_token: fcm_token, s_key: s_key, paypal: paypal, access: access, name1: name, profile: profile, category: category, doctor_id: doctor_id, experience: experience, fee: fee, address: address, lat: lat, lng: lng, total_review: total_review, a_r: a_r, license_number: license_number, degree: degree, c_name: c_name, appointment: appointment })}>

              <View style={{ width: width / 2.5, paddingBottom: 10, backgroundColor: 'white', borderRadius: 8, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3, marginLeft: 7, marginRight: 7, marginBottom: 5, marginTop: 15, alignItems: 'center', justifyContent: 'center', paddingVertical: 15 }}>
                <ImageLoad
                  style={{ width: 70, height: 70, borderRadius: 70, }}
                  loadingStyle={{ size: 'large', color: 'blue' }}
                  source={{ uri: profile }}
                  borderRadius={70}

                  placeholderStyle={{ width: 70, height: 70, borderRadius: 70, }}

                />
                <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', marginTop: 5 }} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
                <Text style={{ color: 'gray', fontSize: 13, fontWeight: '400' }}>{category}</Text>


                <View style={{ width: 100, height: 26, backgroundColor: '#781517', marginTop: 10, borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>

                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>Book Now</Text>
                </View>

              </View>


            </TouchableOpacity>






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






  Serach_doctor = (val) => {
    this.setState({ skalton: true })


    let uploaddata = new FormData();




    this.setState({ spinner: true });
    console.log('name', val);
    let name1 = val['name']
    uploaddata.append('name', name1);
 

    let api = Connection + 'rest_apis.php?action=search_doctor';
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
   

        let record = response.response;

        if (record != 'fail') {
          this.setState({
            data5: record,
            skalton: false
          })

        }

        else {
        
          this.setState({
            data5: [],
            skalton: false


          })
        }

      })
      .catch((error) => {
        console.error(error);
      });

  }



  search_false = () => {
    this.setState({
      search: false
    })
    this.doctors_all_fav()
  }


  search_true = () => {
    this.setState({
      search: true
    })
  }


  changebtn_2(value, val) {
 
    // if(val=='All'){
    //   this.doctors_all_fav()
    // } else {
    //   this.doctors_all_fav_category(val)
    // }
   
    if (this.state[value] == 2) {
  
  
  
        this.setState({
         
      
  text19:1,
  text20:1,
  text21:1,
  text22:1,
  text23:1,
  text24:1,
  text25:1,
  
  
  
  
            [value]: 2,
  
  
        })
    }
    else {
        this.setState({
     
  text19:1,
  text20:1,
  text21:1,
  text22:1,
  text23:1,
  text24:1,
  text25:1,
  
            [value]: 2,
  
  
        })
  
    }
    this.setState({
        filter_rating: val,
        // search:false
  
    })
  }
  

  render() {


    return (
      <>
      <StatusBar backgroundColor="#781517" barStyle="light-content" />
      <View style={{ flex: 1 }}>
      

          <View style={{  paddingHorizontal: 15, paddingVertical: 15, backgroundColor: "#781517", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
          
          <View style={{ flexDirection: "row", justifyContent: 'space-between',alignItems: "center",  }}>


      
          
            <Icon onPress={() => { Actions.pop() }} name="keyboard-backspace" type="MaterialCommunityIcons" style={{ color: "white", fontSize: 28 }} />
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Filter</Text>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Reset</Text>

            {/* <Icon  name="search" type="FontAwesome" style={{ color: "white", fontSize: 24 }} /> */}
            {/* onPress={() => { this.search_true() }} */}

          </View>
         

          </View>
         

    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',alignSelf:'center', width:width/1.1, marginTop:15,paddingBottom:20,borderBottomWidth:0.5,borderBottomColor:'lightgray'}}>
    <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Category</Text>
    <View style={{ flexDirection: "row", justifyContent: 'space-between',alignItems: "center",  }}>


      
          
<Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>View All </Text>
<Icon onPress={() => { Actions.pop() }} name="chevron-right" type="Entypo" style={{ color: "black", fontSize: 24 }} />

</View>


    </View>



    <View style={{ alignSelf:'center', width:width/1.1, marginTop:15,paddingBottom:20,borderBottomWidth:0.5,borderBottomColor:'lightgray'}}>
    <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Select Country</Text>
    <View style={{width:'100%',flexDirection:'row', alignItems:'center', backgroundColor: '#e6e6e6', borderRadius:12,paddingHorizontal:15,height:48,marginTop:10}}>
 
 <CountryPicker
                     withFlagButton={true}
                     withFlag
                     onSelect={value => this.selectcountry(value)}
                     translation="eng"
                     placeholder={this.state.country}
                 />

{/* <TextInput value={this.state.number} onChangeText={number => this.setState({ number })} style={{height:48, paddingLeft: 10,borderRadius: 8,width:'84%',color:'black',fontWeight:'bold',  }} placeholder= 'Phone Number' placeholderTextColor='gray' /> */}


</View>

</View>
 
<View style={{ alignSelf:'center', width:width/1.1, marginTop:15,paddingBottom:40,borderBottomWidth:0.5,borderBottomColor:'lightgray'}}>
    <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Enter Price Range</Text>

    <View style={{width:'100%',flexDirection:'row', alignItems:'center',  borderRadius:12,height:48,marginTop:10,justifyContent:'space-between'}}>
   <View style={{width:'50%',marginTop:10}}>
   <Text style={{ color: 'black', fontSize: 14, marginBottom:5,marginTop:5  }}>Min Price</Text>

   
<TextInput value={this.state.number} onChangeText={number => this.setState({ number })} style={{height:48, paddingLeft: 10,borderRadius: 8,width:'90%',color:'black',fontWeight:'bold',backgroundColor: '#e6e6e6',  }} placeholder= '0' placeholderTextColor='gray' />
</View>
<View style={{width:'50%',marginTop:10}}>
   <Text style={{ color: 'black', fontSize: 14, marginBottom:5,marginTop:5  }}>Max Price</Text>

   
<TextInput value={this.state.number} onChangeText={number => this.setState({ number })} style={{height:48, paddingLeft: 10,borderRadius: 8,width:'90%',color:'black',fontWeight:'bold',backgroundColor: '#e6e6e6',  }} placeholder= '0' placeholderTextColor='gray' />
</View>
    </View>
    </View>
 
    <View style={{ alignSelf:'center', width:width/1.1, marginTop:15,paddingBottom:40,borderBottomWidth:0.5,borderBottomColor:'lightgray'}}>
    <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Select Rating</Text>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop:10,   }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity activeOpacity={0.8}  onPress={() => this.changebtn_2("text19", 'All')}  style={(this.state.text19 == 1 ? styles.in_active_button_r : styles.active_button_r)}>

                            <Icon name="star" type="Entypo" style={(this.state.text19 == 1 ? styles.in_active_icon_r : styles.active_icon_r)} />
                            <Text style={(this.state.text19 == 1 ? styles.in_active_text_r : styles.active_text_r)}>All</Text>

                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.changebtn_2("text20", 5)}  style={(this.state.text20 == 1 ? styles.in_active_button_r : styles.active_button_r)}>
                            <Icon name="star" type="Entypo" style={(this.state.text20 == 1 ? styles.in_active_icon_r : styles.active_icon_r)}/>
                            <Text style={(this.state.text20 == 1 ? styles.in_active_text_r : styles.active_text_r)}>5</Text>

                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.changebtn_2("text21", 4)}  style={(this.state.text21 == 1 ? styles.in_active_button_r : styles.active_button_r)}>
                            <Icon name="star" type="Entypo" style={(this.state.text21 == 1 ? styles.in_active_icon_r : styles.active_icon_r)} />
                            <Text style={(this.state.text21 == 1 ? styles.in_active_text_r : styles.active_text_r)}>4</Text>

                        </TouchableOpacity>



                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.changebtn_2("text22", 3)}  style={(this.state.text22 == 1 ? styles.in_active_button_r : styles.active_button_r)}>
                            <Icon name="star" type="Entypo" style={(this.state.text22 == 1 ? styles.in_active_icon_r : styles.active_icon_r)} />
                            <Text style={(this.state.text22 == 1 ? styles.in_active_text_r : styles.active_text_r)}>3</Text>

                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={0.8}  onPress={() => this.changebtn_2("text23", '2')}  style={(this.state.text23 == 1 ? styles.in_active_button_r : styles.active_button_r)}>
                            <Icon name="star" type="Entypo" style={(this.state.text23 == 1 ? styles.in_active_icon_r : styles.active_icon_r)} />
                            <Text style={(this.state.text23 == 1 ? styles.in_active_text_r : styles.active_text_r)}>2</Text>

                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={0.8}  onPress={() => this.changebtn_2("text24", '1')}   style={(this.state.text24 == 1 ? styles.in_active_button_r : styles.active_button_r)}>
                            <Icon name="star" type="Entypo" style={(this.state.text24 == 1 ? styles.in_active_icon_r : styles.active_icon_r)} />
                            <Text style={(this.state.text24 == 1 ? styles.in_active_text_r : styles.active_text_r)}>1</Text>

                        </TouchableOpacity>
                    </ScrollView>
                </View>
      </View>


      <TouchableOpacity activeOpacity={0.8} onPress={() => Actions.pop()}
              style={{ width: width / 1.1, alignSelf: 'center', height: 50, backgroundColor: '#781517', borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Apply</Text>
            </TouchableOpacity>
      </View>


      </>
    )
  }
}

const styles = StyleSheet.create({

  active_button: {
    justifyContent: 'center', alignItems: 'center', paddingVertical: 8, width: width / 2.2, borderBottomWidth: 2, borderColor: '#781517'
  },
  in_active_button: {
    justifyContent: 'center', alignItems: 'center', paddingVertical: 8, width: width / 2.2
  },


  active_text: {
    color: '#781517', fontWeight: '500', fontSize: 14
  },
  in_active_text: {
    color: 'gray', fontWeight: '500', fontSize: 14
  },
  active_button_r: {
    width:width/4, height: 28, borderRadius: 14, backgroundColor: '#781517', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginHorizontal: 5
},

in_active_button_r: {
    width:width/4, height: 28, borderRadius: 14, borderColor: '#781517', borderWidth: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginHorizontal: 5
},

active_text_r: {
    color: 'white', fontWeight: 'bold', fontSize: 14, marginLeft: 5
    
},

in_active_text_r: {
    color: '#781517', fontWeight: 'bold', fontSize: 12, marginLeft: 5
},
active_icon_r:{
    color: "white", fontSize: 14 
},in_active_icon_r:{
    color: "#781517", fontSize: 14 
}
})



export default All_Providers;
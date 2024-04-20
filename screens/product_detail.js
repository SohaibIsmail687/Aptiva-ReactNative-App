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
    PermissionsAndroid
} from 'react-native';
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Connection from "../connection";
import { connect } from "react-redux";
import ImageLoad from 'react-native-image-placeholder';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import moment from 'moment';
import StarRating from 'react-native-star-rating';
import CheckBox from '@react-native-community/checkbox';


const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

class All_Reviews extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            skalton: false,
            data1: []

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
        let aa = moment(new Date()).format("YYYY-MM-DD hh:mm A");
        let split = aa.split(' ')
        let date = split[0]

        let time = split[1]
        let am_pm = split[2]
        let final_time = time + "" + am_pm

        this.setState({
            time: final_time,
            date: date
        })

        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );

        let user = await AsyncStorage.getItem('customer');
        let parsed = JSON.parse(user);
        let id = parsed[0].id;
        this.setState({
            id: id,
        })
        
        this.Get_Data_1()

    }

    Get_Data_1 = () => {

        let uploaddata = new FormData();
        uploaddata.append('doctor_id', this.state.id);
        let api = Connection + 'rest_apis.php?action=Get_Reviews_with_user';
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                otherHeader: 'foo',
            },
            body: uploaddata,
        })
            .then(response => response.json())
            .then(response => {
                let record = response.response;
                if (record != 'fail') {
                    let total_review = record[0].total_review
                    let avg_rating = record[0].avg_rating
                    let a_r = Number(avg_rating).toFixed(2);
                    this.setState({
                        data1: record,
                        total_review: total_review,
                        avg_rating: a_r,
                        skalton: false
                    })
                } else {
                    this.setState({
                        data1: [],
                        skalton: false
                    })
                }
            })
            .catch((error) => {
                console.error(error);

            });
    }

    createtable2 = () => {
        let table = []

        let record1 = this.state.data1
        let len = record1.length
        if (record1 != 'fail') {
            for (let i = 0; i < len; i++) {
                let name = record1[i].name
                let profile1 = record1[i].profile
                let profile = Connection + 'images/' + profile1
                let comment = record1[i].comment
                let rating = record1[i].rating
                let date = record1[i].date
                let ss = date.split(' ');
                let date_1 = ss[0]
                let time_1 = ss[1]

                table.push(<View>
                    {
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10,width:width/1.1,alignSelf:'center',borderBottomWidth:0.5,borderBottomColor:'gray',paddingBottom:10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <ImageLoad
                                    style={{ width: 44, borderRadius: 44, height: 44 }}
                                    loadingStyle={{ size: 'large', color: 'blue' }}
                                    source={{ uri: profile }}
                                    borderRadius={150}
                                    placeholderStyle={{ width: 44, borderRadius: 44, height: 44 }}
                                />
                                <View style={{ marginLeft: 10, width: '60%' }}>
                                    <Text numberOfLines={1} style={{ color: 'black', fontWeight: 'bold', fontSize: 15, maxWidth: '100%' }}>{name}</Text>
                                    <Text numberOfLines={2} style={{ color: 'gray', fontSize: 14, maxWidth: '100%' }}>{comment}</Text>
                                </View>
                            </View>

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#565759' }}>{date_1}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        rating={rating}
                                        // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                        containerStyle={{ width: width / 4.8 }}
                                        starSize={14}
                                        fullStarColor={'gold'}
                                    />

                                </View>
                            </View>
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


    render() {


        return (
            <>
      <StatusBar backgroundColor="#781517" barStyle="light-content" />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            paddingVertical: 15,
            backgroundColor: "#781517",
          }}
        >
          <TouchableOpacity onPress={() => Actions.pop()}>
            <Icon

              name="arrowleft"
              type="AntDesign"
              style={{ color: "white", fontSize: 25 }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Request Details</Text>
          <Text></Text>

        </View>

        <ScrollView>
        <Text
            style={{
              color: "#781517",
              fontWeight: "bold",
              fontSize: 16,
              paddingHorizontal:20,marginTop:20
            }}
          >
            Patient Details</Text>         
        <View style={{backgroundColor:'white',width:width/1.1,alignSelf:'center',borderRadius:8,paddingHorizontal:15,paddingVertical:10,shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,marginTop:15}}>
<View style={{flexDirection:'row',alignItems:'center', }}>
 
<Image style={{ width:50, height:50, borderRadius: 8}} source={require('../assets/carlo.jpg')} />
 
    <View style={{marginLeft:10}}>
        <Text style={{color:'#781517',fontWeight:'bold',fontSize:16}}>Sheikar Dawan</Text>
        <Text style={{color:'gray',fontSize:12}}>Taimoor Chok, Gujrat</Text>
        {/* <Text style={{color:'#bebebe',fontSize:14}}>$25</Text> */}

    </View>


 
</View>

     <View style={{marginTop:10}}>
        <Text style={{color:'#781517',fontWeight:'bold',fontSize:16}}>Mobile Number</Text>
        <Text style={{color:'gray',fontSize:12}}>+923486694823</Text>
        {/* <Text style={{color:'#bebebe',fontSize:14}}>$25</Text> */}

    </View>

    <View style={{marginTop:10}}>
        <Text style={{color:'#781517',fontWeight:'bold',fontSize:16}}>Age & Gender</Text>
        <Text style={{color:'gray',fontSize:12}}>24, Male</Text>
        {/* <Text style={{color:'#bebebe',fontSize:14}}>$25</Text> */}

    </View>


    <View style={{marginTop:10}}>
        <Text style={{color:'#781517',fontWeight:'bold',fontSize:16}}>Medicine Delivery Option</Text>
        <Text style={{color:'gray',fontSize:12}}>PickUp</Text>
        {/* <Text style={{color:'#bebebe',fontSize:14}}>$25</Text> */}

    </View>
 
</View>


<Text
            style={{
              color: "#781517",
              fontWeight: "bold",
              fontSize: 16,
              paddingHorizontal:20,marginTop:20
            }}
          >
            Perscription</Text>  
          
            <Image style={{width:width/1.1, alignSelf:'center', height:height/4,  }} source={require('../assets/p1.jpg')} resizeMode="stretch" />
        
           
            <Text
            style={{
              color: "#781517",
              fontWeight: "bold",
              fontSize: 16,
              paddingHorizontal:20,marginTop:20
            }}
          >
            Doctor Detail</Text> 
            <View style={{backgroundColor:'white',width:width/1.1,alignSelf:'center',borderRadius:8,paddingHorizontal:15,paddingVertical:10,shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,marginTop:15}}>
<View style={{flexDirection:'row',alignItems:'center', }}>
 
<Image style={{ width:50, height:50, borderRadius: 8}} source={require('../assets/doctor-11.jpg')} />
 
    <View style={{marginLeft:10}}>
        <Text style={{color:'#781517',fontWeight:'bold',fontSize:16}}>Sheikar Dawan</Text>
        <Text style={{color:'gray',fontSize:12}}>Circular Chok, Narowala</Text>
        {/* <Text style={{color:'#bebebe',fontSize:14}}>$25</Text> */}

    </View>
 
</View>


 
 
</View>


      
<Text
            style={{
              color: "#781517",
              fontWeight: "bold",
              fontSize: 16,
              paddingHorizontal:20,marginTop:20
            }}
          >
            Add Price</Text>  

 
            <View style={{width: width / 1.1,marginTop:10, height: 50,alignItems:'center',alignSelf:'center'}} >
          <TextInput  onChangeText={mobile_number => this.setState({ mobile_number })}   style={{marginTop: 10,width: width / 1.1, height: 50, backgroundColor: '#e6e6e6', paddingLeft: 20, borderRadius: 28,  alignSelf:'center', color: '#781517', fontWeight: 'bold' }} placeholder="Enter Price" placeholderTextColor='gray' />
          {/* <Icon name="lock-outline" type="MaterialCommunityIcons" style={{ color: "#781517", fontSize: 24,position:'absolute',left:10,top:20 }} /> */}

            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 10, paddingTop: 15 }}>
            <CheckBox
              disabled={false}
              value={this.state.checked}
              onValueChange={() => this.setState({ checked: !this.state.checked })}
              tintColors={{ true: '#781517', false: 'gray' }}
              onTintColor={"#781517"}
              onCheckColor={'black'}
            />
            <Text style={{ color: 'black', maxWidth: '90%' }}>We have all medicine present in perscription</Text>
          </View>
 
<View style={{marginBottom:100}}></View>
</ScrollView>


<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:width,paddingHorizontal:15, position:'absolute',bottom:0,backgroundColor:'white'}}>

 
<TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.pop() }}
          style={{ width:  '47%', marginBottom:10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', paddingVertical: 13, borderRadius: 100, backgroundColor: '#781517', borderColor: '#781517', marginTop:20,  marginTop:20, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3,   }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Accept</Text>
        </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.pop() }}
          style={{ width:  '47%', marginBottom:10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', paddingVertical: 13, borderRadius: 100,borderWidth:2, borderColor: '#781517', marginTop:20,    }}>
          <Text style={{ color: '#781517', fontWeight: 'bold', fontSize: 15 }}>Reject</Text>
        </TouchableOpacity>


        </View>
            </View>
            </>
        )
    }
}


export default All_Reviews; 
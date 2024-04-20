
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
import MapView, {
    PROVIDER_GOOGLE,
    Marker,
    AnimatedRegion,
    MarkerAnimated,
    Animated,
    Polyline,
} from "react-native-maps";
import Connection from "../connection";
import { Rating, AirbnbRating } from 'react-native-ratings';
import StarRating from 'react-native-star-rating';
import getDistance from "geolib/es/getDistance";
import ImageLoad from 'react-native-image-placeholder';
import { connect } from "react-redux";

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

class Map_Screen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            l_id: 152,
            text1: 2,
            text2: 1,
            text3: 1,
            text4: 1,

            data2: [],
            table: [],

            league_id: "",
            text5: 2,
            text6: 1,
            child: true,
            data: [],
            heh: false,
            comment: "",
            data1: [],
            table: [],
            isLoading: true,
            d_profilee: null,
            location: "",
            lat: "",
            lng: "",
            id: "",
            manufacture: "",
            year: "",
            model: "",
            problem: "",
            driver_cur_lat: 31.4805,
            driver_cur_lng: 74.3239,
            driver_cur_lat_1: 31.4805,
            driver_cur_lng_1: 74.3239,
            origin_lng: 32.5841895,
            origin_lat: 74.0765673,
            origin_check: false,
            spinner: false,
            check_check: true,

            ride_id_1: "",
            loc_check: false,
            show_latitude_logintude: false,
            spinner1: false,
            token: "",
            sound_play: true,
            category: "Requests",
            tune: false,
        };
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
        Actions.pop()
        return true;
    }


    backAction = () => {
        Actions.pop()
        return true;
    };





    componentDidMount = async () => {




        console.log("category", this.props.user_c_lat);
        console.log("sub_category", this.props.user_c_lng);



        if (this.props.consult == true) {
            this.doctors_by_category_consult()

        } else {
            this.doctors_by_category()

        }



    }


    createtable2 = () => {
        let table = []
        let record1 = this.state.data1
        let len = record1.length
        if (record1 != 'fail') {
            for (let i = 0; i < len; i++) {



                let lat = record1[i].lat
                let lng = record1[i].lng

                let lng_f1 = parseFloat(lat);
                let lat_f1 = parseFloat(lng);

                table.push(<View>
                    {

                        <Marker
                            coordinate={{
                                latitude: lng_f1,
                                longitude: lat_f1,
                            }}
                        >

                            <Icon name="google-maps" type="MaterialCommunityIcons" style={{ color: '#0192fc', fontSize: 50 }} />
                        </Marker>

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








    doctors_by_category_consult = () => {

        let api = Connection + "rest_apis.php?action=all_doctors_1_consult";
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
                let len = record.length;
                if (record != 'fail') {
                    for (let i = 0; i < len; i++) {
                        let d_lat = record[i].lat;
                        let d_lng = record[i].lng;

                        let test = {
                            latitude: d_lat,
                            longitude: d_lng,
                        };
                        // 5000000

                        if (
                            getDistance(
                                {
                                    latitude: this.props.user_c_lat,
                                    longitude: this.props.user_c_lng,
                                },
                                test
                            ) <= 30000
                        ) {
                            table.push(record[i]);

                        }
                        getDistance(
                            {
                                latitude: this.props.user_c_lat,
                                longitude: this.props.user_c_lng,
                            },
                            test
                        );
                    }


                }

                else {
                    this.setState({
                        data1: []
                    })
                }
                this.setState({
                    data1: table,
                    skalton: false
                })


            })
            .catch((error) => {
                console.error(error);
            });

    };






    doctors_by_category = () => {
        let api = Connection + "rest_apis.php?action=all_doctors_1";
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
                let len = record.length;




                if (record != 'fail') {
                    for (let i = 0; i < len; i++) {
                        let d_lat = record[i].lat;
                        let d_lng = record[i].lng;

                        let test = {
                            latitude: d_lat,
                            longitude: d_lng,
                        };
                        // 5000000

                        if (
                            getDistance(
                                {
                                    latitude: this.props.user_c_lat,
                                    longitude: this.props.user_c_lng,
                                },
                                test
                            ) <= 30000
                        ) {
                            table.push(record[i]);

                        }
                        getDistance(
                            {
                                latitude: this.props.user_c_lat,
                                longitude: this.props.user_c_lng,
                            },
                            test
                        );

                    }


                }

                else {
                    this.setState({
                        data1: []
                    })
                }
                this.setState({
                    data1: table,
                    skalton: false
                })


            })
            .catch((error) => {
                console.error(error);
            });

    };





    createtable1 = () => {
        let table = []





        let record1 = this.state.data1
        // console.log(';;;;;;;;;;;;;;;;;;;;',record1)

        let len = record1.length
        //  console.log(';;;;;;;;;;;;;;;;;;;;',len)
        if (record1 != 'fail') {
            for (let i = 0; i < len; i++) {

                let profile1 = record1[i].profile
                let profile = Connection + 'images/' + profile1

                let name = record1[i].name
                let email = record1[i].email

                let category = record1[i].category
                let fee = record1[i].fee
                let address = record1[i].address
                let doctor_id = record1[i].id
                let lat1 = record1[i].lat
                let lng1 = record1[i].lng
                let lat = parseFloat(lat1);
                let lng = parseFloat(lng1);
                let experience = record1[i].experience
                let avg_rating = record1[i].avg_rating
                let total_review = record1[i].total_review
                let city = record1[i].city

                let a_r = Number(avg_rating).toFixed(2);

                let degree = record1[i].degree
                let license_number = record1[i].license_number
                let c_name = record1[i].c_name
                let appointment = record1[i].appointment

                let s_key = record1[i].s_key
                let paypal = record1[i].paypal
                let access = record1[i].access
                let fcm_token = record1[i].fcm_token
                let online = record1[i].online
                let app = record1[i].app




                table.push(<View>
                    {
                        <View>
                            {this.props.consult == true ?

                                <TouchableOpacity activeOpacity={0.8} onPress={() => Actions.Consult_Doctor_Details({ app: app, email: email, fcm_token: fcm_token, paypal: paypal, access: access, s_key: s_key, name1: name, profile: profile, category: category, doctor_id: doctor_id, experience: experience, fee: fee, address: address, lat: lat, lng: lng, total_review: total_review, a_r: a_r, license_number: license_number, degree: degree, city: city, c_name: c_name, appointment: appointment })}
                                    style={{ width: width / 2.2, paddingBottom: 10, backgroundColor: 'white', borderRadius: 8, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3, marginLeft: 7, marginRight: 7, marginBottom: 5, marginTop: 15 }}>

                                    <View style={{ width: '100%', height: 135, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>


                                        <ImageLoad
                                            style={{ width: '100%', height: '100%', borderRadius: 10 }}
                                            loadingStyle={{ size: 'large', color: 'blue' }}
                                            source={{ uri: profile }}
                                            borderRadius={10}
                                            placeholderStyle={{ width: '100%', height: '100%', borderRadius: 10 }}
                                        />

                                    </View>

                                    <View activeOpacity={0.8} style={{ paddingHorizontal: 10 }}>
                                        <Text numberOfLines={1} style={{ color: 'black', fontWeight: 'bold', fontSize: 15, marginTop: 7, }}>Dr. {name}</Text>
                                        <Text style={{ color: 'black', fontSize: 12, marginTop: 4 }}>{category}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                            <StarRating
                                                disabled={false}
                                                maxStars={5}
                                                rating={a_r}
                                                containerStyle={{ width: 70 }}
                                                starSize={12}
                                                fullStarColor={'#F5C60D'}
                                            />


                                            <Text style={{ color: 'gray', fontSize: 12 }}> {total_review}</Text>

                                        </View>

                                    </View>
                                </TouchableOpacity>

                                :

                                <TouchableOpacity activeOpacity={0.8} onPress={() => Actions.Doctor_Appointment_Profile({ app: app, email: email, fcm_token: fcm_token, paypal: paypal, access: access, s_key: s_key, name1: name, profile: profile, category: category, doctor_id: doctor_id, experience: experience, fee: fee, address: address, lat: lat, lng: lng, total_review: total_review, a_r: a_r, license_number: license_number, degree: degree, city: city, c_name: c_name, appointment: appointment })}
                                    style={{ width: width / 2.2, paddingBottom: 10, backgroundColor: 'white', borderRadius: 8, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3, marginLeft: 7, marginRight: 7, marginBottom: 5, marginTop: 15 }}>

                                    <View style={{ width: '100%', height: 135, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>


                                        <ImageLoad
                                            style={{ width: '100%', height: '100%', borderRadius: 10 }}
                                            loadingStyle={{ size: 'large', color: 'blue' }}
                                            source={{ uri: profile }}
                                            borderRadius={10}
                                            placeholderStyle={{ width: '100%', height: '100%', borderRadius: 10 }}
                                        />

                                    </View>

                                    <View activeOpacity={0.8} style={{ paddingHorizontal: 10 }}>
                                        <Text numberOfLines={1} style={{ color: 'black', fontWeight: 'bold', fontSize: 15, marginTop: 7, }}>Dr. {name}</Text>
                                        <Text style={{ color: 'black', fontSize: 12, marginTop: 4 }}>{category}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                            <StarRating
                                                disabled={false}
                                                maxStars={5}
                                                rating={a_r}
                                                // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                containerStyle={{ width: 70 }}
                                                starSize={12}
                                                fullStarColor={'#F5C60D'}
                                            />


                                            <Text style={{ color: 'gray', fontSize: 12 }}> {total_review}</Text>

                                        </View>

                                    </View>
                                </TouchableOpacity>
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







    render() {


        return (
            <View style={{ flex: 1 }}>

<MapView
                    provider={PROVIDER_GOOGLE}
                    zoomEnabled={true}
                    mapType={"standard"}
                    userInterfaceStyle={"dark"}
                    style={styles.map}
                    // showsUserLocation={true}
                    // showsMyLocationButton={true}
                    showsBuildings={true}
                    //  minZoomLevel={14}
                    // maxZoomLevel={90}
                    region={{
                        latitude:  31.5204,
                        longitude: 74.3587,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >

                    <Marker
                        coordinate={{
                            latitude: 31.5204,
                            longitude: 74.3587,
                        }}
                    >
                        <Icon name="google-maps" type="MaterialCommunityIcons" style={{ color: 'red', fontSize: 50 }} />
                    </Marker>


                    {/* {this.createtable2()} */}
                </MapView>



                <View style={{ paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, backgroundColor: 'white', position: 'absolute', width: width }}>
                    <Icon onPress={() => { Actions.pop() }} name="keyboard-arrow-left" type="MaterialIcons" style={{ color: "black", fontSize: 33 }} />
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Nearby Pharmacies</Text>
                    <Icon name="wallet-outline" type="Ionicons" style={{ color: "white", fontSize: 19 }} />
                </View>

                <View style={{ position: 'absolute', bottom: 25, flexDirection: 'row', alignItems: 'center', }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>






                    <TouchableOpacity activeOpacity={0.8} onPress={() => Actions.Checkout()}
                                    style={{ width: width / 2.2, paddingBottom: 10, backgroundColor: 'white', borderRadius: 8, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3, marginLeft: 7, marginRight: 7, marginBottom: 5, marginTop: 15 }}>

                                    <View style={{ width: '100%', height: 135, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
{/* 

                                        <ImageLoad
                                            style={{ width: '100%', height: '100%', borderRadius: 10 }}
                                            loadingStyle={{ size: 'large', color: 'blue' }}
                                            source={{ uri: profile }}
                                            borderRadius={10}
                                            placeholderStyle={{ width: '100%', height: '100%', borderRadius: 10 }}
                                        /> */}

<Image source={require("../assets/p2.jpg")}  style={{ width: '100%', height: '100%', borderRadius: 10 }}/>


                                    </View>

                                    <View activeOpacity={0.8} style={{ paddingHorizontal: 10 }}>
                                        <Text numberOfLines={1} style={{ color: 'black', fontWeight: 'bold', fontSize: 15, marginTop: 7, }}>Afzal Pharmacy</Text>
                                        <Text style={{ color: 'black', fontSize: 12, marginTop: 4 }}>12 Km</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                            <StarRating
                                                disabled={false}
                                                maxStars={5}
                                                rating={4}
                                                // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                containerStyle={{ width: 70 }}
                                                starSize={12}
                                                fullStarColor={'#F5C60D'}
                                            />


                                            <Text style={{ color: 'gray', fontSize: 12 }}> 09</Text>

                                        </View>

                                    </View>
                                </TouchableOpacity>


                    </ScrollView>
                </View>

            </View>

        )
    }
}


const styles = StyleSheet.create({

    map: {
        width: width,
        height: height
    }
})





export default Map_Screen;
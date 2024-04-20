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
    AsyncStorage,
    BackHandler
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';
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
import StarRating from 'react-native-star-rating';
import Connection from "../connection";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import ImageLoad from 'react-native-image-placeholder';
import { connect } from "react-redux";

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height


// console.disableYellowBox = true;




class Review_screen extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            data2: [],
            skalton: true


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
        this.get_appointments_user()
        var today = new Date();

        var nextweek_T = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        let date0 = nextweek_T.toString()
        let ddd = date0.split(' ')
        let day_1 = ddd[0]
        let dd_2 = ddd[1]
        let dd_3 = ddd[2]
        let dd_4 = ddd[3]
        let final_date_1 = dd_2 + ' ' + dd_3 + ', ' + dd_4
        this.setState({
            day_1: day_1,
            final_date_1: final_date_1
        })

        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );


    }



    createtable2 = () => {
        let table = []

        let record1 = this.state.data2
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



                        <View style={{ width: width / 1.1, alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 15, backgroundColor: 'white', marginTop: 10, borderRadius: 8, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3, marginBottom: 10, }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <ImageLoad
                                    style={{ width: 60, height: 60, borderRadius: 100, }}
                                    loadingStyle={{ size: 'large', color: 'blue' }}
                                    source={{ uri: profile }}
                                    borderRadius={100}
                                    placeholderStyle={{ width: 60, height: 60, borderRadius: 100, }}
                                />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>{name}</Text>
                                    <Text style={{ color: 'gray', fontSize: 13 }}>{date}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
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

                            <Text style={{ color: 'gray', fontSize: 14, fontWeight: '600' }}>{comment}</Text>
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


    get_appointments_user = () => {

        let uploaddata = new FormData();
        uploaddata.append('doctor_id', this.props.doctor_id);
        let api = Connection + "rest_apis.php?action=Get_Reviews_with_user_all";
        console.log("pass => ", api);
        fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
                otherHeader: "foo",
            },
            body: uploaddata,

        })
            .then((response) => response.json())
            .then((response) => {

                let record4 = response.response
                if (record4 != 'fail') {
                    let total_review = record4[0].total_review
                    let avg_rating = record4[0].avg_rating
                    let a_r = Number(avg_rating).toFixed(2);
                    this.setState({
                        data2: record4,
                        total_review: total_review,
                        avg_rating: a_r
                    })

                    this.setState({
                        data2: record4,
                        skalton: false
                    })



                } else {
                    this.setState({

                        data2: []
                    })
                }

                this.setState({

                    skalton: false
                })


            })
            .catch((error) => {
                console.error(error);
            });

    };
    render() {

        return (
            <View style={{ flex: 1, }}>

                <View style={{ width: width, alignItems: 'center', backgroundColor: '#874DAF', height: 60, flexDirection: 'row', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, paddingHorizontal: 15, justifyContent: 'space-between', marginBottom: 10 }}>
                    <Icon onPress={() => Actions.pop()} name="arrowleft" type="AntDesign" style={{ color: 'white', fontSize: 25 }} />
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginLeft: 10 }}>Reviews</Text>
                    <Text>          </Text>
                </View>


                {this.state.skalton == true ?

                    <ScrollView>
                        <SkeletonPlaceholder>
                            <View style={{ width: "90%", alignSelf: "center", height: 140, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20, marginTop: 10, marginBottom: 10, backgroundColor: 'white' }}></View>
                            <View style={{ width: "90%", alignSelf: "center", height: 140, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20, marginTop: 10, marginBottom: 10, backgroundColor: 'white' }}></View>
                            <View style={{ width: "90%", alignSelf: "center", height: 140, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20, marginTop: 10, marginBottom: 10, backgroundColor: 'white' }}></View>
                            <View style={{ width: "90%", alignSelf: "center", height: 140, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20, marginTop: 10, marginBottom: 10, backgroundColor: 'white' }}></View>
                            <View style={{ width: "90%", alignSelf: "center", height: 140, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20, marginTop: 10, marginBottom: 10, backgroundColor: 'white' }}></View>
                            <View style={{ width: "90%", alignSelf: "center", height: 140, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20, marginTop: 10, marginBottom: 10, backgroundColor: 'white' }}></View>
                            <View style={{ width: "90%", alignSelf: "center", height: 140, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20, marginTop: 10, marginBottom: 10, backgroundColor: 'white' }}></View>
                            <View style={{ width: "90%", alignSelf: "center", height: 140, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20, marginTop: 10, marginBottom: 10, backgroundColor: 'white' }}></View>
                            <View style={{ width: "90%", alignSelf: "center", height: 140, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20, marginTop: 10, marginBottom: 10, backgroundColor: 'white' }}></View>
                            <View style={{ width: "90%", alignSelf: "center", height: 140, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20, marginTop: 10, marginBottom: 10, backgroundColor: 'white' }}></View>
                            <View style={{ width: "90%", alignSelf: "center", height: 140, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20, marginTop: 10, marginBottom: 10, backgroundColor: 'white' }}></View>
                        </SkeletonPlaceholder>
                    </ScrollView>


                    :


                    <ScrollView >
                        {this.state.data2 == "" ?
                            <View style={{ alignItems: 'center', justifyContent: 'center', height: height / 1.5 }}>
                                <Text style={{}}>
                                    You don't have any review
                                </Text>
                            </View>
                            :
                            <View style={{ paddingBottom: 20 }}>
                                {this.createtable2()}
                            </View>
                        }
                    </ScrollView>
                }

            </View>
        )
    }
}






export default Review_screen;
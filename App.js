import React, {Component} from 'react';
import {useEffect} from 'react';
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
  PermissionsAndroid,
  AsyncStorage,
  Platform,
} from 'react-native';
import {Router, Scene, Stack} from 'react-native-router-flux';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Splash from './screens/Splash';
import Patient_Login_Screen from './screens/Patient_Login_Screen';
import Patient_Forgot_Screen from './screens/Patient_Forgot_Screen';
import Patient_ChangePassword_Screen from './screens/Patient_ChangePassword_Screen';
import Patient_SignUp_Screen from './screens/Patient_SignUp_Screen';
import Patient_Tab_Screen from './screens/Patient_Tab_Screen';
import Patient_Home from './screens/Patient_Home';
import Patient_All_Appointment from './screens/Patient_All_Appointment';
import chat from './screens/chat';
import Patient_Profile from './screens/Patient_Profile';
import Verification_Screen from './screens/Verification_Screen';
import Chatroom from './screens/Chatroom';
import Doctor_Appointment_Profile from './screens/Doctor_Appointment_Profile';
import Doctor_By_Category from './screens/Doctor_By_Category';
import patient_site_appointment_detai from './screens/patient_site_appointment_detai';
import Map_Screen from './screens/Map_Screen';
import Roll_Screen from './screens/Roll_Screen';
import enter_number from './screens/enter_number';
import doctor_signup from './screens/doctor_signup';
import add_schedulling from './screens/add_schedulling';
import Docto_All_appointmenst from './screens/Docto_All_appointmenst';
import Doctor_Profile from './screens/Doctor_Profile';
import Doctor_Tab_Screen from './screens/Doctor_Tab_Screen';
import Doctor_Home from './screens/Doctor_Home';
import book_appointment from './screens/book_appointment';
import doctor_site_appointment_detail from './screens/doctor_site_appointment_detail';
import update_Schedule from './screens/update_Schedule';
import favourite_doctors from './screens/favourite_doctors';
import update_patient_profile from './screens/update_patient_profile';
import update_doctor_profile from './screens/update_doctor_profile';
import video_call from './screens/video_call';
import pick_video_call from './screens/pick_video_call';
import payment_done from './screens/payment_done';
import Connection from './connection';
import {Actions} from 'react-native-router-flux';
import About_Us_Screen from './screens/About_Us_Screen';
import Privacy_Policy from './screens/Privacy_Policy';
import Terms_And_Conditions from './screens/Terms_And_Conditions';
import password_verify_screen from './screens/password_verify_screen';
import Vedio_Done from './screens/Vedio_Done';
import Review_screen from './screens/Review_screen';
import All_sponsored_clinics from './screens/All_sponsored_clinics';
import app_intro_slider from './screens/app_intro_slider';
import rescedule_appointment from './screens/rescedule_appointment';
import rescedule_appointment_calendar from './screens/rescedule_appointment_calendar';
import cancel_appointment from './screens/cancel_appointment';
import Notifications from './screens/Notifications';
import doc_notification from './screens/doc_notification';
import video_done_1 from './screens/video_done_1';
import give_review from './screens/give_review';
import Patient_Detail_Screen from './screens/Patient_Detail_Screen';
import All_Reviews from './screens/All_Reviews';
import Delete_Account from './screens/Delete_Account';
import appointment_checkout from './screens/appointment_checkout';
import all_pharmacies from './screens/all_pharmacies';
import product_detail from './screens/product_detail';
import Cart from './screens/Cart';
import Checkout from './screens/Checkout';
import nearby_pharmacies from './screens/nearby_pharmacies';
import Patient_Orders from './screens/Patient_Orders';
import pharmacy_signup from './screens/pharmacy_signup';

import pharmacy_all_orders from './screens/pharmacy_all_orders';
import pharmacy_home from './screens/pharmacy_home';
import pharmacy_tab_screen from './screens/pharmacy_tab_screen';
import pharmacy_profile from './screens/pharmacy_profile';
import All_Categories from './screens/All_Categories';
import filter from './screens/filter';
import Patient_Wallet from './screens/Patient_Wallet';

import Payment from './screens/Payment';

console.disableYellowBox = true;

export default function App() {
  useEffect(async () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // alert('A new FCM message arrived!', JSON.stringify(remoteMessage));

      let notification = JSON.stringify(remoteMessage);

      console.log('notification =>111 ', notification);
      // this.attendcall()
      let finalnotification = JSON.parse(notification);
      let body = finalnotification['notification'].body;
      let title = finalnotification['notification'].title;
      let user = await AsyncStorage.getItem('customer');

      if (user != null) {
        let parsed = JSON.parse(user);

        let id = parsed[0].id;
        let role = parsed[0].role;

        let uploaddata = new FormData();

        uploaddata.append('receiver_id', id);

        let api = Connection + 'rest_apis.php?action=check_call';
        console.log(api);
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
            console.log(response.response);

            let hasRecord = response.response;
            if (hasRecord == 'fail') {
            } else {
              let api = Connection + 'rest_apis.php?action=call_status_change';
              console.log(api);
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
                  console.log('Calling status  ', response.response);
                });

              console.log('calllllllll22222222222222');
              let receiver = hasRecord[0].sender_name;
              let receiver_image = hasRecord[0].sender_image;
              let receiver_id = hasRecord[0].sender_id;
              let sender_id = hasRecord[0].receiver;
              let type = hasRecord[0].type;
              if (receiver_image != null) {
                receiver_image = Connection + 'images/' + receiver_image;
              }

              let room = hasRecord[0].room;
              console.log('calllllllll', room);
              if (type == 'audio') {
                Actions.pick_audio_call({
                  receiver: receiver,
                  receiver_image: receiver_image,
                  room: room,
                });
              } else {
                Actions.pick_video_call({
                  receiver: receiver,
                  role: role,
                  receiver_image: receiver_image,
                  room: room,
                  sender_id: sender_id,
                  receiver_id: receiver_id,
                });
              }
            }
          })
          .catch(error => {
            console.error(error);
          });
      }

      if (Platform.OS === 'ios') {
        PushNotificationIOS.presentLocalNotification({
          title: title, // (optional)
          message: body,
          options: {foreground: true},
        });
        console.log('Platform Ios');
      } else {
        PushNotification.localNotificationSchedule({
          //... You can use all the options from localNotifications
          message: 'My Notification Message', // (required)
          // date:"2022-06-02 14:23:06", // in 60 secs
          allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
          options: {foreground: true},
          foreground: true,
          popInitialNotification: true,
          /* Android Only Properties */
          // repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
        });
        console.log('Platform Android');
      }
    });

    const attendcall = async () => {};

    return unsubscribe;
  }, []);

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <SafeAreaView></SafeAreaView>

      <Router>
        <Stack key="root">
          <Scene
            key="Splash"
            component={Splash}
            title="Splash"
            hideNavBar={true}
          />

          {Platform.OS === 'ios' ? (
            <Scene
              key="Patient_Login_Screen"
              component={Patient_Login_Screen}
              title="Patient_Login_Screen"
              hideNavBar={true}
              type={'replace'}
            />
          ) : (
            <Scene
              key="Patient_Login_Screen"
              component={Patient_Login_Screen}
              title="Patient_Login_Screen"
              hideNavBar={true}
            />
          )}

          <Scene
            key="filter"
            component={filter}
            title="filter"
            hideNavBar={true}
          />

          <Scene
            key="Patient_Forgot_Screen"
            component={Patient_Forgot_Screen}
            title="Patient_Forgot_Screen"
            hideNavBar={true}
          />

          {Platform.OS === 'ios' ? (
            <Scene
              key="Patient_ChangePassword_Screen"
              component={Patient_ChangePassword_Screen}
              title="Patient_ChangePassword_Screen"
              hideNavBar={true}
              type={'replace'}
            />
          ) : (
            <Scene
              key="Patient_ChangePassword_Screen"
              component={Patient_ChangePassword_Screen}
              title="Patient_ChangePassword_Screen"
              hideNavBar={true}
            />
          )}

          {Platform.OS === 'ios' ? (
            <Scene
              key="Patient_SignUp_Screen"
              component={Patient_SignUp_Screen}
              title="Patient_SignUp_Screen"
              hideNavBar={true}
              type={'replace'}
            />
          ) : (
            <Scene
              key="Patient_SignUp_Screen"
              component={Patient_SignUp_Screen}
              title="Patient_SignUp_Screen"
              hideNavBar={true}
            />
          )}

          {Platform.OS === 'ios' ? (
            <Scene
              key="pharmacy_signup"
              component={pharmacy_signup}
              title="pharmacy_signup"
              hideNavBar={true}
              type={'replace'}
            />
          ) : (
            <Scene
              key="pharmacy_signup"
              component={pharmacy_signup}
              title="pharmacy_signup"
              hideNavBar={true}
            />
          )}

          {Platform.OS === 'ios' ? (
            <Scene
              key="Patient_Tab_Screen"
              component={Patient_Tab_Screen}
              title="Patient_Tab_Screen"
              hideNavBar={true}
              type={'replace'}
            />
          ) : (
            <Scene
              key="Patient_Tab_Screen"
              component={Patient_Tab_Screen}
              title="Patient_Tab_Screen"
              hideNavBar={true}
            />
          )}

          <Scene
            key="Patient_Home"
            component={Patient_Home}
            title="Patient_Home"
            hideNavBar={true}
          />
          <Scene
            key="Patient_All_Appointment"
            component={Patient_All_Appointment}
            title="Patient_All_Appointment"
            hideNavBar={true}
          />
          <Scene key="chat" component={chat} title="chat" hideNavBar={true} />
          <Scene
            key="Patient_Profile"
            component={Patient_Profile}
            title="Patient_Profile"
            hideNavBar={true}
          />
          <Scene
            key="Verification_Screen"
            component={Verification_Screen}
            title="Verification_Screen"
            hideNavBar={true}
          />
          <Scene
            key="Chatroom"
            component={Chatroom}
            title="Chatroom"
            hideNavBar={true}
          />
          <Scene
            key="Doctor_Appointment_Profile"
            component={Doctor_Appointment_Profile}
            title="Doctor_Appointment_Profile"
            hideNavBar={true}
          />
          <Scene
            key="Doctor_By_Category"
            component={Doctor_By_Category}
            title="Doctor_By_Category"
            hideNavBar={true}
          />
          <Scene
            key="patient_site_appointment_detai"
            component={patient_site_appointment_detai}
            title="patient_site_appointment_detai"
            hideNavBar={true}
          />
          <Scene
            key="Map_Screen"
            component={Map_Screen}
            title="Map_Screen"
            hideNavBar={true}
          />

          {Platform.OS === 'ios' ? (
            <Scene
              key="pharmacy_tab_screen"
              component={pharmacy_tab_screen}
              title="pharmacy_tab_screen"
              hideNavBar={true}
              type={'replace'}
            />
          ) : (
            <Scene
              key="pharmacy_tab_screen"
              component={pharmacy_tab_screen}
              title="pharmacy_tab_screen"
              hideNavBar={true}
            />
          )}
          <Scene
            key="pharmacy_home"
            component={pharmacy_home}
            title="pharmacy_home"
            hideNavBar={true}
          />
          <Scene
            key="pharmacy_all_orders"
            component={pharmacy_all_orders}
            title="Map_Screen"
            hideNavBar={true}
          />
          <Scene
            key="pharmacy_profile"
            component={pharmacy_profile}
            title="pharmacy_profile"
            hideNavBar={true}
          />

          {Platform.OS === 'ios' ? (
            <Scene
              key="Roll_Screen"
              component={Roll_Screen}
              title="Roll_Screen"
              initial
              hideNavBar={true}
              type={'replace'}
            />
          ) : (
            <Scene
              key="Roll_Screen"
              component={Roll_Screen}
              title="Roll_Screen"
              hideNavBar={true}
            />
          )}

          <Scene
            key="enter_number"
            component={enter_number}
            title="enter_number"
            hideNavBar={true}
          />

          {Platform.OS === 'ios' ? (
            <Scene
              key="doctor_signup"
              component={doctor_signup}
              title="doctor_signup"
              hideNavBar={true}
              type={'replace'}
            />
          ) : (
            <Scene
              key="doctor_signup"
              component={doctor_signup}
              title="doctor_signup"
              hideNavBar={true}
            />
          )}

          {Platform.OS === 'ios' ? (
            <Scene
              key="add_schedulling"
              component={add_schedulling}
              title="add_schedulling"
              hideNavBar={true}
              type={'replace'}
            />
          ) : (
            <Scene
              key="add_schedulling"
              component={add_schedulling}
              title="add_schedulling"
              hideNavBar={true}
            />
          )}

          <Scene
            key="video_call"
            component={video_call}
            title="video_call"
            hideNavBar={true}
          />
          <Scene
            key="pick_video_call"
            component={pick_video_call}
            title="pick_video_call"
            hideNavBar={true}
          />
          <Scene
            key="All_Categories"
            component={All_Categories}
            title="All_Categories"
            hideNavBar={true}
          />

          <Scene
            key="Docto_All_appointmenst"
            component={Docto_All_appointmenst}
            title="Docto_All_appointmenst"
            hideNavBar={true}
          />
          <Scene
            key="Doctor_Profile"
            component={Doctor_Profile}
            title="Doctor_Profile"
            hideNavBar={true}
          />

          {Platform.OS === 'ios' ? (
            <Scene
              key="Doctor_Tab_Screen"
              component={Doctor_Tab_Screen}
              title="Doctor_Tab_Screen"
              hideNavBar={true}
              type={'replace'}
            />
          ) : (
            <Scene
              key="Doctor_Tab_Screen"
              component={Doctor_Tab_Screen}
              title="Doctor_Tab_Screen"
              hideNavBar={true}
            />
          )}

          <Scene
            key="Doctor_Home"
            component={Doctor_Home}
            title="Doctor_Home"
            hideNavBar={true}
          />
          <Scene
            key="book_appointment"
            component={book_appointment}
            title="book_appointment"
            hideNavBar={true}
          />
          <Scene
            key="doctor_site_appointment_detail"
            component={doctor_site_appointment_detail}
            title="doctor_site_appointment_detail"
            hideNavBar={true}
          />
          <Scene
            key="update_Schedule"
            component={update_Schedule}
            title="update_Schedule"
            hideNavBar={true}
          />

          <Scene
            key="update_patient_profile"
            component={update_patient_profile}
            title="update_patient_profile"
            hideNavBar={true}
          />
          <Scene
            key="update_doctor_profile"
            component={update_doctor_profile}
            title="update_doctor_profile"
            hideNavBar={true}
          />

          {Platform.OS === 'ios' ? (
            <Scene
              key="payment_done"
              component={payment_done}
              title="payment_done"
              hideNavBar={true}
              type={'replace'}
            />
          ) : (
            <Scene
              key="payment_done"
              component={payment_done}
              title="payment_done"
              hideNavBar={true}
            />
          )}

          <Scene
            key="favourite_doctors"
            component={favourite_doctors}
            title="favourite_doctors"
            hideNavBar={true}
          />
          <Scene
            key="all_pharmacies"
            component={all_pharmacies}
            title="all_pharmacies"
            hideNavBar={true}
          />

          <Scene key="Cart" component={Cart} title="Cart" hideNavBar={true} />
          <Scene
            key="Checkout"
            component={Checkout}
            title="Checkout"
            hideNavBar={true}
          />

          <Scene
            key="About_Us_Screen"
            component={About_Us_Screen}
            title="About_Us_Screen"
            hideNavBar={true}
          />
          <Scene
            key="Privacy_Policy"
            component={Privacy_Policy}
            title="Privacy_Policy"
            hideNavBar={true}
          />
          <Scene
            key="Terms_And_Conditions"
            component={Terms_And_Conditions}
            title="Terms_And_Conditions"
            hideNavBar={true}
          />

          <Scene
            key="password_verify_screen"
            component={password_verify_screen}
            title="password_verify_screen"
            hideNavBar={true}
          />

          <Scene
            key="Vedio_Done"
            component={Vedio_Done}
            title="Vedio_Done"
            hideNavBar={true}
            type={'replace'}
          />
          <Scene
            key="Review_screen"
            component={Review_screen}
            title="Review_screen"
            hideNavBar={true}
          />

          <Scene
            key="All_sponsored_clinics"
            component={All_sponsored_clinics}
            title="All_sponsored_clinics"
            hideNavBar={true}
          />
          <Scene
            key="app_intro_slider"
            component={app_intro_slider}
            title="app_intro_slider"
            hideNavBar={true}
          />
          <Scene
            key="Payment"
            component={Payment}
            title="Payment"
            hideNavBar={true}
          />

          <Scene
            key="rescedule_appointment"
            component={rescedule_appointment}
            title="rescedule_appointment"
            hideNavBar={true}
          />
          <Scene
            key="rescedule_appointment_calendar"
            component={rescedule_appointment_calendar}
            title="rescedule_appointment_calendar"
            hideNavBar={true}
          />
          <Scene
            key="cancel_appointment"
            component={cancel_appointment}
            title="cancel_appointment"
            hideNavBar={true}
          />
          <Scene
            key="Notifications"
            component={Notifications}
            title="Notifications"
            hideNavBar={true}
          />
          <Scene
            key="doc_notification"
            component={doc_notification}
            title="doc_notification"
            hideNavBar={true}
          />
          <Scene
            key="video_done_1"
            component={video_done_1}
            title="video_done_1"
            hideNavBar={true}
          />
          <Scene
            key="give_review"
            component={give_review}
            title="give_review"
            hideNavBar={true}
          />
          <Scene
            key="Patient_Detail_Screen"
            component={Patient_Detail_Screen}
            title="Patient_Detail_Screen"
            hideNavBar={true}
          />
          <Scene
            key="All_Reviews"
            component={All_Reviews}
            title="All_Reviews"
            hideNavBar={true}
          />
          <Scene
            key="Delete_Account"
            component={Delete_Account}
            title="Delete_Account"
            hideNavBar={true}
          />

          <Scene
            key="nearby_pharmacies"
            component={nearby_pharmacies}
            title="nearby_pharmacies"
            hideNavBar={true}
          />
          <Scene
            key="Patient_Orders"
            component={Patient_Orders}
            title="Patient_Orders"
            hideNavBar={true}
          />

          <Scene
            key="product_detail"
            component={product_detail}
            title="product_detail"
            hideNavBar={true}
          />
          <Scene
            key="appointment_checkout"
            component={appointment_checkout}
            title="appointment_checkout"
            hideNavBar={true}
          />
          <Scene
            key="Patient_Wallet"
            component={Patient_Wallet}
            title="Patient_Wallet"
            hideNavBar={true}
          />
          {Platform.OS === 'ios' ? (
            <Scene
              key="payment_done"
              component={payment_done}
              title="payment_done"
              hideNavBar={true}
              type={'reset'}
            />
          ) : (
            <Scene
              key="payment_done"
              component={payment_done}
              title="payment_done"
              hideNavBar={true}
              type={'reset'}
            />
          )}
        </Stack>
      </Router>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

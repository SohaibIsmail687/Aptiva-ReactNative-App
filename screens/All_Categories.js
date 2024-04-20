import React, {Component} from 'react';

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
  Pressable,
  BackHandler,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  Content,
  Card,
  CardItem,
  Thumbnail,
  Icon,
  Form,
  Container,
  Header,
  Drawer,
} from 'native-base';
import ImageLoad from 'react-native-image-placeholder';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const slides = [
  {
    key: 1,
    name: 'Acupuncture',
    image: require('../assets/Acupuncture.png'),
  },
  {
    key: 2,
    name: 'Adult and Paediatric Services',
    image: require('../assets/adult.png'),
  },
  {
    key: 3,
    name: 'Aesthetic Medicine',
    image: require('../assets/Aesthetic.png'),
  },
  {
    key: 4,
    name: 'Allergy & Immunology',
    image: require('../assets/Allergy.png'),
  },
  {
    key: 5,
    name: 'Anaesthesiology',
    image: require('../assets/Anaesthesiology.png'),
  },
  {
    key: 6,
    name: 'Andrology',
    image: require('../assets/Andrology.png'),
  },
  {
    key: 7,
    name: 'Audiovestibular Medicine',
    image: require('../assets/Audiovestibular-Medicine.png'),
  },
  {
    key: 8,
    name: 'Anti-ageing',
    image: require('../assets/anti-ageing.png'),
  },
  {
    key: 9,
    name: 'Cardiology',
    image: require('../assets/cardiology.png'),
  },
  {
    key: 10,
    name: 'Cardiothoracic Surgery',
    image: require('../assets/cardiothoracic-Surgery.png'),
  },
  {
    key: 11,
    name: 'Child & Adolescent Psychiatry',
    image: require('../assets/child-Adolescent-Psychiatry.png'),
  },
  {
    key: 12,
    name: 'Clinical Analysis',
    image: require('../assets/clinical-Analysis.png'),
  },
  {
    key: 13,
    name: 'Clinical Genetics',
    image: require('../assets/clinical-Genetics.png'),
  },
  {
    key: 14,
    name: 'Clinical Oncology',
    image: require('../assets/clinical-Oncology.png'),
  },
  {
    key: 15,
    name: 'Clinical Pharmacology and Therapeutics',
    image: require('../assets/clinical-Pharmacology-and-Therapeutics.png'),
  },
  {
    key: 16,
    name: 'Colorectal Surgery',
    image: require('../assets/colorectal-Surgery.png'),
  },
  {
    key: 17,
    name: 'Acupuncture',
    image: require('../assets/Acupuncture.png'),
  },
  {
    key: 18,
    name: 'Dermatology',
    image: require('../assets/dermatology.png'),
  },
  {
    key: 19,
    name: 'Diagnostic Imaging',
    image: require('../assets/diagnostic-Imaging.png'),
  },
  {
    key: 20,
    name: 'Endocrinology - Diabetes & Metabolism',
    image: require('../assets/Endocrinology.png'),
  },
  {
    key: 21,
    name: 'Endodontics',
    image: require('../assets/endodontics.png'),
  },
  {
    key: 22,
    name: 'Family medicine',
    image: require('../assets/family-medicine.png'),
  },
  {
    key: 23,
    name: 'Fertility specialist',
    image: require('../assets/fertility-specialist.png'),
  },
  {
    key: 24,
    name: 'Forensic Medicine',
    image: require('../assets/forensic-Medicine.png'),
  },
  {
    key: 25,
    name: 'Gastroenterology',
    image: require('../assets/gastroenterology.png'),
  },
  {
    key: 26,
    name: 'Genitourinary Medicine',
    image: require('../assets/genitourinary.png'),
  },
  {
    key: 27,
    name: 'Geriatrics',
    image: require('../assets/geriatrics.png'),
  },
  {
    key: 28,
    name: 'GP (General Practitioner)',
    image: require('../assets/gp.png'),
  },
  {
    key: 29,
    name: 'Haematology',
    image: require('../assets/hhaematology.png'),
  },
  {
    key: 30,
    name: 'Hepatology',
    image: require('../assets/hepatology.png'),
  },
  {
    key: 31,
    name: 'Homeopathy',
    image: require('../assets/homeopathy.png'),
  },
  {
    key: 32,
    name: 'Alternative Medicine - Herbal or Traditional ',
    image: require('../assets/hHerbal.png'),
  },
  {
    key: 33,
    name: 'Hyperbaric Oxygen Therapy',
    image: require('../assets/hyperbaric-Oxygen-Therapy.png'),
  },
  {
    key: 34,
    name: 'Intensive Care Medicine',
    image: require('../assets/intensive.png'),
  },
  {
    key: 35,
    name: 'Internal Medicine',
    image: require('../assets/internal.png'),
  },
  {
    key: 36,
    name: 'Interventional Radiology',
    image: require('../assets/interventional-Radiology.png'),
  },
  {
    key: 37,
    name: 'Mastology',
    image: require('../assets/mastology.png'),
  },
  {
    key: 38,
    name: 'Medical Oncology',
    image: require('../assets/medical-Oncology.png'),
  },
  {
    key: 39,
    name: 'Nephrology',
    image: require('../assets/nephrology.png'),
  },
  {
    key: 40,
    name: 'Neurology',
    image: require('../assets/Neurology.png'),
  },
  {
    key: 41,
    name: 'Neurophysiology',
    image: require('../assets/Neurophysiology.png'),
  },
  {
    key: 42,
    name: 'Neurosurgery',
    image: require('../assets/Neurosurgery.png'),
  },
  {
    key: 43,
    name: 'Nuclear Medicine',
    image: require('../assets/Nuclear-Medicine.png'),
  },
  {
    key: 44,
    name: 'Nutrition & Dietetics',
    image: require('../assets/diet.png'),
  },
  {
    key: 45,
    name: 'Obstetrics & Gynaecology',
    image: require('../assets/Obstetrics.png'),
  },
  {
    key: 46,
    name: 'Ophthalmology',
    image: require('../assets/Ophthalmology.png'),
  },
  {
    key: 47,
    name: 'Optometry',
    image: require('../assets/Optometry.png'),
  },
  {
    key: 48,
    name: 'Oral & Maxillofacial Surgery',
    image: require('../assets/Maxillofacial-Surgery.png'),
  },
  {
    key: 49,
    name: 'Orthodontics',
    image: require('../assets/Orthodontics.png'),
  },
  {
    key: 50,
    name: 'Orthopaedic Surgery',
    image: require('../assets/Orthopaedic-Surgery.png'),
  },
  {
    key: 51,
    name: 'Osteopathy',
    image: require('../assets/Osteopathy.png'),
  },
  {
    key: 52,
    name: 'Otolaryngology / Ear, Nose and Thoracic. ENT',
    image: require('../assets/Otolaryngology.png'),
  },
  {
    key: 53,
    name: 'Ozone therapy',
    image: require('../assets/Ozone-therapy.png'),
  },
  {
    key: 54,
    name: 'Paediatric Allergy & Immunology',
    image: require('../assets/Allergy.png'),
  },
  {
    key: 55,
    name: 'Paediatric Cardiology',
    image: require('../assets/cardiology.png'),
  },
  {
    key: 56,
    name: 'Paediatric Cardiothoracic Surgery',
    image: require('../assets/cardiothoracic-Surgery.png'),
  },
  {
    key: 57,
    name: 'Paediatric Dermatology',
    image: require('../assets/dermatology.png'),
  },
  {
    key: 58,
    name: 'Paediatric Endocrinology',
    image: require('../assets/Paediatric-Endocrinology.png'),
  },
  {
    key: 59,
    name: 'Paediatric Gastroenterology',
    image: require('../assets/Paediatric-Gastroenterology.png'),
  },
  {
    key: 60,
    name: 'Paediatric Nephrology',
    image: require('../assets/Paediatric-Nephrology.png'),
  },
  {
    key: 61,
    name: 'Paediatric Neurology',
    image: require('../assets/Paediatric-Neurology.png'),
  },
  {
    key: 62,
    name: 'Paediatric Ophthalmology',
    image: require('../assets/Paediatric-Ophthalmology.png'),
  },
  {
    key: 63,
    name: 'Paediatric Orthopaedics',
    image: require('../assets/Paediatric-Orthopaedics.png'),
  },
  {
    key: 64,
    name: 'Paediatric Otolaryngology',
    image: require('../assets/Paediatric-Otolaryngology.png'),
  },
  {
    key: 65,
    name: 'Paediatric Respiratory Medicine',
    image: require('../assets/Paediatric-Respiratory-Medicine.png'),
  },
  {
    key: 66,
    name: 'Paediatric Surgery',
    image: require('../assets/Paediatric-Surgery.png'),
  },
  {
    key: 67,
    name: 'Paediatric Urology',
    image: require('../assets/Paediatric-Urology.png'),
  },
  {
    key: 68,
    name: 'Paediatrics',
    image: require('../assets/Paediatrics.png'),
  },
  {
    key: 69,
    name: 'Pain Medicine',
    image: require('../assets/Pain-Medicine.png'),
  },
  {
    key: 70,
    name: 'Pathology',
    image: require('../assets/Pathology.png'),
  },
  {
    key: 71,
    name: 'Periodontology',
    image: require('../assets/Periodontology.png'),
  },
  {
    key: 72,
    name: 'Phlebology',
    image: require('../assets/Phlebology.png'),
  },
  {
    key: 73,
    name: 'Physical Medicine & Rehabilitation',
    image: require('../assets/Rehabilitation.png'),
  },
  {
    key: 74,
    name: 'Physiotherapy',
    image: require('../assets/Physiotherapy.png'),
  },
  {
    key: 75,
    name: 'Plastic surgery',
    image: require('../assets/Plastic-surgery.png'),
  },
  {
    key: 76,
    name: 'Psychiatry',
    image: require('../assets/Psychiatry.png'),
  },
  {
    key: 77,
    name: 'Psychology',
    image: require('../assets/Psychology.png'),
  },
  {
    key: 78,
    name: 'Pulmonology & Respiratory Medicine',
    image: require('../assets/Pulmonology.png'),
  },
  {
    key: 79,
    name: 'Radiology',
    image: require('../assets/Radiology.png'),
  },
  {
    key: 80,
    name: 'Regenerative Medicine',
    image: require('../assets/Regenerative-Medicine.png'),
  },
  {
    key: 81,
    name: 'Rheumatology',
    image: require('../assets/Rheumatology.png'),
  },
  {
    key: 82,
    name: 'Speech Therapy',
    image: require('../assets/Speech-Therapy.png'),
  },
  {
    key: 83,
    name: 'Sports Medicine',
    image: require('../assets/Sports-Medicine.png'),
  },
  {
    key: 84,
    name: 'Surgery',
    image: require('../assets/Surgery.png'),
  },
  {
    key: 85,
    name: 'Urology',
    image: require('../assets/Urology.png'),
  },
  {
    key: 86,
    name: 'Vascular surgery',
    image: require('../assets/Vascular-surgery.png'),
  },
];

export default class All_Categories extends Component {
  backAction = () => {
    Actions.pop();
    return true;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  componentDidMount = async () => {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  };

  createtable1 = () => {
    let table = [];
    let record1 = slides;
    let len = record1.length;
    if (record1 != 'fail') {
      for (let i = 0; i < len; i++) {
        let name = record1[i].name;
        let image = record1[i].image;

        table.push(
          <View>
            {
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  Actions.All_sponsored_clinics({search: false});
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                  marginHorizontal: 3,
                  width: width / 3.5,
                  height: height / 6,
                  borderRadius: 5,
                  backgroundColor: 'white',
                  paddingVertical: 10,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}>
                <View
                  style={{
                    width: 70,
                    height: 70,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#27aae0',
                    borderRadius: 100,
                  }}>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      alignSelf: 'center',
                      tintColor: 'white',
                    }}
                    resizeMode="contain"
                    source={image}
                  />
                </View>

                <Text
                  style={{
                    color: 'black',
                    fontWeight: '500',
                    fontSize: 12,
                    marginTop: 5,
                    paddingHorizontal: 5,
                  }}
                  numberOfLines={2}>
                  {name}
                </Text>
              </TouchableOpacity>
            }
          </View>,
        );
      }
      return table;
    } else {
      let img = [];
      img.push(
        <View style={{flex: 1, justifyContent: 'center'}}>
          {<View></View>}
        </View>,
      );
      return img;
    }
  };

  //   isCherries=(fruit,val)=>{
  //   return fruit.name == val;
  // }

  Serach_doctor = val => {
    // let name1= val['name']
    // console.log('nameeeeeeeeeeeeeee',val)
    // let name2 = name1.toString()
    // let record1 = slides
    // let len = record1.length
    // for (let i = 0; i < len; i++) {
    //   if(record1[i].name.includes(val)){
    //     let name = record1[i].name
    //     let image = record1[i].image
    //     console.log('nameeeeeeeeeeeeeee',name)
    //   }
    // }
    // const item = slides.name.includes(val);
    // var item = slides.forEach(item => item.name.match(val));
    // console.log('name', item);
  };

  render() {
    return (
      <>
        <StatusBar backgroundColor="#27aae0" barStyle="light-content" />

        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              paddingVertical: 17,
              backgroundColor: '#27aae0',
            }}>
            <Icon
              onPress={() => Actions.pop()}
              name="arrowleft"
              type="AntDesign"
              style={{color: 'white', fontSize: 25}}
            />

            <Text
              style={{
                color: 'white',
                //   fontWeight: "bold",
                fontSize: 18,
              }}>
              Doctor Specialities
            </Text>
            <Text
              style={{
                color: 'white',
                //   fontWeight: "bold",
                fontSize: 18,
              }}></Text>
          </View>
          <ScrollView>
            <View>
              <TouchableOpacity
                onPress={() =>
                  Actions.Doctor_By_Category({
                    category: 'General Orthopedic Surgery',
                  })
                }
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    marginTop: 20,
                    marginLeft: 15,
                  }}>
                  General Orthopedic Surgery
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>
            </View>

            <View>
              <TouchableOpacity
                onPress={() =>
                  Actions.Doctor_By_Category({
                    category: 'Orthopedic Spine Surgery',
                  })
                }
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    marginTop: 20,
                    marginLeft: 15,
                  }}>
                  Orthopedic Spine Surgery
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>
            </View>

            <View>
              <TouchableOpacity
                onPress={() =>
                  Actions.Doctor_By_Category({
                    category: 'Sports Medicine',
                  })
                }
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    marginTop: 20,
                    marginLeft: 15,
                  }}>
                  Sports Medicine
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>
            </View>

            <View>
              <TouchableOpacity
                onPress={() =>
                  Actions.Doctor_By_Category({
                    category: 'Physical Medicine',
                  })
                }
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    marginTop: 20,
                    marginLeft: 15,
                  }}>
                  Physical Medicine
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>
            </View>

            <View>
              <TouchableOpacity
                onPress={() =>
                  Actions.Doctor_By_Category({
                    category: 'Pain Management',
                  })
                }
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    marginTop: 20,
                    marginLeft: 15,
                  }}>
                  Pain Management
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>
            </View>

            <View>
              <TouchableOpacity
                onPress={() =>
                  Actions.Doctor_By_Category({
                    category: 'Urgent Medical Care',
                  })
                }
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    marginTop: 20,
                    marginLeft: 15,
                  }}>
                  Urgent Medical Care
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>
            </View>

            <View>
              <TouchableOpacity
                onPress={() =>
                  Actions.Doctor_By_Category({
                    category: 'Neuropsychology',
                  })
                }
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    marginTop: 20,
                    marginLeft: 15,
                  }}>
                  Neuropsychology
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>
            </View>

            <View>
              <TouchableOpacity
                onPress={() =>
                  Actions.Doctor_By_Category({
                    category: 'Mental Wellnes',
                  })
                }
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    marginTop: 20,
                    marginLeft: 15,
                  }}>
                  Mental Wellnes
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>
            </View>

            <View>
              <TouchableOpacity
                onPress={() =>
                  Actions.Doctor_By_Category({
                    category: 'Physical Therapy',
                  })
                }
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    marginTop: 20,
                    marginLeft: 15,
                  }}>
                  Physical Therapy
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>
            </View>

            <View>
              <TouchableOpacity
                onPress={() =>
                  Actions.Doctor_By_Category({
                    category: 'Wellness',
                  })
                }
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    marginTop: 20,
                    marginLeft: 15,
                  }}>
                  Wellness
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  phoneinput: {
    fontSize: 14,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 0.5,
    paddingHorizontal: 10,

    alignSelf: 'center',

    borderColor: 'gray',
    borderRadius: 4,
  },
});

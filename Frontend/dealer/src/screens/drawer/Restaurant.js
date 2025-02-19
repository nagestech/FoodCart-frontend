import React, {useState} from 'react';
import {Image, ScrollView, StatusBar, View, useColorScheme,TouchableOpacity} from 'react-native';
import {
  Text,
  useTheme,
  Modal,
  Portal,
  TextInput,
  Button,
} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from '../../Images/Imagepicker';

export function Restaurant({navigation}) {
  const theme = useTheme();
  const color = useColorScheme();
  const restaurantProfile = {
    "id": "5240789714",
    "name": "Pasiyaaru",
    "zone": "Sivakasi Main",
    "city": "Sivakasi",
    "banner_img": "https://s3.scoopwhoop.com/anj/onamfood/356fbdba-d570-41b4-888d-138129b70355.jpg",
    "description": "Cooked with love and care",
    "fssai_no" : "15935748625791",
    "fssai_exp" : "25/4/2025",
    "phone_no" : "7092151614",
    "gst_no" : "1593578462159753",
    "address" : "195A, Southcar street",
    "pincode": "626123"
  };
  const [description, setDescription] = useState(restaurantProfile.description);
  const [updateDescription, setUpdateDescription] = useState('');
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [alternatePhoneNo, setAlternatePhoneNo] = useState(restaurantProfile.alternate_phone);
  const [updateAlternatePhoneNo, setUpdateAlternatePhoneNo] = useState('');
  const [alternatePhoneModal, setAlternatePhoneModal] = useState(false);
  const [OTPDisable, setOTPDisable] = useState(true);
  const [OTPBarVisible, setOTPBarVisible] = useState('none');
  const [verifyDisable, setVerifyDisable] = useState(true);
  const [OTP, setOTP] = useState('');
  const [profileImage, setProfileImage] = useState(0);
  const [profileImagePath, setProfileImagePath] = useState({
    uri: restaurantProfile.profile_img,
    response: {},
  });
  const [bannerImage, setBannerImage] = useState(0);
  const [bannerImagePath, setBannerImagePath] = useState({
    uri: restaurantProfile.banner_img,
    response: {},
  });
  const bannerImagePicker = ImagePicker(setBannerImagePath, () => setBannerImageModal(false));
  const [bannerImageModal, setBannerImageModal] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <Portal style={{flex: 1}}>
        <Modal
          visible={alternatePhoneModal}
          onDismiss={() => setAlternatePhoneModal(false)}
          style={{
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(128, 128, 128, 0.4)',
          }}>
          <View
            style={{
              width: '100%',
              backgroundColor: theme.colors.background,
              padding: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              justifyContent: 'space-between',
            }}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              Enter your Alternate phone number
            </Text>
            <View style={{justifyContent: 'space-between', marginTop: 20}}>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  style={{flex: 1}}
                  mode="outlined"
                  label={'Alternate No'}
                  outlineColor="grey"
                  activeOutlineColor="grey"
                  value={updateAlternatePhoneNo}
                  onChangeText={text => {
                    setUpdateAlternatePhoneNo(text);
                    if (text.length == 10) {
                      setOTPDisable(false);
                    } else {
                      setOTPDisable(true);
                      setOTPBarVisible('none');
                    }
                  }}
                  placeholder="Enter Alternate Number"
                  maxLength={10}
                  keyboardType="number-pad"
                />
                <View style={{paddingLeft: 10, marginTop: 10}}>
                  <Button
                    disabled={OTPDisable}
                    mode="contained"
                    style={{borderRadius: 10, height: 40}}
                    onPress={() => {
                      setOTPBarVisible('flex');
                    }}>
                    <Text
                      style={{fontFamily: 'Poppins-Regualar', color: 'white'}}>
                      Get OTP
                    </Text>
                  </Button>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  display: OTPBarVisible,
                  marginTop: 10,
                }}>
                <TextInput
                  keyboardType="number-pad"
                  style={{flex: 1}}
                  mode="outlined"
                  label={'OTP'}
                  outlineColor="grey"
                  activeOutlineColor="grey"
                  placeholder="Enter OTP"
                  maxLength={4}
                  value={OTP}
                  onChangeText={text => {
                    setOTP(text);
                    if (OTP.length == 3) {
                      setVerifyDisable(false);
                    } else {
                      setVerifyDisable(true);
                    }
                  }}
                />
                <View style={{paddingLeft: 10, marginTop: 10}}>
                  <Button
                    disabled={verifyDisable}
                    mode="contained"
                    style={{borderRadius: 10, height: 40}}
                    onPress={() => {
                      if (OTP == '1234') {
                        setAlternatePhoneNo(updateAlternatePhoneNo);
                        setAlternatePhoneModal(false);
                      }
                    }}>
                    <Text
                      style={{fontFamily: 'Poppins-Regualar', color: 'white'}}>
                      Verify
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </Portal>
      <Portal style={flex=1}>
        <Modal
          visible={bannerImageModal}
          onDismiss={() => setBannerImageModal(false)}
          style={{ 
                justifyContent: 'flex-end',
                backgroundColor: 'rgba(128, 128, 128, 0.4)',
         }}>
        <View
            style={{
              width: '100%',
              backgroundColor: theme.colors.background,
              padding: 40,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              justifyContent: 'space-between',
            }}>  
          <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              Capture Or Update Bannerimage
          </Text>   
          <View
           style={{
            marginTop:10,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: 50,    
           }}>       
        <TouchableOpacity onPress={bannerImagePicker.launchCameraPicker}>
            <Icon name="camera" size={30} color={theme.colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={bannerImagePicker.launchImagePicker}>
            <Icon name="photo" size={30} color={theme.colors.secondary}/>
        </TouchableOpacity>
         </View>
         </View>
   </Modal>
   </Portal>
      <TouchableOpacity onPress={() => setBannerImageModal(true)}>
      <View
        style={{
          height: 220,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        }}>
        <Image
          source={{uri: bannerImagePath.uri}}
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            position: 'relative',
          }}
        />
        <View
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View style={{flexDirection: 'row', padding: 10, marginTop: 30}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <MaterialIcons
                name="arrow-back"
                color="white"
                size={30}
                onPress={() => navigation.goBack()}
              />
            </View>
            <View style={{flex: 1, justifyContent: 'center', paddingLeft: 10}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 20,
                  marginTop: 5,
                  color: 'white',
                }}>
                Restaurant
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: 'center',
              paddingLeft: 10,
              paddingRight: 10,
              flexDirection: 'row',
              flex: 1
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 5,
                marginLeft: 10,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  fontFamily: 'Poppins-Bold',
                  color: "white"
                }}
                onPress={() => setDescriptionModal(true)}>
                {description}
              </Text>
            </View>
          </View>
        </View>
      </View>
      </TouchableOpacity>
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 20,
            marginTop: 20,
            textAlign: 'center',
            color: theme.colors.primary,
          }}>
          Restaurant Info
        </Text>
        <View
          style={{
            height: 300,
            backgroundColor: 'rgba(128, 128, 128, 0.1)',
            borderRadius: 20,
            margin: 20,
            padding: 20,
            justifyContent: 'space-evenly',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              Id
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              {restaurantProfile.id}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              Name
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              {restaurantProfile.name}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              Phone No
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              {restaurantProfile.phone_no}{'  '}<Icon name="edit" color={theme.colors.primary} size={20} onPress={()=>setAlternatePhoneModal(true)} />
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              Zone
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              {restaurantProfile.zone}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              City
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              {restaurantProfile.city}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              Address
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              {restaurantProfile.address}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              Pincode
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              {restaurantProfile.pincode}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 20,
            marginTop: 20,
            textAlign: 'center',
            color: theme.colors.primary,
          }}>
          Document info
        </Text>
        <View
          style={{
            height: 200,
            backgroundColor: 'rgba(128, 128, 128, 0.1)',
            borderRadius: 20,
            margin: 20,
            padding: 20,
            justifyContent: 'space-evenly',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              FSSAI no
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              {restaurantProfile.fssai_no}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              FSSAI Expiry Date
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              {' '}
              {restaurantProfile.fssai_exp}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              GST no
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              {restaurantProfile.gst_no}
              {'  '}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  View,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
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

export function Profile({navigation}) {
  const theme = useTheme();
  const color = useColorScheme();
  const dealerProfile = {
    id: '5240789714',
    name: 'Satish V',
    zone: 'Sivakasi Main',
    profile_img:
      'https://img.freepik.com/free-photo/smiling-young-male-cook-wearing-chef-uniform-glasses-holding-spatula-his-thumb-up_141793-80870.jpg?w=996&t=st=1712735829~exp=1712736429~hmac=faa0d8d59beb19545dd6d5342ba86786bdde4f4c98a07f61fb3610908d46c530',
    banner_img:
      'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Cooking well, with love, is an art',
    city: 'Sivakasi',
    phone: '7092151614',
    alternate_phone: '7871862910',
    rating: '4.5',
    bank_name: 'TMB',
    account_number: '381 100050 304726',
    ifsc_code: 'TMBL0000381',
    pan_no: 'PRAPS136',
  };
  const [description, setDescription] = useState(dealerProfile.description);
  const [updateDescription, setUpdateDescription] = useState('');
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [alternatePhoneNo, setAlternatePhoneNo] = useState(
    dealerProfile.alternate_phone,
  );
  const [updateAlternatePhoneNo, setUpdateAlternatePhoneNo] = useState('');
  const [alternatePhoneModal, setAlternatePhoneModal] = useState(false);
  const [OTPDisable, setOTPDisable] = useState(true);
  const [OTPBarVisible, setOTPBarVisible] = useState('none');
  const [verifyDisable, setVerifyDisable] = useState(true);
  const [OTP, setOTP] = useState('');
  const [profileImage, setProfileImage] = useState(0);
  const [profileImagePath, setProfileImagePath] = useState({
    uri: dealerProfile.profile_img,
    response: {},
  });
  const [bannerImage, setBannerImage] = useState(0);
  const [bannerImagePath, setBannerImagePath] = useState({
    uri: dealerProfile.banner_img,
    response: {},
  });
  const bannerImagePicker = ImagePicker(setBannerImagePath, () =>
    setBannerImageModal(false),
  );
  const profileImagePicker = ImagePicker(setProfileImagePath, () =>
    setProfileImageModal(false),
  );
  const [profileImageModal, setProfileImageModal] = useState(false);
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
          visible={descriptionModal}
          onDismiss={() => setDescriptionModal(false)}
          style={{
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              height: 200,
              width: '100%',
              backgroundColor: theme.colors.background,
              padding: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              justifyContent: 'space-between',
            }}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              Enter your description
            </Text>
            <View style={{height: 120, justifyContent: 'space-between'}}>
              <TextInput
                mode="outlined"
                label={'Description'}
                outlineColor="grey"
                activeOutlineColor="grey"
                value={updateDescription}
                onChangeText={text => setUpdateDescription(text)}
                placeholder="Enter Description"
                maxLength={100}
              />
              <Button
                mode="contained"
                style={{borderRadius: 10}}
                onPress={() => {
                  setDescription(updateDescription);
                  setDescriptionModal(false);
                }}>
                <Text style={{fontFamily: 'Poppins-Regualar', color: 'white'}}>
                  Update
                </Text>
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
      <Portal style={{flex: 1}}>
        <Modal
          visible={alternatePhoneModal}
          onDismiss={() => setAlternatePhoneModal(false)}
          style={{
            justifyContent: 'flex-end',
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
      <Portal style={(flex = 1)}>
        <Modal
          visible={profileImageModal}
          onDismiss={() => setProfileImageModal(false)}
          style={{
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              width: '100%',
              backgroundColor: theme.colors.background,
              paddingLeft: 40,
              paddingRight: 40,
              paddingTop: 40,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              justifyContent: 'space-between',
            }}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 20, textAlign: "center", color: theme.colors.onBackground}}>
              Capture Or Upload image
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: 100
              }}>
              <TouchableOpacity onPress={profileImagePicker.launchCameraPicker} style={{backgroundColor: "rgba(128, 100, 100, 0.1)", height: 60, width: 60, borderRadius: 60, justifyContent: "center", alignItems: "center"}}>
                <Icon name="camera" size={30} color={"grey"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={profileImagePicker.launchImagePicker} style={{backgroundColor: "rgba(128, 100, 100, 0.1)", height: 60, width: 60, borderRadius: 60, justifyContent: "center", alignItems: "center"}}>
                <Icon name="photo" size={30} color="grey" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Portal>
      <Portal style={(flex = 1)}>
        <Modal
          visible={bannerImageModal}
          onDismiss={() => setBannerImageModal(false)}
          style={{
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              width: '100%',
              backgroundColor: theme.colors.background,
              paddingLeft: 40,
              paddingRight: 40,
              paddingTop: 40,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              justifyContent: 'space-between',
            }}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 20, textAlign: "center", color: theme.colors.onBackground}}>
              Capture Or Upload image
            </Text>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: 100,
              }}>
              <TouchableOpacity onPress={bannerImagePicker.launchCameraPicker} style={{backgroundColor: "rgba(128, 100, 100, 0.1)", height: 60, width: 60, borderRadius: 60, justifyContent: "center", alignItems: "center"}}>
                <Icon name="camera" size={30} color={"grey"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={bannerImagePicker.launchImagePicker} style={{backgroundColor: "rgba(128, 100, 100, 0.1)", height: 60, width: 60, borderRadius: 60, justifyContent: "center", alignItems: "center"}}>
                <Icon name="photo" size={30} color={"grey"} />
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
              <View
                style={{flex: 1, justifyContent: 'center', paddingLeft: 10}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 20,
                    marginTop: 5,
                    color: 'white',
                  }}>
                  Profile
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                paddingLeft: 10,
                paddingRight: 10,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: 110,
                  width: 110,
                  borderRadius: 100,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => setProfileImageModal(true)}>
                  <Image
                    source={{uri: profileImagePath.uri}}
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 100,
                      objectFit: 'cover',
                    }}
                  />
                </TouchableOpacity>
              </View>
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
                    color: 'white',
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
          Dealer Info
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
              Id
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              {dealerProfile.id}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              Name
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              {dealerProfile.name}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              Zone
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              {dealerProfile.zone}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              City
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              {dealerProfile.city}
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
          Personal Details
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
              Phone
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              {dealerProfile.phone}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              Alternate phone
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              {alternatePhoneNo}
              {'  '}
              <Icon
                name="edit"
                size={20}
                color={theme.colors.primary}
                style={{paddingLeft: 20}}
                onPress={() => setAlternatePhoneModal(true)}
              />
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              Rating
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              <Icon
                name="star"
                size={20}
                color={'gold'}
                style={{paddingLeft: 20}}
              />{' '}
              {dealerProfile.rating}
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
          Bank Details
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
              Bank Name
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              {dealerProfile.bank_name}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              Account No.
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              {dealerProfile.account_number}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              IFSC Code
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              {dealerProfile.ifsc_code}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              PAN Card NO
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              {dealerProfile.pan_no}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

import React, {useState} from 'react';
import {Image, ScrollView, StatusBar, View, useColorScheme} from 'react-native';
import {
  Text,
  useTheme,
  Modal,
  Portal,
  TextInput,
  Button,
} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {bannerImg, profileImg} from '../../Images/Images';
import Icon from 'react-native-vector-icons/FontAwesome';

export function Profile({navigation}) {
  const theme = useTheme();
  const color = useColorScheme();
  const [vehicleNo, setVehicleNo] = useState('TN84Z9907');
  const [updateVehicleNo, setUpdateVehicleNo] = useState('');
  const [vehicleModal, setVehicleModal] = useState(false);
  const [alternatePhoneNo, setAlternatePhoneNo] = useState('7532694108');
  const [updateAlternatePhoneNo, setUpdateAlternatePhoneNo] = useState('');
  const [alternatePhoneModal, setAlternatePhoneModal] = useState(false);
  const [OTPDisable, setOTPDisable] = useState(true);
  const [OTPBarVisible, setOTPBarVisible] = useState('none');
  const [verifyDisable, setVerifyDisable] = useState(true);
  const [OTP, setOTP] = useState('');
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <Portal style={{flex: 1}}>
        <Modal
          visible={vehicleModal}
          onDismiss={() => setVehicleModal(false)}
          style={{
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(128, 128, 128, 0.4)',
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
              Enter your Vehicle number
            </Text>
            <View style={{height: 120, justifyContent: 'space-between'}}>
              <TextInput
                mode="outlined"
                label={'Vehicle No'}
                outlineColor="grey"
                activeOutlineColor="grey"
                value={updateVehicleNo}
                onChangeText={text => setUpdateVehicleNo(text)}
                placeholder="Enter Vehicle Number"
              />
              <Button
                mode="contained"
                style={{borderRadius: 10}}
                onPress={() => {
                  setVehicleNo(updateVehicleNo);
                  setVehicleModal(false);
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
                    onPress={()=>{if(OTP == "1234") {
                      setAlternatePhoneNo(updateAlternatePhoneNo);
                      setAlternatePhoneModal(false);
                    }}}>
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
      <View
        style={{
          height: 170,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        }}>
        <Image
          source={bannerImg}
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
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
                Profile
              </Text>
            </View>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                height: 160,
                width: 160,
                borderRadius: 160,
                backgroundColor: 'rgba(255, 152, 67, 1)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={profileImg}
                style={{
                  height: 150,
                  width: 150,
                  borderRadius: 150,
                  shadowColor: 'black',
                }}
              />
            </View>
          </View>
        </View>
      </View>
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: 120,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(255, 152, 67, 0.1)',
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 25,
                color: theme.colors.primary,
              }}>
              Ride
            </Text>
          </View>
          <View style={{width: 150, alignItems: 'center', marginTop: 80}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 20,
                color: color == 'dark' ? 'white' : 'grey',
              }}>
              With
            </Text>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 25,
                color: theme.colors.primary,
              }}>
              Pride
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
          Rider Info
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
              Name
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              Nageswaran
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              Id
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              FEIEYSNSRS
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              Zone
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              Sivakasi Main
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              City
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              Sivakasi
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              Vehicle number
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              {vehicleNo}
              {'  '}{' '}
              <Icon
                name="edit"
                size={20}
                color={theme.colors.primary}
                style={{paddingLeft: 20}}
                onPress={() => setVehicleModal(true)}
              />
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
              9498340934
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
              DL Expiry
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              2040-10-29
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
                color={theme.colors.primary}
                style={{paddingLeft: 20}}
              />{' '}
              4.3
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
              INDIAN OVERSEAS BANK
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              Account No.
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              008501000062741
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              IFSC Code
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              IOBA0000085
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              PAN Card NO.
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
              BZKPN0242H
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

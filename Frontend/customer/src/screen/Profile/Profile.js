import React, { useCallback, useEffect, useState } from 'react';
import { Image, StatusBar, View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Button, Text, TextInput, Snackbar } from 'react-native-paper';
import { Logo } from '../../const/Images';
import { colors } from '../../const/Colors';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import { getData, initData, updateData } from '../../const/AsyncStorage';

export function Profile({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const [fullNameValid, setFullNameValid] = useState(colors.grey);
  const [addressValid, setAddressValid] = useState(colors.grey);
  const [cityValid, setCityValid] = useState(colors.grey);
  const [pincodeValid, setPincodeValid] = useState(colors.grey);
  const [count, setCount] = useState(0);
  const [profileData, setProfileData] = useState({});

  useEffect( () => {
    axios.get('http://192.168.1.43:3000/user?1234567890')
      .then( async function (response) {
        console.log(response.data[0], count);
            setProfileData(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
    if (/^[a-zA-Z]+$/.test(fullName) && fullName.length >= 3) {
      setFullNameValid(colors.green);
    } 
    else if (fullName === "" ) {
      setFullNameValid(colors.grey);
    }
    else {
      setFullNameValid(colors.red);
    }

    if (address.length >= 1) {
      setAddressValid(colors.green);
    } 
    else if (address === "") {
      setAddressValid(colors.grey);
    }
    else {
      setAddressValid(colors.red);
    }

    if (/^[a-zA-Z]+$/.test(city) && city.length >= 5) {
      setCityValid(colors.green);
    } 
    else if (city === "") {
      setCityValid(colors.grey);
    }
    else {
      setCityValid(colors.red);
    }

    if (/^\d{6}$/.test(pincode)) {
      setPincodeValid(colors.green);
    } 
    else if (pincode === "") {
      setPincodeValid(colors.grey);
    }
    else {
      setPincodeValid(colors.red);
    }
    
  }, [fullName, address, city, pincode]);

  const ProfileVerification = async () => {
    const mobile = await getData("mobile");
    if(fullNameValid === colors.green  && addressValid === colors.green && cityValid === colors.green && pincodeValid === colors.green && aniversaryValid === colors.green){
      
    }
    else if( fullNameValid === colors.grey || addressValid === colors.grey || cityValid === colors.grey || pincodeValid === colors.grey){
      setSnackbarMessage("Enter all fields")
      setVisibleSnackbar(true);
    }
    else {
      if( fullNameValid === colors.red){
        setSnackbarMessage("Your name should be more than 3 letters")
        setVisibleSnackbar(true);
      }
      else {
        if( cityValid === colors.red){
          setSnackbarMessage("Your city name should be more than 5 letters")
          setVisibleSnackbar(true);
        }
        else{
          if( pincodeValid === colors.red){
            setSnackbarMessage("Your pincode should be exactly 6 digits")
            setVisibleSnackbar(true);
          }
        }
      }
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity style={{ height: 50, width: 50 }} onPress={() => navigation.goBack()}>
        <Image source={Logo} style={{ height: 50, width: 50 }} />
      </TouchableOpacity>
      <Text style={{ marginTop: 10, fontSize: 25, fontFamily: 'Poppins-Regular', color: colors.black }}>
        Profile
      </Text>

      <View style={{width: '100%', height: '70%'}}>
      <ScrollView style={{ height: '80%', width: '100%', borderRadius: 20, paddingLeft: 20, paddingRight: 20}}>
        <TextInput
          style={{ marginVertical: 10 }}
          mode="outlined"
          label="Full Name"
          placeholder="Enter your Full Name"
          outlineColor={fullNameValid}
          activeOutlineColor={fullNameValid}
          value={fullName}
          onChangeText={(value) => {
            const nameValue = value.replace(/[^a-zA-Z]/g, '');
            setFullName(nameValue);
          }}
        />
        <TextInput
          style={{ marginVertical: 10 }}
          mode="outlined"
          label="Address"
          placeholder={profileData.address}
          outlineColor={addressValid}
          activeOutlineColor={addressValid}
          value={address}
          onChangeText={(value) => setAddress(value)}
        />
        <TextInput
          style={{ marginVertical: 10 }}
          mode="outlined"
          label="City"
          placeholder={profileData.city}
          outlineColor={cityValid}
          activeOutlineColor={cityValid}
          value={city}
          onChangeText={(value) => {
            const cityValue = value.replace(/[^a-zA-Z]/g, '');
            setCity(cityValue);
          }}
        />
        <TextInput
          style={{ marginVertical: 10 }}
          mode="outlined"
          label="Pincode"
          placeholder={profileData.pincode}
          outlineColor={pincodeValid}
          activeOutlineColor={pincodeValid}
          value={pincode}
          onChangeText={(value) => {
            const pincodeValue = value.replace(/[^0-9]/g, '');
            setPincode(pincodeValue);
          }}
        />

        <Button mode="contained" style={{ backgroundColor: colors.red, marginTop: 20 }} onPress={ProfileVerification}>
          <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: colors.white }}>
            Update Profile
          </Text>
        </Button>
      </ScrollView>
      </View>
      <Snackbar
        visible={visibleSnackbar}
        onDismiss={() => setVisibleSnackbar(false)}
        duration={5000}
        style={{ backgroundColor: colors.black }}
      >
        <Text
          style={{
            color: colors.white,
            fontSize: 16,
            fontFamily: 'Poppins-Regular',
            textAlign: 'center',
          }}
        >
          {snackbarMessage}
        </Text>
      </Snackbar>
    </View>
  );
}

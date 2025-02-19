import React, { useCallback, useEffect, useState } from 'react';
import { Image, StatusBar, View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Button, Text, TextInput, Snackbar } from 'react-native-paper';
import { Logo } from '../../const/Images';
import { colors } from '../../const/Colors';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import { getData, initData, updateData } from '../../const/AsyncStorage';

export function Signup({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [disable, setDisable] = useState(false);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const [fullNameValid, setFullNameValid] = useState(colors.grey);
  const [addressValid, setAddressValid] = useState(colors.grey);
  const [cityValid, setCityValid] = useState(colors.grey);
  const [pincodeValid, setPincodeValid] = useState(colors.grey);

  const [dob, setDOB] = useState(new Date());
  const [dobValid, setDOBValid] = useState(colors.grey);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect( () => {
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

    if (dob.getTime() < new Date().getTime() && 10 < new Date().getFullYear() - dob.getFullYear() ) {
      setDOBValid(colors.green);
    } else {
      setDOBValid(colors.red);
    }
    
  }, [fullName, address, city, pincode, dob]);

  const disableName = async () => {
    const name = await getData("name");
    if ( name !== "dummy" && name !== "" & name !== undefined ) {
      setFullName(name);
      setDisable(true);
    }
  }
  disableName();
  const SignupVerification = async () => {
    const mobile = await getData("mobile");
    if(fullNameValid === colors.green  && addressValid === colors.green && cityValid === colors.green && pincodeValid === colors.green && dobValid === colors.green){
      axios.post('http://192.168.1.43:3000/user', {
        fullName: fullName,
        address: address,
        city : city,
        pincode: parseInt(pincode),
        dob: dob,
        mobileno: parseInt(mobile)
      })
      .then( async function (response) {
        console.log(response.status);
        setSnackbarMessage("Successfully Submited")
        setVisibleSnackbar(true);
         await updateData("signup", "success");
        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else if( fullNameValid === colors.grey || lastNameValid === colors.grey || addressValid === colors.grey || cityValid === colors.grey || pincodeValid === colors.grey){
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
          else{
            if( dob === colors.red){
              setSnackbarMessage("Your age should be in range of 10 - 100 years old")
              setVisibleSnackbar(true);
            }
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
        Let's Signup
      </Text>

      <View style={{width: '100%', height: '70%'}}>
      <ScrollView style={{ height: '80%', width: '100%', borderRadius: 20, paddingLeft: 20, paddingRight: 20}}>
        <TextInput
          style={{ marginVertical: 10 }}
          mode="outlined"
          label="Full Name"
          placeholder="Enter your Full Name : "
          disabled={disable}
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
          placeholder="Enter your Address :"
          outlineColor={addressValid}
          activeOutlineColor={addressValid}
          value={address}
          onChangeText={(value) => setAddress(value)}
        />
        <TextInput
          style={{ marginVertical: 10 }}
          mode="outlined"
          label="City"
          placeholder="Enter your City : "
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
          placeholder="Enter your Pincode"
          outlineColor={pincodeValid}
          activeOutlineColor={pincodeValid}
          value={pincode}
          onChangeText={(value) => {
            const pincodeValue = value.replace(/[^0-9]/g, '');
            setPincode(pincodeValue);
          }}
        />

        <TextInput
          style={{ marginVertical: 10 }}
          mode="outlined"
          label="Date of Birth"
          placeholder="Select your Date of Birth"
          outlineColor={dobValid}
          activeOutlineColor={dobValid}
          value={dob.toDateString()}
          onTouchStart={() => setModalVisible(true)}
        />

        <Modal style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }} animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <StatusBar translucent={true} backgroundColor='rgba(0, 0, 0, 0.3)' barStyle={'light-content'} />
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent: 'center', alignItems: 'center', }}>
            <View style={{height: 200, backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center', padding: 20, borderRadius: 20}}>
            <DatePicker
              textColor={colors.black}
              style={{width:250}}
              date={dob}
              mode="date"
              onDateChange={(selectedDate) => {
                setDOB(selectedDate);
                setModalVisible(false);
              }}
            />
            </View>
          </View>
        </Modal>

        <Button mode="contained" style={{ backgroundColor: colors.red, marginTop: 20 }} onPress={SignupVerification}>
          <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: colors.white }}>
            Signup
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

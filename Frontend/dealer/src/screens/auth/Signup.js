import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import {
  Button,
  PaperProvider,
  Text,
  TextInput,
  useTheme,
  Portal,
  Modal,
  Snackbar,
} from 'react-native-paper';
import {SelectList} from 'react-native-dropdown-select-list';
import Icon from "react-native-vector-icons/FontAwesome";
import {OtpInput} from 'react-native-otp-entry';

export function Signup({navigation}) {
  const color = useColorScheme();
  const theme = useTheme();
  const [fullName, setFullName] = useState('');
  const [fullNameValid, setFullNameValid] = useState('grey');
  const [selected, setSelected] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumBorder, setMobileNumBorder] = useState('grey');
  const mobileNumRef = useRef();
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [disableOTP, setDisableOTP] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);
  const [isTimerActive, setTimerActive] = useState(false);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState('');
  const [mobileNumberDisable, setMobileNumberDisable] = useState(false);
  const [verifiedMobileNum, setVerifiedMobileNum] = useState("");
  useEffect(() => {
    if (
      /^[a-zA-Z]+(\s{1,1}[a-zA-Z]+)*$/.test(fullName) &&
      fullName.length >= 3
    ) {
      setFullNameValid('green');
    } else if (fullName === '') {
      setFullNameValid('grey');
    } else {
      setFullNameValid('red');
    }

    if (mobileNumber.length === 10) {
      setMobileNumBorder('green');
      if (otp == '') {
        if(mobileNumber == verifiedMobileNum) {
          setDisableOTP(true);
        }
        else {
          setDisableOTP(false);
          setVerifiedMobileNum("");
        }
      }
    } else if (mobileNumber === '') {
      setMobileNumBorder('grey');
    } else {
      setMobileNumBorder('red');
    }

    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setVisibleModal(false);
      setTimerActive(false);
      setTimer(60);
      setOtp('');
      clearInterval(interval);
      setVisibleSnackbar(true);
      setSnackbarMessage('Timedout');
    }

    return () => clearInterval(interval);
  }, [mobileNumber, isTimerActive, timer, fullName]);

  const showModal = () => {
    setTimerActive(true);
    setVisibleModal(true);
  };

  const hideModal = () => {
    setTimerActive(false);
    setVisibleModal(false);
    setTimer(60);
  };

  const data = [
    {key: '1', value: 'Location'},
    {key: '2', value: 'Sivakasi'},
  ];
  const Step1 = () => {
    if (fullName == '') {
      setSnackbarMessage('Enter your name');
      setVisibleSnackbar(true);
    } else {
      if (selected == '' || selected == 'Location') {
        setSnackbarMessage('Select your restaurant location');
        setVisibleSnackbar(true);
      } else {
        if (mobileNumber == '') {
          setSnackbarMessage('Enter your mobile number');
          setVisibleSnackbar(true);
        }
        if (mobileNumber.length < 10) {
          setSnackbarMessage('Enter valid mobile number');
          setVisibleSnackbar(true);
        }
        if (mobileNumber !== verifiedMobileNum) {
          setSnackbarMessage('Verify mobile number');
          setVisibleSnackbar(true);
        }
      }
    }

    if (
      selected !== '' &&
      selected !== 'Location' &&
      fullNameValid == 'green' &&
      mobileNumber == verifiedMobileNum
    ) {
      navigation.navigate('Signup2');
    }
  };
  const verifyOTP = () => {
    if ('1234' == String(otp)) {
      hideModal();
      setMobileNumberDisable(true);
      setDisableOTP(true);
      setVerifiedMobileNum(mobileNumber);
      setOtp("");
    }
    else {
      setOtp("");
      setVerifiedMobileNum("");
    }
  };
  return (
    <PaperProvider theme={theme}>
      <Portal style={{flex: 1}}>
        <Modal
          visible={visibleModal}
          onDismiss={hideModal}
          statusBarTranslucent={true}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor:
              color === 'dark' ? 'rgba(169, 169, 169, 0.2)' : 'transparent',
          }}>
          <View
            style={{
              height: 350,
              width: '100%',
              backgroundColor: theme.colors.background,
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}>
            <Text
              style={{
                color: theme.colors.onBackground,
                fontFamily: 'Poppins-Regular',
                fontSize: 20,
              }}>
              Enter OTP sent on +91 {mobileNumber}
            </Text>
            <View style={{width: 250, marginTop: 20}}>
              <OtpInput
                numberOfDigits={4}
                focusColor="green"
                onTextChange={text => setOtp(text)}
              />
            </View>
            <Text
              style={{
                color: theme.colors.onBackground,
                fontFamily: 'Poppins-Regular',
                marginTop: 20,
              }}>
              Request OTP in {timer} secs
            </Text>
            <Button
              disabled={disableOTP}
              mode="contained"
              style={{marginTop: 20, borderRadius: 10, width: '100%'}}
              onPress={verifyOTP}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontFamily: 'Poppins-Regular',
                }}>
                Verify OTP
              </Text>
            </Button>
          </View>
        </Modal>
      </Portal>

      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          backgroundColor: theme.colors.background,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{width: '90%', padding: 10}}>
          <ScrollView>
            <Text
              style={{
                color: theme.colors.primary,
                fontFamily: 'Poppins-Bold',
                fontSize: 30,
              }}>
              FoodCart
            </Text>
            <Text
              style={{
                color: theme.colors.onBackground,
                fontFamily: 'Poppins-Regular',
                fontSize: 20,
              }}>
              Register with us
            </Text>
            <Text
              style={{
                color: theme.colors.onBackground,
                fontFamily: 'Poppins-Regular',
                fontSize: 15,
                marginBottom: 10,
              }}>
              Step{'  '}
              <Text
                style={{
                  color: theme.colors.primary,
                  fontSize: 15,
                  fontFamily: 'Poppins-Bold',
                }}>
                1
              </Text>{' '}
              / 3
            </Text>
            <TextInput
              style={{marginVertical: 10}}
              mode="outlined"
              label="Full Name"
              placeholder="Enter Full Name"
              outlineColor={fullNameValid}
              activeOutlineColor={fullNameValid}
              value={fullName}
              onChangeText={value => {
                const nameValue = value.replace(/[^a-zA-Z\s]/g, '');
                const formattedName = nameValue.replace(/\s{2,}/g, ' ');
                setFullName(formattedName);
              }}
            />

            <SelectList
              setSelected={val => setSelected(val)}
              data={data}
              save="value"
              searchPlaceholder="Location"
              searchicon={
                <Icon
                  name="search"
                  size={20}
                  color={theme.colors.primary}
                  style={{marginRight: 20}}
                />
              }
              closeicon={
                <Icon name="close" size={20} color={theme.colors.primary} />
              }
              arrowicon={
                <Icon
                  name="chevron-down"
                  size={20}
                  color={theme.colors.primary}
                />
              }
              placeholder="Select Restaurant Location"
              boxStyles={{borderRadius: 5}}
            />
            <TextInput
              mode="outlined"
              maxLength={10}
              label="Mobile Number"
              outlineColor={mobileNumBorder}
              activeOutlineColor={mobileNumBorder}
              placeholder="Enter Mobile Number"
              textColor={theme.colors.onBackground}
              style={{
                backgroundColor: theme.colors.background,
                marginTop: 5,
                fontFamily: 'Poppins-Regular',
                width: '100%',
              }}
              keyboardType="numeric"
              value={mobileNumber}
              onChangeText={value => {
                const numericValue = value.replace(/[^0-9]/g, '');
                setMobileNumber(numericValue);
              }}
              ref={ref => (mobileNumRef.current = ref)}
            />
            <Button
              disabled={disableOTP}
              mode="contained"
              style={{marginTop: 10, borderRadius: 10, width: '35%'}}
              onPress={showModal}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontFamily: 'Poppins-Regular',
                }}>
                Get OTP
              </Text>
            </Button>
            <Button
              mode="contained"
              style={{marginTop: 40, borderRadius: 10}}
              onPress={Step1}>
              <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
                Next Step
              </Text>
            </Button>
          </ScrollView>
        </View>
        <Snackbar
          visible={visibleSnackbar}
          onDismiss={() => setVisibleSnackbar(false)}
          duration={1000}
          style={{backgroundColor: 'grey', marginBottom: 20}}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
              textAlign: 'center',
            }}>
            {snackbarMessage}
          </Text>
        </Snackbar>
      </SafeAreaView>
    </PaperProvider>
  );
}

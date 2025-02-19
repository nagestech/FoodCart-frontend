import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StatusBar, Platform, Image} from 'react-native';
import {
  Button,
  Text,
  TextInput,
  useTheme,
  Snackbar,
  Modal,
  Portal,
  Provider as PaperProvider,
} from 'react-native-paper';
import {OtpInput} from 'react-native-otp-entry';
import {useColorScheme, View} from 'react-native';

export function Login({navigation}) {
  const color = useColorScheme();
  const theme = useTheme();
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumBorder, setMobileNumBorder] = useState('grey');
  const mobileNumRef = useRef();
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [disableOTP, setDisableOTP] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);
  const [isTimerActive, setTimerActive] = useState(false);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (mobileNumber.length === 10) {
      setMobileNumBorder('green');
      setDisableOTP(false);
    } else if (mobileNumber === '') {
      setMobileNumBorder('grey');
      setDisableOTP(true);
    } else {
      setMobileNumBorder('red');
      setDisableOTP(true);
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
      clearInterval(interval);
      setVisibleSnackbar(true);
      setSnackbarMessage('Timedout');
    }

    return () => clearInterval(interval);
  }, [mobileNumber, isTimerActive, timer]);

  const showModal = () => {
    setTimerActive(true);
    setVisibleModal(true);
  };

  const hideModal = () => {
    setTimerActive(false);
    setVisibleModal(false);
    setTimer(60);
  };

  return (
    <PaperProvider theme={theme}>
      <StatusBar
        translucent={true}
        barStyle={color === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={'transparent'}
      />
      <Portal style={{flex: 1}}>
        <Modal
          visible={visibleModal}
          onDismiss={hideModal}
          statusBarTranslucent={true}
          style={{
            flex: 1,
            justifyContent: 'center',
            padding: 10, 
            backgroundColor:
              color === 'dark' ? 'rgba(169, 169, 169, 0.2)' : 'transparent',
          }}>
          <StatusBar
            translucent={true}
            barStyle={color === 'dark' ? 'light-content' : 'dark-content'}
            backgroundColor={
              color === 'dark' ? 'rgba(169, 169, 169, 0.2)' : 'transparent'
            }
          />
          <View
            style={{
              height: 350,
              width: '100%',
              backgroundColor: theme.colors.background,
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 40,
            }}>
            <Text
              style={{
                color: theme.colors.onBackground,
                fontFamily: 'Poppins-Regular',
                fontSize: 15,
              }}>
              Enter OTP sent on +91 {mobileNumber}
            </Text>
            <View style={{width: 250, marginTop: 20}}>
              <OtpInput
                numberOfDigits={4}
                focusColor="green"
                onTextChange={text => {
                  setOtp(text);
                }}
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
              onPress={()=>{
                if(otp == "1234") {
                  navigation.replace("Home");
                }
              }}>
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
          backgroundColor: theme.colors.background,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 20,
          paddingRight: 20,
        }}>
          <Image source={{uri: "https://zubene.co/images/cta-moc-1-1.png"}} style={{height: "30%", width: "80%", objectFit: "contain"}} />
        <Text
          style={{
            textAlign: 'center',
            color: theme.colors.primary,
            fontFamily: 'Poppins-Bold',
            fontSize: 45,
          }}>
          FoodCart
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: theme.colors.onBackground,
            fontFamily: 'Poppins-Regular',
            fontSize: 20,
          }}>
          Delivery Partner
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: theme.colors.primary,
            fontFamily: 'Poppins-Bold',
            fontSize: 25,
            marginTop: 20
          }}>
          LOGIN
        </Text>
        <TextInput
          mode="outlined"
          maxLength={10}
          outlineColor={mobileNumBorder}
          activeOutlineColor={mobileNumBorder}
          placeholder="Mobile Number"
          placeholderTextColor={theme.colors.onBackground}
          textColor={theme.colors.onBackground}
          style={{
            backgroundColor: theme.colors.background,
            marginTop: 20,
            fontSize: 18,
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
          style={{marginTop: 40, borderRadius: 10, width: '100%'}}
          onPress={showModal}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontFamily: 'Poppins-Regular',
            }}>
            Send OTP
          </Text>
        </Button>
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

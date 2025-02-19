import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Image, View } from 'react-native';
import {
  Button,
  Provider as PaperProvider,
  Modal,
  Portal,
  Text,
  TextInput,
  Snackbar,
  IconButton,
} from 'react-native-paper';
import { colors } from '../../const/Colors';
import { Welcome } from '../../const/Images';
import Animated, { FadeInUp, LightSpeedInLeft, LightSpeedInRight } from 'react-native-reanimated';
import { updateData } from '../../const/AsyncStorage';

export function Login({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [activeInput, setActiveInput] = useState(0);
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumBorder, setMobileNumBorder] = useState(colors.grey);
  const [isTimerActive, setTimerActive] = useState(false);
  const [timer, setTimer] = useState(60);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const inputs = useRef([]);
  const mobileNumRef = useRef();

  useEffect(() => {
    let interval;
    if (otp[0] === '') {
      inputs[0]?.focus();
      setActiveInput(0);
    }
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setTimerActive(false);
      clearInterval(interval);
      setSnackbarMessage('Timedout');
      showSnackbar();
      handleMobileNumberClick();
    }

    if (mobileNumber.length === 10) {
      setMobileNumBorder(colors.green);
    } 
    else if(mobileNumber == "") {
      setMobileNumBorder(colors.grey);
    }
    else {
      setMobileNumBorder(colors.red);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isTimerActive, timer, mobileNumber, visible]);

  const handleOtpChange = useCallback(
    (index, value) => {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== '' && index < 3) {
        setActiveInput(index + 1);
        inputs[index + 1]?.focus();
      }
    },
    [otp, inputs],
  );

  const handleBackspace = useCallback(
    (index) => {
      if (index > 0 ) {
        setActiveInput(index - 1);
        inputs[index-1]?.focus();
        inputs[index]?.clear();
        setActiveInput(index - 1);
      }
    },
    [otp, inputs],
  );

  const showSnackbar = useCallback(() => {
    setVisibleSnackbar(true);
    setTimeout(() => {
      setVisibleSnackbar(false);
    }, 5000);
  }, []);

  const handleMobileNumberClick = useCallback(() => {
    setVisible(false);
    setTimerActive(false);
    setTimer(timer);
    setOtp(['', '', '', '']);
  }, []);

  const hideModal = useCallback(() => {
    setVisible(false);
    setTimerActive(false);
    setTimer(timer);
    setOtp(['', '', '', '']);
  }, []);

  const showModal = useCallback(() => {
    if (mobileNumber.length === 10) {
      setVisible(true);
      setTimerActive(true);
    } else {
      setSnackbarMessage('Please enter correct mobile number');
      showSnackbar();
    }
  }, [mobileNumber, showSnackbar]);

  const otpVerification = async () => {
    if (
      otp[0] === '1' &&
      otp[1] === '2' &&
      otp[2] === '3' &&
      otp[3] === '4'
    ) {
      await updateData("slide", "hide");
      await updateData("mobile", mobileNumber);
      console.log('Right');
      hideModal();
      setSnackbarMessage('Success');
      showSnackbar();
      setTimeout(() => {
        navigation.replace('Home');
      }, 500);
    } else if (otp[0] === '' || otp[1] === '' || otp[2] === '' || otp[3] === '') {
      console.log('Failed');
      setSnackbarMessage('Enter OTP');
      showSnackbar();
    } else {
      console.log('Failed');
      setSnackbarMessage('Wrong OTP');
      showSnackbar();
      setOtp(['', '', '', '']);
      inputs[0]?.focus();
      setActiveInput(0);
    }
  };

  return (
    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} style={{ alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: colors.white,
              padding: 30,
              borderRadius: 25,
              width: '80%',
            }}
          >
            <Text
              style={{
                fontSize: 24,
                marginBottom: 20,
                textAlign: 'center',
                color: colors.black,
                fontFamily: 'Poppins-Regular',
              }}
            >
              Verification Code
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: colors.grey,
                fontFamily: 'Poppins-Regular',
              }}
            >
              A 4-Digit OTP has been sent to the mobile number:{' '}
              <Text style={{ color: colors.black }}>{mobileNumber} </Text>
              <Text
                style={{ color: colors.red, fontFamily: 'Poppins-Regular' }}
                onPress={handleMobileNumberClick}
              >
                Edit
              </Text>
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: colors.red,
                marginTop: 20,
                fontSize: 20,
                fontFamily: 'Poppins-Regular',
              }}
            >
              {timer > 0 ? `00 : ${timer}` : console.log('Timedout')}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              {[0, 1, 2, 3].map((index) => (
                <TextInput
                  key={index}
                  mode="outlined"
                  textColor={colors.black}
                  outlineColor={colors.textInputPlaceholder}
                  activeOutlineColor={colors.grey}
                  keyboardType={'number-pad'}
                  style={{
                    flex: 1,
                    marginRight: index < 3 ? 10 : 0,
                    backgroundColor: colors.textInputBg,
                    fontSize: 28,
                  }}
                  maxLength={1}
                  value={otp[index]}
                  onChangeText={(value) => handleOtpChange(index, value)}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace') {
                      handleBackspace(index);
                    }
                  }}
                  ref={(ref) => (inputs[index] = ref)}
                />
              ))}
            </View>
            <Button
              mode="contained"
              style={{ backgroundColor: colors.red, marginTop: 30 }}
              onPress={otpVerification}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Poppins-Regular',
                  color: colors.white,
                }}
              >
                Verify
              </Text>
            </Button>
          </View>
        </Modal>
      </Portal>
      <View style={{ height: '100%', backgroundColor: colors.white }}>
        <Animated.View entering={FadeInUp.duration(2000)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={Welcome}
            style={{ height: '80%', width: '80%', resizeMode: 'contain' }}
          />
        </Animated.View>
        <View
          style={{
            height: '70%',
            width: '100%',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            elevation: 7,
            padding: 30,
          }}
        >
          <Animated.Text
            entering={LightSpeedInLeft.duration(1000)}
            style={{
              fontSize: 42,
              fontFamily: 'Poppins-Bold',
              color: colors.black,
            }}
          >
            Welcome to
            <Text
              style={{
                fontSize: 36,
                fontFamily: 'Poppins-Bold',
                color: colors.red,
              }}
            >
              {' '}
              FOODCART
            </Text>
          </Animated.Text>

          <Animated.Text
            entering={LightSpeedInRight.duration(1000)}
            style={{
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
              color: colors.grey,
            }}
          >
            To sign up or login, Enter your mobile number to verify OTP
          </Animated.Text>
          <TextInput
            mode="outlined"
            maxLength={10}
            outlineColor={mobileNumBorder}
            activeOutlineColor={mobileNumBorder}
            placeholder="Mobile Number"
            placeholderTextColor={colors.textInputPlaceholder}
            textColor={colors.black}
            style={{
              backgroundColor: colors.textInputBg,
              marginTop: 20,
              fontSize: 18,
              fontFamily: 'Poppins-Regular',
            }}
            keyboardType="numeric"
            value={mobileNumber}
            onChangeText={(value) => {
              const numericValue = value.replace(/[^0-9]/g, '');
              setMobileNumber(numericValue);
            }}
            caretHidden={mobileNumber.length >= 10}
            ref={(ref) => (mobileNumRef.current = ref)}
          />
          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <Button
              mode="contained"
              style={{ width: '80%', borderRadius: 50 }}
              onPress={showModal}
              buttonColor={colors.red}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Poppins-Regular',
                  color: colors.white,
                }}
              >
                Get OTP
              </Text>
            </Button>
          </View>
        </View>
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
    </PaperProvider>
  );
}

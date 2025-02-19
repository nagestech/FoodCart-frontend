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
import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/FontAwesome';
import {OtpInput} from 'react-native-otp-entry';
import DatePicker from 'react-native-date-picker';

export function Signup2({navigation}) {
  const color = useColorScheme();
  const theme = useTheme();
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantNameValid, setRestaurantNameValid] = useState('grey');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumValid, setMobileNumValid] = useState('grey');
  const [fssaiNumValid, setFssaiNumValid] = useState('grey');
  const [gstNumValid, setGstNumValid] = useState('grey');
  const [panNumValid, setPanNumValid] = useState('grey');
  const mobileNumRef = useRef();
  const fssaiNumRef = useRef();
  const gstNumRef = useRef();
  const panNumRef = useRef();
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [disableOTP, setDisableOTP] = useState(true);
  const [disableFssaiVerify, setDisableFssaiVerify] = useState(true);
  const [disableGstVerify, setDisableGstVerify] = useState(true);
  const [disablePanVerify, setDisablePanVerify] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);
  const [isTimerActive, setTimerActive] = useState(false);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState('');
  const [mobileNumberDisable, setMobileNumberDisable] = useState(false);
  const [fssaiNumber, setFssaiNumber] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [openTime, setOpenTime] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [closeTime, setCloseTime] = useState(new Date());
  const [closeModal, setCloseModal] = useState(false);
  const [verfiedPhoneNum, setVerifiedPhoneNum] = useState('');
  const [verfiedFssaiNum, setVerifiedFssaiNum] = useState('');
  const [verfiedGstNum, setVerifiedGstNum] = useState('');
  const [verfiedPanNum, setVerifiedPanNum] = useState('');

  useEffect(() => {
    if (
      /^[a-zA-Z0-9]+(\s{1,1}[a-zA-Z0-9]+)*$/.test(restaurantName) &&
      restaurantName.length >= 3
    ) {
      setRestaurantNameValid('green');
    } else if (restaurantName === '') {
      setRestaurantNameValid('grey');
    } else {
      setRestaurantNameValid('red');
    }

    if (mobileNumber.length === 10) {
      setMobileNumValid('green');
      if (otp == '') {
        if (mobileNumber == verfiedPhoneNum) {
          setDisableOTP(true);
        } else {
          setDisableOTP(false);
          setVerifiedPhoneNum('');
        }
      }
    } else if (mobileNumber === '') {
      setMobileNumValid('grey');
      setDisableOTP(true);
    } else {
      setMobileNumValid('red');
      setDisableOTP(true);
      setVerifiedPhoneNum('');
    }

    if (fssaiNumber.length === 14) {
      setFssaiNumValid('green');
      if (fssaiNumber == verfiedFssaiNum) {
        setDisableFssaiVerify(true);
      } else {
        setDisableFssaiVerify(false);
        setVerifiedFssaiNum('');
      }
    } else if (fssaiNumber === '') {
      setFssaiNumValid('grey');
      setDisableFssaiVerify(true);
    } else {
      setFssaiNumValid('red');
      setDisableFssaiVerify(true);
    }

    if (gstNumber.length === 15) {
      setGstNumValid('green');
      if (gstNumber == verfiedGstNum) {
        setDisableGstVerify(true);
      } else {
        setDisableGstVerify(false);
        setVerifiedGstNum('');
      }
    } else if (gstNumber === '') {
      setGstNumValid('grey');
      setDisableGstVerify(true);
    } else {
      setGstNumValid('red');
      setDisableGstVerify(true);
    }

    if (panNumber.length === 10) {
      setPanNumValid('green');
      if (panNumber == verfiedPanNum) {
        setDisablePanVerify(true);
      } else {
        setDisablePanVerify(false);
        setVerifiedPanNum('');
      }
    } else if (panNumber === '') {
      setPanNumValid('grey');
      setDisablePanVerify(true);
    } else {
      setPanNumValid('red');
      setDisablePanVerify(true);
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
  }, [
    mobileNumber,
    isTimerActive,
    timer,
    restaurantName,
    fssaiNumber,
    gstNumber,
    panNumber,
  ]);

  const showModal = () => {
    setTimerActive(true);
    setVisibleModal(true);
  };

  const hideModal = () => {
    setTimerActive(false);
    setVisibleModal(false);
    setTimer(60);
  };

  const type = [
    {key: '1', value: 'Bakery'},
    {key: '2', value: 'Home Chef'},
    {key: '3', value: 'Hotel'},
    {key: '4', value: 'Restaurant'},
  ];
  const category = [
    {key: '1', value: 'Vegan'},
    {key: '2', value: 'Veg'},
    {key: '3', value: 'Non-Veg'},
  ];
  const Step2 = () => {
    if (restaurantName == '') {
      setSnackbarMessage('Enter your name');
      setVisibleSnackbar(true);
    } else if (restaurantNameValid == 'green') {
      if (mobileNumber == '') {
        setSnackbarMessage('Enter your mobile number');
        setVisibleSnackbar(true);
      } else if (mobileNumber == verfiedPhoneNum) {
        if (fssaiNumber == '') {
          setSnackbarMessage('Enter your fssai number');
          setVisibleSnackbar(true);
        } else if (fssaiNumber == verfiedFssaiNum) {
          if (gstNumber == '') {
            setSnackbarMessage('Enter your gst number');
            setVisibleSnackbar(true);
          } else if (gstNumber == verfiedGstNum) {
            if (panNumber == '') {
              setSnackbarMessage('Enter your pan number');
              setVisibleSnackbar(true);
            } else if (panNumber == verfiedPanNum) {
              if (selectedType == '') {
                setSnackbarMessage('Select your restaurant type');
                setVisibleSnackbar(true);
              } else {
                if (selectedCategory == '') {
                  setSnackbarMessage('Select your restaurant category');
                  setVisibleSnackbar(true);
                } else {
                  if (openTime === closeTime) {
                    setSnackbarMessage('Check your restaurant timing');
                    setVisibleSnackbar(true);
                  } else {
                    navigation.navigate('Signup3');
                  }
                }
              }
            } else if (verfiedPanNum == '') {
              setSnackbarMessage('Verify your pan number');
              setVisibleSnackbar(true);
            } else {
              setSnackbarMessage('Enter valid pan no');
              setVisibleSnackbar(true);
            }
          } else if (verfiedGstNum == '') {
            setSnackbarMessage('Verify your gst number');
            setVisibleSnackbar(true);
          } else {
            setSnackbarMessage('Enter valid gst no');
            setVisibleSnackbar(true);
          }
        } else if (verfiedFssaiNum == '') {
          setSnackbarMessage('Verify your fssai number');
          setVisibleSnackbar(true);
        } else {
          setSnackbarMessage('Enter valid fssai no');
          setVisibleSnackbar(true);
        }
      } else if (verfiedPhoneNum == '') {
        setSnackbarMessage('Verify your mobile number');
        setVisibleSnackbar(true);
      } else {
        setSnackbarMessage('Enter valid mobile no');
        setVisibleSnackbar(true);
      }
    } else {
      setSnackbarMessage('Enter valid name');
      setVisibleSnackbar(true);
    }
  };
  const verifyOTP = () => {
    if ('1234' == String(otp)) {
      hideModal();
      //setMobileNumberDisable(true);
      setVerifiedPhoneNum(mobileNumber);
      setDisableOTP(true);
      setVisibleSnackbar(true);
      setSnackbarMessage('Success');
      setOtp('');
    } else {
      setVisibleSnackbar(true);
      setSnackbarMessage('Wrong OTP');
    }
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
            <StatusBar
              translucent={true}
              barStyle={color === 'dark' ? 'light-content' : 'dark-content'}
              backgroundColor={'rgba(169, 169, 169, 0.2)'}
            />
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
          <ScrollView showsVerticalScrollIndicator={false}>
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
                2
              </Text>{' '}
              / 3
            </Text>
            <TextInput
              mode="outlined"
              label="Restaurant Name"
              placeholderTextColor={theme.colors.onBackground}
              placeholder="Enter Restaurant Name"
              outlineColor={restaurantNameValid}
              activeOutlineColor={restaurantNameValid}
              value={restaurantName}
              onChangeText={value => {
                const nameValue = value.replace(/[^a-zA-Z0-9\s]/g, '');
                const formattedName = nameValue.replace(/\s{2,}/g, ' ');
                setRestaurantName(formattedName);
              }}
            />
            <TextInput
              mode="outlined"
              maxLength={10}
              label="Restaurant Mobile Number"
              outlineColor={mobileNumValid}
              activeOutlineColor={mobileNumValid}
              placeholderTextColor={theme.colors.onBackground}
              placeholder="Enter Restaurant Mobile Number"
              disabled={mobileNumberDisable}
              textColor={theme.colors.onBackground}
              style={{
                backgroundColor: theme.colors.background,
                marginTop: 20,
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
            <View style={{alignItems: 'flex-end'}}>
              <Button
                disabled={disableOTP}
                mode="contained"
                style={{
                  marginTop: 10,
                  borderRadius: 10,
                  width: '35%',
                }}
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
            </View>
            <TextInput
              mode="outlined"
              maxLength={14}
              label="FSSAI Licence Number"
              outlineColor={fssaiNumValid}
              activeOutlineColor={fssaiNumValid}
              placeholderTextColor={theme.colors.onBackground}
              placeholder="Enter fssai licence Number"
              textColor={theme.colors.onBackground}
              style={{
                backgroundColor: theme.colors.background,
                marginTop: 20,
                fontFamily: 'Poppins-Regular',
                width: '100%',
              }}
              keyboardType="numeric"
              value={fssaiNumber}
              onChangeText={value => {
                const numericValue = value.replace(/[^0-9]/g, '');
                setFssaiNumber(numericValue);
              }}
              ref={ref => (fssaiNumRef.current = ref)}
            />
            <View style={{alignItems: 'flex-end'}}>
              <Button
                mode="contained"
                disabled={disableFssaiVerify}
                style={{
                  marginTop: 10,
                  borderRadius: 10,
                  width: '35%',
                }}
                onPress={() => {
                  if (fssaiNumber == '12345678901234') {
                    setSnackbarMessage('Verification Success');
                    setVisibleSnackbar(true);
                    setVerifiedFssaiNum(fssaiNumber);
                    setDisableFssaiVerify(true);
                  } else {
                    setSnackbarMessage('Verification failed');
                    setVisibleSnackbar(true);
                    setVerifiedFssaiNum('');
                  }
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Verify
                </Text>
              </Button>
            </View>
            <TextInput
              mode="outlined"
              maxLength={15}
              label="GST Number"
              outlineColor={gstNumValid}
              activeOutlineColor={gstNumValid}
              placeholderTextColor={theme.colors.onBackground}
              placeholder="Enter GST Number"
              textColor={theme.colors.onBackground}
              style={{
                backgroundColor: theme.colors.background,
                marginTop: 20,
                fontFamily: 'Poppins-Regular',
                width: '100%',
              }}
              keyboardType="numeric"
              value={gstNumber}
              onChangeText={value => {
                const numericValue = value.replace(/[^0-9]/g, '');
                setGstNumber(numericValue);
              }}
              ref={ref => (gstNumRef.current = ref)}
            />
            <View style={{alignItems: 'flex-end'}}>
              <Button
                mode="contained"
                disabled={disableGstVerify}
                style={{
                  marginTop: 10,
                  borderRadius: 10,
                  width: '35%',
                }}
                onPress={() => {
                  if (gstNumber == '123456789012345') {
                    setSnackbarMessage('Verification Success');
                    setVisibleSnackbar(true);
                    setVerifiedGstNum(gstNumber);
                    setDisableGstVerify(true);
                  } else {
                    setSnackbarMessage('Verification failed');
                    setVisibleSnackbar(true);
                    setVerifiedGstNum('');
                  }
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Verify
                </Text>
              </Button>
            </View>
            <TextInput
              mode="outlined"
              maxLength={10}
              label="PAN Number"
              outlineColor={panNumValid}
              activeOutlineColor={panNumValid}
              placeholderTextColor={theme.colors.onBackground}
              placeholder="Enter PAN Number"
              textColor={theme.colors.onBackground}
              style={{
                backgroundColor: theme.colors.background,
                marginTop: 20,
                fontFamily: 'Poppins-Regular',
                width: '100%',
              }}
              keyboardType="numeric"
              value={panNumber}
              onChangeText={value => {
                const numericValue = value.replace(/[^0-9]/g, '');
                setPanNumber(numericValue);
              }}
              ref={ref => (panNumRef.current = ref)}
            />
            <View style={{alignItems: 'flex-end'}}>
              <Button
                mode="contained"
                disabled={disablePanVerify}
                style={{
                  marginTop: 10,
                  marginBottom: 30,
                  borderRadius: 10,
                  width: '35%',
                }}
                onPress={() => {
                  if (panNumber == '1234567890') {
                    setSnackbarMessage('Verification Success');
                    setVisibleSnackbar(true);
                    setVerifiedPanNum(panNumber);
                    setDisablePanVerify(true);
                  } else {
                    setSnackbarMessage('Verification failed');
                    setVisibleSnackbar(true);
                    setVerifiedPanNum('');
                  }
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Verify
                </Text>
              </Button>
            </View>
            <SelectList
              setSelected={val => setSelectedType(val)}
              data={type}
              save="value"
              searchPlaceholder="Restaurant Type"
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
              placeholder="Select Restaurant Type"
              boxStyles={{borderRadius: 5}}
            />
            <View style={{height: 30}}></View>
            <MultipleSelectList
              setSelected={val => setSelectedCategory(val)}
              data={category}
              save="value"
              searchPlaceholder="Restaurant Category"
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
              placeholder="Select Restaurant Category"
              boxStyles={{borderRadius: 5}}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Text
                style={{
                  flex: 1,
                  color: theme.colors.onBackground,
                  textAlign: 'center',
                  fontFamily: 'Poppins-Bold',
                }}>
                {String(openTime.getMinutes()).length == 1
                  ? String(
                      openTime.getHours() + ' : ' + '0' + openTime.getMinutes(),
                    )
                  : String(openTime.getHours() + ' : ' + openTime.getMinutes())}
              </Text>

              <Button
                mode="contained"
                style={{flex: 2, borderRadius: 10}}
                title="Open"
                onPress={() => setOpenModal(true)}>
                <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
                  Restaurant Open Time {}
                </Text>
              </Button>
            </View>
            <DatePicker
              modal
              mode="time"
              open={openModal}
              date={openTime}
              onConfirm={date => {
                setOpenModal(false);
                setOpenTime(date);
              }}
              onCancel={() => {
                setOpenModal(false);
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Text
                style={{
                  flex: 1,
                  color: theme.colors.onBackground,
                  textAlign: 'center',
                  fontFamily: 'Poppins-Bold',
                }}>
                {String(closeTime.getMinutes()).length == 1
                  ? String(
                      closeTime.getHours() +
                        ' : ' +
                        '0' +
                        closeTime.getMinutes(),
                    )
                  : String(
                      closeTime.getHours() + ' : ' + closeTime.getMinutes(),
                    )}
              </Text>

              <Button
                mode="contained"
                style={{flex: 2, borderRadius: 10}}
                title="Close"
                onPress={() => setCloseModal(true)}>
                <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
                  Restaurant Close Time {}
                </Text>
              </Button>
            </View>
            <DatePicker
              modal
              mode="time"
              open={closeModal}
              date={closeTime}
              onConfirm={date => {
                setCloseModal(false);
                setCloseTime(date);
              }}
              onCancel={() => {
                setCloseModal(false);
              }}
            />
            <Button
              mode="contained"
              style={{marginTop: 40, borderRadius: 10}}
              onPress={Step2}>
              <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
                Next Step
              </Text>
            </Button>
            <View style={{height: 50}}></View>
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

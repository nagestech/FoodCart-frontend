import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  useColorScheme,
  View,
  Text,
  Platform,
  StatusBar,
} from 'react-native';
import {
  useTheme,
  Button,
  PaperProvider,
  Portal,
  Modal,
  TextInput,
} from 'react-native-paper';
import {
  MultipleSelectList,
  SelectList,
} from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
import {OtpInput} from 'react-native-otp-entry';

export function Signup3({navigation}) {
  const color = useColorScheme();
  const theme = useTheme();
  const [email, setemail] = useState('');
  const [emailValid, setemailValid] = useState('grey');
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const emailRef = useRef();
  const [visibleModal, setVisibleModal] = useState(false);
  const [isTimerActive, setTimerActive] = useState(false);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState('');
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [emailDisable, setemailDisable] = useState(false);
  const [disableOTP, setDisableOTP] = useState(true);
  const [selectedDay, setSelectedDay] = useState([]);

  const [slot1OpenTime, setSlot1OpenTime] = useState(new Date());
  const [slot1OpenModal, setSlot1OpenModal] = useState(false);
  const [slot1CloseTime, setSlot1CloseTime] = useState(new Date());
  const [slot1CloseModal, setSlot1CloseModal] = useState(false);

  const [slot2OpenTime, setSlot2OpenTime] = useState(new Date());
  const [slot2OpenModal, setSlot2OpenModal] = useState(false);
  const [slot2CloseTime, setSlot2CloseTime] = useState(new Date());
  const [slot2CloseModal, setSlot2CloseModal] = useState(false);

  const [slot3OpenTime, setSlot3OpenTime] = useState(new Date());
  const [slot3OpenModal, setSlot3OpenModal] = useState(false);
  const [slot3CloseTime, setSlot3CloseTime] = useState(new Date());
  const [slot3CloseModal, setSlot3CloseModal] = useState(false);
  const slotState = {
    1: {
      openTime: slot1OpenTime,
      setOpenTime: setSlot1OpenTime,
      openModal: slot1OpenModal,
      setOpenModal: setSlot1OpenModal,
      closeTime: slot1CloseTime,
      setCloseTime: setSlot1CloseTime,
      closeModal: slot1CloseModal,
      setCloseModal: setSlot1CloseModal,
    },
    2: {
      openTime: slot2OpenTime,
      setOpenTime: setSlot2OpenTime,
      openModal: slot2OpenModal,
      setOpenModal: setSlot2OpenModal,
      closeTime: slot2CloseTime,
      setCloseTime: setSlot2CloseTime,
      closeModal: slot2CloseModal,
      setCloseModal: setSlot2CloseModal,
    },
    3: {
      openTime: slot3OpenTime,
      setOpenTime: setSlot3OpenTime,
      openModal: slot3OpenModal,
      setOpenModal: setSlot3OpenModal,
      closeTime: slot3CloseTime,
      setCloseTime: setSlot3CloseTime,
      closeModal: slot3CloseModal,
      setCloseModal: setSlot3CloseModal,
    },
    // Add more slots as needed
  };

  const day = [
    {key: '1', value: 'Sunday'},
    {key: '2', value: 'Monday'},
    {key: '3', value: 'Tuesday'},
    {key: '4', value: 'Wednesday'},
    {key: '5', value: 'Thursday'},
    {key: '6', value: 'Friday'},
    {key: '7', value: 'Saturday'},
  ];

  const slot = [
    {key: '1', value: '1'},
    {key: '2', value: '2'},
    {key: '3', value: '3'},
  ];

  useEffect(() => {
    if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)) {
      setemailValid('green');
      if (otp == '') {
        if (email == verifiedEmail) {
          setDisableOTP(true);
        } else {
          setDisableOTP(false);
          setVerifiedEmail('');
        }
      }
    } else if (email === '') {
      setemailValid('grey');
      setDisableOTP(true);
    } else {
      setemailValid('red');
      setDisableOTP(true);
      setVerifiedEmail('');
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
  });
  const showModal = () => {
    setTimerActive(true);
    setVisibleModal(true);
  };

  const hideModal = () => {
    setTimerActive(false);
    setVisibleModal(false);
    setTimer(60);
  };

  const verifyOTP = () => {
    if ('1234' == String(otp)) {
      hideModal();
      //setemailDisable(true);
      setVerifiedEmail(email);
      setDisableOTP(true);
      setVisibleSnackbar(true);
      setSnackbarMessage('Success');
      setOtp('');
    } else {
      setVisibleSnackbar(true);
      setSnackbarMessage('Wrong OTP');
    }
  };
  const handleSlotSelect = val => {
    if (selectedDay.includes(val)) {
      setSelectedDay(selectedDay.filter(slot => slot !== val));
    } else {
      setSelectedDay([...selectedDay, val]);
    }
  };

  const isSlotSelected = slot => selectedDay.includes(slot);

  const renderSelectedTimePickers = () => {
    return slot.map(s => {
      if (isSlotSelected(s.value)) {
        return <View key={s.key}>{renderTimePicker(s.value)}</View>;
      }
      return null;
    });
  };

  const register = () => {
    var slot1Status = '';
    var slot2Status = '';
    var slot3Status = '';
    var slot1OpenTimeStatus = '';
    var slot1CloseTimeStatus = '';
    var slot2OpenTimeStatus = '';
    var slot2CloseTimeStatus = '';
    var slot3OpenTimeStatus = '';
    var slot3CloseTimeStatus = '';
    if (selectedDay == '') {
      console.log('Available days : ' + selectedDay);
    } else {
      console.log('Available days : ' + selectedDay);
      if (String(slot1OpenTime) === String(slot1CloseTime)) {
        console.log('Slot 1 same');
        slot1Status = 'same';
      } else {
        console.log('Slot 1 different');
        slot1Status = 'different';
        slot1OpenTimeStatus = String(
          String(slot1OpenTime.getMinutes()).length === 1
            ? String(
                slot1OpenTime.getHours() +
                  ' : ' +
                  '0' +
                  slot1OpenTime.getMinutes(),
              )
            : String(
                slot1OpenTime.getHours() + ' : ' + slot1OpenTime.getMinutes(),
              ),
        );
        slot1CloseTimeStatus = String(
          String(slot1CloseTime.getMinutes()).length === 1
            ? String(
                slot1CloseTime.getHours() +
                  ' : ' +
                  '0' +
                  slot1CloseTime.getMinutes(),
              )
            : String(
                slot1CloseTime.getHours() + ' : ' + slot1CloseTime.getMinutes(),
              ),
        );
        console.log(
          '  Open Time  : ',
          slot1OpenTimeStatus,
          '\n\tClose Time : ',
          slot1CloseTimeStatus,
        );
      }
      if (String(slot2OpenTime) === String(slot2CloseTime)) {
        console.log('Slot 2 same');
        slot2Status = 'same';
      } else {
        console.log('Slot 2 different');
        slot2Status = 'same';
        slot2OpenTimeStatus = String(
          String(slot2OpenTime.getMinutes()).length === 1
            ? String(
                slot2OpenTime.getHours() +
                  ' : ' +
                  '0' +
                  slot2OpenTime.getMinutes(),
              )
            : String(
                slot2OpenTime.getHours() + ' : ' + slot2OpenTime.getMinutes(),
              ),
        );
        slot2CloseTimeStatus = String(
          String(slot2CloseTime.getMinutes()).length === 1
            ? String(
                slot2CloseTime.getHours() +
                  ' : ' +
                  '0' +
                  slot2CloseTime.getMinutes(),
              )
            : String(
                slot2CloseTime.getHours() + ' : ' + slot2CloseTime.getMinutes(),
              ),
        );
        console.log(
          '  Open Time  : ',
          slot2OpenTimeStatus,
          '\n\tClose Time : ',
          slot2CloseTimeStatus,
        );
      }
      if (String(slot3OpenTime) === String(slot3CloseTime)) {
        console.log('Slot 3 same');
        slot3Status = 'same';
      } else {
        console.log('Slot 3 different');
        slot3Status = 'same';
        slot3OpenTimeStatus = String(
          String(slot3OpenTime.getMinutes()).length === 1
            ? String(
                slot3OpenTime.getHours() +
                  ' : ' +
                  '0' +
                  slot3OpenTime.getMinutes(),
              )
            : String(
                slot3OpenTime.getHours() + ' : ' + slot3OpenTime.getMinutes(),
              ),
        );
        slot3CloseTimeStatus = String(
          String(slot3CloseTime.getMinutes()).length === 1
            ? String(
                slot3CloseTime.getHours() +
                  ' : ' +
                  '0' +
                  slot3CloseTime.getMinutes(),
              )
            : String(
                slot3CloseTime.getHours() + ' : ' + slot3CloseTime.getMinutes(),
              ),
        );
        console.log(
          '  Open Time  : ',
          slot3OpenTimeStatus,
          '\n\tClose Time : ',
          slot3CloseTimeStatus,
        );
      }
      if (emailValid == 'green') {
        console.log('Valid email');
        if (email == verifiedEmail) {
          console.log('Available Day : ', selectedDay);
          console.log(
            'Slot 1 ',
            slot1OpenTimeStatus,
            ' - ',
            slot1CloseTimeStatus,
          );
          console.log(
            'Slot 2 ',
            slot2OpenTimeStatus,
            ' - ',
            slot2CloseTimeStatus,
          );
          console.log(
            'Slot 3 ',
            slot3OpenTimeStatus,
            ' - ',
            slot3CloseTimeStatus,
          );
          console.log('Email : ', email);
          if (
            slot1Status !== 'same' ||
            slot2Status !== 'same' ||
            slot3Status !== 'same'
          ) {
            navigation.replace('TeamStatus');
          } else {
            console.log('Check Time Slot');
          }
        } else {
          console.log('verify email');
        }
      } else {
        console.log('In valid email');
      }
    }
  };
  const renderTimePicker = slotKey => {
    const {
      openTime,
      setOpenTime,
      openModal,
      setOpenModal,
      closeTime,
      setCloseTime,
      closeModal,
      setCloseModal,
    } = slotState[slotKey];

    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50,
          }}>
          <Text
            style={{
              flex: 1,
              color: theme.colors.onBackground,
              textAlign: 'center',
              fontFamily: 'Poppins-Bold',
            }}>
            {String(openTime.getMinutes()).length === 1
              ? String(
                  openTime.getHours() + ' : ' + '0' + openTime.getMinutes(),
                )
              : String(openTime.getHours() + ' : ' + openTime.getMinutes())}
          </Text>
          <Button
            mode="contained"
            style={{flex: 2, borderRadius: 10}}
            onPress={() => setOpenModal(true)}>
            <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
              Slot {slotKey} Open Time
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
            console.log(
              date.getHours() + ' : ' + date.getMinutes() + ' ' + openTime,
            );
          }}
          onCancel={() => setOpenModal(false)}
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
            {String(closeTime.getMinutes()).length === 1
              ? String(
                  closeTime.getHours() + ' : ' + '0' + closeTime.getMinutes(),
                )
              : String(closeTime.getHours() + ' : ' + closeTime.getMinutes())}
          </Text>
          <Button
            mode="contained"
            style={{flex: 2, borderRadius: 10}}
            onPress={() => setCloseModal(true)}>
            <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
              Slot {slotKey} Close Time
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
          onCancel={() => setCloseModal(false)}
        />
      </>
    );
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
              Enter OTP sent on {email}
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
        <StatusBar
          translucent={true}
          barStyle={color === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={'transparent'}
        />
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
              Step{' '}
              <Text
                style={{
                  color: theme.colors.primary,
                  fontSize: 15,
                  fontFamily: 'Poppins-Bold',
                }}>
                3
              </Text>{' '}
              / 3
            </Text>
            <MultipleSelectList
              setSelected={setSelectedDay}
              data={day}
              save="value"
              searchPlaceholder="Restaurant Available Day"
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
              placeholder="Select Restaurant  Available Day   "
              boxStyles={{borderRadius: 5}}
            />
            <View
              style={{
                height: 100,
                justifyContent: 'center',
                flexDirection: 'column',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: theme.colors.onBackground,
                  fontSize: 15,
                }}>
                Slot 1 : Morning{' '}
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: theme.colors.onBackground,
                  fontSize: 15,
                }}>
                Slot 2 : Afternoon{' '}
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: theme.colors.onBackground,
                  fontSize: 15,
                }}>
                Slot 3 : Evening{' '}
              </Text>
            </View>
            <SelectList
              setSelected={handleSlotSelect}
              data={slot}
              save="value"
              searchPlaceholder="Restaurant Slot"
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
              placeholder="Select Restaurant Slot"
              boxStyles={{borderRadius: 5}}
            />
            {renderSelectedTimePickers()}
            <TextInput
              mode="outlined"
              maxLength={50}
              label="Restaurant Email ID"
              outlineColor={emailValid}
              activeOutlineColor={emailValid}
              placeholderTextColor={theme.colors.onBackground}
              placeholder="Enter Restaurant Email ID"
              disabled={emailDisable}
              textColor={theme.colors.onBackground}
              style={{
                backgroundColor: theme.colors.background,
                marginTop: 20,
                fontFamily: 'Poppins-Regular',
                width: '100%',
              }}
              keyboardType="email-address"
              value={email}
              onChangeText={value => {
                const emailValue = value
                  .toLowerCase()
                  .replace(/[^a-z@._0-9]/g, '');
                setemail(emailValue);
              }}
              ref={ref => (emailRef.current = ref)}
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
            <Button
              mode="contained"
              style={{
                marginTop: 40,
                marginBottom: 40,
                borderRadius: 10,
                width: '100%',
              }}
              onPress={register}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontFamily: 'Poppins-Regular',
                }}>
                Register Now
              </Text>
            </Button>
          </ScrollView>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

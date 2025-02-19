import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Button,
  Snackbar,
  Modal,
  Portal,
  PaperProvider,
  TextInput,
} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import {colors} from '../../const/Colors';
import {Delete, CartBanner} from '../../const/Images';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {getData, initData, updateData} from '../../const/AsyncStorage';
import axios from 'axios';

export function Cart({navigation}) {
  const route = useRoute();
  const [visible, setVisible] = useState(false);
  const [cart, setCart] = useState(route.params.cart);
  const food = route.params.food;
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [firstNameValid, setFirstNameValid] = useState(colors.grey);
  const handleQuantityChange = (itemName, newQuantity) => {
    const updatedCart = {...cart};
    updatedCart[itemName].quantity = newQuantity;
    setCart(updatedCart);
  };
  useEffect(() => {
    if (/^[a-zA-Z]+$/.test(firstName) && firstName.length >= 3) {
      setFirstNameValid(colors.green);
    } else if (firstName === '') {
      setFirstNameValid(colors.grey);
    } else {
      setFirstNameValid(colors.red);
    }
    const newCart = {};
    console.log('Deleted', cart);
    let newIndex = 0;

    for (const key in cart) {
      if (cart.hasOwnProperty(key)) {
        newCart[newIndex.toString()] = cart[key];
        newIndex++;
      }
    }
  }, [cart, firstName, firstNameValid]);
  const handleDeleteItem = itemName => {
    delete cart[itemName];
    setCart(cart);
    if (Object.keys(cart).length === 0) {
      setCart({});
      console.log('Food', food);
      navigation.replace('HotelItem', {food});
    } else {
      navigation.replace('Cart', {cart: cart, food: food});
    }
  };
  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  const store = async () => {
    let name = await initData('name');
    let mob = await initData('mobile');
    console.log(name);
    if (
      name !== '' &&
      name !== null &&
      name !== undefined &&
      name !== 'dummy' &&
      mob !== '' &&
      mob !== null &&
      mob !== undefined
    ) {
      axios
        .post('http://192.168.1.43:3000/cart', cart)
        .then(async function (response) {
          console.log(response.status);
          if (response.status === 201) {
            console.log('success');
            setSnackbarMessage('Confirmed your order');
            setVisibleSnackbar(true);
            setTimeout(() => {
              navigation.navigate('Payment');
            }, 2000);
          } else {
            console.log('Failed');
            setSnackbarMessage('Failed');
            setVisibleSnackbar(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      showModal();
      console.log(await getData('mobile'));
    }
  };
  return (
    <PaperProvider>
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <StatusBar
          translucent
          barStyle={'light-content'}
          backgroundColor={'transparent'}
        />
        <Portal
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            style={{flex: 1, justifyContent: 'flex-end'}}>
            <View
              style={{
                height: 220,
                width: '100%',
                backgroundColor: colors.white,
                padding: 20,
                justifyContent: 'center',
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
              }}>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: 'Poppins-Regular',
                  textAlign: 'center',
                }}>
                Enter your full name to proceed next proccess
              </Text>
              <TextInput
                style={{marginVertical: 10, backgroundColor: colors.white}}
                mode="outlined"
                label="First Name"
                placeholder="Enter your First Name : "
                outlineColor={firstNameValid}
                activeOutlineColor={firstNameValid}
                textColor={colors.black}
                value={firstName}
                onChangeText={value => {
                  const nameValue = value.replace(/[^a-zA-Z]/g, '');
                  setFirstName(nameValue);
                }}
              />
              <Button
                mode="contained"
                buttonColor={colors.red}
                style={{marginTop: 20}}
                onPress={async () => {
                  hideModal();
                  await updateData('name', firstName);
                  store();
                }}>
                <Text
                  style={{color: colors.white, fontFamily: 'Poppins-Regular'}}>
                  Proceed
                </Text>
              </Button>
            </View>
          </Modal>
        </Portal>
        <View style={{height: 200}}>
          <Image
            source={CartBanner}
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              position: 'relative',
            }}
          />
          <View
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              padding: 20,
              backgroundColor: 'rgba(0,0,0, 0.5)',
            }}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  color: colors.white,
                  fontSize: RFPercentage(5),
                  fontFamily: 'Poppins-Bold',
                }}>
                CART
              </Text>
            </View>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingRight: 20,
            paddingLeft: 20,
            paddingBottom: 120,
          }}>
          <Animated.View>
            {Object.keys(cart).map((itemName, index) => (
              <View
                key={index}
                style={{
                  marginTop: 30,
                  height: 200,
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  elevation: 20,
                  borderTopLeftRadius: 30,
                  borderRadius: 30,
                }}>
                <Image
                  source={{uri: cart[itemName].image}}
                  style={{
                    flex: 2,
                    borderRadius: 30,
                    height: '100%',
                    width: '100%',
                    resizeMode: 'cover',
                  }}
                />
                <View
                  style={{
                    flex: 2,
                    borderBottomRightRadius: 30,
                    paddingTop: 5,
                    paddingLeft: 15,
                    paddingRight: 15,
                    flexDirection: 'column',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: 'Poppins-Bold',
                        color: 'black',
                      }}>
                      {cart[itemName].name}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: 'grey',
                      fontWeight: 'bold',
                    }}>
                    Quantity: {cart[itemName].quantity}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: 'grey',
                      fontWeight: 'bold',
                    }}>
                    Total Price: Rs.{' '}
                    {cart[itemName].price * cart[itemName].quantity}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 40,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: colors.red,
                        }}
                        onPress={() => {
                          if (cart[itemName].quantity !== 1) {
                            handleQuantityChange(
                              itemName,
                              cart[itemName].quantity - 1,
                            );
                          }
                        }}>
                        <Text style={{fontSize: 25, color: colors.white}}>
                          -
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 20,
                            color: colors.black,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {cart[itemName].quantity}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 40,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: colors.red,
                        }}
                        onPress={() => {
                          handleQuantityChange(
                            itemName,
                            cart[itemName].quantity + 1,
                          );
                        }}>
                        <Text style={{fontSize: 20, color: colors.white}}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={{height: 30, width: 30, borderRadius: 30}}
                        onPress={() => handleDeleteItem(itemName)}>
                        <Image
                          source={Delete}
                          style={{height: 30, width: 30, objectFit: 'contain'}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </Animated.View>
          <Button
            mode="contained"
            buttonColor={colors.red}
            style={{marginTop: 50}}
            onPress={async () => {
              store();
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: colors.white,
                fontSize: 15,
              }}>
              Confirm Oder
            </Text>
          </Button>
        </ScrollView>
        <Snackbar
          visible={visibleSnackbar}
          onDismiss={() => setVisibleSnackbar(false)}
          duration={5000}
          style={{backgroundColor: colors.black}}>
          <Text
            style={{
              color: colors.white,
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
              textAlign: 'center',
            }}>
            {snackbarMessage}
          </Text>
        </Snackbar>
      </View>
    </PaperProvider>
  );
}

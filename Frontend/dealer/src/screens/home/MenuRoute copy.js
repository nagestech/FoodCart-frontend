import React, {useEffect, useState} from 'react';
import {
  Text,
  useTheme,
  Button,
  Divider,
  TextInput,
  Snackbar,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  ScrollView,
  Image,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import {
  MultipleSelectList,
  SelectList,
} from 'react-native-dropdown-select-list';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Camera from './Camera';
import {Switch} from 'react-native-switch';

export function MenuRoute({navigation}) {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionValid, setDescriptionValid] = useState('grey');
  const [addBorder, setAddBorder] = useState('outlined');
  const [menuBorder, setMenuBorder] = useState('contained');
  const [selectedType, setSelectedType] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState([]);
  const [selectedPreference, setSelectedPreference] = useState([]);
  const [price, setPrice] = useState('');
  const [nameValid, setNameValid] = useState('grey');
  
  const [priceValid, setPriceValid] = useState('grey');
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [receivedId, setReceivedId] = useState(0);
  const [gst, setGst] = useState(0);
  const [gstValid, setGstValid] = useState('grey');
  const [packageCharge, setPackageCharge] = useState(0);
  const [packageChargeValid, setPackageChargeValid] = useState(0);
  const [selectedTag, setSelectedTag] = useState([]);
  const [preparationTime, setPreparationTime] = useState(0);
  const [addons, setAddons] = useState([]);
  const [servePeople, setServerPeople] = useState(0);
  const [deliveryType, setDeliveryType] = useState([]);
  const [spicyLevel, setSpicyLevel] = useState("");
  const [shorts, setShorts] = useState("");
  const color = useColorScheme();
  const [switchStatus, setSwitchStatus] = useState(false);
  const receivedProductId = count => {
    setReceivedId(count);
  };
  const Cuisine = [
    {key: '1', value: 'North Indian'},
    {key: '2', value: 'South Indian'},
    {key: '3', value: 'Chinese'},
    {key: '4', value: 'Italian'},
    {key: '5', value: 'Continental'},
    {key: '6', value: 'Fast Food'},
    {key: '7', value: 'Street Food'},
    {key: '8', value: 'Mexican'},
    {key: '9', value: 'Thai'},
    {key: '10', value: 'Japanese'},
    {key: '11', value: 'Biryani'},
    {key: '12', value: 'Bengali'},
    {key: '13', value: 'Korean'},
    {key: '14', value: 'Mughlai'},
    {key: '15', value: 'Arabian'},
    {key: '16', value: 'Awadhi'},
    {key: '17', value: 'Rajasthani'},
    {key: '18', value: 'Goan'},
    {key: '19', value: 'Maharashtrian'},
    {key: '20', value: 'Gujarati'},
    {key: '21', value: 'Punjabi'},
    {key: '22', value: 'Kerala'},
    {key: '23', value: 'European'},
    {key: '24', value: 'American'},
    {key: '25', value: 'Lebanese'},
    {key: '26', value: 'Turkish'},
    {key: '27', value: 'Spanish'},
    {key: '28', value: 'Greek'},
    {key: '29', value: 'French'},
    {key: '30', value: 'Vietnamese'},
  ];
  const category = [
    {key: '1', value: 'Vegan'},
    {key: '2', value: 'Veg'},
    {key: '3', value: 'Non-Veg'},
  ];
  const type = [
    {key: '1', value: 'Snacks'},
    {key: '2', value: 'Drinks'},
    {key: '3', value: 'Food'},
  ];
  const preference = [
    {key: '1', value: 'Sweet'},
    {key: '2', value: 'Spicy'},
    {key: '3', value: 'Normal'},
  ];
  useEffect(() => {
    if (name == '') {
      setNameValid('grey');
    } else if (name.length >= 3) {
      setNameValid('green');
    } else {
      setNameValid('red');
    }
    if (description == '') {
      setDescriptionValid('grey');
    } else if (description.length >= 3) {
      setDescriptionValid('green');
    } else {
      setDescriptionValid('red');
    }
    if (price == '') {
      setPriceValid('grey');
    } else if (parseFloat(price) >= 1) {
      setPriceValid('green');
    } else {
      setPriceValid('red');
    }
  });
  const AddMenuSubmit = () => {
    console.log(receivedId);
    if (name == '') {
      console.log('Enter food name');
      setSnackbarMessage('Enter food name');
      setVisibleSnackbar(true);
    } else {
      if (description == '') {
        console.log('Enter description');
        setSnackbarMessage('Enter description');
        setVisibleSnackbar(true);
      } else {
        if (selectedType == '') {
          console.log('Select food type');
          setSnackbarMessage('Select food type');
          setVisibleSnackbar(true);
        } else {
          if (selectedCategory == '') {
            console.log('Select food category');
            setSnackbarMessage('Select food category');
            setVisibleSnackbar(true);
          } else {
            if (selectedCuisine == '') {
              console.log('Select food cuisine');
              setSnackbarMessage('Select food cuisine');
              setVisibleSnackbar(true);
            } else {
              if (selectedPreference == '') {
                console.log('Select food preference');
                setSnackbarMessage('Select food preference');
                setVisibleSnackbar(true);
              } else {
                if (parseFloat(price) < 1) {
                  console.log('Enter prirce');
                  setSnackbarMessage('Enter price');
                  setVisibleSnackbar(true);
                } else {
                  if (receivedId !== 0 && receivedId !== NaN) {
                    const token =
                      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZWFsZXJpZCI6Miwic3RhZmZpZCI6bnVsbCwicm9sZSI6bnVsbCwiaWF0IjoxNzEwOTk1MjY4LCJleHAiOjE3MTEwODE2Njh9.g0MSHbN7txbhILbHC44jHUcT2kvdDJAYObPE26bwOW8';

                    fetch(
                      'http://192.168.1.32:3005/dealer/products/create/' +
                        String(receivedId),
                      {
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                          Authorization: 'Bearer ' + token,
                        },
                        body: JSON.stringify({
                          name: name,
                          item_desc: description,
                          price: parseFloat(price),
                          type: selectedType,
                          category: selectedCategory,
                          preference: selectedPreference,
                          cuisine: selectedCuisine,
                        }),
                      },
                    )
                      .then(response => response.json())
                      .then(data => {
                        console.log(data);
                        setSnackbarMessage(data.message);
                        setVisibleSnackbar(true);
                        setAddBorder('outlined');
                        setMenuBorder('contained');
                      })
                      .catch(error => {
                        console.error('Error:', error);
                      });
                  } else {
                    setSnackbarMessage('Upload Image');
                    setVisibleSnackbar(true);
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        {addBorder === 'contained' && (
          <View style={{flex: 1}}>
            <ScrollView
              style={{padding: 20}}
              showsVerticalScrollIndicator={false}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 20,
                  textAlign: 'center',
                  marginBottom: 10,
                }}>
                Add Food item
              </Text>
              <View
                style={{
                  height: 250,
                  width: '100%',
                }}>
                <Camera onReceived={receivedProductId} />
              </View>
              <View style={{marginTop: 20}}></View>
              <TextInput
                mode="outlined"
                label={'Name'}
                value={name}
                onChangeText={value => setName(value)}
                outlineColor={'grey'}
                activeOutlineColor={nameValid}
              />
              <TextInput
                mode="outlined"
                label={'Description'}
                style={{marginTop: 10}}
                value={description}
                onChangeText={value => setDescription(value)}
                outlineColor="grey"
                activeOutlineColor={descriptionValid}
              />
              <View style={{marginTop: 20}}></View>
              <SelectList
                setSelected={val => setSelectedType(val)}
                data={type}
                save="value"
                searchPlaceholder="Food Type"
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
                placeholder="Select Food Type"
                boxStyles={{borderRadius: 5}}
              />
              <View style={{marginTop: 20}}></View>
              <MultipleSelectList
                setSelected={val => setSelectedCategory(val)}
                data={category}
                save="value"
                searchPlaceholder="Food Category"
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
                placeholder="Select Food Category"
                boxStyles={{borderRadius: 5}}
              />
              <View style={{marginTop: 10}}></View>
              <MultipleSelectList
                setSelected={setSelectedCuisine}
                data={Cuisine}
                save="value"
                searchPlaceholder="Food Cuisine"
                placeholder="Select Food Cuisine"
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
              />
              <View style={{marginTop: 10}}></View>
              <SelectList
                setSelected={val => setSelectedPreference(val)}
                data={preference}
                save="value"
                searchPlaceholder="Food Preference"
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
                placeholder="Select Food Preference"
                boxStyles={{borderRadius: 5}}
              />
              <View style={{marginTop: 10}}></View>
              <TextInput
                mode="outlined"
                label={'Price'}
                style={{marginBottom: 50}}
                value={price}
                onChangeText={value => setPrice(value)}
                outlineColor="grey"
                activeOutlineColor={priceValid}
                keyboardType="number-pad"
              />

              <Button
                mode="contained"
                textColor="white"
                style={{marginBottom: 50}}
                onPress={AddMenuSubmit}>
                Add to menu
              </Button>
            </ScrollView>
          </View>
        )}
        {menuBorder === 'contained' && (
          <View style={{flex: 1}}>
            <View
              style={{
                height: 80,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                paddingLeft: 20,
                paddingRight: 10,
              }}>
              <View
                style={{
                  height: 60,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: theme.colors.onBackground,
                    fontFamily: 'Poppins-Bold',
                    fontSize: 20,
                    textAlign: 'center',
                    marginTop: 0,
                  }}>
                  Menu
                </Text>
              </View>

              <View
                style={{
                  height: 60,
                  width: 120,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <Icon
                  name="search"
                  size={23}
                  color={theme.colors.onBackground}
                />
                <MaterialIcons
                  name="menu"
                  color={theme.colors.onBackground}
                  size={30}
                  onPress={() => navigation.navigate('DrawerMenu')} // Navigate to the appropriate screen
                />
              </View>
            </View>
            <Divider
              theme={theme.colors.onBackground}
              bold={true}
              style={{elevation: 5}}
            />
            <View style={{flex: 1}}>
              <ScrollView style={{flex: 1, padding: 10}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('EditMenu')}
                  style={{
                    height: 200,
                    width: '100%',
                    backgroundColor:
                      color == 'dark'
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(0, 0, 0, 0.1)',
                    borderRadius: 20,
                    flexDirection: 'row',
                    padding: 10,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      marginRight: 15,
                      marginLeft: 10,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 15, fontFamily: 'Poppins-Regular'}}>
                      Name
                    </Text>
                    <Text style={{fontSize: 15, fontFamily: 'Poppins-Regular'}}>
                      Description
                    </Text>
                    <Text style={{fontSize: 15, fontFamily: 'Poppins-Regular'}}>
                      Price
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'Poppins-Regular',
                          paddingTop: 5,
                        }}>
                        Stock
                      </Text>
                      <Switch
                        value={switchStatus}
                        onValueChange={() => setSwitchStatus(!switchStatus)}
                        disabled={false}
                        circleSize={20}
                        barHeight={25}
                        backgroundActive={theme.colors.primary}
                        backgroundInactive={'gray'}
                        circleActiveColor={'white'}
                        circleInActiveColor={theme.colors.primary}
                        circleBorderActiveColor={'white'}
                        circleBorderInactiveColor={theme.colors.primary}
                        changeValueImmediately={true}
                        switchLeftPx={3}
                        switchRightPx={3}
                        switchWidthMultiplier={2}
                        switchBorderRadius={20}
                        renderActiveText={false}
                        renderInActiveText={false}
                      />
                    </View>
                  </View>
                  <Image
                    source={{
                      uri: 'https://t4.ftcdn.net/jpg/04/97/86/19/240_F_497861919_YpD1bljFxozYpF3LNM91zWOubJCPH8hm.jpg',
                    }}
                    style={{
                      height: '100%',
                      width: '40%',
                      objectFit: 'cover',
                      borderRadius: 20,
                    }}
                  />
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        )}
      </View>
      <Divider theme={theme} bold={true} style={{elevation: 1}} />
      <View
        style={{
          height: 70,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Button
          mode={addBorder}
          style={{height: 40}}
          onPress={() => {
            if (addBorder == 'outlined') {
              setAddBorder('contained');
              setMenuBorder('outlined');
              setName('');
              setDescription('');
              setSelectedType([]);
              setSelectedCategory([]);
              setSelectedCuisine([]);
              setSelectedPreference('');
              setPrice('');
            }
          }}>
          <Text
            style={{
              color:
                addBorder == 'outlined' ? theme.colors.onBackground : 'white',
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
            }}>
            Add
          </Text>
        </Button>
        <Button
          mode={menuBorder}
          style={{height: 40}}
          onPress={() => {
            if (menuBorder == 'outlined') {
              setAddBorder('outlined');
              setMenuBorder('contained');
            }
          }}>
          <Text
            style={{
              color:
                menuBorder == 'outlined' ? theme.colors.onBackground : 'white',
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
            }}>
            Menu
          </Text>
        </Button>
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
    </View>
  );
}

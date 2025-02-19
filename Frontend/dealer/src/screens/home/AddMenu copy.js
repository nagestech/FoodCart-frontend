import {
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  useColorScheme,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {TextInput, useTheme, Button, Text, Snackbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  MultipleSelectList,
  SelectList,
} from 'react-native-dropdown-select-list';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useEffect, useState} from 'react';

export function AddMenu() {
  useEffect(() => {
    requestCameraPermission();
  }, []);
  const theme = useTheme();
  const color = useColorScheme();
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [preparationTime, setPreparationTime] = useState(0);
  const [selectedTag, setSelectedTag] = useState([]);
  const [selectedSpicyLevel, setSelectedSpicyLevel] = useState('');
  const [SelectedAddons, setSelectedAddons] = useState([]);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [SelectedMajorIngredients, setSelectedMajorIngredients] = useState([]);
  const [imagePath, setImagePath] = useState({
    uri: 'https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg',
    response: {},
  });
  const [videoPath, setVideoPath] = useState({
    uri: 'https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg',
    response: {},
  });
  const type = [
    {key: '1', value: 'Snacks'},
    {key: '2', value: 'Drinks'},
    {key: '3', value: 'Food'},
  ];
  const category = [
    {key: '1', value: 'Vegan'},
    {key: '2', value: 'Veg'},
    {key: '3', value: 'Non-Veg'},
    {key: '4', value: 'Egg'},
  ];
  const tag = [{key: '1', value: 'Chefs special'}];
  const spicyLevel = [
    {key: '1', value: 'Normal'},
    {key: '2', value: 'Spicy'},
    {key: '3', value: 'More Spicy'},
  ];
  const addons = [
    {key: '1', value: 'Sauce'},
    {key: '2', value: 'Cheese'},
  ];
  const ingredients = [
    {key: '1', value: 'Sugar'},
    {key: '2', value: 'Cheese'},
  ];

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const launchImagePicker = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      handleImagePickerResponse(response);
    });
  };

  const launchCameraPicker = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };

    launchCamera(options, response => {
      handleImagePickerResponse(response);
    });
  };

  const handleImagePickerResponse = response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode === 'camera_unavailable') {
      console.log('Camera not available on device');
    } else if (response.errorCode === 'permission') {
      console.log('Permission not satisfied');
    } else if (response.errorCode === 'others') {
      console.log(response.errorMessage);
    } else {
      setImagePath(response.assets[0].uri);
    }
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };

    let isCameraPermitted = await requestCameraPermission();
    if (isCameraPermitted) {
      launchCamera(options, response => {
        handleImagePickerResponse(response);
      });
    }
  };

  const chooseFile = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      handleImagePickerResponse(response);
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: theme.colors.background,
      }}>
      <StatusBar
        translucent={true}
        barStyle={color === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={'transparent'}
      />
      <ScrollView style={{padding: 10}} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            height: 250,
            width: '100%',
            borderRadius: 20,
          }}>
          <View style={{flex: 1}}>
            <Image
              source={{uri: imagePath.uri}}
              style={{
                flex: 1,
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: 20,
                objectFit: 'cover',
                backgroundColor: 'black',
              }}
            />
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderRadius: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  height: 50,
                }}>
                <TouchableOpacity onPress={launchCameraPicker}>
                  <Icon name="camera" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={launchImagePicker}>
                  <Icon name="photo" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <Icon name="trash-o" size={30} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <Button mode="contained" style={{marginTop: 30}}>
          <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
            Upload
          </Text>
        </Button>
        <TextInput
          mode="outlined"
          label={'Name'}
          placeholder="Enter a food item name"
          style={{marginTop: 20}}
        />
        <TextInput
          mode="outlined"
          label={'Description'}
          placeholder="Enter a food item description"
          style={{marginTop: 20, marginBottom: 25}}
        />
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
            <Icon name="chevron-down" size={20} color={theme.colors.primary} />
          }
          placeholder="Select Food Type"
          boxStyles={{borderRadius: 5}}
        />
        <View style={{height: 25}}></View>
        <SelectList
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
            <Icon name="chevron-down" size={20} color={theme.colors.primary} />
          }
          placeholder="Select Food Category"
          boxStyles={{borderRadius: 5}}
        />
        <View style={{height: 25}}></View>
        <MultipleSelectList
          setSelected={val => setSelectedMajorIngredients(val)}
          data={ingredients}
          save="value"
          searchPlaceholder="Major Ingredients"
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
            <Icon name="chevron-down" size={20} color={theme.colors.primary} />
          }
          placeholder="Select Major Ingredients"
          boxStyles={{borderRadius: 5}}
        />
        <View style={{height: 25}}></View>
        <MultipleSelectList
          setSelected={val => setSelectedTag(val)}
          data={tag}
          save="value"
          searchPlaceholder="Food Tag"
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
            <Icon name="chevron-down" size={20} color={theme.colors.primary} />
          }
          placeholder="Select Food Tag"
          boxStyles={{borderRadius: 5}}
        />
        <View style={{height: 20}}></View>
        <SelectList
          setSelected={val => setSelectedSpicyLevel(val)}
          data={spicyLevel}
          save="value"
          searchPlaceholder="Food Spicy Level"
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
            <Icon name="chevron-down" size={20} color={theme.colors.primary} />
          }
          placeholder="Select Food Spicy Level"
          boxStyles={{borderRadius: 5}}
        />
        <TextInput
          mode="outlined"
          label={'Serve People'}
          placeholder="Enter no of people to have food item"
          style={{marginTop: 20}}
        />
        <TextInput
          mode="outlined"
          label={'Price'}
          placeholder="Enter price of food item"
          style={{marginTop: 20}}
        />
        <TextInput
          mode="outlined"
          label={'GST'}
          placeholder="Enter GST price of food item"
          style={{marginTop: 20}}
        />
        <TextInput
          mode="outlined"
          label={'Package'}
          placeholder="Enter package price of food item"
          style={{marginTop: 20}}
        />
        <View
          style={{
            height: 300,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 25,
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: 300,
              width: '50%',
              backgroundColor: 'red',
              borderRadius: 20,
            }}>
            <View style={{flex: 1}}>
              <Image
                source={{uri: videoPath.uri}}
                style={{
                  flex: 1,
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: 20,
                  objectFit: 'cover',
                  backgroundColor: 'black',
                }}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  borderRadius: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    height: 50,
                  }}>
                  <TouchableOpacity onPress={()=>{captureImage("video")}}>
                    <Icon name="video-camera" size={30} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{chooseFile("video")}}>
                    <Icon name="file-video-o" size={30} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {}}>
                    <Icon name="trash-o" size={30} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={{width: '50%', paddingLeft: 10}}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Poppins-Regular',
                textAlign: 'center',
              }}>
              Upload food item preparation shorts
            </Text>
            <Button mode="contained" style={{marginTop: 30}}>
              <Text style={{fontFamily: 'Poppins-Regular', color: 'white'}}>
                Upload
              </Text>
            </Button>
          </View>
        </View>
        <View style={{height: 25}}></View>
        <MultipleSelectList
          setSelected={val => setSelectedAddons(val)}
          data={addons}
          save="value"
          searchPlaceholder="Addons"
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
            <Icon name="chevron-down" size={20} color={theme.colors.primary} />
          }
          placeholder="Select Addons"
          boxStyles={{borderRadius: 5}}
        />
        <Button mode="contained" style={{marginTop: 30, marginBottom: 50}}>
          <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
            Submit
          </Text>
        </Button>
      </ScrollView>
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
  );
}

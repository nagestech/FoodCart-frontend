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
import {useEffect, useRef, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function EditMenu({navigation}) {
  const theme = useTheme();
  const color = useColorScheme();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [servePeople, setServePeople] = useState("");
  const [price, setPrice] = useState("");
  const [gst, setGst] = useState("");
  const [packageCharge, setPackageCharge] = useState("");
  const [validName, setValidName] = useState("grey");
  const [validDescription, setValidDescription] = useState("grey");
  const [validServe, setValidServe] = useState("grey");
  const [validPrice, setValidPrice] = useState("grey");
  const [validGst, setValidGst] = useState("grey");
  const [validPackage, setValidPackage] = useState("grey");
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [preparationTime, setPreparationTime] = useState(0);
  const [selectedTag, setSelectedTag] = useState([]);
  const [selectedSpicyLevel, setSelectedSpicyLevel] = useState('');
  const [SelectedAddons, setSelectedAddons] = useState([]);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [SelectedMajorIngredients, setSelectedMajorIngredients] = useState([]);
  const nameRef = useRef();
  const [imagePath, setImagePath] = useState({
    uri: 'https://img.freepik.com/free-vector/cute-burger-chef-thumbs-up-cartoon-icon-illustration-food-chef-icon-isolated-flat-cartoon-style_138676-3109.jpg?t=st=1711453595~exp=1711457195~hmac=584e18425bc115af2f97fd28adc0d3484cd3ed0a6059de102a1e6bc22b3844c3&w=740',
    response: {},
  });
  const [videoPath, setVideoPath] = useState({
    uri: 'https://img.freepik.com/premium-vector/latinx-chef-european-sous-chef-professional-kitchen-vector_1045156-1109.jpg',
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
  useEffect(() => {
    requestCameraPermission();
    requestExternalWritePermission();
  }, []);
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Write permission denied');
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

  const launchVideoPicker = () => {
    let options = {
      mediaType: 'video',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      handleImagePickerResponse(response);
    });
  };

  const launchVideoCamPicker = () => {
    let options = {
      mediaType: 'video',
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
      if (response.assets[0].type == 'image/jpeg') {
        setImagePath({uri: response.assets[0].uri, response: response});
      } else {
        setVideoPath({uri: response.assets[0].uri, response: response});
      }
    }
  };
  const EditMenuUpdate = () => {
    if(name == ""){
      setSnackbarMessage("Enter Food Item Name");
      setVisibleSnackbar(true);
    }
    else {
      if(description == "") {
        setSnackbarMessage("Enter Food Description");
        setVisibleSnackbar(true);
      }
      else {
        if(selectedType == "") {
          setSnackbarMessage("Select Food Type");
          setVisibleSnackbar(true);
        }
        else {
          if(String(selectedCategory) == "[]") {
            setSnackbarMessage("Select Food Category");
            setVisibleSnackbar(true);
          }
          else {
            if(String(SelectedMajorIngredients) == "[]") {
              setSnackbarMessage("Select Food Major Ingredients");
              setVisibleSnackbar(true);
            }
            else {
              if(String(selectedTag) == "[]") {
                setSnackbarMessage("Select Food Tag");
                setVisibleSnackbar(true);
              }
              else {
                if(String(selectedSpicyLevel) == "[]") {
                  setSnackbarMessage("Select Food Spicy Level");
                  setVisibleSnackbar(true);
                }
                else {
                  if(servePeople == "" || parseInt(servePeople) > 0) {
                    setSnackbarMessage("Enter Food Serve People");
                    setVisibleSnackbar(true);
                  }
                  else {
                    if(price == "" || parseInt(price) > 0) {
                      setSnackbarMessage("Enter Food Price");
                      setVisibleSnackbar(true);
                    }
                    else {
                      if(imagePath == 'https://img.freepik.com/free-vector/cute-burger-chef-thumbs-up-cartoon-icon-illustration-food-chef-icon-isolated-flat-cartoon-style_138676-3109.jpg?t=st=1711453595~exp=1711457195~hmac=584e18425bc115af2f97fd28adc0d3484cd3ed0a6059de102a1e6bc22b3844c3&w=740') {
                        setSnackbarMessage("Upload Food Image");
                        setVisibleSnackbar(true);
                      }
                      else {
                        console.log("success");
                      }
                    }
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
      <View style={{flexDirection: 'row', padding: 10}}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <MaterialIcons
            name="arrow-back"
            color={theme.colors.onBackground}
            size={30}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{flex: 1, justifyContent: "center", paddingLeft: 10}}>
          <Text style={{fontFamily: "Poppins-Regular", fontSize: 20, marginTop: 5}}>Edit Menu</Text>
        </View>
      </View>
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
                <TouchableOpacity onPress={() => {
                  setImagePath({
                    uri: 'https://img.freepik.com/free-vector/cute-burger-chef-thumbs-up-cartoon-icon-illustration-food-chef-icon-isolated-flat-cartoon-style_138676-3109.jpg?t=st=1711453595~exp=1711457195~hmac=584e18425bc115af2f97fd28adc0d3484cd3ed0a6059de102a1e6bc22b3844c3&w=740',
                    response: {}
                  })
                }}>
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
          activeOutlineColor={validName}
          maxLength={20}
          value={name}
          onChangeText={(value)=>{
            setName(value);
            console.log(name);
          }}
          ref={nameRef}
        />
        <TextInput
          mode="outlined"
          label={'Description'}
          placeholder="Enter a food item description"
          style={{marginTop: 20, marginBottom: 25}}
          activeOutlineColor={validDescription}
          maxLength={25}
          value={description}
          onChangeText={(value)=>setDescription(value)}
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
          activeOutlineColor={validServe}
          keyboardType="number-pad"
          value={servePeople}
          onChangeText={(value)=>setServePeople(value)}
        />
        <TextInput
          mode="outlined"
          label={'Price'}
          placeholder="Enter price of food item"
          style={{marginTop: 20}}
          activeOutlineColor={validPrice}
          keyboardType="number-pad"
          value={price}
          onChangeText={(value)=>setPrice(value)}
        />
        <TextInput
          mode="outlined"
          label={'GST'}
          placeholder="Enter GST price of food item"
          style={{marginTop: 20}}
          activeOutlineColor={validGst}
          keyboardType="number-pad"
          value={gst}
          onChangeText={(value)=>setGst(value)}
        />
        <TextInput
          mode="outlined"
          label={'Package'}
          placeholder="Enter package price of food item"
          style={{marginTop: 20}}
          activeOutlineColor={validPrice}
          keyboardType="number-pad"
          value={packageCharge}
          onChangeText={(value)=>setPackageCharge(value)}
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
                  <TouchableOpacity onPress={launchVideoCamPicker}>
                    <Icon name="video-camera" size={30} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={launchVideoPicker}>
                    <Icon name="file-video-o" size={30} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    setVideoPath({
                      uri: 'https://img.freepik.com/premium-vector/latinx-chef-european-sous-chef-professional-kitchen-vector_1045156-1109.jpg',
                      response: {}
                    })
                  }}>
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
        <Button mode="contained" style={{marginTop: 30, marginBottom: 50}} onPress={EditMenuUpdate}>
          <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
            Update
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

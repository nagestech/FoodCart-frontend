import React, {useState, useEffect} from 'react';
import {
  Platform,
  PermissionsAndroid,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Camera(props) {
  const [image, setImageId] = useState(0);
  const [filePath, setFilePath] = useState({
    uri: 'https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg',
    response: {},
  });
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZWFsZXJpZCI6Miwic3RhZmZpZCI6bnVsbCwicm9sZSI6bnVsbCwiaWF0IjoxNzEwOTk1MjY4LCJleHAiOjE3MTEwODE2Njh9.g0MSHbN7txbhILbHC44jHUcT2kvdDJAYObPE26bwOW8';

  useEffect(() => {
    requestCameraPermission();
    requestExternalWritePermission();
    props.onReceived(image);
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
      setFilePath({uri: response.assets[0].uri, response: response});
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Image
          source={{uri: filePath.uri}}
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
            <TouchableOpacity onPress={launchImagePicker}>
              <Icon name="photo" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

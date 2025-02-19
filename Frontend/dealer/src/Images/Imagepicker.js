import React, { useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { launchCamera,launchImageLibrary } from "react-native-image-picker";

const ImagePicker=(setImage, closeModal) =>{

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
    requestExternalWritePermission()
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
    requestCameraPermission()
    requestExternalWritePermission()
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
    requestCameraPermission()
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
    requestCameraPermission()
    requestExternalWritePermission()
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
        setImage({uri: response.assets[0].uri, response: response});
        closeModal();
      }else{
        setVideoPath({uri: response.assets[0].uri, response: response});
      } 
    }
  };
    return{launchCameraPicker,launchImagePicker,launchVideoCamPicker,launchVideoPicker}
}
export default  ImagePicker
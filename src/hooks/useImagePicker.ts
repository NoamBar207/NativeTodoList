import { useState } from 'react';
import { Platform, Alert, Linking } from 'react-native';
import { launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Toast from 'react-native-toast-message';

export const useImagePicker = () => {
  const [isPicking, setIsPicking] = useState(false);

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'android') return true;
    try {
      const result = await request(PERMISSIONS.ANDROID.CAMERA);
      
      if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
        Alert.alert(
          'Camera Permission Denied',
          'We need access to your camera to attach photos to your notes. Please enable it in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
        return false;
      }
      
      return result === RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const takePhoto = async (): Promise<string | null> => {
    setIsPicking(true);
    const hasPermission = await requestCameraPermission();

    if (!hasPermission) {
      setIsPicking(false);
      return null;
    }

    return new Promise((resolve) => {
      launchCamera(
        { mediaType: 'photo', cameraType: 'back', quality: 0.8 },
        (response: ImagePickerResponse) => {
          setIsPicking(false);
          if (response.didCancel) {
            resolve(null);
          } else if (response.errorCode) {
            Toast.show({
              type: 'error',
              text1: 'Camera Error',
              text2: response.errorMessage || 'Failed to open camera.',
            });
            resolve(null);
          } else if (response.assets && response.assets.length > 0) {
            resolve(response.assets[0].uri || null);
          } else {
            resolve(null);
          }
        }
      );
    });
  };

  const selectFromGallery = async (): Promise<string | null> => {
    setIsPicking(true);
    return new Promise((resolve) => {
      launchImageLibrary(
        { mediaType: 'photo', quality: 0.8 },
        (response: ImagePickerResponse) => {
          setIsPicking(false);
          if (response.didCancel) {
            resolve(null);
          } else if (response.errorCode) {
            Toast.show({
              type: 'error',
              text1: 'Gallery Error',
              text2: response.errorMessage || 'Failed to open gallery.',
            });
            resolve(null);
          } else if (response.assets && response.assets.length > 0) {
            resolve(response.assets[0].uri || null);
          } else {
            resolve(null);
          }
        }
      );
    });
  };

  return { takePhoto, selectFromGallery, isPicking };
};

import { useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Toast from 'react-native-toast-message';

export const useLocation = () => {
  const [isLocating, setIsLocating] = useState(false);

  const requestLocationPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      return result === RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const getCurrentLocation = async (): Promise<{ latitude: number; longitude: number } | null> => {
    setIsLocating(true);
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      Toast.show({
        type: 'error',
        text1: 'Permission Denied',
        text2: 'Location permission is required to save notes with your coordinates.',
      });
      setIsLocating(false);
      return null;
    }

    return new Promise((resolve) => {
      Geolocation.getCurrentPosition(
        (position) => {
          setIsLocating(false);
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          Toast.show({
            type: 'error',
            text1: 'Location Error',
            text2: error.message || 'Failed to fetch location.',
          });
          setIsLocating(false);
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  };

  return { getCurrentLocation, isLocating };
};

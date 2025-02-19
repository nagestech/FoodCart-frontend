import messaging from '@react-native-firebase/messaging'

export const generateToken = async () => {
  try {
    const fcmtoken = await messaging().getToken()
      console.log('FCM Token:', fcmtoken)
    return fcmtoken;
  } catch (error) {
    console.error('Error generating token:', error);
    return null;
  }
  };

  export async function sendTokensToBackend(jwtToken, fcmToken) {
    try {
      const response = await fetch('http:192.168.1.43:3006/notifications/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({ fcmToken }),
      });
      if (response.ok) {
        console.log('FCM token sent successfully to backend');
      } else {
        console.error('Failed to send FCM token to backend');
      }
    } catch (error) {
      console.error('Error sending FCM token to backend:', error);
    }
  }  

  export async function handleAuthentication() {
    const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNzEyMjEyNjk3LCJleHAiOjE3MTIzODU0OTd9.7zpTxWY9rAlP3qJnSg8g38h4SGxEObZLBPG9fKCTkNY';
    const fcmToken = await generateToken();
    if (fcmToken) {
      await sendTokensToBackend(jwtToken, fcmToken);
    }
  }

  export async function requestuserPermission(){
    const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  PaperProvider,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import messaging from '@react-native-firebase/messaging'
import {useColorScheme, Alert} from 'react-native';
import {LightTheme, DarkTheme} from './src/themes/Theme';
import {Login} from './src/screens/auth/Login';
import {FeedRoute} from './src/screens/home/FeedRoute';
import {PayoutRoute} from './src/screens/home/PayoutRoute';
import {PocketRoute} from './src/screens/home/PocketRoute';
import {MoreRoute} from './src/screens/home/MoreRoute';
import Home from './src/screens/home/Home';
import {Dummy} from './src/screens/Dummy';
import { handleAuthentication, generateToken } from './src/screens/auth/FCM';
import { RateCard } from './src/screens/home/RateCard';
import { Trips } from './src/screens/home/Trips';
import { Profile } from './src/screens/home/Profile';

const App = () => {
  const systemColorScheme = useColorScheme();
  const [appTheme, setAppTheme] = useState(
    systemColorScheme === 'dark' ? DarkTheme : LightTheme,
  );

  useEffect(() => {
    const theme = systemColorScheme === 'dark' ? DarkTheme : LightTheme;
    setAppTheme(theme);
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', remoteMessage.notification.body);
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    return unsubscribe;
  }, [systemColorScheme]);

  const theme = {
    ...PaperDefaultTheme,
    ...appTheme,
  };
   handleAuthentication() 
   generateToken()
  
  const Stack = createNativeStackNavigator();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="FeedRoute" component={FeedRoute} />
          <Stack.Screen name="PayRoute" component={PayoutRoute} />
          <Stack.Screen name="PocketRoute" component={PocketRoute} />
          <Stack.Screen name="MoreRoute" component={MoreRoute} />
          <Stack.Screen name="Dummy" component={Dummy} />
          <Stack.Screen name="RateCard" component={RateCard} />
          <Stack.Screen name="Trips" component={Trips} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;

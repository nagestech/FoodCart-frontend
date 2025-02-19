import React, { useState, useEffect } from 'react';
import { SafeAreaView, useColorScheme, StatusBar, Image } from 'react-native';
import { Text, useTheme, Button } from 'react-native-paper';
import { verify, wait } from '../../Images/Images';

export function TeamStatus({navigation}) {
  const color = useColorScheme();
  const theme = useTheme();
  const [isVerified, setVerified] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVerified(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar
        translucent={true}
        barStyle={color === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={'transparent'}
      />
      {!isVerified ? (
        <>
          <Image source={wait} style={{ height: 200, width: 200, resizeMode: 'contain' }} />
          <Text style={{color: theme.colors.onBackground, fontFamily: "Poppins-Regular", fontSize: 15}}>Your details are under verification it takes time</Text>
        </>
      ) : (
        <>
          <Image source={verify} style={{ height: 200, width: 200, resizeMode: 'contain' }} />
          <Text style={{color: theme.colors.onBackground, fontFamily: "Poppins-Regular", fontSize: 25}}>Verified Successfully</Text>
          <Button mode='contained' style={{ marginTop: 40}} onPress={()=>navigation.replace("Home")}>
            <Text style={{color: "white", fontFamily: "Poppins-Regular"}}>Continue</Text>
          </Button>
        </>
      )}
    </SafeAreaView>
  );
}

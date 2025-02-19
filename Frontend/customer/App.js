import React, { useEffect } from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Slide1 } from "./src/screen/intro/Slide1";
import { Slide2 } from "./src/screen/intro/Slide2";
import { Slide3 } from "./src/screen/intro/Slide3";
import { Login } from "./src/screen/auth/Login";
import { Signup } from "./src/screen/auth/Signup";
import { Home } from "./src/screen/Home/Home";
import { Home2 } from "./src/screen/Home/Home2";
import { Hotels } from "./src/screen/Hotels/Hotels";
import { HotelItem } from "./src/screen/Hotels/HotelItem";
import { Cart } from "./src/screen/Hotels/Cart";
import { initData } from "./src/const/AsyncStorage";
import { Initial } from "./src/screen/auth/Initial";
import { Profile } from "./src/screen/Profile/Profile";
import { Payment } from "./src/screen/Hotels/Payment";

const Stack = createNativeStackNavigator();
export default function App() {
  console.log(initData("hello"));
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Slide1" screenOptions={{headerShown: false}}> 
      <Stack.Screen name="Initial" component={Initial} />
        <Stack.Screen name="Slide1" component={Slide1} />
        <Stack.Screen name="Slide2" component={Slide2} />
        <Stack.Screen name="Slide3" component={Slide3} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Home2" component={Home2} />
        <Stack.Screen name="Hotels" component={Hotels} /> 
        <Stack.Screen name="HotelItem" component={HotelItem} /> 
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Payment" component={Payment} />                     
      </Stack.Navigator>
    </NavigationContainer>
  )
}
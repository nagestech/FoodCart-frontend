// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { LightTheme, DarkTheme } from './src/themes/Theme';
import { Slide } from './src/screens/intro/Slide';
import { Login } from './src/screens/auth/Login';
import { Signup } from './src/screens/auth/Signup';
import { Signup2 } from './src/screens/auth/Signup2';
import { Signup3 } from './src/screens/auth/Signup3';
import { TeamStatus } from './src/screens/status/TeamStatus';
import Home from './src/screens/home/Home';
import { DrawerMenu } from './src/screens/drawer/DrawerMenu';
import { MenuRoute } from './src/screens/home/MenuRoute';
import { OrdersRoute } from './src/screens/home/OrdersRoute';
import { InsightsRoute } from './src/screens/home/InsightsRoute';
import { HistoryRoute } from './src/screens/home/History.';
import { EditMenu } from './src/screens/home/EditMenu';
import { AddMenu } from './src/screens/home/AddMenu';
import { Addons } from './src/screens/home/Addons';
import { Profile } from './src/screens/drawer/Profile';
import { Restaurant } from './src/screens/drawer/Restaurant';

const App = () => {

  const systemColorScheme = useColorScheme();
  const [appTheme, setAppTheme] = useState(systemColorScheme === 'dark' ? DarkTheme : LightTheme);

  useEffect(() => {
    const theme = systemColorScheme === 'dark' ? DarkTheme : LightTheme;
    setAppTheme(theme);
  }, [systemColorScheme]);

  const theme = {
    ...PaperDefaultTheme,
    ...appTheme,
  };

  const Stack = createNativeStackNavigator();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Slide" component={Slide} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Signup2" component={Signup2} />
          <Stack.Screen name="Signup3" component={Signup3} />
          <Stack.Screen name="TeamStatus" component={TeamStatus} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="DrawerMenu" component={DrawerMenu} />
          <Stack.Screen name="MenuRoute" component={MenuRoute} />
          <Stack.Screen name="OrdersRoute" component={OrdersRoute} />
          <Stack.Screen name="InsightsRoute" component={InsightsRoute} />
          <Stack.Screen name="HistoryRoute" component={HistoryRoute} />
          <Stack.Screen name="EditMenu" component={EditMenu} />
          <Stack.Screen name="AddMenu" component={AddMenu} />
          <Stack.Screen name="Addons" component={Addons} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Restaurant" component={Restaurant} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;

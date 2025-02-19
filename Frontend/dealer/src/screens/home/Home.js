import React, {useState} from 'react';
import {BottomNavigation, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView, StatusBar, useColorScheme, Platform} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MenuRoute} from './MenuRoute';
import {OrdersRoute} from './OrdersRoute';
import {InsightsRoute} from './InsightsRoute';
import {HistoryRoute} from './History.';

const Home = ({navigation}) => {
  const color = useColorScheme();
  const theme = useTheme();
  const [index, setIndex] = useState(2);
  const [routes] = useState([
    {
      key: 'orders',
      title: 'Orders',
      focusedIcon: () => (
        <MaterialIcons name="fastfood" color={theme.colors.primary} size={20} />
      ),
      unfocusedIcon: () => (
        <MaterialIcons
          name="fastfood"
          color={theme.colors.onBackground}
          size={20}
        />
      ),
    },
    {
      key: 'menu',
      title: 'Menu',
      focusedIcon: () => (
        <MaterialIcons
          name="menu-book"
          color={theme.colors.primary}
          size={20}
        />
      ),
      unfocusedIcon: () => (
        <MaterialIcons
          name="menu-book"
          color={theme.colors.onBackground}
          size={20}
        />
      ),
    },
    {
      key: 'insights',
      title: 'Insights',
      focusedIcon: () => (
        <MaterialIcons name="insights" color={theme.colors.primary} size={20} />
      ),
      unfocusedIcon: () => (
        <MaterialIcons
          name="insights"
          color={theme.colors.onBackground}
          size={20}
        />
      ),
    },
    {
      key: 'history',
      title: 'History',
      focusedIcon: () => (
        <Icon name="history" size={20} color={theme.colors.primary} />
      ),
      unfocusedIcon: () => (
        <Icon name="history" size={20} color={theme.colors.onBackground} />
      ),
    },
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'orders':
        return <OrdersRoute navigation={navigation} />;
      case 'menu':
        return <MenuRoute navigation={navigation} />;
      case 'insights':
        return <InsightsRoute />;
      case 'history':
        return <HistoryRoute />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
      />
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </SafeAreaView>
  );
};

export default Home;

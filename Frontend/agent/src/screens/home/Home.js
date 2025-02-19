import React, {useState} from 'react';
import {BottomNavigation, useTheme, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {Switch} from 'react-native-switch';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {PayoutRoute} from './PayoutRoute';
import {FeedRoute} from './FeedRoute';
import {PocketRoute} from './PocketRoute';
import {MoreRoute} from './MoreRoute';

const Home = ({navigation}) => {
  const color = useColorScheme();
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const [switchStatus, setSwitchStatus] = useState(false);
  const [routes] = useState([
    {
      key: 'feed',
      title: 'Feed',
      focusedIcon: () => (
        <MaterialIcons name="feed" color={theme.colors.primary} size={20} />
      ),
      unfocusedIcon: () => (
        <MaterialIcons
          name="feed"
          color={theme.colors.onBackground}
          size={20}
        />
      ),
    },
    {
      key: 'payout',
      title: 'Payout',
      focusedIcon: () => (
        <MaterialIcons name="payments" color={theme.colors.primary} size={20} />
      ),
      unfocusedIcon: () => (
        <MaterialIcons
          name="payments"
          color={theme.colors.onBackground}
          size={20}
        />
      ),
    },
    {
      key: 'pocket',
      title: 'Pocket',
      focusedIcon: () => (
        <Icon name="get-pocket" color={theme.colors.primary} size={20} />
      ),
      unfocusedIcon: () => (
        <Icon name="get-pocket" color={theme.colors.onBackground} size={20} />
      ),
    },
    {
      key: 'more',
      title: 'More',
      focusedIcon: () => (
        <MaterialIcons name="menu" size={20} color={theme.colors.primary} />
      ),
      unfocusedIcon: () => (
        <MaterialIcons
          name="menu"
          size={20}
          color={theme.colors.onBackground}
        />
      ),
    },
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'feed':
        return <FeedRoute navigation={navigation} />;
      case 'payout':
        return <PayoutRoute navigation={navigation} />;
      case 'pocket':
        return <PocketRoute />;
      case 'more':
        return <MoreRoute />;
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
        barStyle={color === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          marginTop: Platform.OS == 'android' ? 30 : 0,
        }}>
        <View style={{flex: 1, justifyContent: 'center', paddingLeft: 10}}>
          <Switch
            value={switchStatus}
            onValueChange={() => setSwitchStatus(!switchStatus)}
            disabled={false}
            activeText={'Online'}
            inActiveText={'Offline'}
            circleSize={25}
            barHeight={30}
            backgroundActive={theme.colors.primary}
            backgroundInactive={'gray'}
            circleActiveColor={'white'}
            circleInActiveColor={theme.colors.primary}
            circleBorderActiveColor={'white'}
            circleBorderInactiveColor={theme.colors.primary}
            changeValueImmediately={true}
            switchLeftPx={2}
            switchRightPx={2}
            switchWidthMultiplier={4}
            switchBorderRadius={30}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            paddingLeft: 20,
            paddingRight: 20,
          }}>
          <Icon name="bell" size={20} color={theme.colors.primary} />
          <TouchableOpacity style={{marginLeft: 20, backgroundColor: "rgba(128, 128, 128, 0.2)", width: 30, height: 30, justifyContent: "center", alignItems: 'center', borderRadius: 30}} onPress={()=>navigation.navigate("Profile")}>
            <Icon name="user" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </SafeAreaView>
  );
};

export default Home;

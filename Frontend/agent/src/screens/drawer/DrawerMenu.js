import {
  SafeAreaView,
  useColorScheme,
  StatusBar,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Divider, Text, useTheme} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';

export function DrawerMenu({navigation}) {
  const theme = useTheme();
  const color = useColorScheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor:
          color === 'dark' ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 0.2)',
        padding: 5,
      }}>
      <StatusBar
        translucent={true}
        barStyle={color === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={
          color === 'dark' ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 0)'
        }
      />
      <View
        style={{height: 50, justifyContent: 'center', flexDirection: 'row'}}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <MaterialIcons
            name="arrow-back"
            color={theme.colors.onBackground}
            size={30}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{flex: 1}}></View>
      </View>
      <View style={{paddingLeft: 10, paddingRight: 10}}>
        <View
          style={{
            height: 100,
            flexDirection: 'row',
            padding: 10,
            backgroundColor:
              color === 'dark'
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(255, 255, 255, 1)',
            borderRadius: 20,
          }}>
          <View
            style={{width: 80, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                height: 60,
                width: 60,
                borderRadius: 60,
                backgroundColor: 'rgba(255, 100, 100, 1)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 30}}>S</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: 10,
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 20,
                color: theme.colors.onBackground,
              }}>
              Satish
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 15,
                color: theme.colors.primary,
              }}>
              View activity
            </Text>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: 120,
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              marginRight: 10,
              flex: 1,
              height: '90%',
              backgroundColor:
                color === 'dark'
                  ? 'rgba(255, 255, 255, 0.2)'
                  : 'rgba(255, 255, 255, 1)',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="heart-o" size={23} color={theme.colors.primary} />
            <Text
              style={{
                color: theme.colors.primary,
                fontFamily: 'Poppins-Regular',
                fontSize: 15,
              }}>
              Favorites
            </Text>
          </View>
          <View
            style={{
              marginLeft: 10,
              flex: 1,
              height: '90%',
              backgroundColor:
                color === 'dark'
                  ? 'rgba(255, 255, 255, 0.2)'
                  : 'rgba(255, 255, 255, 1)',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="money" size={23} color={theme.colors.primary} />
            <Text
              style={{
                color: theme.colors.primary,
                fontFamily: 'Poppins-Regular',
                fontSize: 15,
              }}>
              Money
            </Text>
          </View>
        </View>
        <View style={{height: 80, padding: 10, justifyContent: 'center'}}>
          <View
            style={{
              height: 50,
              backgroundColor: theme.colors.primary,
              borderRadius: 10,
              justifyContent: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: 20,
              paddingRight: 20,
            }}>
            <Icon name="refresh" size={20} color={'white'} />
            <Text
              style={{
                flex: 1,
                paddingLeft: 20,
                fontFamily: 'Poppins-Regular',
                fontSize: 15,
                paddingTop: 5,
                color: 'white',
              }}>
              App update available
            </Text>
            <Icon name="angle-right" size={23} color={'white'} />
          </View>
        </View>
        <View style={{height: 80, padding: 10, justifyContent: 'center'}}>
          <View
            style={{
              height: 50,
              backgroundColor: theme.colors.primary,
              borderRadius: 10,
              justifyContent: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: 20,
              paddingRight: 20,
            }}>
            <Icon name="user-o" size={20} color={'white'} />
            <Text
              style={{
                flex: 1,
                paddingLeft: 20,
                paddingTop: 5,
                fontFamily: 'Poppins-Regular',
                fontSize: 15,
                color: 'white',
              }}>
              Profile
            </Text>
            <Icon name="angle-right" size={23} color={'white'} />
          </View>
        </View>
        <View style={{height: 80, padding: 10, justifyContent: 'center'}}>
          <View
            style={{
              height: 50,
              backgroundColor: theme.colors.primary,
              borderRadius: 10,
              justifyContent: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: 20,
              paddingRight: 20,
            }}>
            <MaterialIcons name="restaurant" color={'white'} size={20} />
            <Text
              style={{
                flex: 1,
                paddingLeft: 20,
                paddingTop: 5,
                fontFamily: 'Poppins-Regular',
                fontSize: 15,
                color: 'white',
              }}>
              Restaurant
            </Text>
            <Icon name="angle-right" size={23} color={'white'} />
          </View>
        </View>
        <View style={{height: 80, padding: 10, justifyContent: 'center'}}>
          <View
            style={{
              height: 50,
              backgroundColor: theme.colors.primary,
              borderRadius: 10,
              justifyContent: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: 20,
              paddingRight: 20,
            }}>
            <Icon name="star-o" size={20} color={'white'} />
            <Text
              style={{
                flex: 1,
                fontFamily: 'Poppins-Regular',
                fontSize: 15,
                color: 'white',
                paddingLeft: 20,
                paddingTop: 5,
              }}>
              Your rating
            </Text>
            <Icon name="angle-right" size={23} color={'white'} />
          </View>
        </View>
        <View style={{padding: 10}}>
          <View
            style={{
              flex: 1,
              backgroundColor:
                color === 'dark'
                  ? 'rgba(255, 255, 255, 0.2)'
                  : 'rgba(255, 255, 255, 1)',
              borderRadius: 10,
              paddingBottom: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                color: theme.colors.onBackground,
                padding: 10,
                fontSize: 15,
                borderLeftColor: theme.colors.primary,
                borderLeftWidth: 5,
                borderTopLeftRadius: 10,
              }}>
              More
            </Text>
            <View style={{height: 50, justifyContent: 'center'}}>
              <View
                style={{
                  height: 50,
                  borderRadius: 10,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingLeft: 20,
                  paddingRight: 20,
                }}>
                <Icon name="info" size={20} color={theme.colors.onBackground} />
                <Text
                  style={{
                    flex: 1,
                    fontFamily: 'Poppins-Regular',
                    fontSize: 15,
                    color: theme.colors.onBackground,
                    paddingLeft: 30,
                    paddingTop: 5,
                  }}>
                  About
                </Text>
                <Icon
                  name="angle-right"
                  size={23}
                  color={theme.colors.onBackground}
                />
              </View>
            </View>
            <Divider bold={true} theme={theme} style={{elevation: 0}} />
            <View style={{height: 50, justifyContent: 'center'}}>
              <View
                style={{
                  height: 50,
                  borderRadius: 10,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingLeft: 20,
                  paddingRight: 20,
                }}>
                <Icon name="edit" size={20} color={theme.colors.onBackground} />
                <Text
                  style={{
                    flex: 1,
                    fontFamily: 'Poppins-Regular',
                    fontSize: 15,
                    color: theme.colors.onBackground,
                    paddingLeft: 20,
                    paddingTop: 5,
                  }}>
                  Send feedback
                </Text>
                <Icon
                  name="angle-right"
                  size={23}
                  color={theme.colors.onBackground}
                />
              </View>
            </View>
            <Divider bold={true} theme={theme} style={{elevation: 0}} />
            <View style={{height: 50, justifyContent: 'center'}}>
              <View
                style={{
                  height: 50,
                  borderRadius: 10,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingLeft: 20,
                  paddingRight: 20,
                }}>
                <MaterialIcons
                  name="settings"
                  color={theme.colors.onBackground}
                  size={20}
                />
                <Text
                  style={{
                    flex: 1,
                    fontFamily: 'Poppins-Regular',
                    fontSize: 15,
                    color: theme.colors.onBackground,
                    paddingLeft: 20,
                    paddingTop: 5,
                  }}>
                  Settings
                </Text>
                <Icon
                  name="angle-right"
                  size={23}
                  color={theme.colors.onBackground}
                />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 50,
            marginBottom: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialIcons
            name="logout"
            size={30}
            color={theme.colors.onBackground}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

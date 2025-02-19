import {View, StatusBar, useColorScheme, Platform} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export function PayoutRoute({navigation}) {
  const theme = useTheme();
  const color = useColorScheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <StatusBar
        translucent={true}
        barStyle={color == 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <View style={{marginTop: Platform.OS == 'android' ? 30 : 0}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 15,
              color: theme.colors.onBackground,
            }}>
            Performance for Today
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 15,
              color: theme.colors.primary,
            }}
            onPress={()=>navigation.navigate("Trips")}>
            See trips
          </Text>
        </View>
        <View style={{height: 150, flexDirection: 'row'}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                height: 20,
                backgroundColor: 'rgba(128, 128, 128, 0.2)',
                height: 50,
                width: 60,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 20,
                  justifyContent: 'center',
                  paddingTop: 7,
                  color: theme.colors.primary,
                }}>
                0
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginTop: 10,
                color: theme.colors.primary,
              }}>
              Trip
            </Text>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                height: 20,
                backgroundColor: 'rgba(128, 128, 128, 0.2)',
                height: 50,
                width: 60,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 20,
                  justifyContent: 'center',
                  paddingTop: 7,
                  color: theme.colors.primary,
                }}>
                0
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginTop: 10,
                color: theme.colors.primary,
              }}>
              Login hours
            </Text>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                height: 20,
                backgroundColor: 'rgba(128, 128, 128, 0.2)',
                height: 50,
                width: 60,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 20,
                  justifyContent: 'center',
                  paddingTop: 7,
                  color: theme.colors.primary,
                }}>
                0
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginTop: 10,
                color: theme.colors.primary,
              }}>
              Orders
            </Text>
          </View>
        </View>
        <View style={{height: 150}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: 20,
              paddingLeft: 20,
            }}>
            <View>
              <Text style={{fontFamily: 'Poppins-Regular', fontSize: 20}}>
                Earnings for Today
              </Text>
              <Text style={{fontFamily: 'Poppins-Regular'}}>
                Earnings for last Week
              </Text>
            </View>
            <View>
              <Text style={{fontFamily: 'Poppins-Regular', fontSize: 20}}>
                Rs. 0
              </Text>
              <Text style={{textAlign: 'right', fontFamily: 'Poppins-Regular'}}>
                Rs. 0
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(128, 128, 128, 0.2)',
              borderRadius: 20,
              marginLeft: 10,
              marginRight: 10,
              paddingRight: 10,
              paddingLeft: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  width: 50,
                  backgroundColor: 'rgba(128, 128, 128, 0.2)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                }}>
                <Icon
                  name="shopping-bag"
                  color={theme.colors.primary}
                  size={20}
                />
              </View>
              <View style={{marginLeft: 10}}>
                <Text style={{fontFamily: 'Poppins-Regular', fontSize: 18}}>
                  Order Earnings
                </Text>
                <Text style={{fontFamily: 'Poppins-Regular'}}>
                  Earnings per order
                </Text>
              </View>
            </View>
            <View>
              <Text style={{fontFamily: 'Poppins-Regular'}}>Rs. 0</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
        }}>
        <Text style={{fontFamily: 'Poppins-Regular'}}>
          Learn about payout calculation
        </Text>
        <Text
          style={{fontFamily: 'Poppins-Regualar', color: theme.colors.primary}} onPress={()=>navigation.navigate("RateCard")}>
          See rate card
        </Text>
      </View>
    </View>
  );
}

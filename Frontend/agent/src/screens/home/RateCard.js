import {Platform, ScrollView, StatusBar, View, useColorScheme} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function RateCard({navigation}) {
  const theme = useTheme();
  const color = useColorScheme();
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background, marginTop: 30}}>
      <View style={{flexDirection: 'row', padding: 10}}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <MaterialIcons
            name="arrow-back"
            color={theme.colors.onBackground}
            size={30}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center', paddingLeft: 10}}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 20,
              marginTop: 5,
            }}>
            Rate Card
          </Text>
        </View>
      </View>
      <ScrollView style={{paddingRight: 20, paddingLeft: 20, paddingBottom: 50}}>
        <View
          style={{
            height: 400,
            marginTop: 20,
            marginBottom: 100,
            backgroundColor: 'rgba(100, 100, 100, 0.1)',
            borderRadius: 20,
          }}>
          <View
            style={{
              height: 70,
              backgroundColor: 'rgba(100, 255, 100, 0.2)',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              justifyContent: 'center',
              padding: 10,
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'teal',
              }}>
              <Icon color="white" name="shopping-bag" size={20} />
            </View>
            <View style={{flex: 1, paddingLeft: 10, justifyContent: 'center'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 18,
                  color: theme.colors.onBackground,
                }}>
                Order Earnings
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  color: theme.colors.onBackground,
                }}>
                earnings per order
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: 2,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderColor: 'rgba(100, 255, 100, 0.2)',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: theme.colors.onBackground,
                    fontSize: 15,
                  }}>
                  Total Distance pay
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: theme.colors.onBackground,
                    fontSize: 12,
                  }}>
                  for total distance travelled
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    color: theme.colors.onBackground,
                    fontSize: 15,
                  }}>
                  + Rs. 5.4
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: theme.colors.onBackground,
                    fontSize: 10,
                  }}>
                  {' '}
                  per km
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: theme.colors.onBackground,
                    fontSize: 13,
                  }}>
                  Incentive distance pay
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: theme.colors.onBackground,
                    fontSize: 13,
                  }}>
                  Base distance pay
                </Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: theme.colors.onBackground,
                      fontSize: 15,
                    }}>
                    Rs. 0.4
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: theme.colors.onBackground,
                      fontSize: 10,
                    }}>
                    {' '}
                    per km
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: theme.colors.onBackground,
                      fontSize: 15,
                    }}>
                    Rs. 0.4
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: theme.colors.onBackground,
                      fontSize: 10,
                    }}>
                    {' '}
                    per km
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              <View style={{width: '60%'}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: theme.colors.onBackground,
                    fontSize: 15,
                  }}>
                  Order-ready-time pay
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: theme.colors.onBackground,
                    fontSize: 12,
                  }}>
                  wait time for order-ready at restaurant after 3.0 mins
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    color: theme.colors.onBackground,
                    fontSize: 15,
                  }}>
                  + Rs. 1
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: theme.colors.onBackground,
                    fontSize: 10,
                  }}>
                  {' '}
                  per km
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: theme.colors.onBackground,
                    fontSize: 15,
                  }}>
                  Minimum base pay
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: theme.colors.onBackground,
                    fontSize: 12,
                  }}>
                  guaranteed pay for trip
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    color: theme.colors.onBackground,
                    fontSize: 15,
                  }}>
                  + Rs. 15
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: theme.colors.onBackground,
                    fontSize: 10,
                  }}>
                  {' '}
                  per km
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

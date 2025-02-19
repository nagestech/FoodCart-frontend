import React, {useRef} from 'react';
{
}
import {
  View,
  useColorScheme,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Text, useTheme, Button} from 'react-native-paper';
import BottomSheet, {BottomSheetMethods} from '@devvie/bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {map} from '../../Images/Images';

export function FeedRoute() {
  const theme = useTheme();
  const color = useColorScheme();
  const sheetRef = useRef(null);
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
      <View style={{flex: 1, position: 'relative'}}>
        <Image
          source={map}
          style={{height: '100%', width: '100%', objectFit: 'cover'}}
        />
      </View>
      <View
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
        }}>
        <View style={{flex: 1}}></View>
        <View style={{height: 50}}>
          <TouchableOpacity
            style={{
              height: 30,
              width: 40,
              borderRadius: 40,
              backgroundColor: 'rgba(255, 100, 100, 0.2)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => sheetRef.current.open()}>
            <Icon name="chevron-up" color={theme.colors.primary} size={20} />
          </TouchableOpacity>
        </View>
        <BottomSheet
          ref={sheetRef}
          modal={true}
          height={'80%'}
          style={{backgroundColor: theme.colors.background}}>
          <ScrollView
            style={{padding: 20}}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                height: 300,
                width: '100%',
                backgroundColor:
                  color == 'dark'
                    ? 'rgba(128, 128, 128, 0.2)'
                    : 'rgba(100, 100, 100, 0.1)',
                borderRadius: 20,
                flexDirection: 'column',
                padding: 20,
              }}>
              <View
                style={{
                  flex: 1,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Icon name="clock-o" size={30} color={theme.colors.primary} />
                </View>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      color: theme.colors.primary,
                      fontFamily: 'Poppins-Bold',
                      fontSize: 20,
                      textAlign: 'center',
                    }}>
                    Introducing Gigs
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.onBackground,
                      fontFamily: 'Poppins-Regular',
                      fontSize: 14,
                    }}>
                    Choose and work in your preferred time
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flex: 1,
                    borderBottomLeftRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Icon name="flash" size={30} color={theme.colors.primary} />
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        color: theme.colors.onBackground,
                        fontFamily: 'Poppins-Regular',
                        fontSize: 15,
                      }}>
                      Get Order faster
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderBottomRightRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <MaterialIcons
                      name="insights"
                      size={30}
                      color={theme.colors.primary}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        color: theme.colors.onBackground,
                        fontFamily: 'Poppins-Regular',
                        fontSize: 15,
                        textAlign: 'center',
                      }}>
                      High payout on every order
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                padding: 20,
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{flex: 2, fontFamily: 'Poppins-Regular', fontSize: 13}}>
                Learn how you can benefit from gigs
              </Text>
              <Button mode="contained" style={{marginLeft: 10}}>
                <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
                  Know more
                </Text>
              </Button>
            </View>
            <View
              style={{height: 150, borderRadius: 20, flexDirection: 'column'}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  backgroundColor:
                    color == 'dark'
                      ? 'rgba(128, 128, 128, 0.2)'
                      : 'rgba(100, 100, 100, 0.1)',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  paddingLeft: 15,
                  alignItems: 'center',
                }}>
                <Icon name="calendar" size={20} color={theme.colors.primary} />
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 18,
                    marginLeft: 10,
                    color: theme.colors.primary,
                  }}>
                  Today's progress
                </Text>
              </View>
              <View
                style={{
                  flex: 2,
                  flexDirection: 'row',
                  backgroundColor: 'rgba(128, 128, 128, 0.1)',
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  justifyContent: 'space-around',
                }}>
                <View style={{justifyContent: 'center'}}>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>Rs. 0</Text>
                  <Text style={{fontFamily: 'Poppins-Regular', color: 'green'}}>
                    Earnings
                  </Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>0</Text>
                  <Text style={{fontFamily: 'Poppins-Regular', color: 'green'}}>
                    Tips
                  </Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>00.00 hrs</Text>
                  <Text style={{fontFamily: 'Poppins-Regular', color: 'green'}}>
                    Sessions
                  </Text>
                </View>
              </View>
            </View>
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
                <View
                  style={{flex: 1, paddingLeft: 10, justifyContent: 'center'}}>
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
        </BottomSheet>
      </View>
    </View>
  );
}

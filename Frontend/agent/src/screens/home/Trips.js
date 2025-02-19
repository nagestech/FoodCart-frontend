import React from 'react';
import {ScrollView, View, useColorScheme} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function Trips({navigation}) {
  const theme = useTheme();
  const color = useColorScheme();
  const orders = [
    {
      id: 1,
      status: 'Delivered',
      date: 'April 2, 2024',
      time: '10:30 AM',
      orderItems: [
        {foodName: 'Pizza', quantity: 1, price: '300'},
        {foodName: 'Burger', quantity: 2, price: '250'},
        {foodName: 'French Fries', quantity: 1, price: '120'},
      ],
      totalPrice: '670',
      deliveryAddress: '123 Main St, Cityville',
      restaurantAddress: '456 Oak Ave, Townsville',
    },
    {
      id: 2,
      status: 'Cancelled',
      date: 'April 3, 2024',
      time: '11:45 AM',
      orderItems: [
        {foodName: 'Sushi', quantity: 2, price: '600'},
        {foodName: 'Salad', quantity: 1, price: '180'},
      ],
      totalPrice: '780',
      deliveryAddress: '789 Elm St, Villageton',
      restaurantAddress: '321 Maple Ave, Countryside',
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background, marginTop: 30}}>
      <View style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
        <MaterialIcons
          name="arrow-back"
          color={theme.colors.onBackground}
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            paddingLeft: 10,
            fontSize: 20,
            color: theme.colors.onBackground,
          }}>
          Trips
        </Text>
      </View>
      <ScrollView style={{padding: 20}}>
        {orders.map(order => (
          <View key={order.id} style={{marginBottom: 20}}>
            <View
              style={{
                backgroundColor: 'rgba(128, 128, 128, 0.2)',
                borderRadius: 10,
                padding: 15,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{justifyContent: "space-between"}}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: theme.colors.primary,
                      fontSize: 20,
                    }}>
                    {order.status}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: theme.colors.onBackground,
                    }}>
                    Order ID: #{order.id}
                  </Text>
                </View>
                <View style={{justifyContent: "space-between"}}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: theme.colors.onBackground,
                    }}>
                    Date: {order.date}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: theme.colors.onBackground,
                    }}>
                    Time: {order.time}
                  </Text>
                </View>
              </View>

              <View style={{marginTop: 10}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontFamily: 'Poppins-Regular',
                    color: theme.colors.onBackground,
                    textAlign: 'center',
                  }}>
                  Order Items:
                </Text>
                {order.orderItems.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 5,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: theme.colors.onBackground,
                      }}>
                      {item.foodName} x {item.quantity}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: theme.colors.onBackground,
                      }}>
                      Rs. {item.price}
                    </Text>
                  </View>
                ))}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: theme.colors.onBackground,
                    }}>
                    Total Price:
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontFamily: 'Poppins-Regular',
                      color: theme.colors.primary,
                    }}>
                    Rs. {order.totalPrice}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flex: 1, flexDirection: "column"}}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: theme.colors.primary,
                    }}>
                    Delivery Address
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: theme.colors.onBackground,
                    }}>
                    {order.deliveryAddress}
                  </Text>
                </View>
                <View style={{flex: 1, alignItems: "flex-end", flexDirection: "column"}}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: theme.colors.primary,
                    }}>
                    Restaurant Address
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: theme.colors.onBackground,
                    }}>
                    {order.restaurantAddress}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

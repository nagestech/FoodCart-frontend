import React, { useEffect, useState } from "react";
import { ScrollView, View, Image, TouchableOpacity, StatusBar, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import { colors } from "../../const/Colors";
import { useRoute } from '@react-navigation/native';
import Animated, { SlideInDown, SlideInLeft, SlideInRight, SlideInUp } from "react-native-reanimated";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Cart } from "../../const/Images";


export function Hotels({ navigation }) {
  const route = useRoute();
  const [restaurantData, setRestaurantData] = useState([]);
  const food = route.params.Food;
  const color = () => {
    if (food.FoodType === "Veg") {
      return colors.green;
    } else if (food.FoodType === "All") {
      return "orange";
    } else {
      return colors.red;
    }
  };

  useEffect(() => {
    fetch("http://192.168.1.43:3000/filter/category?restaurant_type="+food.FoodCategory+"&food_type="+food.FoodType, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setRestaurantData(responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar barStyle={'light-content'} translucent />
      <View style={{ backgroundColor: color(), height: 100, alignItems: 'center', justifyContent: 'flex-end' }}>
        <Animated.Text style={{ fontFamily: 'Poppins-Regular', fontSize: 30, textAlign: 'center', color: colors.white }}>{food.FoodType} {food.FoodCategory}s</Animated.Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{ flexGrow: 1, paddingRight: 20, paddingLeft: 20, paddingBottom: 30 }}>
        <Animated.View  >
          {restaurantData.map((restaurant, index) => (
            <TouchableOpacity key={index} style={{ marginTop: 30, height: 200, backgroundColor: colors.white, borderRadius: 20, elevation: 20 }} onPress={() => {
              food.provider = restaurant.restaurant_name;
              navigation.navigate("HotelItem", { food });
            }}>
              <Image source={{ uri: restaurant.image }} style={{ height: '100%', width: '100%', resizeMode: 'cover', position: 'relative', borderRadius: 20 }} />
              <View style={{ position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 20, flexDirection: 'column' }}>
                  <Text style={{ color: colors.white, fontFamily: 'Poppins-Regular', fontSize: RFPercentage(3), textAlign: 'center', paddingRight: 3, paddingLeft: 3}}>{restaurant.restaurant_name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: colors.white, fontFamily: 'Poppins-Regular', fontSize: RFPercentage(2) }}>{restaurant.timing}</Text>
                </View>
              </View>
              <View style={{ width: '100%', height: '100%', position: 'absolute', alignItems: 'flex-end', padding: 10 }}>
              <Text style={{backgroundColor: colors.green, color: colors.white, fontFamily: 'Poppins-Bold', width: 55, textAlign: 'center', borderRadius: 5}}>⭐ {restaurant.ratings}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

import React, { useState, useEffect } from "react";
import { ScrollView, View, Image, TouchableOpacity, StatusBar, SafeAreaView, Modal } from "react-native";
import { Text, Button, Badge, Snackbar } from "react-native-paper";
import { useRoute } from '@react-navigation/native'; 
import { RFPercentage } from "react-native-responsive-fontsize";
import Animated from "react-native-reanimated";
import { Cart } from "../../const/Images";
import { colors } from "../../const/Colors"; // Make sure to import your colors

export function HotelItem({ navigation }) {
    const route = useRoute();
    const [restaurantData, setRestaurantData] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedDescription, setSelectedDescription] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedProductItem, setSelectedProductItem] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [cartNotification, setCartNotification] = useState(false);
    const [cart, setCart] = useState({});
    const [cartQuantity, setCartQuantity] = useState(0);
    const food = route.params.food;
    const [visibleSnackbar, setVisibleSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const color = () => {
        if (food.FoodType === "Veg") {
            return colors.green;
        } 
        if (food.FoodType === "Non-Veg") {
            return colors.red;
        } 
        if (food.FoodType === "All") {
            return "orange";
        }
    };
    
    useEffect(() => {
        console.log("Added : ", cart)
        const updatedCart = { ...cart };
        const newCart = {};
        let newIndex = 0;
    
        for (const key in cart) {
            if (cart.hasOwnProperty(key)) {
                newCart[newIndex.toString()] = cart[key];
                newIndex++;
            }
        }

        fetch("http://192.168.1.43:3000/filter/product?restaurant_name=" + food.provider + "&product_category=" + food.FoodType, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            setRestaurantData(responseData[0].products);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });

    }, [cartNotification, cart]);

    const openModal = (image, description, price, name) => {
        setSelectedImage(image);
        setSelectedDescription(description);
        setSelectedPrice(price);
        setSelectedProductItem(name);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setSelectedDescription(null);
        setSelectedPrice(null);
        setModalVisible(false);
        setSelectedProductItem(null);
        setQuantity(1);
    };

    const addToCart = () => {
        const updatedCart = { ...cart };
        
        for (const item of Object.values(updatedCart)) {
            if (item.name === selectedProductItem) {
                item.quantity += quantity;
                setCart(updatedCart);
                setCartNotification(true);
                setCartQuantity(cartQuantity + quantity);
                closeModal();
                return;
            }
        }
        setCart(updatedCart);
        const newCart = {};
        let newIndex = 0;
    
        for (const key in cart) {
            if (cart.hasOwnProperty(key)) {
                newCart[newIndex.toString()] = cart[key];
                newIndex++;
            }
        }
        setCart(newCart);
        const len = Object.values(newCart).length;
        newCart[len] = {
            name: selectedProductItem,
            image: selectedImage,
            price: selectedPrice,
            quantity: quantity,
        };
        setCart(newCart);
        setCartNotification(true);
        setCartQuantity(cartQuantity + quantity);
        closeModal();
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <StatusBar barStyle={'light-content'} translucent />
            <View style={{ backgroundColor: color(), height: 100, alignItems: 'center', justifyContent: 'flex-end'}}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: RFPercentage(3), textAlign: 'center', color: colors.white }}>{food.provider}s</Text>
            </View>
            <View style={{position: 'relative'}}>
                <View style={{ zIndex: 1, flexDirection: 'row', height: 100, width: "100%", position: 'absolute', justifyContent: 'flex-end', padding: 20}}>
                    <View style={{flex: 1}}>

                    </View>
                    <TouchableOpacity style={{height: 50, width: 50, borderRadius: 50, elevation: 5, justifyContent: 'center', alignItems: 'center'}} onPress={() => {
                        if(Object.keys(cart).length !== 0){
                            navigation.navigate("Cart", { cart: cart, food: food })    
                        }
                        else {
                            setVisibleSnackbar(true);
                            setSnackbarMessage("Add Food to Cart");
                        }
                        }}>
                        <Image source={Cart} style={{height: 50, width: 50, borderRadius: 40}} />
                    </TouchableOpacity>
                    <View>
                        <Badge visible={cartNotification} style={{ backgroundColor: colors.red, color: colors.white, fontWeight: 'bold'}}>1</Badge>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingRight: 20, paddingLeft: 20, paddingBottom: 120 }}>
                    <Animated.View>
                        {restaurantData.map((restaurant, index) => (
                            <TouchableOpacity
                                key={index}
                                style={{ marginTop: 30, height: 250, backgroundColor: colors.white, flexDirection: 'column', elevation: 20, borderTopLeftRadius: 30, borderRadius: 30, paddingBottom: 10 }}
                                onPress={() => openModal(restaurant.product_image, restaurant.description, restaurant.price, restaurant.product_name)}>
                                <Image source={{ uri: restaurant.product_image }} style={{ flex: 3, borderTopLeftRadius: 30, borderTopRightRadius: 30, height: '100%', width: '100%', resizeMode: 'cover'}} />
                                <View style={{ flex: 1, borderBottomRightRadius: 30, paddingTop: 5, paddingLeft: 15, paddingRight: 15, flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: RFPercentage(2), fontFamily: 'Poppins-Bold', color: colors.black }}>{restaurant.product_name}</Text>
                                        <View>
                                            <Text style={{ backgroundColor: colors.green, color: colors.white, fontFamily: 'Poppins-Bold', width: 55, textAlign: 'center', borderRadius: 5, marginTop: 5 }}>⭐ {restaurant.ratings}</Text>
                                        </View>
                                    </View>
                                    <Text style={{ fontFamily: 'Poppins-Regular', color: colors.grey, fontWeight: 'bold', }}>Rs. {restaurant.price}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </Animated.View>
                </ScrollView>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
                statusBarTranslucent
                style={{height: "100%"}}>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center',backgroundColor:"rgba(0, 0, 0, 0.7)" }}>
                    <TouchableOpacity style={{ flex: 1, width: '100%' }} onPress={closeModal} />
                    <View style={{ backgroundColor: colors.white, height: '70%', width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                        {selectedImage && <Image source={{ uri: selectedImage }} style={{ height: '50%', width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, resizeMode: 'cover' }} />}
                        <View style={{ flex: 1, padding: 20, flexDirection: "column" }}>
                            <Text style={{fontFamily: "Poppins-Regular", textAlign: 'center', fontSize: RFPercentage(3)}}>{selectedProductItem}</Text>
                            <Text style={{fontFamily: "Poppins-Regular", textAlign: 'center', fontSize: RFPercentage(2)}}>{selectedDescription}</Text>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View  style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontSize: 20, color: colors.black, fontFamily: 'Poppins-Regular'}}>Rs. {selectedPrice * quantity}</Text>
                                </View>
                                <View style={{flex: 1, justifyContent: 'center', justifyContent: 'space-between'}}>
                                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                                        <TouchableOpacity style={{height: 40, width: 40, borderRadius: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.red}} onPress={()=>{
                                            if(quantity !== 1 ) {
                                                setQuantity(quantity - 1);
                                            }
                                        }}>
                                            <Text style={{fontSize: 25, color: colors.white}}>-</Text>
                                        </TouchableOpacity>
                                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{fontSize: 20, color: colors.black, fontFamily: 'Poppins-Regular'}}>{quantity}</Text>
                                        </View>
                                        <TouchableOpacity style={{height: 40, width: 40, borderRadius: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.red}} onPress={()=>{
                                            setQuantity(quantity + 1);
                                        }}>
                                            <Text style={{fontSize: 20, color: colors.white}}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <Button mode="outlined" textColor={colors.green} style={{marginTop: 10, borderColor: colors.green, elevation: 10}} onPress={addToCart}>
                                Add
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
            <Snackbar
        visible={visibleSnackbar}
        onDismiss={() => setVisibleSnackbar(false)}
        duration={5000}
        style={{ backgroundColor: colors.black }}
      >
        <Text
          style={{
            color: colors.white,
            fontSize: 16,
            fontFamily: 'Poppins-Regular',
            textAlign: 'center',
          }}
        >
          {snackbarMessage}
        </Text>
      </Snackbar>
        </SafeAreaView>
    );
}

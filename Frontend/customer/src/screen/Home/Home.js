import React, { useCallback, useEffect, useState } from 'react';
import { Image, StatusBar, View, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../../const/Colors';
import { Banner, Coin, Delivery, History, Pin, User, Cake, HomeFood, HotelFood, UnknownUser } from '../../const/Images';
import Animated, { FadeIn, LightSpeedInLeft, LightSpeedInRight } from 'react-native-reanimated';
import { getData, initData } from '../../const/AsyncStorage';

export function Home({navigation}) {
    const [selectedOption, setSelectedOption] = useState('Delivery');
    const [profile, setProfile] = useState(UnknownUser);
    async  function profileImage () {
        setProfile(await getData("signup") === "success"? User : UnknownUser);
    }
    profileImage();
    const renderTab = (tabName, imageSource) => {
        const isSelected = selectedOption === tabName;

        return (
            <TouchableOpacity
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => setSelectedOption(tabName)}
            >
                <Image source={imageSource} style={{ height: 40, width: 40 }} />
                <Text style={{ fontFamily: "Poppins-Regular", color: isSelected ? colors.red : colors.black }}>
                    {tabName}
                </Text>
                {isSelected && <View style={{ height: 2, width: 40, backgroundColor: colors.red }} />}
            </TouchableOpacity>
        );
    };
    const FoodCategory = ()=>{
        return(
            <View style={{flex: 1, width: '100%'}}>
                        <View style={{flex: 1, height: '100%', width: '100%'}}>
                            <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%', padding: 20 }}>
                            <Animated.Text entering={FadeIn.duration(1000)} style={{color: colors.black, fontFamily: 'Poppins-Regular', fontSize: 30, textAlign: 'center'}}>Choose Food Category</Animated.Text>
                                <Animated.View >
                                <TouchableOpacity style={{marginTop: 10, height: 150, backgroundColor: colors.white, borderRadius: 20, elevation: 5}} onPress={()=>{
                                    const FoodCat = 'Bakery';
                                    navigation.navigate('Home2', {FoodCat})}}>
                                    <Image source={Cake} style={{height: '100%', width: '100%', objectFit: 'cover', position: 'relative', borderRadius: 20}} />
                                    <View style={{position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.3)', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 20}}>
                                        <Text style={{color: colors.white, fontFamily: 'Poppins-Regular', fontSize: 30, borderRadius: 20}}>Bakery</Text>
                                    </View>
                                </TouchableOpacity>
                                </Animated.View>
                                <Animated.View >
                                <TouchableOpacity style={{marginTop: 30, height: 150, backgroundColor: colors.white, borderRadius: 20, elevation: 5}} onPress={()=>{
                                    const FoodCat = 'Home';
                                    navigation.navigate('Home2', {FoodCat})}}>
                                <Image source={HomeFood} style={{height: '100%', width: '100%', objectFit: 'cover', position: 'relative', borderRadius: 20}} />
                                    <View style={{position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.3)', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 20}}>
                                        <Text style={{color: colors.white, fontFamily: 'Poppins-Regular', fontSize: 30}}>Home Food</Text>
                                    </View>
                                </TouchableOpacity>
                                </Animated.View>
                                <Animated.View >
                                <TouchableOpacity style={{marginTop: 30, marginBottom: 50, height: 150, backgroundColor: colors.white, borderRadius: 20, elevation: 5}} onPress={()=>{
                                    const FoodCat = 'Hotel';
                                    navigation.navigate('Home2', {FoodCat})}}>
                                <Image source={HotelFood} style={{height: '100%', width: '100%', objectFit: 'cover', position: 'relative', borderRadius: 20}} />
                                    <View style={{position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.3)', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 20}}>
                                        <Text style={{color: colors.white, fontFamily: 'Poppins-Regular', fontSize: 30}}>Hotel Food</Text>
                                    </View>
                                </TouchableOpacity>
                                </Animated.View>
                            </ScrollView>
                            </View>
                        </View>
        );
    }    
    const renderContent = () => {
        switch (selectedOption) {
            case 'Delivery':
                return (FoodCategory());
            case 'History':
                return <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: 20 }}>History</Text>;
            case 'Money':
                return <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: 20 }}>Money</Text>;
            default:
                return null;
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <StatusBar translucent={true} barStyle="light-content" backgroundColor="transparent" />
            <StatusBar translucent backgroundColor="transparent" />
            <View style={{height: 120}}>
                <Image source={Banner} style={{height: '100%' , width: '100%', objectFit: 'cover', position: 'relative'}} />
                <View style={{ position: 'absolute', height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.3)', padding: 20}}>
                    <View style={{height: 100, padding: 20, flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Animated.View entering={LightSpeedInLeft.duration(1000)} style={{}}>
                        <Text style={{ color: colors.grey, fontFamily: 'Poppins-Regular', fontSize: 15}}>Deliver to</Text>
                        <Text style={{ color: colors.white, fontFamily: 'Poppins-Regular', fontSize: 20}}>
                            <Image source={Pin} style={{height: 20, width: 20, objectFit: 'contain'}} /> Sivakasi</Text>
                        </Animated.View>
                        <Animated.View  entering={LightSpeedInRight.duration(1000)} style={{justifyContent: 'center'}}>
                            <TouchableOpacity style={{height: 40, width: 40, borderRadius: 40,}} onPress={async ()=>{ 
                                if(await initData("signup") === "success") {
                                    navigation.navigate('Profile');
                                }
                                else {
                                    navigation.navigate('Signup');
                                    console.log(initData("signup"));
                                }
                                }}>
                            <Image source={ profile } style={{height: 40, width: 40, objectFit: 'contain'}}/>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {renderContent()}
            </View>
            <View style={{ height: 80, flexDirection: 'row' }}>
                {renderTab('Delivery', Delivery)}
                {renderTab('History', History)}
                {renderTab('Money', Coin)}
            </View>
        </View>
    );
}

import React from 'react';
import {Image, StatusBar, TouchableOpacity, View} from 'react-native';
import Animated, {LightSpeedInRight} from 'react-native-reanimated';
import {Chef, GetStarted, Slide3Img} from '../../const/Images';

export function Slide3({navigation}) {
  return (
    <Animated.View entering={LightSpeedInRight.duration(10)} style={{flex: 1}}>
      <View style={{flex: 1, position: 'relative', alignItems: 'center'}}>
        <StatusBar translucent backgroundColor="transparent" />
        <Image
          source={Chef}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            objectFit: 'cover',
          }}
        />
        <View style={{flex: 1}}>
          <></>
        </View>
        <View
          style={{
            height: 100,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 20,
            paddingRight: 20,
          }}>
          <TouchableOpacity onPress={() => navigation.replace('Slide2')}>
            <Image
              source={Slide3Img}
              style={{height: 20, width: 70, objectFit: 'contain'}}
            />
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              style={{
                height: 70,
                width: 170,
                borderRadius: 70,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => navigation.replace('Login')}>
              <Image
                source={GetStarted}
                style={{height: 70, width: 170, objectFit: 'contain'}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

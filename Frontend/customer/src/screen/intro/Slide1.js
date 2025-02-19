import React from 'react';
import {Image, StatusBar, TouchableOpacity, View} from 'react-native';
import Animated, {LightSpeedInRight} from 'react-native-reanimated';
import {colors} from '../../const/Colors';
import {Scooter, Slide1Img, ButtonImg} from '../../const/Images';

export function Slide1({navigation}) {
  return (
    <Animated.View entering={LightSpeedInRight.duration(10)} style={{flex: 1}}>
      <View style={{flex: 1, position: 'relative', alignItems: 'center'}}>
        <StatusBar translucent backgroundColor="transparent" />
        <Image
          source={Scooter}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            backgroundColor: colors.white,
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
          <Image
            source={Slide1Img}
            style={{height: 70, width: 70, objectFit: 'contain'}}
          />
          <View>
            <TouchableOpacity
              style={{height: 60, width: 60, borderRadius: 70}}
              onPress={() => navigation.replace('Slide2')}>
              <Image
                source={ButtonImg}
                style={{height: 60, width: 60, objectFit: 'contain'}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

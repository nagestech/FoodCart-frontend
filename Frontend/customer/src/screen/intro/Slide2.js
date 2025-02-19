import React from 'react';
import {Image, StatusBar, TouchableOpacity, View} from 'react-native';
import Animated, {LightSpeedInRight} from 'react-native-reanimated';
import {Bowl, ButtonImg, Slide2Img} from '../../const/Images';
import {colors} from '../../const/Colors';

export function Slide2({navigation}) {
  return (
    <Animated.View entering={LightSpeedInRight.duration(10)} style={{flex: 1}}>
      <View style={{flex: 1, position: 'relative', alignItems: 'center'}}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Image
          source={Bowl}
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
          <TouchableOpacity onPress={() => navigation.replace('Slide1')}>
            <Image
              source={Slide2Img}
              style={{height: 20, width: 70, objectFit: 'contain'}}
            />
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              style={{height: 60, width: 60, borderRadius: 70}}
              onPress={() => navigation.replace('Slide3')}>
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

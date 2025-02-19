import React, {useState, useEffect, useRef} from 'react';
import {View, Image, StatusBar} from 'react-native';
import {Button, Text, useTheme} from 'react-native-paper';
import AppIntroSlider from 'react-native-app-intro-slider';

export function Slide({navigation}) {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  const handleSlideChange = index => {
    setActiveIndex((index + 1) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % slides.length);
      sliderRef.current?.goToSlide(activeIndex, true);
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [activeIndex]);

  const RenderItem = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          translucent
          backgroundColor={'transparent'}
          barStyle={'light-content'}
        />
        <Image
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            position: 'relative',
          }}
          source={item.image}
        />
        <View
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'flex-end',
          }}>
          <View style={{paddingBottom: 80, paddingLeft: 20, paddingRight: 20}}>
            <Text
              style={{
                color: 'white',
                fontSize: 30,
                fontFamily: 'Poppins-Bold',
              }}>
              FoodCart
            </Text>
            <Text
              style={{
                color: 'white',
                paddingBottom: 15,
                fontFamily: 'Poppins-Bold',
                fontSize: 15,
              }}>
              Restaurant Partner
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
              }}>
              {item.text}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <AppIntroSlider
        ref={sliderRef}
        data={slides}
        renderItem={RenderItem}
        showNextButton={false}
        showDoneButton={false}
        onSlideChange={index => handleSlideChange(index)}
      />
      <View
        style={{
          height: 150,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          backgroundColor: theme.colors.background,
        }}>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          style={{
            width: '80%',
            borderWidth: 2,
            borderColor: theme.colors.primary,
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate('Login')}>
          <Text style={{fontFamily: 'Poppins-Regular', color: 'white'}}>
            Login
          </Text>
        </Button>
        <Button
          mode="outlined"
          style={{
            width: '80%',
            borderWidth: 2,
            borderColor: theme.colors.primary,
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate('Signup')}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: theme.colors.primary,
            }}>
            Signup
          </Text>
        </Button>
      </View>
    </View>
  );
}

const slides = [
  {
    key: 's1',
    text: 'Get business insights and improvement tips',
    title: 'Signup with FoodCart',
    image: require('../../../assets/images/Signup.jpg'),
  },
  {
    key: 's2',
    title: 'Orders',
    text: 'Manage orders and menu in a breeze',
    image: require('../../../assets/images/Menu.jpg'),
  },
  {
    key: 's3',
    title: 'Great Offers',
    text: 'Create promotions and grow your business',
    image: require('../../../assets/images/Promotion.jpg'),
  },
];

import React, {useState} from 'react';
import {ScrollView, View, useColorScheme, Image, TouchableOpacity, StatusBar} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Switch} from 'react-native-switch';

export function MenuRoute({navigation}) {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const [switchStatus, setSwitchStatus] = useState(false);
  const [menu, setMenu] = useState([
    {
      id: '1',
      image:
        'https://tweakindia.com/wp-content/uploads/2020/10/High-res-Machher-Kochuri-1-scaled-e1602911451601.jpg',
      name: 'Poori',
      price: '30',
      stock: true,
    },
    {
      id: '2',
      image:
        'https://cravecookclick.com/wp-content/uploads/2014/02/IMG_1048-660x420.jpg',
      name: 'Pongal',
      price: '30',
      stock: false,
    },
  ]);
  const actions = [
    {
      text: 'Add',
      name: 'Add_btn',
      icon: <MaterialIcons name="restaurant" color={'white'} size={20} />,
      position: 2,
      color: theme.colors.primary,
    },
    {
      text: 'Addons',
      name: 'Addons_btn',
      icon: <MaterialIcons name="soup-kitchen" color={'white'} size={20} />,
      color: theme.colors.primary,
      position: 1,
    },
  ];

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent={true} backgroundColor={"transparent"} barStyle={"light-content"} />
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={{height: 200, width: "100%", position: "relative"}}>
          <Image source={{uri: "https://t4.ftcdn.net/jpg/02/92/20/37/360_F_292203735_CSsyqyS6A4Z9Czd4Msf7qZEhoxjpzZl1.jpg"}} style={{height: 200, width: "100%", objectFit: "cover"}} />
        </View>
        <View style={{position: "absolute", height: 200, width: "100%", justifyContent: "center", alignItems: "center"}}>
          <Text style={{color: "white", fontFamily: "Poppins-Bold", fontSize: 25}}>MENU</Text>
        </View>
        {menu.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={()=>navigation.navigate("EditMenu")}
            style={{
              height: 200,
              margin: 10,
              borderRadius: 20,
              padding: 10,
              backgroundColor: 'rgba(255,100,100,0.2)',
              flexDirection: 'row',
            }}>
            <Image
              source={{uri: item.image || 'https://via.placeholder.com/150'}}
              style={{flex: 1, borderRadius: 10}}
            />
            <View style={{flex: 1, paddingLeft: 20, justifyContent: 'center'}}>
              <Text style={{fontSize: 20, fontFamily: 'Poppins-Bold', color: theme.colors.primary}}>
                {item.name}
              </Text>
              <Text style={{fontSize: 18, fontFamily: 'Poppins-Regular', color: "grey"}}>
                Rs. {item.price}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'Poppins-Bold',
                    paddingTop: 5,
                    color: "brown"
                  }}>
                  Stock
                </Text>
                <Switch
                  value={item.stock}
                  onValueChange={() => {
                    const updatedMenu = menu.map(menuItem =>
                      menuItem.id === item.id
                        ? {...menuItem, stock: !menuItem.stock}
                        : menuItem,
                    );
                    setMenu(updatedMenu);
                  }}
                  disabled={false}
                  circleSize={20}
                  barHeight={25}
                  backgroundActive={theme.colors.primary}
                  backgroundInactive={'gray'}
                  circleActiveColor={'white'}
                  circleInActiveColor={theme.colors.primary}
                  circleBorderActiveColor={'white'}
                  circleBorderInactiveColor={theme.colors.primary}
                  changeValueImmediately={true}
                  switchLeftPx={3}
                  switchRightPx={3}
                  switchWidthMultiplier={2}
                  switchBorderRadius={20}
                  renderActiveText={false}
                  renderInActiveText={false}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FloatingAction
        color={theme.colors.primary}
        floatingIcon={<Icon name="book" size={20} color={'white'} />}
        actions={actions}
        onPressItem={name => {
          console.log(`selected button: ${name}`);
          switch (name) {
            case 'Add_btn':
              navigation.navigate('AddMenu');
              break;
            case 'Addons_btn':
              navigation.navigate('Addons');
              break;
            default:
              break;
          }
        }}
      />
    </View>
  );
}

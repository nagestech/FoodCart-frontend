import React, {useState, useEffect} from 'react';
import {
  Text,
  useTheme,
  Button,
  Divider,
  Dialog,
  Portal,
  TextInput,
} from 'react-native-paper';
import {ScrollView, View, useColorScheme, StatusBar} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Switch} from 'react-native-switch';
import Icon from "react-native-vector-icons/FontAwesome"
export function OrdersRoute({navigation}) {
  const color = useColorScheme();
  const theme = useTheme();
  const [switchStatus, setSwitchStatus] = useState(false);
  const [activeTab, setActiveTab] = useState('orders');
  const [acceptDialogVisible, setAcceptDialogVisible] = useState(false);
  const [declineDialogVisible, setDeclineDialogVisible] = useState(false);
  const [readyOrders, setReadyOrders] = useState([]);
  const [preparationOrders, setPreparationOrders] = useState([]);
  const [orders, setOrders] = useState([
    {
      id: '1',
      orderTime: '10:30 AM',
      customerID: '1',
      customerName: 'Raj',
      customerOrderNo: '1',
      foodItem: [
        {name: 'Poori', quantity: '1', price: '30'},
        {name: 'Pongal', quantity: '1', price: '30'},
      ],
      total: '60',
      instruction: 'need more chutney',
    },
    {
      id: '2',
      orderTime: '10:50 AM',
      customerID: '2',
      customerName: 'Ram',
      customerOrderNo: '10',
      foodItem: [{name: 'Poori', quantity: '1', price: '30'}],
      total: '30',
      instruction: 'need more chutney',
    },
  ]);
  const [selectedOrderId, setSelectedOrderID] = useState('');
  const [preparationTime, setPreparationTime] = useState('');

  const handleAccept = id => {
    setAcceptDialogVisible(true);
    setSelectedOrderID(id);
  };

  const handleDecline = id => {
    setDeclineDialogVisible(true);
    setSelectedOrderID(id);
  };

  const handleReady = id => {
    const currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const newReadyOrders = preparationOrders.filter(order => order.id == id);
    readyOrders.push(newReadyOrders[0]);
    const updatedOrders = preparationOrders.filter(order => order.id !== id);
    updatedOrders[0].readyTime = `${hours}:${minutes}:${seconds}`;
    setPreparationOrders(updatedOrders);
  }

  const confirmDecline = id => {
    const updatedOrders = orders.filter(order => order.id !== id);
    setOrders(updatedOrders);
    setDeclineDialogVisible(false);
    setSelectedOrderID('');
  };

  const confirmOrder = id => {
    const updatedOrders = orders.filter(order => order.id == id);
    const currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    updatedOrders[0].startTime = String(`${hours}:${minutes}:${seconds}`);
    const additionalMinutes = parseInt(preparationTime);
    minutes += additionalMinutes;
    hours += Math.floor(minutes / 60);
    minutes %= 60;
    hours %= 24;
    updatedOrders[0].endTime = String(`${hours}:${minutes}:${seconds}`);
    updatedOrders[0].preparationTime = preparationTime;
    preparationOrders.push(updatedOrders[0]);
    const modifiedOrders = orders.filter(order => order.id !== id);
    setOrders(modifiedOrders);
    setSelectedOrderID('');
    setPreparationTime('');
    setAcceptDialogVisible(false);
  };
  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={color == 'dark' ? 'light-content' : 'dark-content'}
      />
      <View
        style={{
          marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
        }}>
        <View
          style={{
            height: 80,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingLeft: 20,
            paddingRight: 10,
          }}>
          <View style={{height: 60, justifyContent: 'space-around'}}>
            <Text
              style={{
                color: theme.colors.onBackground,
                fontFamily: 'Poppins-Bold',
                fontSize: 15,
                textAlign: 'center',
              }}>
              Status
            </Text>
            <Switch
              value={switchStatus}
              onValueChange={() => setSwitchStatus(!switchStatus)}
              disabled={false}
              activeText={'Online'}
              inActiveText={'Offline'}
              circleSize={25}
              barHeight={30}
              backgroundActive={theme.colors.primary}
              backgroundInactive={'gray'}
              circleActiveColor={'white'}
              circleInActiveColor={theme.colors.primary}
              circleBorderActiveColor={'white'}
              circleBorderInactiveColor={theme.colors.primary}
              changeValueImmediately={true}
              switchLeftPx={2}
              switchRightPx={2}
              switchWidthMultiplier={4}
              switchBorderRadius={30}
            />
          </View>
          <View
            style={{
              height: 60,
              width: 120,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <MaterialIcons
              name="menu"
              color={theme.colors.onBackground}
              size={30}
              onPress={() => navigation.navigate('DrawerMenu')}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          height: 70,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Button
          mode={activeTab === 'orders' ? 'contained' : 'outlined'}
          style={{height: 40}}
          onPress={() => handleTabChange('orders')}>
          <Text
            style={{
              color: activeTab === 'orders' ? 'white' : theme.colors.primary,
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
            }}>
            Orders
          </Text>
        </Button>
        <Button
          mode={activeTab === 'preparation' ? 'contained' : 'outlined'}
          style={{height: 40}}
          onPress={() => handleTabChange('preparation')}>
          <Text
            style={{
              color:
                activeTab === 'preparation' ? 'white' : theme.colors.primary,
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
            }}>
            Preparation
          </Text>
        </Button>
        <Button
          mode={activeTab === 'ready' ? 'contained' : 'outlined'}
          style={{height: 40}}
          onPress={() => handleTabChange('ready')}>
          <Text
            style={{
              color: activeTab === 'ready' ? 'white' : theme.colors.primary,
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
            }}>
            Ready
          </Text>
        </Button>
      </View>
      <Divider
        theme={theme.colors.onBackground}
        bold={true}
        style={{elevation: 5}}
      />
      {activeTab === 'orders' && (
        <ScrollView style={{flex: 1, paddingLeft: 10, paddingRight: 10}}>
          {orders.map(order => (
            <View
              key={order.id}
              style={{
                backgroundColor: 'rgba(255, 100, 100, 0.2)',
                borderRadius: 20,
                flexDirection: 'column',
                marginTop: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  flexDirection: 'row',
                  padding: 10,
                  justifyContent: 'space-between',
                }}>
                <View style={{}}>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    Order ID: {order.id}
                  </Text>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    Customer Name: {order.customerName}
                  </Text>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    Order No: {order.customerOrderNo}
                  </Text>
                </View>
                <View style={{}}>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    Order Time: {order.orderTime}
                  </Text>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    Total: Rs. {order.total}
                  </Text>
                </View>
              </View>
              <ScrollView style={{flex: 1, padding: 10}}>
                <Text>Food Items:</Text>
                {order.foodItem.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 5,
                      padding: 5,
                      borderRadius: 5,
                      backgroundColor: 'grey',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: 'white',
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: 'white',
                      }}>
                      {item.quantity}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: 'white',
                      }}>
                      {item.price}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              <View style={{height: 50, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    textAlign: 'center',
                    color: "grey",
                    fontSize: 15
                  }}>
                  <Icon name="info-circle" size={20} /> {order.instruction}
                </Text>
              </View>
              <View
                style={{
                  height: 70,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <Button mode="contained" onPress={() => handleAccept(order.id)}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: 'white',
                    }}>
                    Accept
                  </Text>
                </Button>
                <Button
                  mode="contained"
                  onPress={() => handleDecline(order.id)}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: 'white',
                    }}>
                    Decline
                  </Text>
                </Button>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
      {activeTab === 'preparation' && (
        <ScrollView style={{flex: 1, paddingLeft: 10, paddingRight: 10}}>
          {preparationOrders.map(order => (
            <View
              key={order.id}
              style={{
                backgroundColor: 'rgba(255, 100, 100, 0.2)',
                borderRadius: 20,
                flexDirection: 'column',
                marginTop: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  flexDirection: 'row',
                  padding: 10,
                  justifyContent: 'space-between',
                }}>
                <View style={{}}>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    Order ID: {order.id}
                  </Text>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    Customer Name: {order.customerName}
                  </Text>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    Start time: {order.startTime}
                  </Text>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    Order No: {order.customerOrderNo}
                  </Text>
                </View>
                <View style={{}}>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    Order Time: {order.orderTime}
                  </Text>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    Total: Rs. {order.total}
                  </Text>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    End time: {order.endTime}
                  </Text>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    Preparation time: {order.preparationTime} mins
                  </Text>
                </View>
              </View>
              <ScrollView style={{flex: 1, padding: 10}}>
                <Text>Food Items:</Text>
                {order.foodItem.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 5,
                      padding: 5,
                      borderRadius: 5,
                      backgroundColor: 'grey',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: 'white',
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: 'white',
                      }}>
                      {item.quantity}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: 'white',
                      }}>
                      {item.price}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              <View style={{height: 50, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    textAlign: 'center',
                  }}>
                  Instructions: {order.instruction}
                </Text>
              </View>
              <View
                style={{
                  height: 70,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <Button
                  mode="contained"
                  onPress={() => handleReady(order.id)}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: 'white',
                    }}>
                    Ready
                  </Text>
                </Button>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
      {activeTab === 'ready' && (
        <ScrollView style={{flex: 1, paddingLeft: 10, paddingRight: 10}}>
          {readyOrders.map(order => (
            <View
              key={order.id}
              style={{
                backgroundColor: 'rgba(255, 100, 100, 0.2)',
                borderRadius: 20,
                flexDirection: 'column',
                marginTop: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  flexDirection: 'row',
                  padding: 10,
                  justifyContent: 'space-between',
                }}>
                <View style={{}}>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    Order ID: {order.id}
                  </Text>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    Customer Name: {order.customerName}
                  </Text>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    Order No: {order.customerOrderNo}
                  </Text>
                </View>
                <View style={{}}>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    Order Time: {order.orderTime}
                  </Text>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    Total: Rs. {order.total}
                  </Text>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    Ready Time: {order.readyTime}
                  </Text>
                </View>
              </View>
              <ScrollView style={{flex: 1, padding: 10}}>
                <Text>Food Items:</Text>
                {order.foodItem.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 5,
                      padding: 5,
                      borderRadius: 5,
                      backgroundColor: 'grey',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: 'white',
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: 'white',
                      }}>
                      {item.quantity}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: 'white',
                      }}>
                      {item.price}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              <View style={{height: 50, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    textAlign: 'center',
                  }}>
                  Instructions: {order.instruction}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
      <Portal>
        <Dialog
          visible={acceptDialogVisible}
          onDismiss={() => setAcceptDialogVisible(false)}>
          <Dialog.Title style={{fontFamily: 'Poppins-Regular'}}>
            Confirm Order
          </Dialog.Title>
          <Dialog.Content>
            <Text style={{fontFamily: 'Poppins-Regular'}}>
              Enter preparation time in minitues eg: 60
            </Text>
            <TextInput
              mode="outlined"
              label="Preparation Time"
              placeholder="Enter preparation time"
              outlineColor="grey"
              activeOutlineColor="grey"
              keyboardType="number-pad"
              value={preparationTime}
              onChangeText={text => setPreparationTime(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => confirmOrder(selectedOrderId)}>
              Accept
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          visible={declineDialogVisible}
          onDismiss={() => setDeclineDialogVisible(false)}>
          <Dialog.Title style={{fontFamily: 'Poppins-Regular'}}>
            Decline
          </Dialog.Title>
          <Dialog.Content>
            <Text style={{fontFamily: 'Poppins-Regular'}}>
              Are you sure want to decline the order?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => confirmDecline(selectedOrderId)}>Yes</Button>
            <Button
              onPress={() => {
                setDeclineDialogVisible(false);
                setSelectedOrderID('');
              }}>
              No
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

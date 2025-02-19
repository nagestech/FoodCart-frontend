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

export function OrdersRoute({navigation}) {
  const color = useColorScheme();
  const theme = useTheme();
  const [switchStatus, setSwitchStatus] = useState(false);
  const [activeTab, setActiveTab] = useState('orders');
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
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [preparationTime, setPreparationTime] = useState('');
  const [visible, setVisible] = useState(false);
  const [preparationOrders, setPreparationOrders] = useState([]);
  const [remainingTimes, setRemainingTimes] = useState({});
  const [extendedOrders, setExtendedOrders] = useState({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedRemainingTimes = {};
      preparationOrders.forEach(order => {
        if (order.endTime) {
          const remainingTime = getRemainingTime(order.endTime);
          if (remainingTime === '0 min 0 sec') {
            askReadyToServe(order.id);
          }
          updatedRemainingTimes[order.id] = remainingTime;
        }
      });
      setRemainingTimes(updatedRemainingTimes);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [preparationOrders]);

  useEffect(() => {
    return () => setRemainingTimes({});
  }, []);

  const getRemainingTime = endTime => {
    const now = new Date();
    const diff = endTime - now;
    if (diff <= 0) return '0 min 0 sec';
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor((diff / 1000) % 60);
    return `${minutes} min ${seconds} sec`;
  };

  const askReadyToServe = orderId => {
    setSelectedOrderId(orderId);
    setDialogVisible(true);
  };

  const handleConfirm = () => {
    if (preparationTime === '' || isNaN(preparationTime)) {
      alert('Please enter a valid preparation time.');
      return;
    }
    const preparationTimeInMinutes = parseInt(preparationTime);

    const orderIndex = orders.findIndex(order => order.id === selectedOrderId);

    const acceptedOrder = orders[orderIndex];
    const remainingOrders = orders.filter(
      order => order.id !== selectedOrderId,
    );

    acceptedOrder.preparationTime = preparationTimeInMinutes;

    const startTime = new Date();
    acceptedOrder.startTime = startTime;
    const endTime = new Date(
      startTime.getTime() + preparationTimeInMinutes * 60000,
    );
    acceptedOrder.endTime = endTime;
    setPreparationOrders(prevPreparationOrders => [
      ...prevPreparationOrders,
      acceptedOrder,
    ]);

    setOrders(remainingOrders);
    setPreparationTime('');
    hideDialog();
  };

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  const handleAccept = orderId => {
    setSelectedOrderId(orderId);
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
    setSelectedOrderId(null);
  };

  const handleDecline = orderId => {};

  const showDialog = orderId => {
    setDialogVisible(true);
    setSelectedOrderId(orderId);
  };

  const handleDeleteConfirmed = () => {
    setOrders(orders.filter(order => order.id !== selectedOrderId));
    hideDialog();
  };

  const handleReadyToServe = () => {
    const readyOrder = preparationOrders.find(
      order => order.id === selectedOrderId,
    );
    setPreparationOrders(
      preparationOrders.filter(order => order.id !== selectedOrderId),
    );
    setExtendedOrders(prevState => ({
      ...prevState,
      [selectedOrderId]: readyOrder,
    }));
    setDialogVisible(false);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}>
        <StatusBar backgroundColor={theme.colors.background} barStyle={color == "dark"? "light-content": "dark-content"} />
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
                backgroundColor: 'rgba(100, 255, 100, 0.2)',
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
                      backgroundColor: 'green',
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
              <View style={{height: 50, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    textAlign: 'center',
                  }}>
                  Preparation Time: {order.preparationTime} minutes
                </Text>
              </View>
              <View style={{height: 50, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    textAlign: 'center',
                  }}>
                  Start Time:{' '}
                  {order.startTime ? order.startTime.toLocaleTimeString() : ''}
                </Text>
              </View>
              <View style={{height: 50, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    textAlign: 'center',
                  }}>
                  End Time:{' '}
                  {order.endTime ? order.endTime.toLocaleTimeString() : ''}
                </Text>
              </View>
              {order.endTime && (
                <View style={{height: 50, justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'center',
                    }}>
                    Remaining Time: {remainingTimes[order.id]}
                  </Text>
                </View>
              )}
              <Button
                mode="contained"
                onPress={() => askReadyToServe(order.id)}
                style={{margin: 10}}>
                Ready to Serve
              </Button>
            </View>
          ))}
        </ScrollView>
      )}
      {activeTab === 'ready' && (
        <ScrollView style={{flex: 1, paddingLeft: 10, paddingRight: 10}}>
          {Object.values(extendedOrders).map(order => (
            <View
              key={order.id}
              style={{
                backgroundColor: 'rgba(100, 100, 255, 0.2)',
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
                      backgroundColor: 'blue',
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
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Preparation Time</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Enter preparation time (minutes)"
              value={preparationTime}
              onChangeText={text => setPreparationTime(text)}
              keyboardType="numeric"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleConfirm}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>Ready to Serve</Dialog.Title>
          <Dialog.Content>
            <Text>Is the food ready to serve?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleReadyToServe}>Yes</Button>
            <Button onPress={() => setDialogVisible(false)}>No</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

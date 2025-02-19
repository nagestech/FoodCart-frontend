import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Text, useTheme, Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function Addons({ navigation }) {
  const theme = useTheme();
  const color = useColorScheme();
  const [addons, setAddons] = useState([
    { id: '1', name: 'Cheese', price: '25' },
    { id: '2', name: 'Sauce', price: '20' },
  ]);

  const [newAddonName, setNewAddonName] = useState('');
  const [newAddonPrice, setNewAddonPrice] = useState('');

  const [editingAddonId, setEditingAddonId] = useState(null);
  const [editedAddonName, setEditedAddonName] = useState('');
  const [editedAddonPrice, setEditedAddonPrice] = useState('');

  const addAddon = () => {
    if (newAddonName && newAddonPrice) {
      const newAddon = {
        id: (addons.length + 1).toString(),
        name: newAddonName,
        price: newAddonPrice,
      };
      setAddons([...addons, newAddon]);
      setNewAddonName('');
      setNewAddonPrice('');
    }
  };

  const deleteAddon = (id) => {
    setAddons(addons.filter((addon) => addon.id !== id));
  };

  const startEditingAddon = (id, name, price) => {
    setEditingAddonId(id);
    setEditedAddonName(name);
    setEditedAddonPrice(price);
  };

  const cancelEditingAddon = () => {
    setEditingAddonId(null);
    setEditedAddonName('');
    setEditedAddonPrice('');
  };

  const updateAddon = (id, newName, newPrice) => {
    if (newName !== '' || newPrice !== '') {
      const updatedAddons = addons.map((addon) =>
        addon.id === id ? { ...addon, name: newName, price: newPrice } : addon
      );
      setAddons(updatedAddons);
    }
    cancelEditingAddon();
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}>
      <StatusBar
        translucent={true}
        barStyle={color === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={'transparent'}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <MaterialIcons
          name="arrow-back"
          color={theme.colors.onBackground}
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 20,
            marginLeft: 10,
          }}>
          Addons
        </Text>
      </View>
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            height: 150,
          }}>
          <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
            <TextInput
              style={{}}
              mode="outlined"
              label="Name"
              value={newAddonName}
              onChangeText={setNewAddonName}
            />
            <TextInput
              style={{}}
              mode="outlined"
              label="Price"
              value={newAddonPrice}
              onChangeText={setNewAddonPrice}
            />
          </View>
          <View
            style={{ width: 70, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={addAddon}
              style={{
                height: 40,
                width: 40,
                backgroundColor: theme.colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 40,
              }}>
              <Icon name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        {addons.map((addon) => (
          <View
            key={addon.id}
            style={{
              marginTop: 20,
              backgroundColor: 'rgba(255, 100, 100, 0.2)',
              height: editingAddonId === addon.id ? 200 : 150,
              justifyContent: 'center',
              flexDirection: 'row',
              borderRadius: 20,
            }}>
            <View
              style={{
                width: 70,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => deleteAddon(addon.id)}
                style={{
                  height: 40,
                  width: 40,
                  backgroundColor: theme.colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 40,
                }}>
                <Icon name="trash" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              {editingAddonId === addon.id ? (
                <>
                  <TextInput
                    style={{
                      marginBottom: 10,
                    }}
                    mode="outlined"
                    label="Name"
                    value={editedAddonName}
                    onChangeText={setEditedAddonName}
                  />
                  <TextInput
                    style={{
                      marginBottom: 10,
                    }}
                    mode="outlined"
                    label="Price"
                    value={editedAddonPrice}
                    onChangeText={setEditedAddonPrice}
                  />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Button mode="contained" textColor='white' onPress={() => updateAddon(addon.id, editedAddonName, editedAddonPrice)}>
                      Save
                    </Button>
                    <Button mode="outlined" onPress={cancelEditingAddon}>
                      Cancel
                    </Button>
                  </View>
                </>
              ) : (
                <View style={{paddingLeft: 20}}>
                  <Text style={{ marginBottom: 10, fontFamily: "Poppins-Regular", fontSize: 20 }}>{addon.name}</Text>
                  <Text style={{fontFamily: "Poppins-Regular", fontSize: 20}}>Rs. {addon.price}</Text>
                </View>
              )}
            </View>
            <View style={{ width: 70, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => startEditingAddon(addon.id, addon.name, addon.price)}
                style={{
                  height: 40,
                  width: 40,
                  backgroundColor: theme.colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                }}>
                <Icon name="pencil" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

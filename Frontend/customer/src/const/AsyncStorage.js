import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (key) => {
  let data = "null";
  try {
    data = String(await AsyncStorage.getItem(key));
  }
  catch(e) {
    console.log(e);
  }
  return data
}
export const initData = async (key) => {
  let data = "null";
  try {
    data = String(await AsyncStorage.getItem(key));
    if(data === "null") {
      console.log( typeof(data), data);
      try {
        data = await AsyncStorage.setItem(key, "dummy");
      } catch (e) {
        console.log(e);
      }
    }
  } catch (error) {
    console.log('Error fetching data:', error);
  }

  return data;
};

export const updateData = async (key, value) => {
  let data = null;
  try {
    data = await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('Something went wrong!', error);
  }

  return data;
}
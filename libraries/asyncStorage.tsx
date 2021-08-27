import AsyncStorage from '@react-native-async-storage/async-storage';

interface MyDataInterface {
  firstName?: string,
  lastName?: string,
  emailPhone?: string,
  login?: boolean
}

export const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
      console.log(e)
    }
  }


export  const storeData = async (value: MyDataInterface) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
      console.log(e)
    }
  }
import { AsyncStorage } from 'react-native';

// import AsyncStorage from '@react-native-community/async-storage'
const SetupHelper = {
    getItemAsyncStorage: async (item) => {
        try {
          const x = await AsyncStorage.getItem(item)
          if (x == null) return null
          return { x }
        } catch (e) {
          console.log('an error was found in getItems')
          console.log(e)
        }
      },
      setItemAsyncStorage: async (name, value) => {
        try {
          await AsyncStorage.setItem(name, value)
        } catch (e) {
          console.log('an error was found in setItems')
          console.log(e)
        }
      },
}
export default SetupHelper

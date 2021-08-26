import React, {useEffect, useState} from 'react';
import {
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens import
import SignUp  from './screens/SignUp';
import SignIn  from './screens/SignIn';
import LoginSuccessful from './screens/LoginSuccessful';
import SignUpSucceful from './screens/SignUpSucceful';


import {getData} from './libraries/asyncStorage'


const Stack = createNativeStackNavigator();

const App = () => {

  const [login, setLogin] = useState()

  useEffect(()=>{
    getData().then(item => {
      // console.log(item.login)
      if(item === null || item === undefined){
        setLogin(false)
      }
      else{
        setLogin(item.login)
      }

    })
  }, [])

  if(login){
    return (
      <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="LoginSuccessful" component={LoginSuccessful} />
      </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="LoginSuccessful" component={LoginSuccessful} />
            <Stack.Screen name="SignUpSucceful" component={SignUpSucceful} />
      </Stack.Navigator>
    </NavigationContainer>
    )
  }
};

export default App;

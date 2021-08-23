import * as React from 'react';
import {
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens import
import SignUp  from './screens/SignUp';
import SignIn  from './screens/SignIn';
import LoginSuccessful from './screens/LoginSuccessful';
import SignUpSucceful from './screens/SignUpSucceful';

const Stack = createNativeStackNavigator();

const App = () => {

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
  );
};

export default App;

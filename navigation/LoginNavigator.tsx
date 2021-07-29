import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import LoginScreen from '../screens/login/LoginScreen';
import ResetPasswordScreen from '../screens/login/ResetPasswordScreen';

const Stack = createStackNavigator();

export default function LoginNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerBackImage: null}}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
  );
}

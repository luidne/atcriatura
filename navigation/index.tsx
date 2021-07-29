/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import { useEffect, useState } from 'react';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LoginNavigator from './LoginNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import Analytics from '@react-native-firebase/analytics';
import Auth from '@react-native-firebase/auth';
import { DarkTheme, DefaultTheme, Provider } from 'react-native-paper';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef(null);

  const myDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: 'yellow'
    }
  };

  return (
    <Provider theme={colorScheme === 'dark' ? myDarkTheme : DefaultTheme}>
      <NavigationContainer
        ref={navigationRef}
        linking={LinkingConfiguration}
        onReady={async () => {
          if(navigationRef)
            (routeNameRef.current = navigationRef.current.getCurrentRoute().name);
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name;

          if (previousRouteName !== currentRouteName) {
            await Analytics().logScreenView({
              screen_name: routeNameRef.current,
              screen_class: routeNameRef.current,
            });
          }

          // Save the current route name for later comparison
          routeNameRef.current = currentRouteName;
        }}>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if(initializing) setInitializing(false);
    console.log(`Usuário logado: ${JSON.stringify(user)}`);
  }

  useEffect(() => {
    const subscriber = Auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if(initializing) return null;

  if(!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={LoginNavigator} />
      </Stack.Navigator>
    );  
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

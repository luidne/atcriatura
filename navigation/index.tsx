/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Alert, ColorSchemeName } from 'react-native';
import { useEffect, useState } from 'react';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import LoginNavigator from './LoginNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import Analytics from '@react-native-firebase/analytics';
import Auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Messaging from '@react-native-firebase/messaging';
import { DarkTheme, DefaultTheme, Provider } from 'react-native-paper';
import PushNotification from 'react-native-push-notification';
import HomeNavigator from './HomeNavigator';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef(null);

  const myDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: 'yellow',
      background: '#000'
    }
  };

  const myLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'orange',
      background: '#fff',
    }
  };

  return (
    <Provider theme={colorScheme === 'dark' ? myDarkTheme : myLightTheme}>
      <NavigationContainer
        ref={navigationRef}
        theme={colorScheme === 'dark' ? myDarkTheme : myLightTheme}
        linking={LinkingConfiguration}
        onStateChange={async (state) => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute(state);

          if (previousRouteName !== currentRouteName) {
            await Analytics().logScreenView({
              screen_name: currentRouteName.name,
              screen_class: currentRouteName.name,
            });
          }

          console.log(`onStateChange() routeNameRef.current = ${currentRouteName.name}`);

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
  const [user, setUser] = useState<FirebaseAuthTypes.User | undefined>(undefined);

  useEffect(() => {
    const subscriber = Auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [user]);

  useEffect(() => {
    const unsubscribe = Messaging().onMessage(async (remoteMessage) => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      PushNotification.localNotification({
        messageId: remoteMessage.messageId,
        title: remoteMessage.notification?.title,
        message: remoteMessage.notification?.body
      });
    });

    return unsubscribe;
  }, []);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
      console.log(`Usuário logado: ${JSON.stringify(user)}`);
    }

    Messaging().requestPermission({
      provisional: true,
    });
  }

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={LoginNavigator} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={HomeNavigator} />
    </Stack.Navigator>
  );
}

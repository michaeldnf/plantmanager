import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import Routes from './src/routes';

import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';

import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';
import { PlantProps } from './src/libs/storage';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(() => {
    getPermissionNotification();
    notificationDebug();
  }, []);

  if (!fontsLoaded) return (<AppLoading />);

  return (
    <Routes />
  );//Sempre tem que retornar um único elemento!
}

async function getPermissionNotification(): Promise<Boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    Alert.alert('Falha ao conseguir permissão de notificação!');
    return false;
  }

  return true;
}

async function notificationDebug(n = 3) {
  const subscription = Notifications.addNotificationReceivedListener(
    async notification => {
      const data = notification.request.content.data.plant as PlantProps
    }
  );
  if (1) return () => subscription.remove();

  if (3) {
    const data = await Notifications.getAllScheduledNotificationsAsync();
    console.log("################### Notificações Agendadas");
    console.log(data);
  }

  if (2) await Notifications.cancelAllScheduledNotificationsAsync();
}
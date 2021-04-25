import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialIcons } from '@expo/vector-icons';
import colors from '../styles/colors';

import { PlantSelect } from '../pages/PlantSelect';
import { MyPlants } from '../pages/MyPlants';


export function AuthRoutes() {
  const AppTab = createBottomTabNavigator();

  return (
    <AppTab.Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: 'beside-icon',
        style: {
          paddingTop: 25,
          paddingBottom: 40,
          height: 100,
          backgroundColor: colors.backgroundTabBar
        },
      }}
    >
      <AppTab.Screen
        name="Nova Planta"
        component={PlantSelect}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ))
        }}
      />

      <AppTab.Screen
        name="Minhas Plantas"
        component={MyPlants}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ))
        }}
      />
    </AppTab.Navigator>
  );
}
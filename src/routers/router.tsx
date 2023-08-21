import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Home } from '@/screens/Home';

const Stack = createStackNavigator();

export function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

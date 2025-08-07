import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './src/components/Dashboard';
import Stats from './src/components/Stats';
import Settings from './src/components/Settings';
import { Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let name = route.name === 'Home' ? 'home' : route.name === 'Stats' ? 'stats-chart' : 'settings';
              return <Ionicons name={name} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={Dashboard} />
          <Tab.Screen name="Stats" component={Stats} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
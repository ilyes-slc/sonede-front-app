import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Dashboard from './Dashboard';
import FactureItem from './FactureItem'; // Assuming you have a ProfileScreen component
import profile from './profile';
import anomalies from './anomalies';
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? '' : '';
          } else if (route.name === 'FactureItem') {
            iconName = focused ? '' : '';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Factures" component={FactureItem} />
      <Tab.Screen name="settings" component={profile} />
      <Tab.Screen name="anomalies" component={anomalies} />
    </Tab.Navigator>
  );
};
export default HomeTabs;

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import ListingEditScreen from '../screens/ListingEditScreen';
import FeedNavigator from './FeedNavigator';
import AccountNavigator from './AccountNavigator';
import LibraryScreen from '../screens/LibraryScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
    <Tab.Navigator>
    <Tab.Screen name="Feed" component={FeedNavigator}
      options= {{
        tabBarIcon: ({color,size}) =>
        <MaterialCommunityIcons name="home" color={color} size={size}/>
      }}
    />
    <Tab.Screen name="Library" component={LibraryScreen} 
      options= {{
        tabBarIcon: ({color,size}) =>
        <MaterialCommunityIcons name="book-open-variant" color={color} size={size}/>
      }}
    />
    <Tab.Screen name="Account" component={AccountNavigator} 
      options= {{
        tabBarIcon: ({color,size}) =>
        <MaterialCommunityIcons name="account" color={color} size={size}/>
      }}
    />
  </Tab.Navigator>
)
export default AppNavigator;
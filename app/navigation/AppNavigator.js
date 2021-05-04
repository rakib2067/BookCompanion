import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import FeedNavigator from './FeedNavigator';
import AccountNavigator from './AccountNavigator';
import LibraryScreen from '../screens/LibraryScreen';
import LibraryNavigator from './LibraryNavigator';
import LeaderBoardScreen from '../screens/LeaderBoardScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
    <Tab.Navigator>
    <Tab.Screen name="Feed" component={FeedNavigator}
      options= {{
        tabBarIcon: ({color,size}) =>
        <MaterialCommunityIcons name="home" color={color} size={size}/>
      }}
    />
    <Tab.Screen name="Library" component={LibraryNavigator} 
      options= {{
        tabBarIcon: ({color,size}) =>
        <MaterialCommunityIcons name="book-open-variant" color={color} size={size}/>
      }}
    />
    <Tab.Screen name="Leaderboards" component={LeaderBoardScreen} 
      options= {{
        tabBarIcon: ({color,size}) =>
        <MaterialCommunityIcons name="view-list" color={color} size={size}/>
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
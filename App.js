// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from './screens1/MainPage';
import SearchPlaylistsScreen from './screens1/SearchPlaylistScreen';
import PlaylistDetailsScreen from './screens1/PlaylistDetailScreen'; // Import the new screen
import ProfileScreen from './screens1/ProfileScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const SearchStack = createStackNavigator();
const ProfileStack = createStackNavigator();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="SearchPlaylists"
        component={SearchPlaylistsScreen}
        options={{ title: 'Search Playlists' }}
      />
      <SearchStack.Screen
        name="PlaylistDetails"
        component={PlaylistDetailsScreen}
        options={({ route }) => ({ title: route.params.playlist.name })}
      />
    </SearchStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Your Profile' }}
      />
    </ProfileStack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Search"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Search') {
            iconName = route.name === 'Search' ? 'search' : 'search-outline';
          } else if (route.name === 'Profile') {
            iconName = route.name === 'Profile' ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Search" component={SearchStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="MainPage">
        <RootStack.Screen
          name="MainPage"
          component={MainPage}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="MainTab"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

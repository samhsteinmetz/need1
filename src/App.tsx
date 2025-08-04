import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { Navigation } from './navigation';

// TODO: Add navigation stacks and state providers here as needed

export default function App() {
  return (
    <NavigationContainer>
      <View className="flex-1 bg-surface dark:bg-surface-dark">
        <StatusBar style="auto" />
        {/* TODO: Add navigation and global providers */}
        <Navigation />
      </View>
    </NavigationContainer>
  );
}

import React from 'react';
import { tokenCache } from './cache'
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import Tabs from './app/Navigations/Tabs';
import LoginScreen from './app/Screens/LoginScreen';
import './global.css';

export default function App() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

  if (!publishableKey) {
    throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
  }

  return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
       <StatusBar style="auto" />
       <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <SignedIn>
            <NavigationContainer>
              <Tabs />
            </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </ClerkProvider>
      </View>
  );
}
import { StatusBar } from 'expo-status-bar'
import { View, Text } from 'react-native'
import React from 'react'
import LoginScreen from './Screens/LoginScreen'
import { SignedIn,SignedOut,ClerkProvider } from '@clerk/clerk-expo'
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native'
import Tabs from './Navigations/Tabs'
import '../global.css'

export default function index() {
  const publishkey=process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
  return (
    <ClerkProvider publishableKey={publishkey}>
    <View className='flex-1 bg-white'>
      <StatusBar style='auto' />
      <SignedIn>
        <NavigationIndependentTree>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
        </NavigationIndependentTree>
      </SignedIn>
      <SignedOut>
        <LoginScreen />
      </SignedOut>
    </View>
    </ClerkProvider>
  )
}
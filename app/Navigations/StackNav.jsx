import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../Screens/HomeScreen';
import ItemList from '../Screens/ItemList';
import CatPage from '../Screens/CatPage';

const Stack = createStackNavigator();
export default function StackNav() {
  return (
    <View>
      <Stack.Navigator >
        <Stack.Screen  name='home' component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name='item-page' component={ItemList} options={({route})=>({title:route.params.category,headerStyle:{backgroundColor:'#3b82f6'},headerTintColor:'#fff'})}/>
        <Stack.Screen name='cat' component={CatPage} />
      </Stack.Navigator>
    </View>
  )
}
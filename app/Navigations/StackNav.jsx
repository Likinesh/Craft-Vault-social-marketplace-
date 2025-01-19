import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../Screens/HomeScreen';
import ItemList from '../Screens/ItemList';
import Item from '../Screens/Item';

const Stack = createStackNavigator();
export default function StackNav() {
  return (
    <View>
      <Stack.Navigator >
        <Stack.Screen  name='home' component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name='item-page' component={ItemList} options={({route})=>({title:route.params.category,headerStyle:{backgroundColor:'#3b82f6'},headerTintColor:'#fff'})}/>
        <Stack.Screen name='item' component={Item} options={{headerStyle:{backgroundColor:'#3b82f6'},headerTintColor:'#fff',headerTitle:'Product Details'}}/>
      </Stack.Navigator>
    </View>
  )
}
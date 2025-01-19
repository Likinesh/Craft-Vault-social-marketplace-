import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddPost from '../Screens/AddPost';
import Profile from '../Screens/Profile';
import HomeScreen from '../Screens/HomeScreen';
import ExploreScreen from '../Screens/ExploreScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import StackNav from './StackNav';

const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{ 
      headerShown:false 
    }}>
      <Tab.Screen name="home-tabs" component={StackNav}
        options={{
          tabBarLabel:({color})=>(
            <Text style={{color:color,fontSize:12,marginBottom:3}}>Home</Text>
          ),tabBarIcon:({color,size})=>(
            <FontAwesome name="home" size={size} color={color} />
          )
        }}
       />
      <Tab.Screen name='Explore' component={ExploreScreen} 
        options={{
          tabBarLabel:({color})=>(
            <Text style={{color:color,fontSize:12,marginBottom:3}}>Explore</Text>
          ),tabBarIcon:({color,size})=>(
            <MaterialIcons name="explore" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen name='Add Product' component={AddPost} 
        options={{
          tabBarLabel:({color})=>(
            <Text style={{color:color,fontSize:12,marginBottom:3}}>Add Product</Text>
          ),tabBarIcon:({color,size})=>(
            <MaterialIcons name="add-business" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen name="Profile" component={Profile} 
        options={{
          tabBarLabel:({color})=>(
            <Text style={{color:color,fontSize:12,marginBottom:3}}>Profile</Text>
          ),tabBarIcon:({color,size})=>(
            <Ionicons name="person-circle" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default Tabs
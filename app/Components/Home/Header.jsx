import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'

const Header = () => {
    const {user} = useUser();
  return (
    <View>
        <View className='flex flex-row items-center gap-4'>
            <Image source={{uri:user?.imageUrl}} className='rounded-full w-12 h-12' />
            <View>
                <Text className='text-[16px]'>Welcome</Text>
                <Text className='text-[20px] font-bold'>{user?.fullName}</Text>
            </View>
        </View>
        <View className='p-3 mt-5 px-5 bg-white rounded-full items-center gap-2 flex flex-row border-blue-200 border-[2px]'>
        <Ionicons name='search' size={30} color="gray" />
        <TextInput placeholder='Search' className='ml-2 text-[16px]'
        onChange={(value)=>console.log(value.target.value)} />
        </View>
    </View>
  )
}

export default Header
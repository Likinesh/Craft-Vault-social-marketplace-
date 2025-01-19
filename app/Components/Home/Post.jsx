import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
// Created as it required to show in user items page 
const Post = ({item}) => {
    const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={()=> navigation.push('item',{item:item})} className='flex-1 m-2'>
        <Image source={{uri:item.image}} 
            className='w-full h-[140px] rounded-lg border-[1px] border-slate-200 '
        />
        <View>
            <Text className='text-[15px] font-bold nt-2'>{item.title}</Text>
            <Text className='text-[20px] font-bold text-blue-500'>{item.price}</Text>
            <Text className='text-blue-500 bg-blue-200 p-[2px] rounded-full px-2 text-[10px] w-[70px] text-center mt-1'>{item.category}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default Post
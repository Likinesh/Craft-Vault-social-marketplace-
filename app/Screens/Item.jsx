import { View, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'

export default function Item() {
    const {params} = useRoute();
    const [ item,set_item]=useState([]);
    useEffect(()=>{
        if(params){
            set_item(params.item);
        }
    },[]);

    const sendEmail = ()=>{
        const sub ='Regarding '+item.title;
        const body="I want to contact you regaring this product"
        Linking.openURL('mailto:'+item.userEmail+"?subject="+sub+"&body="+body);
    }
  return (
    <ScrollView className='bg-white'>
      <Image source={{uri:item.image}} 
        className='h-[330px] w-full'
      />
      <View className='p-3'>
        <Text className='text-[24px] font-bold'>{item?.title}</Text>
        <View className='rounded-full mt-2 items-baseline p-1 px-2'>
        <Text className='p-1 bg-blue-200 text-blue-500'>{item.category}</Text>
        </View>
        <Text className='mt-3 font-bold text-[20px]'>Description</Text>
        <Text className='text-[16px] text-gray-500'>{item?.desc}</Text>
      </View>
      <View className='p-3 flex flex-row items-center gap-2 border-[1px] border-gray-100 bg-blue-400'>
        <Image source={{url:item.userImage}} className='w-10 h-10 rounded-full' />
        <View>
            <Text className='font-bold text-[18px]'>{item.userName}</Text>
            <Text className='text-gray-500'>{item.userEmail}</Text>
        </View>
        <TouchableOpacity className='z-40 bg-blue-500 m-1 rounded-full p-4' 
            onPress={()=>sendEmail()}
        >
            <Text className='text-center text-white'>Contact Seller</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
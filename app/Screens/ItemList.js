import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import LatestItem from '../Components/Home/LatestItem';

export default function ItemList() {
    const {params}=useRoute();
    const [item_list,set_list]=useState([]);
    useEffect(()=>{
        if(params){
            getItemLstByCat();
        }
    },[params])
    const getItemLstByCat = async()=>{
        set_list([]);
        const q = query(collection(dismissBrowser,'UserPost'),where('category','==',params.category));
        const res = await getDocs(q);
        res.forEach(doc=>{
            console.log(doc.data());
            set_list(item_list=>[...item_list,doc.data()]);
        })
    }
  return (
    <View className='p-2 '>
        {item_list.length>0 ? <LatestItem prod_list={item_list} title={''} /> : <Text className='p-5 text-[30px] justify-center text-gray-600 mt-24 '>No Items in this category</Text>}
    </View>
  )
}
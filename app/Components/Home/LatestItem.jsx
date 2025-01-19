import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Post from './Post'

const LatestItem = ({prod_list,title}) => {
  return (
    <View className='mt-3 p-2'>
      <Text className='font-bold text-[20px]'>{title}</Text>
      <FlatList 
        data={prod_list}
        numColumns={2}
        renderItem={({item,index})=>(
          <Post item={item} />
        )}
      />
    </View>
  )
}

export default LatestItem
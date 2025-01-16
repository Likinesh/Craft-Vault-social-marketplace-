import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

const Slider = ({slider}) => {
  return (
    <View className='mt-5'>
        <FlatList 
            data={slider}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item,index})=>(
                <View>
                    <Image source={{uri:item?.icon}} 
                        className='h-[200px] w-[330px] mr-3 rounded-lg object-contain'
                    />
                </View>
            )}
        />
    </View>
  )
}

export default Slider
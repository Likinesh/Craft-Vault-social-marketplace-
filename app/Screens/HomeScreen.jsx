import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Home/Header'
import Cat from '../Components/Home/Cat'
import LatestItem from '../Components/Home/LatestItem'
import Slider from '../Components/Home/Slider'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { app } from '../../firebaseConfig'

const HomeScreen = () => {
  const [slider,setslide]=useState([]);
  const db=getFirestore(app);
  useEffect(()=>{
    getSliders();
  },[]);
  const getSliders = async() =>{
    setslide([]);
    const query=await(getDocs(collection(db,"Category")));
    query.forEach((doc)=>{
      console.log(doc.id,doc.data());
      setslide(slider=>[...slider,doc.data()]);
    })
  }
  return (
    <View className='py-8 px-6 mt-5 bg-white flex-1'>
      <Header />
      <Slider slider={slider}/>
      <Cat />
      <LatestItem />
    </View>
  )
}

export default HomeScreen
import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Home/Header'
import Cat from '../Components/Home/Cat'
import LatestItem from '../Components/Home/LatestItem'
import Slider from '../Components/Home/Slider'
import { collection, getDocs, getFirestore, orderBy } from 'firebase/firestore'
import { app } from '../../firebaseConfig'

const HomeScreen = () => {
  const [slider,setslide]=useState([]);
  const db=getFirestore(app);
  const [cat_list,set_cat]=useState([]);
  const [prod_list,set_prod]=useState([]);

  useEffect(()=>{
    getSliders();
    getCat();
    Getlist();
  },[]);
  const getSliders = async() =>{
    setslide([]);
    const query=await(getDocs(collection(db,"Category")));
    query.forEach((doc)=>{
      console.log(doc.id,doc.data());
      setslide(slider=>[...slider,doc.data()]);
    })
  }

  const getCat = async ()=>{
    set_cat([]);
    const query=await(getDocs(collection(db,"Category")));
    query.forEach((doc)=>{
      console.log(doc.id,doc.data());
      setslide(cat_list=>[...cat_list,doc.data()]);
    })
  }

  const Getlist = async ()=>{
    set_prod([]);
    const query=await getDocs(collection(db,"Category"),orderBy('createdAt','desc'));
    query.forEach((doc)=>{
      console.log(doc.id,doc.data());
      set_prod(prod_list=>[...prod_list,doc.data()]);
    })
  }

  return (
    <ScrollView className='py-8 px-6 mt-5 bg-white flex-1'>
      <Header />
      <Slider slider={slider}/>
      <Cat cat_list={cat_list}/>
      <LatestItem prod_list={prod_list} title={'New Items'}/>
    </ScrollView>
  )
}

export default HomeScreen
import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { app } from '../firebaseConfig';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
const AddPost = () => {
  const db = getFirestore(app);

  useEffect(()=>{
    get_categories();
  },[])

  const get_categories = async() =>{

    const querySnap = await getDocs(collection(db,Category));
    querySnap.forEach((doc)=>{
      console.log("Docs:",doc.data());
    })

  }
  return (
    <View>
      <Text>AddPost</Text>
    </View>
  )
}

export default AddPost
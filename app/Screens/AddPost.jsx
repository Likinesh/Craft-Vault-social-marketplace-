import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Image, ToastAndroid, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../firebaseConfig';
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';
import { getFirestore,getDocs ,collection, addDoc, } from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import { useUser } from '@clerk/clerk-expo';
export default function AddPostScreen() {
  const [image, setImage] = useState(null);
  const db = getFirestore(app);
  const [loading,setLoading]=useState(false);
  const {user}=useUser();
  const [categoryList,setCategoryList]=useState([]);
  useEffect(()=>{
    getCategoryList();
  },[])
  
  const getCategoryList=async()=>{ 
    setCategoryList([]);
    const querySnapshot=await getDocs(collection(db,'Category'));
    querySnapshot.forEach((doc)=>{
      console.log("Docs:",doc.data());
      setCategoryList(categoryList=>[...categoryList,doc.data()])
    })
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  
  const storage = getStorage();
  const onSubmitMethod=async(value)=>{
    setLoading(true);
    // Find alternatove to store image in cloud
    // Currently by firebase
    const resp = await fetch(image);
    const blob = await resp.blob();
    const storageref=ref(storage,'folder_name/'+Date.now()+'.jpg');
    uploadBytes(storageref,blob).then((snapshot)=>{
      console.log('uploaded blob or file to cloud')
    }).then((res)=>{
      getDownloadURL(storageref).then(async(downloadUrl)=>{
        console.log(downloadUrl);
        value.image=downloadUrl;
        value.userName=user.fullName
        value.userEmail=user.primaryEmailAddress.emailAddress
        value.userImage=user.imageUrl

        const docRef=await addDoc(collection(db,"UserPost"),value);
        if(docRef.id){
          setLoading(false);
          Alert.alert("Successfully Posted Your Item")
        }
      })
    })
    
  }
  return (
    <KeyboardAvoidingView>
    <ScrollView className="p-5 pt-5 mt-10 bg-white h-full border-r-xl"> 
    <Text className="text-[27px] font-bold">Add New Post</Text>
    <Text className="text-[16px] text-gray-500 mb-7">Create New Post and Start Selling</Text>
        <Formik
          initialValues={{title:'',desc:'',address:'',price:'',image:'',userName:'',userEmail:'',userImage:'',createdAt:Date.now()}}
          onSubmit={value=>onSubmitMethod(value)}
          validate={(values)=>{
            const errors={}
            if(!values.title){
              console.log("Title not Present");
              ToastAndroid.show('Title Must be There',ToastAndroid.SHORT)
              errors.name="Title Must be there"
            }
            return errors
          }}
        >
          {({handleChange,handleBlur,handleSubmit,values,setFieldValue,errors})=>(
            <View>
              <TouchableOpacity onPress={pickImage}>
            {image?
            <Image source={{uri:image}} style={{width:100,height:100,borderRadius:15}} />
            : <Image source={require('./../../assets/images/placeholder.jpg')}
            style={{width:100,height:100,borderRadius:15}}
            />}
             
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholder='Title'
                  value={values?.title}
                  onChangeText={handleChange('title')}
                />
                 <TextInput
                  style={styles.input}
                  placeholder='Description'
                  multiline={true}
                  value={values?.desc}
                  numberOfLines={5}
                  onChangeText={handleChange('desc')}
                />
                 <TextInput
                  style={styles.input}
                  placeholder='Price'
                  value={values?.price}
                  keyboardType='number-pad'
                  onChangeText={handleChange('price')}
                />
                 <TextInput
                  style={styles.input}
                  placeholder='Address'
                  value={values?.address}
                  onChangeText={handleChange('address')}
                />

                {/* Category List Dropdown  */}
                <View style={{borderWidth:1,borderRadius:10,marginTop:15}}>
            <Picker
              selectedValue={values?.category}
              className="border-2"
              onValueChange={val=>setFieldValue('category',val)}
            > 
              {categoryList.length>0&&categoryList?.map((item,index)=>(
                  <Picker.Item key={index} 
                   label={item?.name} value={item?.name} />
              ))}
          
            </Picker>
            </View>
            <TouchableOpacity onPress={handleSubmit} 
            style={{
              backgroundColor:loading?'#ccc':'#007BFF',
              
            }}
            disabled={loading}
             className="p-4 bg-blue-500 rounded-full mt-10">
             {loading?
              <ActivityIndicator color='#fff'/>
              : 
              <Text className="text-white text-center text-[16px]">Submit</Text>
            }
            </TouchableOpacity>
                
            </View>
          
          )}
        </Formik>
    </ScrollView>
    </KeyboardAvoidingView>
 
  )
}

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderRadius:10,
        padding:10,
        paddingTop:15,
        marginTop:10,
        marginBottom:5,
        paddingHorizontal:17,
        textAlignVertical:'top',
        fontSize:17
    }
})
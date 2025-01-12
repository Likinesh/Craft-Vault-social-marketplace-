import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '../hooks/warmUpBrowser';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();


export default function LoginScreen() {
  useWarmUpBrowser();
  const {startOAuthFlow} = useOAuth({strategy:'oauth_google'});

  const onPress = React.useCallback(async()=>{
    try {
      const { createdSessionId,signIn,signUp,setActive}=await startOAuthFlow();
      if(createdSessionId){
        setActive({session:createdSessionId});
      }
      else{
        //use SignIn or SignUp
      }
    } catch (err) {
      console.log('Oauth Error',err)
    }
  },[]);

  return (
    <View className='bg-slate-50'>
      <Image source={require('./../../assets/img/intro.png')}
        className='item-center object-fit h-[400px] w-full'
      />
      <View className='p-8 bg-white mt-[-20px] rounded-t-2xl shadow-black'>
        <Text className='text-[35px] font-semibold'>Community Market</Text>
        <Text className='text-[16px] text-slate-500 mt-6'>Buy & Sell your old item and make money</Text>
        <TouchableOpacity onPress={onPress} className='p-3 bg-blue-600 rounded-full mt-16'>
            <Text className='text-white text-center font-medium'>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
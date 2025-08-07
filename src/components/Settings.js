import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings(){
  const [limit,setLimit] = useState('0');

  useEffect(()=>{
    AsyncStorage.getItem('@finlens:limit').then(v=>{ if(v) setLimit(v); });
  },[]);

  function save(){
    AsyncStorage.setItem('@finlens:limit', limit);
  }

  return (
    <View style={{flex:1,padding:20,backgroundColor:'#fff'}}>
      <Text style={{fontSize:18,fontWeight:'bold'}}>Limite mensile (es. totale spese)</Text>
      <TextInput label="Limite" value={limit} onChangeText={setLimit} keyboardType="numeric" />
      <Button mode="contained" onPress={save} style={{marginTop:10}}>Salva</Button>
    </View>
  );
}
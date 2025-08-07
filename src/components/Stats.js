import React, {useEffect, useState} from 'react';
import { View, Text, ScrollView } from 'react-native';
import { VictoryPie } from 'victory-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { summarizeByCategory } from '../utils/analysis';

export default function Stats(){
  const [data,setData] = useState([]);

  useEffect(()=>{ load(); },[]);

  async function load(){
    const raw = await AsyncStorage.getItem('@finlens:expenses');
    const expenses = raw ? JSON.parse(raw) : [];
    const byCat = summarizeByCategory(expenses);
    const vdata = Object.keys(byCat).map(k=>({x:k,y:byCat[k]}));
    setData(vdata);
  }

  return (
    <ScrollView style={{flex:1,backgroundColor:'#fff'}} contentContainerStyle={{padding:20}}>
      <Text style={{fontSize:20,fontWeight:'bold',marginBottom:10}}>Distribuzione per categoria</Text>
      {data.length>0 ? <VictoryPie data={data} /> : <Text>Nessuna spesa ancora</Text>}
    </ScrollView>
  );
}
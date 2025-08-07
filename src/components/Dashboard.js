import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FAB, Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddExpense from './AddExpense';
import { analyzeExpenses } from '../utils/analysis';

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [summary, setSummary] = useState({totalExpenses:0,balance:0});

  useEffect(()=>{ load(); },[]);
  useEffect(()=>{ setSummary(analyzeExpenses(expenses)); },[expenses]);

  async function load(){
    const raw = await AsyncStorage.getItem('@finlens:expenses');
    if(raw) setExpenses(JSON.parse(raw));
  }
  async function save(newList){
    await AsyncStorage.setItem('@finlens:expenses', JSON.stringify(newList));
    setExpenses(newList);
  }
  function onAdd(exp){
    const next = [exp, ...expenses];
    save(next);
    setShowAdd(false);
  }
  function renderItem({item}){
    return (
      <Card style={{marginVertical:6}}>
        <Card.Content>
          <Title>{item.description} — {item.category}</Title>
          <Paragraph>{item.date} • {item.amount} €</Paragraph>
        </Card.Content>
      </Card>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{padding:10}}>
        <Text style={{fontSize:20,fontWeight:'bold'}}>Saldo: {summary.balance.toFixed(2)} €</Text>
        <Text>Totale spese: {summary.totalExpenses.toFixed(2)} €</Text>
      </View>
      <View style={{flex:1,padding:10}}>
        <FlatList data={expenses} keyExtractor={(i,idx)=>idx.toString()} renderItem={renderItem} />
      </View>
      <AddExpense visible={showAdd} onDismiss={()=>setShowAdd(false)} onSave={onAdd} />
      <FAB icon="plus" onPress={()=>setShowAdd(true)} style={styles.fab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:'#fff'},
  fab:{position:'absolute',right:16,bottom:16}
});
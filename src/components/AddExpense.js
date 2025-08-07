import React, {useState} from 'react';
import { Modal, Portal, Text } from 'react-native-paper';
import { TextInput, Button } from 'react-native-paper';

export default function AddExpense({visible,onDismiss,onSave}){
  const [description,setDescription] = useState('');
  const [amount,setAmount] = useState('0');
  const [category,setCategory] = useState('Altro');
  const [date,setDate] = useState(new Date().toISOString().slice(0,10));

  function submit(){
    const exp = {description, amount: parseFloat(amount), category, date};
    onSave(exp);
    setDescription(''); setAmount('0'); setCategory('Altro');
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={{backgroundColor:'white',padding:20,margin:20}}>
        <TextInput label="Descrizione" value={description} onChangeText={setDescription} />
        <TextInput label="Importo" keyboardType="numeric" value={amount} onChangeText={setAmount} />
        <TextInput label="Categoria" value={category} onChangeText={setCategory} />
        <TextInput label="Data" value={date} onChangeText={setDate} />
        <Button mode="contained" onPress={submit} style={{marginTop:10}}>Aggiungi</Button>
      </Modal>
    </Portal>
  );
}
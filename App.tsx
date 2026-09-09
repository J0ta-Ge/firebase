import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';

export default function App() {

  console.log("Firestore DB -> ", db);
  const [mensagens, setMensagens] = useState([]);
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const query = await getDocs(collection(db, "mensagens"));
        const listaAux =[];
        query.forEach((doc) => {
          listaAux.push({id: doc.id, ...doc.data()});
        });
        setMensagens(listaAux);
      } catch(error) {
        console.error(error);
      }
    };
    carregarDados();
  }, []);


  return (
    <View style={styles.container}>
      <Text>Conexão com Firebase Firestore</Text>
      <StatusBar style="auto" />
      <FlatList 
        data={mensagens} 
        keyExtractor={(item) => item.id}
        renderItem={ ({item}) => (
          <Text>{item.texto}</Text>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      padding: 10,
      marginTop: 50,
      marginBottom: 20,
      backgroundColor: '#fff',
    },
});

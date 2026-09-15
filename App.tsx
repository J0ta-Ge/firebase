import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, TextInput, Button } from "react-native";
import { collection, addDoc, updateDoc, deleteDoc, onSnapshot, doc } from "firebase/firestore";

export default function App() {
  type Treino = {
    nome: string;
    repeticoes: string;
    series: string;
    carga: string;
  };

  const [nome, setNome] = useState("");
  const [repeticoes, setRepeticoes] = useState("");
  const [series, setSeries] = useState("");
  const [carga, setCarga] = useState("");

  const [treino, setTreino] = useState<(Treino & { id: string })[]>([]);

  const adicionarTreino = async () => {
    try {
      const novoTreino: Treino = {
        nome,
        repeticoes,
        series,
        carga,
      };

      await addDoc(collection(db, "treinos"), novoTreino);

      setNome("");
      setRepeticoes("");
      setSeries("");
      setCarga("");

      console.log("Treino adicionado com sucesso!");
    } catch (error) {
      console.log("ERRO AO ADICIONAR: ", error);
    }
  };

  const atualizarTreino = async (id: string) => {
    try {
      await updateDoc(doc(db, "treinos", id), {
        nome,
        repeticoes,
        series,
        carga,
      });

      console.log("Treino atualizado com sucesso!");
    } catch (error) {
      console.log("ERRO AO ATUALIZAR: ", error);
    }
  };

  const excluirTreino = async (id: string) => {
    try {
      await deleteDoc(doc(db, "treinos", id));

      console.log("Treino excluído com sucesso!");
    } catch (error) {
      console.log("ERRO AO EXCLUIR: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "treinos"),
      (snapshot) => {
        const lista: (Treino & { id: string })[] = [];

        snapshot.forEach((documento) => {
          lista.push({
            id: documento.id,
            ...(documento.data() as Treino),
          });
        });

        setTreino(lista);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.titulo}>Cadastro de Treino</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do exercício"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Nº de repetições"
        value={repeticoes}
        onChangeText={setRepeticoes}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Nº de séries"
        value={series}
        onChangeText={setSeries}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Carga (KG)"
        value={carga}
        onChangeText={setCarga}
        keyboardType="numeric"
      />

      <View style={styles.botao}>
        <Button
          title="Cadastrar treino"
          onPress={adicionarTreino}
        />
      </View>

      <Text style={styles.subtitulo}>Treinos cadastrados</Text>

      <FlatList
        style={styles.lista}
        data={treino}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>

            <Text>Repetições: {item.repeticoes}</Text>
            <Text>Séries: {item.series}</Text>
            <Text>Carga: {item.carga} KG</Text>

            <View style={styles.botoes}>
              <Button
                title="Atualizar"
                onPress={() => atualizarTreino(item.id)}
              />

              <Button
                title="Excluir"
                onPress={() => excluirTreino(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },

  botao: {
    marginTop: 5,
    marginBottom: 20,
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  lista: {
    width: "100%",
  },

  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
  },

  nome: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
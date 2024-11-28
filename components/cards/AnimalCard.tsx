import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AnimalCardProps {
  name: string;
  age: number;
  type: string;
  breed: string;
  color: string;
}

export default function AnimalCard({
  name,
  age,
  type,
  breed,
  color,
}: AnimalCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.info}>Tipo: {type}</Text>
      <Text style={styles.info}>Raça: {breed}</Text>
      <Text style={styles.info}>Idade: {age} anos</Text>
      <Text style={styles.info}>Cor: {color}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
});

import React from "react";
import { StyleSheet, Text, View } from "react-native";

export type AnimalProps = {
  name: string;
  age: number;
  type: string;
  breed: string;
  color: string;
};

export default function Animal({ name, age, type, breed, color }: AnimalProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.age}>{age}</Text>
      <Text style={styles.type}>{type}</Text>
      <Text style={styles.breed}>{breed}</Text>
      <Text style={styles.color}>{color}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 20,
    margin: 20,
    borderRadius: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  age: {
    fontSize: 10,
  },
  type: {
    fontSize: 10,
  },
  breed: {
    fontSize: 10,
  },
  color: {
    fontSize: 10,
  },
});

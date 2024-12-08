import React from "react";
import { StyleSheet, Text, View } from "react-native";

export type ServiceProps = {
  name: string;
  description: string;
  date: string; // Exemplo: "2024-12-08"
};

export default function Service({ name, description, date }: ServiceProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.date}>{`Data: ${date}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#f1f1f1",
    padding: 15,
    margin: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    textAlign: "justify",
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
});

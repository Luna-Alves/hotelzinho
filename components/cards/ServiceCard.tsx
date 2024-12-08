import React from "react";
import { StyleSheet, Text, View } from "react-native";

export type ServiceProps = {
  name: string;
  description: string;
  date: string;
};

export default function ServiceCard({ name, description, date }: ServiceProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.date}>{date}</Text>
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
  description: {
    fontSize: 14,
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    marginTop: 5,
    color: "gray",
  },
});

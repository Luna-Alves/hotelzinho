import Animal from "@/components/animal/Animal";
import AnimalModal from "@/components/modals/AnimalModal";
import MyScrollView from "@/components/MyScrollView";
import { ThemedView } from "@/components/ThemedView";
import { IAnimal } from "@/interfaces/IAnimal";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import AnimalCard from "@/components/cards/AnimalCard";

export default function AnimalsListScreen() {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onAdd = (
    name: string,
    age: number,
    type: string,
    breed: string,
    color: string
  ) => {
    const newAnimal: IAnimal = {
      id: Math.random() * 1000,
      name,
      age,
      type,
      breed,
      color,
    };

    setAnimals([...animals, newAnimal]);
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <MyScrollView headerBackgroundColor={{ light: "#a5ab7f", dark: "#6f773a" }}>
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={openModal}>
          <Text style={styles.headerButton}>Adicionar Animal</Text>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.container}>
        {animals.map((animal) => (
          <AnimalCard
            key={animal.id}
            name={animal.name}
            age={animal.age}
            breed={animal.breed}
            type={animal.type}
            color={animal.color}
          />
        ))}
      </ThemedView>

      <AnimalModal visible={modalVisible} onCancel={closeModal} onAdd={onAdd} />
    </MyScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6f773a",
  },
  headerContainer: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  headerButton: {
    fontWeight: "bold",
    fontSize: 20,
    paddingHorizontal: 20,
  },
});

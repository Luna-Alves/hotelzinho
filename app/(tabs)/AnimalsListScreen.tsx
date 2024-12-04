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
  const [selectedAnimal, setSelectedAnimal] = useState<IAnimal>();

  const onAdd = (
    name: string,
    age: number,
    type: string,
    breed: string,
    color: string,
    id?: number
  ) => {
    if (id === undefined) {
      const newAnimal: IAnimal = {
        id: Math.floor(Math.random() * 1000),
        name: name,
        age: age,
        type: type,
        breed: breed,
        color: color,
      };

      setAnimals([...animals, newAnimal]);
    } else {
      const updatedAnimals = animals.map((animal) =>
        animal.id === id ? { ...animal, name, age, type, breed, color } : animal
      );
      setAnimals(updatedAnimals);
    }

    setModalVisible(false);
  };

  const onDelete = (id: number) => {
    const newAnimals = animals.filter((animal) => animal.id !== id);
    setAnimals(newAnimals);
    setModalVisible(false);
  };

  const openModal = () => {
    setSelectedAnimal(undefined);
    setModalVisible(true);
  };

  const openEditModal = (animal: IAnimal) => {
    setSelectedAnimal(animal);
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
          <TouchableOpacity
            key={animal.id}
            onPress={() => openEditModal(animal)}
          >
            <AnimalCard
              name={animal.name}
              age={animal.age}
              breed={animal.breed}
              type={animal.type}
              color={animal.color}
            />
          </TouchableOpacity>
        ))}
      </ThemedView>

      <AnimalModal
        visible={modalVisible}
        onCancel={closeModal}
        onAdd={onAdd}
        onDelete={onDelete}
        animal={selectedAnimal}
      />
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

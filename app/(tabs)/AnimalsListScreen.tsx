import AnimalModal from "@/components/modals/AnimalModal";
import MyScrollView from "@/components/MyScrollView";
import { ThemedView } from "@/components/ThemedView";
import { IAnimal } from "@/interfaces/IAnimal";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import AnimalCard from "@/components/cards/AnimalCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

export default function AnimalsListScreen() {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedAnimal, setSelectedAnimal] = useState<IAnimal>();

  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

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
        name,
        age,
        type,
        breed,
        color,
      };
      setAnimals((prevAnimals) => [...prevAnimals, newAnimal]);
    } else {
      setAnimals((prevAnimals) =>
        prevAnimals.map((animal) =>
          animal.id === id
            ? { ...animal, name, age, type, breed, color }
            : animal
        )
      );
    }
    setModalVisible(false);
  };

  const onDelete = (id: number) => {
    setAnimals((prevAnimals) =>
      prevAnimals.filter((animal) => animal.id !== id)
    );
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

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("@AnimalsApp:animals");
        const animalsData = data != null ? JSON.parse(data) : [];
        setAnimals(animalsData);
      } catch (e) {
        console.error("Erro ao carregar os dados do AsyncStorage", e);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    async function saveData() {
      try {
        await AsyncStorage.setItem(
          "@AnimalsApp:animals",
          JSON.stringify(animals)
        );
      } catch (e) {
        console.error("Erro ao salvar os dados no AsyncStorage", e);
      }
    }

    saveData();
  }, [animals]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied :(");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Buscando localização...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  }

  return (
    <MyScrollView headerBackgroundColor={{ light: "#a5ab7f", dark: "#6f773a" }}>
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={openModal}>
          <Text style={styles.headerButton}>Adicionar Animal</Text>
        </TouchableOpacity>
        <Text style={styles.text}>{text}</Text>
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
  text: {
    fontSize: 14,
    marginTop: 10,
    color: "#333",
  },
});

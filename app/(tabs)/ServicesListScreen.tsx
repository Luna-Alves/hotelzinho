import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ServiceCard from "@/components/cards/ServiceCard";
import ServiceModal from "@/components/modals/ServiceModal";
import { IService } from "@/interfaces/IService";
import { ThemedView } from "@/components/ThemedView";
import MyScrollView from "@/components/MyScrollView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useRouter } from "expo-router";

export default function ServicesListScreen() {
  const router = useRouter();
  const [services, setServices] = useState<IService[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<IService | null>(null);

  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const onAddOrUpdate = (
    name: string,
    description: string,
    date: string,
    id?: number
  ) => {
    if (id === undefined) {
      const newService: IService = {
        id: Math.floor(Math.random() * 1000),
        name,
        description,
        date,
      };
      setServices((prevServices) => [...prevServices, newService]);
    } else {
      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === id ? { ...service, name, description, date } : service
        )
      );
    }
    setModalVisible(false);
  };

  const onDelete = (id: number) => {
    setServices((prevServices) =>
      prevServices.filter((service) => service.id !== id)
    );
    setModalVisible(false);
  };

  const openModal = () => {
    setSelectedService(null);
    setModalVisible(true);
  };

  const openEditModal = (service: IService) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("@ServicesApp:services");
        const servicesData = data != null ? JSON.parse(data) : [];
        setServices(servicesData);
      } catch (e) {
        console.error("Erro ao carregar os serviços do AsyncStorage", e);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    async function saveData() {
      try {
        await AsyncStorage.setItem(
          "@ServicesApp:services",
          JSON.stringify(services)
        );
      } catch (e) {
        console.error("Erro ao salvar os serviços no AsyncStorage", e);
      }
    }

    saveData();
  }, [services]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
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
          <Text style={styles.headerButton}>Adicionar Serviço</Text>
        </TouchableOpacity>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => router.replace("/(tabs)/hotelzinho")}
            >
              <Text style={styles.backButton}>⬅ Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
      <ThemedView style={styles.container}>
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            onPress={() => openEditModal(service)}
          >
            <ServiceCard
              name={service.name}
              description={service.description}
              date={service.date}
            />
          </TouchableOpacity>
        ))}
      </ThemedView>

      <ServiceModal
        visible={modalVisible}
        onAdd={onAddOrUpdate}
        onDelete={onDelete}
        onCancel={closeModal}
        service={selectedService || undefined}
      />
    </MyScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#a5ab7f",
  },
  buttonContainer: {
    alignItems: "flex-start",
  },
  backButton: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
    backgroundColor: "#a5ab7f",
    padding: 10,
    borderRadius: 8,
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

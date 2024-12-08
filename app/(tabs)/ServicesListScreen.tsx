import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import ServiceCard from "@/components/cards/ServiceCard";
import ServiceModal from "@/components/modals/ServiceModal";
import { IService } from "@/interfaces/IService";

import { ThemedView } from "@/components/ThemedView";
import MyScrollView from "@/components/MyScrollView";

export default function ServicesListScreen() {
  const [services, setServices] = useState<IService[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<IService | null>(null);

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
      setServices([...services, newService]);
    } else {
      const updatedServices = services.map((service) =>
        service.id === id ? { ...service, name, description, date } : service
      );
      setServices(updatedServices);
    }
    setModalVisible(false);
  };

  const onDelete = (id: number) => {
    const updatedServices = services.filter((service) => service.id !== id);
    setServices(updatedServices);
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

  return (
    <MyScrollView headerBackgroundColor={{ light: "#a5ab7f", dark: "#6f773a" }}>
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={openModal}>
          <Text style={styles.headerButton}>Adicionar Serviço</Text>
        </TouchableOpacity>
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

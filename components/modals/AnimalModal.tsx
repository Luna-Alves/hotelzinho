import { IAnimal } from "@/interfaces/IAnimal";
import React, { useEffect, useState } from "react";
import { Modal, TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native";

export type AnimalModalProps = {
  visible: boolean;
  onAdd: (
    name: string,
    age: number,
    type: string,
    breed: string,
    color: string,
    id?: number
  ) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
  animal?: IAnimal;
};

export default function AnimalModal({
  visible,
  onAdd,
  onCancel,
  onDelete,
  animal,
}: AnimalModalProps) {
  const [id, setId] = useState<number | undefined>(undefined);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");

  const handleAdd = () => {
    if (name && age && type && breed && color) {
      onAdd(name, parseInt(age, 10), type, breed, color, id);
      onCancel();
    }
  };

  useEffect(() => {
    if (animal) {
      setId(animal.id);
      setName(animal.name);
      setAge(animal.age.toString());
      setType(animal.type);
      setBreed(animal.breed);
      setColor(animal.color);
    } else {
      setId(undefined);
      setName("");
      setAge("");
      setType("");
      setBreed("");
      setColor("");
    }
  }, [animal]);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <TextInput
            style={styles.boxInput}
            placeholder="Nome"
            value={name}
            onChangeText={(text) => setName(text)}
            autoFocus
          />
          <TextInput
            style={styles.boxInput}
            placeholder="Tipo"
            value={type}
            onChangeText={(text) => setType(text)}
          />
          <TextInput
            style={styles.boxInput}
            placeholder="Idade"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.boxInput}
            placeholder="Raça"
            value={breed}
            onChangeText={setBreed}
          />
          <TextInput
            style={styles.boxInput}
            placeholder="Cor"
            value={color}
            onChangeText={setColor}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
              <Text style={styles.buttonText}>
                {id !== undefined ? "Atualizar" : "Adicionar"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={() => onCancel()}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            {id !== undefined && (
              <TouchableOpacity
                style={styles.buttonDelete}
                onPress={() => onDelete(id!)}
              >
                <Text style={styles.buttonText}>Deletar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
  },
  boxContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    padding: 20,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#FFF",
  },
  buttonAdd: {
    backgroundColor: "green",
    borderRadius: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 20,
  },
  buttonCancel: {
    backgroundColor: "orange",
    borderRadius: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 20,
  },
  buttonDelete: {
    backgroundColor: "red",
    borderRadius: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    height: 70,
  },
  boxInput: {
    alignSelf: "stretch",
    height: 40,
    borderRadius: 5,
    backgroundColor: "#DDD",
    margin: 5,
    paddingHorizontal: 10,
  },
});

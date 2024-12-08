import { IService } from "@/interfaces/IService";
import React, { useEffect, useState } from "react";
import {
  Modal,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TextInput,
} from "react-native";

export type ServiceModalProps = {
  visible: boolean;
  onAdd: (name: string, description: string, date: string, id?: number) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
  service?: IService;
};

export default function ServiceModal({
  visible,
  onAdd,
  onCancel,
  onDelete,
  service,
}: ServiceModalProps) {
  const [id, setId] = useState<number | undefined>(undefined);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (service) {
      setId(service.id);
      setName(service.name);
      setDescription(service.description);
      setDate(service.date);
    } else {
      setId(undefined);
      setName("");
      setDescription("");
      setDate("");
    }
  }, [service]);

  const handleAdd = () => {
    if (name && description && date) {
      onAdd(name, description, date, id);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <TextInput
            style={styles.boxInput}
            placeholder="Nome do Serviço"
            value={name}
            onChangeText={(text) => setName(text)}
            autoFocus
          />
          <TextInput
            style={styles.boxInput}
            placeholder="Descrição"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <TextInput
            style={styles.boxInput}
            placeholder="Data (YYYY-MM-DD)"
            value={date}
            onChangeText={(text) => setDate(text)}
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
                onPress={() => onDelete(id)}
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

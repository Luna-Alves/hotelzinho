import {
  Platform,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const { width, height } = Dimensions.get("window");

export default function Hotelzinho() {
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#a5ab7f", dark: "#6f773a" }}
      headerImage={
        <Image
          source={require("@/assets/images/hotelzinho.png")}
          style={styles.reactLogo}
        />
      }
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/AnimalsListScreen")}
        >
          <Text style={styles.screenButton}>🐾 Ver Animais</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(tabs)/ServicesListScreen")}
        >
          <Text style={styles.screenButton}>Ver Serviços</Text>
        </TouchableOpacity>
      </View>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Boas-vindas ao Hotelzinho Bichológico!
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.contentContainer}>
        <Image
          source={require("@/assets/images/animais.png")}
          style={styles.image}
        />
      </ThemedView>
      <Text style={styles.text}>
        Aqui o seu pet se sentirá em casa!{"\n"}
        Contamos com uma equipe treinada, amplo espaço para atividades {"\n"}e
        supervisão 24h.
      </Text>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reactLogo: {
    height: 200,
    width: 200,
    bottom: 25,
    left: 20,
    position: "absolute",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 5,
  },
  contentContainer: {
    flexDirection: "row",
    paddingTop: 16,
    padding: Platform.OS === "web" ? 32 : 16,
  },
  image: {
    width: Platform.OS === "web" ? 400 : width * 0.8,
    height: Platform.OS === "web" ? 300 : height * 0.3,
  },
  text: {
    flexDirection: "row",
    fontSize: Platform.OS === "web" ? 24 : width * 0.05,
    lineHeight: 30,
  },
  screenButton: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
    backgroundColor: "#a5ab7f",
    padding: 10,
    borderRadius: 8,
    textAlign: "center",
    width: 200,
  },
});

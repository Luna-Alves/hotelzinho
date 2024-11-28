import { Platform, Dimensions, Image, StyleSheet, Text } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const { width, height } = Dimensions.get("window");

export default function Hotelzinho() {
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
});

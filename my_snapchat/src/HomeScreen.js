import { GiFlexibleLamp } from "react-icons/gi";
import { Text, Image, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Welcome to Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
});

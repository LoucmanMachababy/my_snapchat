import { GiFlexibleLamp } from "react-icons/gi";
import { Text, Image, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
});

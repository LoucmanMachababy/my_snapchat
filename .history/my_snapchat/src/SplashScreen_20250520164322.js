import { GiFlexibleLamp } from "react-icons/gi";
import { Image, StyleSheet, View } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Image source={}/>
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
});

import { Text, View, StyleSheet } from "react-native";
export default function Settings() {
  return (
    <View style={styles.container}
    >
      <Text>Setting</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "skyblue"
  }
})
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/hooks/useTheme";
export default function Index() {
  const {toggleDarkMode} = useTheme();
  return (
    <View style={styles.container}
    >
      <Text>Edit app/index.tsx to edit thisw watc.</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Toggle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})

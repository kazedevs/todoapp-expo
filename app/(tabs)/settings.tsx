import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text } from "react-native";

export default function Settings() {
  const { colors } = useTheme();
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={styles.container}
    >
      <Text style={[styles.text, { color: colors.text }]}>Setting</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { createHomeStyles } from "@/assets/styles/home.styles";
export default function Index() {
  const {toggleDarkMode, colors} = useTheme();

  const homeStyles = createHomeStyles(colors);

  return (
    <View style={homeStyles.container}
    >
      <Text>hi</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text style={homeStyles.title}>Toggle</Text>
      </TouchableOpacity>
    </View>
  );
}



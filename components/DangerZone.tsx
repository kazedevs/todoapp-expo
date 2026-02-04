import { createSettingsStyles } from "@/assets/styles/settings.styles";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const DangerZone = () => {
  const clearAllTodos = useMutation(api.todos.clearAllTodos);
  const { colors } = useTheme();
  const settingsStyle = createSettingsStyles(colors);

  const handleClearAll = () => {
    Alert.alert(
      "Clear All Data",
      "Are you sure you want to delete all todos? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await clearAllTodos();
            } catch (error) {
              Alert.alert("Error", "Failed to clear data");
            }
          },
        },
      ],
    );
  };

  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={[
        settingsStyle.section,
        { borderColor: colors.danger, borderWidth: 1 },
      ]}
    >
      <Text style={settingsStyle.sectionTitleDanger}>Danger Zone</Text>
      <TouchableOpacity
        style={[settingsStyle.actionButton, { borderBottomWidth: 0 }]}
        onPress={handleClearAll}
      >
        <View style={settingsStyle.actionLeft}>
          <LinearGradient
            colors={colors.gradients.danger}
            style={settingsStyle.actionIcon}
          >
            <Ionicons name="trash-bin" size={20} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyle.actionTextDanger}>Clear All Data</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.danger} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default DangerZone;

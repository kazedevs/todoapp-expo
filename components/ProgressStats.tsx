import { createSettingsStyles } from "@/assets/styles/settings.styles";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import React from "react";
import { Text, View } from "react-native";

const ProgressStats = () => {
  const { colors } = useTheme();
  const settingsStyle = createSettingsStyles(colors);

  const todos = useQuery(api.todos.getTodos);
  const totalTodos = todos ? todos.length : 0;
  const completedTodos = todos
    ? todos.filter((todo) => todo.isCompleted).length
    : 0;
  const activeTodos = totalTodos - completedTodos;
  return (
    <View style={settingsStyle.statsRow}>
      <View style={settingsStyle.statItem}>
        <Ionicons
          name="checkmark-circle"
          size={24}
          color={colors.primary}
          style={{ marginBottom: 4 }}
        />
        <Text style={settingsStyle.statNumberMinimal}>{completedTodos}</Text>
        <Text style={settingsStyle.statLabelMinimal}>Done</Text>
      </View>

      <View style={settingsStyle.statDivider} />

      <View style={settingsStyle.statItem}>
        <Ionicons
          name="radio-button-off"
          size={24}
          color={colors.warning}
          style={{ marginBottom: 4 }}
        />
        <Text style={settingsStyle.statNumberMinimal}>{activeTodos}</Text>
        <Text style={settingsStyle.statLabelMinimal}>Active</Text>
      </View>

      <View style={settingsStyle.statDivider} />

      <View style={settingsStyle.statItem}>
        <Ionicons
          name="layers"
          size={24}
          color={colors.textMuted}
          style={{ marginBottom: 4 }}
        />
        <Text style={settingsStyle.statNumberMinimal}>{totalTodos}</Text>
        <Text style={settingsStyle.statLabelMinimal}>Total</Text>
      </View>
    </View>
  );
};

export default ProgressStats;

import { createSettingsStyles } from "@/assets/styles/settings.styles";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Switch, Text, View } from "react-native";

const Preference = () => {
  const [isAutoSync, setIsAutoSync] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const { isDarkMode, toggleDarkMode, colors } = useTheme();
  const settingsStyle = createSettingsStyles(colors);

  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingsStyle.section}
    >
      <Text style={settingsStyle.sectionTitle}>Preferences</Text>

      {/* Dark Mode */}
      <View style={settingsStyle.settingItem}>
        <View style={settingsStyle.settingLeft}>
          <LinearGradient
            colors={colors.gradients.primary}
            style={settingsStyle.settingIcon}
          >
            <Ionicons name="moon" size={20} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyle.settingText}>Dark Mode</Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor="#fff"
        />
      </View>

      {/* Auto Sync */}
      <View style={settingsStyle.settingItem}>
        <View style={settingsStyle.settingLeft}>
          <LinearGradient
            colors={colors.gradients.success}
            style={settingsStyle.settingIcon}
          >
            <Ionicons name="cloud-upload" size={20} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyle.settingText}>Auto Sync</Text>
        </View>
        <Switch
          value={isAutoSync}
          onValueChange={setIsAutoSync}
          trackColor={{ false: colors.border, true: colors.success }}
          thumbColor="#fff"
        />
      </View>

      {/* Notifications */}
      <View style={[settingsStyle.settingItem, { borderBottomWidth: 0 }]}>
        <View style={settingsStyle.settingLeft}>
          <LinearGradient
            colors={colors.gradients.warning}
            style={settingsStyle.settingIcon}
          >
            <Ionicons name="notifications" size={20} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyle.settingText}>Notifications</Text>
        </View>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={setIsNotificationsEnabled}
          trackColor={{ false: colors.border, true: colors.warning }}
          thumbColor="#fff"
        />
      </View>
    </LinearGradient>
  );
};

export default Preference;

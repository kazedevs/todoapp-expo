import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { useTheme } from '@/hooks/useTheme'
import { createSettingsStyles } from '@/assets/styles/settings.styles'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import ProgressStats from '@/components/ProgressStats'
import Preference from '@/components/Preference'
import DangerZone from '@/components/DangerZone'

const SettingsScreen = () => {  

  const { colors } = useTheme();
  const settingsStyle = createSettingsStyles(colors);
  return (
    <LinearGradient colors={colors.gradients.background} style={settingsStyle.container}>
      <SafeAreaView style={settingsStyle.safeArea}>
        {/* Header */}
        <View style={settingsStyle.header}>
          <View style={settingsStyle.titleContainer}>
            <LinearGradient colors={colors.gradients.primary} style={settingsStyle.iconContainer}>
              <Ionicons name="settings" size={24} color="#fff" />
            </LinearGradient>
            <Text style={settingsStyle.title}>Settings</Text>
          </View>
        </View>

        {/* ScrollView */}
        <ScrollView 
          style={settingsStyle.scrollView}
          contentContainerStyle={settingsStyle.content}
          showsVerticalScrollIndicator={false}
        >
           <ProgressStats/>
          
          {/* preferences */}
          <Preference/>

          {/* Danger Zone */}

          <DangerZone/>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default SettingsScreen
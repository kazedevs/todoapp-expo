import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'

const TabsLayout = () => {
    const {colors} = useTheme();
  return (
    <Tabs   
        screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textMuted,
            tabBarStyle: {
                backgroundColor: colors.surface,
                borderTopWidth: 1,
                borderTopColor: colors.border,
                height: 80,
                paddingBottom: 20,
                paddingTop: 10
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: "500"
            }
        }}
    >
        <Tabs.Screen 
            name="index" 
            options={{
                title: "Todos",
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="list-outline" size={size} color={color} />
                )
            }}
        />
        <Tabs.Screen 
            name="settings" 
            options={{
                title: "Settings",
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="settings" size={size} color={color} />
                )
            }}
        />
    </Tabs>
  )
}

export default TabsLayout
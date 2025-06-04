import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "#666",
        headerTitleAlign: "center",
        headerStyle: {
          // backgroundColor: "green",
        },
        headerShadowVisible: false,
        tabBarStyle: {
          // backgroundColor: "green",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Today's Habits",
          tabBarIcon: ({ color, focused, size }) =>
            focused ? (
              <MaterialCommunityIcons
                name="calendar-today"
                size={size}
                color="green"
              />
            ) : (
              <MaterialCommunityIcons name="calendar-today" size={size} />
            ),
        }}
      />
      <Tabs.Screen
        name="streaks"
        options={{
          title: "Streaks",
          tabBarIcon: ({ color, focused, size }) =>
            focused ? (
              <MaterialCommunityIcons
                name="chart-line"
                size={size}
                color="green"
              />
            ) : (
              <MaterialCommunityIcons name="chart-line" size={size} />
            ),
        }}
      />
      <Tabs.Screen
        name="add-habit"
        options={{
          title: "Add Habit",
          tabBarIcon: ({ color, focused, size }) =>
            focused ? (
              <MaterialCommunityIcons
                name="plus-circle"
                size={size}
                color="green"
              />
            ) : (
              <MaterialCommunityIcons name="plus-circle" size={size} />
            ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

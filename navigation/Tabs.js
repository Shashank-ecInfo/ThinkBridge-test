import React, { useEffect } from "react";
import { BackHandler, Image, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from "react-native-vector-icons/Feather";

import Home from "../screens/Home";
import Gallery from "../screens/Gallery";
import MyFavorite from "../screens/MyFavorite";

const Stack = createStackNavigator();

const Tabs = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        // headerStyle: {
        //   backgroundColor: "",
        // },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          title: "Home",
          headerLeft: null,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Gallery"
        component={Gallery}
        options={{
          headerShown: true,
          title: "Gallery",
        }}
      />
      <Stack.Screen
        name="MyFavorite"
        component={MyFavorite}
        options={{
          headerShown: true,
          title: "MyFavorite",
        }}
      />
    </Stack.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabCont: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    top: 10,
  },
  tabLabel: {
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 1,
  },
});

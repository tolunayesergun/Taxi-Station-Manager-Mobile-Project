import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import FirstOperationPage from "./Components/FirstOperationPage";
import SecondOperationPage from "./Components/SecondOperationPage";
import ThirdOperationPage from "./Components/ThirdOperationPage";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return <Icon name={"taxi"} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Tip 1" component={FirstOperationPage} />
        <Tab.Screen name="Tip 2" component={SecondOperationPage} />
        <Tab.Screen name="Tip 3" component={ThirdOperationPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

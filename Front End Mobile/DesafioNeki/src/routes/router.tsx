import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../screens/home";
import { Login } from "../screens/login";
import { Register } from "../screens/register";

function Stack() {
  const stack = createStackNavigator();

  return (
    <>
      <stack.Navigator initialRouteName="Login">
        <stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </stack.Navigator>
    </>
  );
}

export function Router() {
  return (
    <>
      <NavigationContainer>
        <Stack/>
      </NavigationContainer>
    </>
  );
}

import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import You from "./You";
import Category from "./Catagories";
import Cart from "./Cart";
import Login from "./Login";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tab Navigator Component
const AppTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="You" component={You} />
    <Tab.Screen name="Categories" component={Category} />
    <Tab.Screen name="Cart" component={Cart} />
  </Tab.Navigator>
);

// Main Stack Navigator
const MainStack = ({ setUserLoggedIn }) => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login">
      {(props) => <Login {...props} setUserLoggedIn={setUserLoggedIn} />}
    </Stack.Screen>
    {/* <Stack.Screen name="Registration" component={Registration} /> */}
    <Stack.Screen
      name="AppTabs"
      component={AppTabs}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

// Main App Component
const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false); // Initially set to false to show Login screen

  return (
    <NavigationContainer>
      <MainStack setUserLoggedIn={setUserLoggedIn} />
    </NavigationContainer>
  );
};

export default App;

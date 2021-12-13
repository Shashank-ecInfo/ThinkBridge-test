import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { NativeBaseProvider } from "native-base";
import Tabs from "./navigation/Tabs";

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Tabs />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;

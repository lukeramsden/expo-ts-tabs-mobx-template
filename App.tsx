import useCachedResources from "@hooks/useCachedResources";
import useColorScheme from "@hooks/useColorScheme";
import { RootStoreProvider } from "@hooks/useRootStore";
import RootNavigator from "@navigation/RootNavigator";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <RootStoreProvider>
          <RootNavigator colorScheme={colorScheme} />
        </RootStoreProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

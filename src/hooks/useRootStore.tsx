import RootStore from "@stores/RootStore";
import * as React from "react";
type RootStoreProviderProps = { children: React.ReactNode };
const RootStoreContext = React.createContext<RootStore>(new RootStore());
function RootStoreProvider({ children }: RootStoreProviderProps) {
  const store = React.useRef(new RootStore()).current;
  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  );
}
function useRootStore() {
  const context = React.useContext(RootStoreContext);
  if (context === undefined) {
    throw new Error("useRootStore must be used within a RootStoreProvider");
  }
  return context;
}
export { RootStoreProvider, useRootStore };

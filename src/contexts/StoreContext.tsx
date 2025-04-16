import { createContext, ReactNode, useState } from "react";
import { Store } from "../types/Store.type";

interface StoreContextType {
  store: Store;
  setStore: (store: Store) => void;
}

export const StoreContext = createContext<StoreContextType>({
  store: {
    name: "",
    logo: "",
    address: "",
    longitude: 0,
    latitude: 0,
    description: "",
  },
  setStore: () => {},
});

export function StoreContextProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<Store>({
    name: "",
    description: "",
    logo: "",
    address: "",
    longitude: 0,
    latitude: 0,
  });

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
}

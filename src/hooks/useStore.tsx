import { useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";

export const useStore = () => {
  const context = useContext(StoreContext);

  if (context == undefined) {
    throw new Error(
      "useStore hook must be used inside a StoreContext Provider",
    );
  }

  return context;
};

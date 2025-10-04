import { MainContext } from "../Contexts/MainContext";
import { useContext } from "react";

export const useContextImport = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useContextImport must be used within a MainProvider");
  }
  return context;
};

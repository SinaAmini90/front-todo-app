import { createContext } from "react";

export const FormContext = createContext({
  displayForm: "",
  setDisplayForm: () => {},
});

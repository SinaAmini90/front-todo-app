import { createContext } from "react";

export const TimeContext = createContext({
  deadLineDate: "",
  setDeadLineDate: () => {},
  deadLineTime: "",
  setDeadLineTime: () => {},
});

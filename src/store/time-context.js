import { createContext } from "react";

export const TimeContext = createContext({
  deadLineDate: "",
  setDeadLineDate: () => {},
  deadLineTime: "",
  setDeadLineTime: () => {},
  // reminderTime: "", (**about reminder time ** develop later**)
  // setReminderTime: () => {}, (**about reminder time ** develop later**)
});

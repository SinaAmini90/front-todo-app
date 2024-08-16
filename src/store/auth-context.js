import { createContext } from "react";

export const SigninContext = createContext({
  isSignin: false,
  setIsSignin: () => {},
});

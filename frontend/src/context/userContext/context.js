import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { UserReducer } from "./reducer";
const userContext = createContext();
export const useUser = () => {
  return useContext(userContext);
};

export const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(UserReducer, {
    user: JSON.parse(localStorage.getItem("user") || null),
  });
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("isAuth")) || false
  );

  return (
    <userContext.Provider
      value={{
        userState,
        userDispatch,
        token,
        setToken,
        isAuth,
        setIsAuth,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import postReducer from "./reducer";
const postContext = createContext();
export const usePost = () => {
  return useContext(postContext);
};

export const PostProvider = ({ children }) => {
  const [postState, postDispatch] = useReducer(postReducer, {
    posts: [],
    post: [],
  });

  return (
    <postContext.Provider
      value={{
        postState,
        postDispatch,
      }}
    >
      {children}
    </postContext.Provider>
  );
};

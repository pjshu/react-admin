import {createContext, useState} from "react";

const useInitValue = () => {
  const [login, setLogin] = useState(false);
  const [auth, setAuth] = useState(false);
  return {login, auth, setLogin, setAuth};
};

const AuthContext = createContext(null);

export default AuthContext;
export {useInitValue};

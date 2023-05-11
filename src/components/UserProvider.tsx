import { createContext, useContext, useState, ReactNode } from "react";

interface UserInfo {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}
interface UserContextType {
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}

const userContext = createContext({} as UserContextType);

export const useUser = () => {
  return useContext(userContext);
};

interface Prop {
  children: ReactNode;
}

const UserProvider = ({ children }: Prop) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  return (
    <userContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;

import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const refreshIndexPageContext = createContext({} as UserContextType);

export const useRefreshIndexPage = () => {
  return useContext(refreshIndexPageContext);
};

interface Prop {
  children: ReactNode;
}

const RefreshIndexPageProvider = ({ children }: Prop) => {
  const [refresh, setRefresh] = useState(false);

  return (
    <refreshIndexPageContext.Provider value={{ refresh, setRefresh }}>
      {children}
    </refreshIndexPageContext.Provider>
  );
};

export default RefreshIndexPageProvider;

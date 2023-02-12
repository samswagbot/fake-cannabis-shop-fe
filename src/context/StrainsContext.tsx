import { createContext, ReactNode, useContext, useState } from "react";
import { StrainType } from "../types/strain";

interface StrainProviderProps {
  children: ReactNode;
}

interface ShoppingCartContextProps {
  strains: StrainType[] | null;
  setStrains: React.Dispatch<React.SetStateAction<StrainType[] | null>>;
}

const StrainContext = createContext({} as ShoppingCartContextProps);

export function useStrainsContext() {
  return useContext(StrainContext);
}

export const StrainProvider = ({ children }: StrainProviderProps) => {
  const [strains, setStrains] = useState<StrainType[] | null>(null);

  return (
    <StrainContext.Provider value={{ strains, setStrains }}>
      {children}
    </StrainContext.Provider>
  );
};

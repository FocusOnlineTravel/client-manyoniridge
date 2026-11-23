'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface HeaderContextType {
  forceDark: boolean;
  setForceDark: (value: boolean) => void;
}

const HeaderContext = createContext<HeaderContextType>({
  forceDark: false,
  setForceDark: () => {},
});

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [forceDark, setForceDark] = useState(false);

  return (
    <HeaderContext.Provider value={{ forceDark, setForceDark }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  return useContext(HeaderContext);
}

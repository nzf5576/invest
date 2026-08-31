import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthContextValue {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = 'invest-portal-authenticated';

function readStoredAuth(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== 'false';
  } catch {
    return true;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(readStoredAuth);

  function setAuth(value: boolean) {
    setIsAuthenticated(value);
    try {
      localStorage.setItem(STORAGE_KEY, String(value));
    } catch {
      // ignore storage errors (e.g. private browsing)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login: () => setAuth(true),
        logout: () => setAuth(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

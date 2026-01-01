// src/context/MockAuthContext.tsx
// Use this during UI phases - will be replaced with real Firebase auth in Phase 7

'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User } from '@/lib/types';
import { mockCurrentUser, mockSignIn, mockSignUp, mockSignOut } from '@/lib/mock-data';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const user = await mockSignIn(email, password);
      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);
    try {
      const user = await mockSignUp(email, password, name);
      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await mockSignOut();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign out failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        error, 
        signIn, 
        signUp, 
        signOut, 
        clearError 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within MockAuthProvider');
  }
  return context;
}

// Hook to check if user is authenticated (for protected routes)
export function useRequireAuth() {
  const { user, loading } = useAuth();
  return { isAuthenticated: !!user, loading, user };
}

// For quick access in UI development - auto-login helper
export function useDevAutoLogin() {
  const { signIn, user, loading } = useAuth();
  
  const autoLogin = useCallback(async () => {
    if (!user && !loading) {
      await signIn(mockCurrentUser.email, 'password');
    }
  }, [user, loading, signIn]);

  return { autoLogin, user, loading };
}


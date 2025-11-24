import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signIn: (identifier: string, password: string) => Promise<{ error: any }>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for mock session in localStorage first
    const mockSessionData = localStorage.getItem('mockAdminSession');
    if (mockSessionData) {
      try {
        const { user: mockUser, session: mockSession } = JSON.parse(mockSessionData);
        setUser(mockUser);
        setSession(mockSession);
        setLoading(false);
        return;
      } catch (e) {
        localStorage.removeItem('mockAdminSession');
      }
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (identifier: string, password: string) => {
    // Mock Admin Login
    if (identifier === "admin" && password === "admin123") {
      const mockUser = {
        id: "mock-admin-id",
        email: "admin@toolbox.com",
        user_metadata: { full_name: "Admin User" },
        app_metadata: { role: "admin" },
        aud: "authenticated",
        created_at: new Date().toISOString(),
      } as unknown as User;

      const mockSession = {
        access_token: "mock-token",
        refresh_token: "mock-refresh-token",
        expires_in: 3600,
        token_type: "bearer",
        user: mockUser,
      } as unknown as Session;

      // Store in localStorage for persistence
      localStorage.setItem('mockAdminSession', JSON.stringify({ user: mockUser, session: mockSession }));

      setUser(mockUser);
      setSession(mockSession);
      return { error: null };
    }

    // Real Supabase Login (fallback)
    const { error } = await supabase.auth.signInWithPassword({
      email: identifier,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    // Remove mock session
    localStorage.removeItem('mockAdminSession');

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    }
    setUser(null);
    setSession(null);
  };

  // Check if user is admin
  const isAdmin = user?.app_metadata?.role === "admin" || user?.email === "admin@toolbox.com";

  const value = {
    user,
    session,
    loading,
    signOut,
    signIn,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
// src/utils/supabase/usercontext.tsx
"use client";
import React, { useEffect, useState, createContext } from "react";
import { Session } from "@supabase/supabase-js";
import { createClient } from "./client";
import { UserProfile } from "../db_types";

export interface SessionData {
  session: Session | null;
  userprofile: UserProfile | null;
}

export interface SessionContextType {
  sessionData: SessionData;
  setSessionData: React.Dispatch<React.SetStateAction<SessionData>>;
  isLoading: boolean;
}

export const SessionContext = createContext<SessionContextType>({
  sessionData: { session: null, userprofile: null },
  setSessionData: () => {},
  isLoading: true,
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [sessionData, setSessionData] = useState<SessionData>({
    session: null,
    userprofile: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      let userprofile = null;

      if (session?.user) {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (!error) {
          userprofile = data;
        }
      }

      setSessionData({ session, userprofile });
      setIsLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        getSession(); 
      } else {
        setSessionData({ session: null, userprofile: null });
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={{ sessionData, setSessionData, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
}

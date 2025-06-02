/**
 * @author: Joel Deon Dsouza
 * @description: This file contains the Provider component for managing user data in the application.
 * @version: 1.0.0
 * @date: 2025-06-02
 */

"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/services/Supabase";
import { UserContext } from "@/context/UserContext";

interface ProviderProps {
  children: React.ReactNode;
}

interface UserData {
  id: string;
  name: string | null;
  email: string;
  created_at?: string;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const { user, isLoaded } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  const createNewUser = useCallback(async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      return;
    }

    setLoading(true);
    try {
      const { data: existingUsers, error: selectError } = await supabase
        .from("Users")
        .select("*")
        .eq("email", user.primaryEmailAddress.emailAddress);

      if (selectError) {
        console.error("Error checking existing user:", selectError);
        return;
      }
      if (existingUsers && existingUsers.length === 0) {
        const { data: newUser, error: insertError } = await supabase
          .from("Users")
          .insert([
            {
              name: user.fullName || user.firstName || "Unknown",
              email: user.primaryEmailAddress.emailAddress,
            },
          ])
          .select()
          .single();

        if (insertError) {
          console.error("Error creating user:", insertError);
          return;
        }
        setUserData(newUser);
      } else {
        setUserData(existingUsers[0]);
      }
    } catch (error) {
      console.error("Unexpected error in createNewUser:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Effect to create a new user when the user is loaded and exists //
  useEffect(() => {
    if (isLoaded && user) {
      createNewUser();
    }
  }, [user, isLoaded, createNewUser]);

  return (
    <UserContext.Provider value={{ userData, loading, setUserData }}>
      <div className="w-full">{children}</div>
    </UserContext.Provider>
  );
};

export default Provider;
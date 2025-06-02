/**
 * @author: Joel Deon Dsouza
 * @description: This file containes the UserContext for managing user data in the application.
 * @version: 1.0.0
 * @date: 2025-06-02
 */

import { createContext } from 'react';
import { User } from '@clerk/nextjs/server';

interface UserData {
  id: string;
  name: string | null;
  email: string;
  created_at?: string;
}

interface UserContextType {
  userData?: UserData | null;
  user?: User | null;
  loading?: boolean;
  setUserData?: (userData: UserData | null) => void;
}

export const UserContext = createContext<UserContextType>({});

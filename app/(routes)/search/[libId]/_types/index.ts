/**
 * @author: Joel Deon Dsouza
 * @description: This file conatins types for GET AI Response.
 * @version: 1.0.0
 * @date: 2025-06-02
 */


export interface LibraryData {
  id: number;
  created_at: string;
  searchInput: string;
  userEmail: string;
  type: string;
  libId: string;
  aiResp?: string | null;
}

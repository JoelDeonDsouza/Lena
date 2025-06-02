/**
 * @author: Joel Deon Dsouza
 * @description: Sign-in page for the application using Clerk for authentication.
 * @version: 1.0.0
 * @date: 2025-06-02
 */

import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
}

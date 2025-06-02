/**
 * @author: Joel Deon Dsouza
 * @description: Component for the home page of the application, which includes the chat input component.
 * @version: 1.0.0
 * @date: 2025-06-02
 */

import ChatInput from './_components/ChatInput';

export default function Home() {
  return (
    <div className="w-full h-screen">
      <ChatInput />
    </div>
  );
}

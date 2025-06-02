/**
 * @author: Joel Deon Dsouza
 * @description: This is the Inngest client configuration for sending and receiving events.
 * @version: 1.0.0
 * @date: 2025-06-02
 */

import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "lena" });

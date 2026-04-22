import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
})

export const signIn = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "http://localhost:5173/resources",
  });
};

import { createAuthClient } from "better-auth/react"

const API_URL = import.meta.env.VITE_API_URL

export const authClient = createAuthClient({
  baseURL: API_URL,
})

export const signIn = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: `${window.location.origin}/resources`,
  });
};

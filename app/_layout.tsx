import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
// import { auth } from '../utils/FirebaseConfig'; // Use the same Firebase config as the auth store

import { auth } from '../utils/authConfig';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.replace("/auth");
      }
    });

    // Clean up subscription on unmount
    return unsubscribe;
  });

  return <>{children}</>;

}

export default function RootLayout() {
  return (
    <AuthGuard>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthGuard>
  )
}

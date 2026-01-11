import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";



// useSegments can be used to determine the current route segments

import { auth } from '../utils/FirebaseConfig';
import { useAuthStore } from "../utils/useStore";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const segments = useSegments();

  useEffect(() => {

    const isAuthRoute = segments[0] === "auth";

    // if (user && isAuthRoute) {
    //   router.replace("/");
    //   return;
    // } else if (!user && !isAuthRoute) {
    //   router.replace("/auth");
    //   return;
    // }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.replace("/auth");
      } else if (isAuthRoute && user) {
        router.replace("/");
      }
    });

    // Clean up subscription on unmount
    return unsubscribe;
  }, [segments, user]);

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

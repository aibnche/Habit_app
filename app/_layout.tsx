import { Stack, useRouter, useSegments, useRootNavigationState } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { auth } from '../utils/FirebaseConfig';
import { useAuthStore } from "../utils/store/useStore";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.user); // Assuming you have a setter
  
  // 1. Get the navigation state
  const rootNavigationState = useRootNavigationState();
  const [initialized, setInitialized] = useState(false);

  // Effect 1: Handle Firebase Auth Listener (Runs once)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      // Update your store/state here
      // setUser(currentUser); // Uncomment if you need to sync store
      setInitialized(true);
    });
    return unsubscribe;
  }, []);

  // Effect 2: Handle Navigation (Runs when user, segments, or nav state changes)
  useEffect(() => {
    // 2. CRITICAL: Wait for navigation to be ready and auth to be initialized
    if (!rootNavigationState?.key || !initialized) return;

    const isAuthRoute = segments[0] === "auth";

    if (user && isAuthRoute) {
      // User is logged in but on login page -> go home
      router.replace("/");
    } else if (!user && !isAuthRoute) {
      // User is not logged in but on home page -> go login
      router.replace("/auth");
    }
  }, [user, segments, initialized, rootNavigationState?.key]);

  // 3. Show a loading spinner while checking auth state
  // This prevents the "Stack" from mounting and rendering before we decide to redirect
  if (!initialized || !rootNavigationState?.key) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthGuard>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthGuard>
  );
}
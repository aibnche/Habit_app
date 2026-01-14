import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useAuthStore } from "../../utils/store/useStore";
import { getHabits } from "../../utils/services/habits.service";
import { useEffect } from "react";

export default function Index() {
  const { user } = useAuthStore();
  

  const fetchHabits = async () => {
    if (!user) return;
    try {
      await getHabits(user!.id as string);
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  }

  useEffect(() => {
    fetchHabits();
  }, [user]);

  return (
    <View style={styles.view}>
      <Text>Welcome to your Financial Management App!</Text>
      <Text>You are logged in and viewing the home screen.</Text>
      {user && user.email && (
        <Text style={styles.emailText}>Logged in as: {user.email}</Text>
      )}
      <Link href="/auth">Go to Login</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emailText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#1875e2",
  },
});

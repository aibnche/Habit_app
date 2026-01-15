import { Link } from "expo-router";
import { StyleSheet, Text, View, Button } from "react-native";
import { useAuthStore } from "../../utils/store/useStore";
import { getHabits } from "../../utils/services/habits.service";
import { useEffect, useState } from "react";
import { Habit } from "../../utils/types/types";
import { logout } from "@/utils/store/useStore";

export default function Index() {
  const { user } = useAuthStore();
  const [habits, setHabits] =  useState<Habit[]>([]);

  // const habits: Habit[] = [];  

  const fetchHabits = async () => {
    if (!user) return;
    try {
      const data = await getHabits(user!.id as string);
      // habits.push(...data as Habit[]);
      setHabits(data as Habit[]);
      console.log("Fetched habits:", habits);
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  }

  useEffect(() => {
    fetchHabits();
  }, [user]);

  return (
    <View style={styles.view}>
      <View>
        <Text variant="headlineSmall">Today's Habits</Text>
        <Button mode="text" onPress={()=> logout()} icon={"logout"}></Button>
      </View>

      {
        habits.length > 0 ? (
          habits.map((habit) => (
            <View key={habit.userId}>
              <Text>{habit.title}</Text>
            </View>
          ))
        ) : (
          <Text>No habits found.</Text> 
        )
      }
      {/* <Text>Welcome to your Financial Management App!</Text>
      <Text>You are logged in and viewing the home screen.</Text>
      {user && user.email ? (
        <Text style={styles.emailText}>Logged in as: {user.email}</Text>
      ) : null}
      {
        habits.length > 0 ? <Text>Your Habits: {habits[0].title}</Text> : <Text>No habits found.</Text>
      }
      <Link href="/auth">Go to Login</Link> */}
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

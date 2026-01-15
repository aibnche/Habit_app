import { Link } from "expo-router";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-paper";
import { useAuthStore } from "../../utils/store/useStore";
import { getHabits, updateHabit, deleteHabit } from "../../utils/services/habits.service";
import { useEffect, useState } from "react";
import { Habit } from "../../utils/types/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Surface } from "react-native-paper";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

export default function Index() {
  const { user, logout } = useAuthStore();
  const [habits, setHabits] =  useState<Habit[]>([]);

  // const habits: Habit[] = [];  

  // const fetchHabits = async () => {
  //   if (!user) return;
  //   try {
  //     const unsubscribe = await getHabits(user!.id as string, (data) => {
  //       setHabits(data as Habit[]);
  //     });
  //     // habits.push(...data as Habit[]);
  //     // setHabits(data as Habit[]);
  //     // console.log("Fetched habits:", habits);
  //   } catch (error) {
  //     console.error("Error fetching habits:", error);
  //   }
  //   return ()=> unsubscribe();
  // }

  useEffect(() => {
    if (!user) return;

    let unsubscribeFn: (() => void) | null = null;

    const setupListener = async () => {
      try {
        const unsubscribe = await getHabits(user.id, (data) => {
          setHabits(data as Habit[]);
          console.log("Realtime habits update:", data);
        });
        unsubscribeFn = unsubscribe;
      } catch (error) {
        console.error("Error setting up habits listener:", error);
      }
    };

    setupListener();

    return () => {
      if (unsubscribeFn) {
        unsubscribeFn(); // cleanup listener
      }
    };
  }, [user]);

  // Function to handle completing a habit
  const handleCompleteHabit = async (habit: Habit) => {
    try {
      // Update the habit with incremented streak count and completion status
      const updatedHabit = {
        ...habit,
        streak_count: (habit.streak_count || 0) + 1, // how many times user completed the habit
        completed: true,
        last_completed: new Date().toISOString()
      };

      await updateHabit(habit.id!, updatedHabit);
      console.log(`Habit "${habit.title}" marked as completed`);
    } catch (error) {
      console.error("Error completing habit:", error);
    }
  };

  // Function to handle deleting a habit
  const handleDeleteHabit = async (habit: Habit) => {
    try {
      await deleteHabit(habit.id!);
      console.log(`Habit "${habit.title}" deleted`);
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };
  
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>Today's Habits</Text>
        <Button mode="text" onPress={()=> logout()} icon={"logout"}>Logout</Button>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
      {
        habits.length > 0 ? (
          habits.map((habit) => (
            <Swipeable
              key={habit.id}
              renderLeftActions={(progress, dragX) => LeftAction(progress, dragX, () => handleCompleteHabit(habit))}
              renderRightActions={(progress, dragX) => RightAction(progress, dragX, () => handleDeleteHabit(habit))}
              friction={2}
              leftThreshold={40}
              rightThreshold={40}
            >
              <Surface style={[styles.card, habit.completed ? styles.cardCompleted : {}]} elevation={0}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{habit.title}</Text>
                  <Text style={styles.cardDescription}>{habit.description}</Text>

                  <View style={styles.streakBadge}>
                    <View style={styles.streakCon}>
                      <MaterialCommunityIcons name="fire" size={18} color={"#ff9800"}/> {" "}
                      <Text style={styles.streakText}>{habit.streak_count} days</Text>
                    </View>

                    <View style={styles.frequencyBadge}>
                      <Text style={styles.frequencyText}>{habit.frequency.charAt(0) + "" + habit.frequency.slice(1)}</Text>
                    </View>
                  </View>

                </View>
              </Surface>
            </Swipeable>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No habits found.</Text>
          </View>
        )
      }
      </ScrollView>
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontWeight: "bold",
  },

  card: {
    marginBottom: 18,
    borderRadius: 18,
    backgroundColor: "#f7f2fa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  cardCompleted: {
    opacity: 0.6,
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#22223b",
  },
  cardDescription: {
    fontSize: 15,
    marginBottom: 16,
    color: "#6c6c80",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streakBadge: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streakCon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff3e0",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  streakText: {
    marginLeft: 6,
    color: "#ff9800",
    fontWeight: "bold",
    fontSize: 14,
  },
  frequencyBadge: {
    backgroundColor: "#ede7f6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  frequencyText: {
    color: "#7c4dff",
    fontWeight: "bold",
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    color: "#666666",
  },

  // Swipe action styles
  swipeActionLeft: {
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
    backgroundColor: "#43a047",
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    paddingLeft: 16,
  },
  swipeActionRight: {
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    backgroundColor: "#e53935",
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    paddingRight: 16,
  },
});

// Right action for deleting habit
const RightAction = (progress, dragX, onDelete) => {
  return (
    <TouchableOpacity style={styles.swipeActionRight} onPress={onDelete}>
      <MaterialCommunityIcons name="trash-can" size={24} color="#ffffff" />
    </TouchableOpacity>
  );
};

// Left action for completing habit
const LeftAction = (progress, dragX, onComplete) => {
  return (
    <TouchableOpacity style={styles.swipeActionLeft} onPress={onComplete}>
      <MaterialCommunityIcons name="check" size={24} color="#ffffff" />
    </TouchableOpacity>
  );
};
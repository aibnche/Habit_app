import {useAuthStore} from "@/utils/store/useStore"
import { useRouter } from "expo-router";
import { useState, useReducer} from "react";
import { StyleSheet, View } from "react-native";
import { Button, SegmentedButtons, Text, TextInput, useTheme} from "react-native-paper";
import {addHabit} from "@/utils/services/habits.service"
import { State, Action } from "@/utils/types/types";

const FREQUENCIES = ["daily", "weekly", "monthly"];
// type Frequency = (typeof FREQUENCIES)[number];

// type State = {
//   title: string;
//   description: string;
//   frequency: Frequency;
// };

// type Action =
//   | { type: "SET_ALL"; payload: State }
//   | { type: "SET_FIELD"; field: keyof State; value: string };


const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_ALL":
      return { ...state, ...action.payload };
    case "SET_FIELD":
        return { ...state, [action.field]: action.value  }
    default:
      return state;
  }
}

const initialState: State = {
  title: "",
  description: "",
  frequency: "daily",
}


export default function AddHabitScreen() {
  // const [title, setTitle] = useState<string>("");
  // const [description, setDescription] = useState<string>("");
  // const [frequency, setFrequency] = useState<Frequency>("daily");


  const [error, setError] = useState<string>("");
  const { user }= useAuthStore()
  const router = useRouter();
  const theme = useTheme();

  const [state, dispatch] = useReducer(reducer, initialState)
  // handle change states


  const changeObject = (field: keyof State, value: string): Action => (
    { type: "SET_FIELD", field, value }
  )

  const handleSubmit = async () => {
    if (!user) {
      setError("You must be logged in to add a habit");
      return;
    }

    try {
      await addHabit(state, user.id);
      console.log("Habit added successfully, navigating back");
      router.back();
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      if (error instanceof Error) {
        setError(error.message);
        return;
      }
      setError("There was an error creating the habit");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Title"
        mode="outlined"
        onChangeText={(prev) => dispatch(changeObject("title", prev))}
        style={styles.input}
      />
      <TextInput
        label="Description"
        mode="outlined"

        onChangeText={(prev) => dispatch(changeObject("description", prev))}
        style={styles.input}
      />
      <View style={styles.frequencyContainer}>
        <SegmentedButtons
          value={state.frequency}
          onValueChange={(value) => dispatch(changeObject("frequency", value))}
          buttons={FREQUENCIES.map((freq) => ({
            value: freq,
            label: freq.charAt(0).toUpperCase() + freq.slice(1),
          }))}
        />
      </View>
      <Button
        mode="contained"
        onPress={handleSubmit}
        disabled={!state.title || !state.description}
      >
        Add Habit
      </Button>
      {error ? <Text style={{ color: theme.colors.error }}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },

  input: {
    marginBottom: 16,
  },

  frequencyContainer: {
    marginBottom: 24,
  },
});
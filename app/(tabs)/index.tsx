import { Text, View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "../../utils/useStore";

export default function Index() {
  const { user } = useAuthStore();

  return (
    <View style={styles.view}>
      <Text>Welcome to your Financial Management App!</Text>
      <Text>You are logged in and viewing the home screen.</Text>
      {user && user.email && (
        <Text style={styles.emailText}>Logged in as: {user.email}</Text>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  view : {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emailText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#1875e2",
  }
});
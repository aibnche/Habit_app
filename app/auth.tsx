import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { useAuthStore } from "../utils/useStore";
import { auth } from '../utils/FirebaseConfig'; // Import the Firebase auth instance

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPass] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const theme = useTheme();

  const { login, signup, loading ,error : erro_r, setError : setErro_r } = useAuthStore();

  // Function to test Firebase connection
  const testFirebaseConnection = async () => {
    try {
      console.log('Testing Firebase connection...');
      console.log('Auth state:', auth.currentUser ? 'Connected' : 'Not connected');
      console.log('Auth object:', auth);
      console.log('Current user:', auth.currentUser);
      alert('Firebase connection test: Auth object exists and is accessible');
    } catch (err) {
      console.error('Firebase connection test failed:', err);
      alert('Firebase connection test failed: ' + (err as Error).message);
    }
  };

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Fields must not be empty");
      return;
    }

    if (password.length < 6) {
      setError("Passwords must be at least 6 characters long.");
      return;
    }

    setError(null);
    try {
			if (isSignUp) {
        await signup(email, password);
        router.replace("/(tabs)");
      } else {
        await login(email, password);
        router.replace("/(tabs)");
      }
    } catch (err:any) {
			router.replace("/auth");
      setError((err as Error).message);
    }
  };

  const switchAuth = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* Authentication screen components*/}

      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">
          {isSignUp ? "Create Account" : "Log In"}
        </Text>

        <TextInput
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="email@domain.com"
          mode="outlined"
          value={email}
					onChange={() => setErro_r("")}
          onChangeText={setEmail}
        />
        <TextInput
          label="Password"
          autoCapitalize="none"
          secureTextEntry
          mode="outlined"
					onChange={() => setErro_r("")}
          value={password}
          onChangeText={setPass}
        />
        {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
        {erro_r && <Text style={{ color: theme.colors.error }}>{erro_r}</Text>}
        <Button mode="contained" onPress={handleAuth}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>

        <Button mode="text" onPress={switchAuth} disabled={loading}>
          {isSignUp
            ? "Already have an account ? Sign In"
            : "Don't have an account ? Sign Up"}
        </Button>

        {/* Test Firebase Connection Button */}
        <Button
          mode="outlined"
          onPress={testFirebaseConnection}
          style={styles.testButton}
        >
          Test Firebase Connection
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    gap: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 50,
    textAlign: "center",
  },
  switchModeButton: {
    marginTop: 16,
  },
  testButton: {
    marginTop: 10,
  }
});

export default AuthScreen;

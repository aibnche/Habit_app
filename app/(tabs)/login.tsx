import React from 'react'
import { useAuthStore } from '../../utils/useStore'
import { Button, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useRouter } from "expo-router";

const LoginTab = () => {
  const {logout} = useAuthStore();

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/auth");
    } catch (error) {
      console.log("Logout error:", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Login Tab</Text>
      <Button mode="contained" onPress={handleLogout}>Logout</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  }
});

export default LoginTab
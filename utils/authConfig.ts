// @ts-ignore
import { browserLocalPersistence, initializeAuth } from "firebase/auth";
import { app } from "./FirebaseConfig"; // Assuming you export 'app' from a base config

export const auth = initializeAuth(app, {
  persistence: browserLocalPersistence
});
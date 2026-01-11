import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { mmkvFirebaseStorage } from "./firebaseStorage";
import { app } from "./FirebaseConfig";

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(mmkvFirebaseStorage)
});
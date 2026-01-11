import { Platform } from 'react-native';
import { MMKV } from 'react-native-mmkv';

// Only instantiate MMKV if NOT on web and NOT in Expo Go
const isNative = Platform.OS !== 'web';
const storage = isNative ? new MMKV() : null;

export const mmkvFirebaseStorage = {
	setItem: async (key: string, value: string): Promise<void> => {
	  if (storage) {
		storage.set(key, value);
	  } else {
		localStorage.setItem(key, value); // Fallback for Web
	  }
	},

	getItem: async (key: string): Promise<string | null> => {
	  if (storage) {
		return storage.getString(key) ?? null;
	  }
	  return localStorage.getItem(key); // Fallback for Web
	},
	removeItem: async (key: string): Promise<void> => {
	  if (storage) {
		storage.delete(key);
	  } else {
		localStorage.removeItem(key); // Fallback for Web
	  }
	},
  };
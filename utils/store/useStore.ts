import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { create } from 'zustand';
import { auth } from '../FirebaseConfig';

type User = {
	id: string;
	name: string;
	email: string;
}

interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	loading: boolean;
	error: string | null;
	login: (email: string, password: string) => Promise<void>;
	signup: (email: string, password: string) => Promise<void>;
	logout: () => void;
	getUser: () => Promise<User | null>;
	// checkAuthStatus: () => void;
	setError: (error: string | null) => void;
  }

export const useAuthStore = create<AuthState>((set => ({
	isAuthenticated: false,
	user: null,
	token: null,
	loading: false,
	error: null,


	getUser: async () => {
		const firebaseUser = getAuth().currentUser; // Get current user directly from Firebase Auth
		if (firebaseUser) {
			return {
				id: firebaseUser.uid,
				name: firebaseUser.displayName || 'Anonymous',
				email: firebaseUser.email || ''
			};
		}
		return null;
	},
	
	setError: (error: string | null) => {
		set({error});
	},
	login: async (email : string, password: string) => {
		set({loading: true, error: null});
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			if (userCredential.user) {
				console.log('User credential user object:', userCredential.user);
				set({
					user: {
						id: userCredential.user.uid,
						name: userCredential.user.displayName || userCredential.user.email?.split('@')[0] || 'Anonymous',
						email: userCredential.user.email || ''
					},
					isAuthenticated: true,
					loading: false,
				});
			} else {
				console.log('No user found in userCredential');
				set({error: 'Login failed - no user object returned', loading: false});
			}
		} catch (error: any) {
			let errorMessage = 'An error occurred during login';
			if (error?.code) {
				switch (error.code) {
					case 'auth/user-not-found':
						errorMessage = 'No account found with this email';
						break;
					case 'auth/wrong-password':
						errorMessage = 'Incorrect password';
						break;
					case 'auth/invalid-email':
						errorMessage = 'Invalid email format';
						break;
					case 'auth/network-request-failed':
						errorMessage = 'Network error. Please check your connection.';
						break;
					default:
						errorMessage = error?.message || errorMessage;
				}
			}
			set({error: errorMessage, loading: false});
		}
	},

	signup: async (email : string, password: string) => {
		set({loading: true, error: null});
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);

			if (userCredential.user) {
				console.log('User credential user object:', userCredential.user);
				set({
					user: {
						id: userCredential.user.uid,
						name: userCredential.user.displayName || userCredential.user.email?.split('@')[0] || 'Anonymous',
						email: userCredential.user.email || ''
					},
					isAuthenticated: true,
					loading: false,
				});
			} else {
				console.log('Signup Failed - no user object returned');
				set({error: 'Signup Failed - no user object returned', loading: false});
			}
		} catch (error: any) {
			set({loading: false , isAuthenticated: false, user: null});
			let errorMessage = 'An error occurred during signup';
			if (error?.code) {
				switch (error.code) {
					case 'auth/email-already-in-use':
						errorMessage = 'This email is already registered';
						break;
					case 'auth/invalid-email':
						errorMessage = 'Invalid email format';
						break;
					case 'auth/weak-password':
						errorMessage = 'Password is too weak (minimum 6 characters)';
						break;
					case 'auth/network-request-failed':
						errorMessage = 'Network error. Please check your connection.';
						break;
					default:
						errorMessage = error?.message || errorMessage;
						
					}
				set({error: errorMessage, loading: false});
				throw Error(errorMessage);
			}
			set({error: errorMessage, loading: false});
		}
	},

	logout: async () => {
		try {
			await signOut(auth);
			set({
				user: null,
				isAuthenticated: false,
				token: null,
			});
		} catch (error) {
			console.log('Logout error: ********************');
			console.log(error);
			console.log('Logout error: ********************');
		}
	},

})));
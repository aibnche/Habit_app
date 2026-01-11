import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { create } from 'zustand';
import { auth } from './authConfig';

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
	// checkAuthStatus: () => void;
	setError: (error: string | null) => void;
  }


export const useAuthStore = create<AuthState>((set => ({
	isAuthenticated: false,
	user: null,
	token: null,
	loading: false,
	error: null,

	setError: (error: string | null) => {
		set({error});
	},
	login: async (email : string, password: string) => {
		set({loading: true, error: null});
		try {
			console.log('Attempting login with email:', email);
			console.log('About to call signInWithEmailAndPassword');
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			console.log('Successfully called signInWithEmailAndPassword, got userCredential:', userCredential);
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
			console.log('Login error occurred:', error);
			console.log('Error code:', error?.code);
			console.log('Error message:', error?.message);
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
			console.log('Attempting signup with email:', email);
			console.log('About to call createUserWithEmailAndPassword');
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			console.log('Successfully called createUserWithEmailAndPassword, got userCredential:', userCredential);

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
			console.log('Signup error occurred:', error);
			console.log('Error code:', error?.code);
			console.log('Error message:', error?.message);
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
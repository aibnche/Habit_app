import {db} from '../FirebaseConfig';
import { Habit as HabitType } from '../types/types';

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';

type Habit = HabitType & { id?: string };

// Omit it is used to exclude certain fields from the Habit type when adding a new habit
export const addHabit = async (habit: Omit<Habit, 'userId' | 'streak_count' | 'last_completed' | 'createdAt'>, userId: string) => {
  console.log("Adding habit for user:", userId);
  console.log("Habit data:", habit);

  const habitWithUser = {
    ...habit,
    userId,
    streak_count: 0,
    last_completed: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };

  console.log("Final habit object:", habitWithUser);

  try {
    const docRef = await addDoc(collection(db, 'habits'), habitWithUser);
    console.log("Document written with ID:", docRef.id);
    return { id: docRef.id, ...habitWithUser };
  } catch (error) {
    console.error("Error adding habit:", error);
    throw error;
  }
};

// onSnapshot it help to listen real-time updates
export const getHabits = async (userId: string, callback: (habits: (HabitType & { id: string })[]) => void) => {
  const q = query(collection(db, 'habits'), where('userId', '==', userId));
  return onSnapshot(q, (querySnapshot) => {
    const habits: (HabitType & { id: string })[] = [];
    querySnapshot.forEach((doc) => {
      habits.push({ id: doc.id, ...(doc.data() as HabitType) });
    });
    callback(habits);
  });
}

export const updateHabit = async (habitId: string, updatedData: Partial<HabitType>) => {
  const habitRef = doc(db, 'habits', habitId);
  await updateDoc(habitRef, updatedData);
};

export const deleteHabit = async (habitId: string) => {
  const habitRef = doc(db, 'habits', habitId);
  await deleteDoc(habitRef);
};

// export const getHabitById = async (habitId: string) => {
//   const habitRef = doc(db, 'habits', habitId);
//   const habitSnap = await getDocs(habitRef);
//   if (habitSnap.exists()) {
// 	return { id: habitSnap.id, ...(habitSnap.data() as Habit) };
//   } else {
// 	throw new Error('No such habit!');
//   }
// };


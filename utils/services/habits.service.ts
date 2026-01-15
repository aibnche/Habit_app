import {db} from '../FirebaseConfig';

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';

export interface Habit {
  id?: string;
  title: string;
  description: string;
  frequency: string;
  createdAt?: string;
}

export const addHabit = async (habit: Habit, userId: string) => {
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

export const getHabits = async (userId: string) => {
  const q = query(collection(db, 'habits'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const habits: Habit[] = [];
  querySnapshot.forEach((doc) => {

  habits.push({ id: doc.id, ...(doc.data() as Habit) });
  });
  return habits;
};

export const updateHabit = async (habitId: string, updatedData: Partial<Habit>) => {
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


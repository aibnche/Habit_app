


export const FREQUENCIES = ['daily', 'weekly', 'monthly', 'yearly'] as const;
type Frequency = (typeof FREQUENCIES)[number];

export type State = {
	title: string;
	description: string;
	frequency: Frequency;
};

export type Action =
  | { type: "SET_ALL"; payload: State }
  | { type: "SET_FIELD"; field: keyof State; value: string };


export interface Habit {
	userId: string;
	title: string;
	description: string;
	frequency: string;
	streak_count: number;
	last_completed: string;
	createdAt: string;
}

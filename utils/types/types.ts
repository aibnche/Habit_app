


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
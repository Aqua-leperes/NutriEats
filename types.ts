
export type Section = 'home' | 'nutrition' | 'tools' | 'profile' | 'explore' | 'contact' | 'login' | 'signup' | 'support' | 'privacy' | 'cookies';

export interface UserProfile {
  name: string;
  age: number;
  goal: 'lose' | 'maintain' | 'gain';
  highestScore: number;
}

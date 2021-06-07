import firebase from 'firebase';

export interface User extends Partial<firebase.auth.UserCredential & firebase.User> {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
}

export interface ApiError {
  code: string;
  message: string;
}

interface KeyValue {
  value: string | number;
  label: string;
}

export interface Summary {
  title: string;
  caloriesConsumed: KeyValue;
  caloriesTarget: KeyValue;
  caloriesPercent: KeyValue;
  yesterday: KeyValue;
  averageWeek: KeyValue;
}

export interface Meal {
  _id?: string;
  title: string;
  time: KeyValue;
  food: KeyValue;
  caloriesConsumed: KeyValue;
}

export interface Food {
  _id: string;
  Nome: string;
  Calorias: number;
  Quantidade: number;
}

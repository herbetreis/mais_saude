export interface User {
  id?: string;
  name: string;
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
  _id: string;
  user_id: string;
  tipo_refeicao: string;
  data_refeicao: string;
  hora_refeicao: string;
  alimentos: [Food];
}

export interface Food {
  Nome: string;
  Calorias: number;
  Quantidade: number;
}

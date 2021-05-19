import { Time } from "@angular/common";

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export interface Meal {
    id: number;
    name: string;
    date: Date;
    time: Time;
    foods: [Food];
  };

export interface Food {
  id: number;  
  name: string;
  quantity: number;
}

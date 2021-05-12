import { Component } from '@angular/core';

interface KeyValue {
  value: string | number;
  label: string;
}
interface DashboardData {
  title: string;
  caloriesConsumed: KeyValue;
  caloriesTarget: KeyValue;
  caloriesPercent: KeyValue;
  yesterday: KeyValue;
  averageWeek: KeyValue;
}
interface Meal {
  title: string;
  caloriesConsumed: KeyValue;
  time: KeyValue;
  foods: KeyValue;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public dashboardData: DashboardData = {
    title: 'Acompanhamento',
    caloriesConsumed: {
      value: '1347 Kcal',
      label: 'Kcal consumidas'
    },
    caloriesTarget: {
      value: '2500 Kcal',
      label: 'Meta Kcal'
    },
    caloriesPercent: {
      value: '53%',
      label: '% Kcal consumida'
    },
    yesterday: {
      value: '102,70%',
      label: 'Ontem'
    },
    averageWeek: {
      value: '97,30%',
      label: 'Média semana'
    }
  }

  public meals: Meal[] = [
    {
      title: 'Café da manhã 01/04',
      caloriesConsumed: {
        value: '1347 Kcal',
        label: 'Kcal consumidas'
      },
      time: {
        value: '08:15',
        label: 'Horário'
      },
      foods: {
        value: 'Café, pão, manteiga, ovos, morango',
        label: 'Alimentos consumidos'
      }
    }
  ]

  constructor() {}

}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface KeyValue {
  value: string | number;
  label: string;
}

interface Summary {
  title: string;
  caloriesConsumed: KeyValue;
  caloriesTarget: KeyValue;
  caloriesPercent: KeyValue;
  yesterday: KeyValue;
  averageWeek: KeyValue;
}

interface Meal {
  _id: string;
  user_id: string;
  tipo_refeicao: string;
  data_refeicao: string;
  hora_refeicao: string;
  alimentos: [Food];
}

interface Food {
  Nome : string;
  Calorias : number;
  Quantidade : number;
};

interface HomeWS {
  summary : Summary;
  meals   : Meal[];
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  public meals : Meal[];
  public dashboardData : Summary;

  constructor(private http: HttpClient, private router: Router) { }  

  private async getMeals () {
    const url = "https://maissaudews.azurewebsites.net/api/listar_refeicoes?code=N7DQG2DjirAOGVgixaZhRLYtH6sTp/KFNbyVGWe6Mv9zFZQS5G4SEA==";
    const body = {"user_id" : "1"}
    const result = await this.http.post<HomeWS>(url,body).toPromise();
    this.meals = result['meals']
    this.dashboardData = result['summary']
    
  }

  ngOnInit() {
    this.getMeals();

  }

}

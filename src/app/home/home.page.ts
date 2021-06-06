import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Summary, Meal } from '../typings/types';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  public meals: Meal[];
  public dashboardData: Summary = {
    title: '',
    caloriesConsumed: { value: 0, label: '' },
    caloriesTarget: { value: 0, label: '' },
    caloriesPercent: { value: 0, label: '' },
    yesterday: { value: 0, label: '' },
    averageWeek: { value: 0, label: '' }
  };

  constructor(private http: HttpClient, private authService: AuthService) { }

  private async getMeals() {
    const user = this.authService.getUser();
    if (user?.id) {
      const url = 'https://maissaudews.azurewebsites.net/api/listar_refeicoes?code=N7DQG2DjirAOGVgixaZhRLYtH6sTp/KFNbyVGWe6Mv9zFZQS5G4SEA==';
      const result = await this.http.post<{
        summary: Summary;
        meals: Meal[];
      }>(url, { 'user_id': user.id }).toPromise();
      this.meals = [...(result && Array.isArray(result.meals) ? result.meals : [])];
      this.dashboardData = { ...this.dashboardData, ...(result && typeof result.summary === 'object' ? result.summary : {} as Summary) };
    }
  }

  ngOnInit() {
    // noinspection JSIgnoredPromiseFromCall
    this.getMeals();
  }

}

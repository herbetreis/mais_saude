import { Component, OnInit } from '@angular/core';
// import {Food} from 'src/app/typings/types';

import {FoodList} from 'src/app/offline_data/data';
import {homeList} from 'src/app/offline_data/data';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Food {
  _id : string;
  Nome : string;
  Calorias : number;
};

interface UserFood {
  Nome : string;
  Calorias : number;
  Quantidade : number;
};

@Component({
  selector: 'app-new-meal',
  templateUrl: './new-meal.page.html',
  styleUrls: ['./new-meal.page.scss'],
})

export class NewMealPage implements OnInit {

  public allFoods : Food[];

  public selectedFoods = [];

  public userFoodlist : UserFood[];

  constructor(private http: HttpClient, private router: Router) { }  
  
  private async getFoods () {
    const url = "https://maissaudews.azurewebsites.net/api/listar_alimentos?code=779To5zyxi4pxMgPcCqaEOWms23tZFjPr7VtjyThdnCZVuiuX24fOA%3D%3D";
    const body = {}
    const result = await this.http.post<Food[]>(url,body).toPromise();
    this.allFoods = result
    
  }

  private async saveFoods (body) {
    const url = "https://maissaudews.azurewebsites.net/api/criar_refeicao?code=N7DQG2DjirAOGVgixaZhRLYtH6sTp/KFNbyVGWe6Mv9zFZQS5G4SEA==";
    this.http.post(url,body).toPromise();
    
  }

  public selecteditens() {
    
    const userFoodlist : UserFood[] = [];
    const allFoods : Food[] = this.allFoods;
    const selectedFoods = this.selectedFoods;

    allFoods.forEach(function (allFood) {
    
      selectedFoods.forEach(function (selectedFood) {

        if (selectedFood == allFood._id) {
          userFoodlist.push({Nome: allFood.Nome, Calorias: allFood.Calorias, Quantidade : 100})
        }

      })
      
    })

    this.userFoodlist = userFoodlist
  
  }

  public changeFoodQuantity(index, type) {

    if (type == 'add') {
      this.userFoodlist[index].Quantidade += 50;
    }
    if (type == 'sub' && this.userFoodlist[index].Quantidade >=50) {
      this.userFoodlist[index].Quantidade -= 50;
    }

  }

  public save(form) {

    this.userFoodlist.forEach(function (food) {
      food.Calorias = food.Quantidade / 100 * food.Calorias
    })

    const body = {
        "user_id" : "1",
        "tipo_refeicao" : form.value.MealName,
        "data_refeicao" : form.value.MealDate.substr(8,2) + '/' + form.value.MealDate.substr(5,2) + '/' + form.value.MealDate.substr(0,4),
        "hora_refeicao" : form.value.MealTime.substr(11,5),
        "alimentos" : this.userFoodlist
    }

    this.saveFoods(body)
    
    this.router.navigate(['/home'], {replaceUrl: true})
    
    
    
    // homeList.push(
      
    //   {
    //     title: form.value.MealName + ' ' + form.value.MealDate.substr(8,2) + '/' + form.value.MealDate.substr(5,2) + '/' + form.value.MealDate.substr(0,4) ,
    //     caloriesConsumed: {
    //       value: '1347 Kcal',
    //       label: 'Kcal consumidas'
    //     },
    //     time: {
    //       value: form.value.MealTime.substr(11,5),
    //       label: 'Horário'
    //     },
    //     foods: {
    //       value: foods,
    //       label: 'Alimentos consumidos'
    //     }
    //   }
    // )
    
  }

  

  ngOnInit() {
    this.getFoods();

  }

 

}

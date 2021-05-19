import { Component, OnInit } from '@angular/core';
import {Food} from 'src/app/typings/types';
import {FoodList} from 'src/app/offline_data/data';
import {homeList} from 'src/app/offline_data/data';


@Component({
  selector: 'app-new-meal',
  templateUrl: './new-meal.page.html',
  styleUrls: ['./new-meal.page.scss'],
})

export class NewMealPage implements OnInit {
  
  public foodList = FoodList;

  public foods: Food[] = []

  public selectedFoods = []

  public selecteditens() {

    const foods: Food[] = []
    
    this.selectedFoods.forEach(function (selectedFoodItem) {

      FoodList.forEach(function (foodListItem) {

        if (selectedFoodItem == foodListItem.id) {
          foods.push({id: foodListItem.id, name: foodListItem.name, quantity: 50})
        }

      })
      
    } 
    )

    this.foods = foods
  
  }

  public save(form) {

    var foods = ''

    this.foods.forEach(function (value) {
      foods = foods + ',' + value.name
    })

    homeList.push(
      
      {
        title: form.value.MealName + ' ' + form.value.MealDate.substr(8,2) + '/' + form.value.MealDate.substr(5,2) + '/' + form.value.MealDate.substr(0,4) ,
        caloriesConsumed: {
          value: '1347 Kcal',
          label: 'Kcal consumidas'
        },
        time: {
          value: form.value.MealTime.substr(11,5),
          label: 'Horário'
        },
        foods: {
          value: foods,
          label: 'Alimentos consumidos'
        }
      }
    )
    
  }

  constructor() { }

  ngOnInit() {

    console.log(this.selectedFoods);
    console.log(this.foodList)
  }

 

}

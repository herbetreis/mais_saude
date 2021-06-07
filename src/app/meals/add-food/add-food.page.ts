import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.page.html',
  styleUrls: ['./add-food.page.scss'],
})
export class AddFoodPage implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  public async save(form) {

   console.log(form)

    if (form.value.measureUnit == 2){
      form.value.weight *= 1000
    }

    const body = {
      'Nome': form.value.foodTitle,
      'Calorias': Math.round((100 * form.value.calories) / form.value.weight)
    };

    const url = 'https://maissaudews.azurewebsites.net/api/criar_alimento?code=N7DQG2DjirAOGVgixaZhRLYtH6sTp/KFNbyVGWe6Mv9zFZQS5G4SEA==';
    await this.http.post(url, body).toPromise();

    return this.router.navigate(['/home'], { replaceUrl: true });

  }

  ngOnInit() {
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe';
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RecipeService {

    baseUrl = 'http://vahren.fr:9090/assets/';

    recipes: Recipe[];

    constructor(private http: HttpClient) { }

    recipesFile(): Observable<Recipe[]> {
        if (!this.recipes) {
            return this.http.get<Recipe[]>(`${this.baseUrl}recipes.json`)
                .pipe(tap(r => this.recipes = r));
        } else {
            return of(this.recipes);
        }
    }

}
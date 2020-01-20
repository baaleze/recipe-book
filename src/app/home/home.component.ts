import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';

@Component({
    selector: 'Home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    baseUrl: string;

    recipesFiltered: Recipe[];

    constructor(private recipeService: RecipeService) {
        this.baseUrl = recipeService.baseUrl;
    }

    ngOnInit(): void {
        this.recipeService.recipesFile().subscribe(r => {
            this.recipesFiltered = r.filter(recipe => this.isFiltered(recipe));
        });
    }

    isFiltered(recipe: Recipe): boolean {
        return true;
    }
    
}



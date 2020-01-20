import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'Recipe',
    templateUrl: './recipe.component.html'
})
export class RecipeComponent implements OnInit {

    baseUrl: string;

    recipe: Recipe;

    constructor(private recipeService: RecipeService, private route: ActivatedRoute) {
        this.baseUrl = recipeService.baseUrl;
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(
            params => {
                this.recipeService.recipesFile().subscribe(r => {
                    this.recipe = r[+params.get('id')];
                });
            }
        );
    }
}



import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { knownFolders } from 'tns-core-modules/file-system';
import * as Toast from 'nativescript-toast';

@Component({
    selector: 'Home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    recipes: Recipe[];

    constructor(private http: HttpClient) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.http.get<Recipe[]>('http://vahren.fr:9090/assets/recipes.json').subscribe(
            r => this.reloadRecipesFile(r)
        );
    }

    reloadRecipesFile(recipes: Recipe[]) {
        this.recipes = recipes;
        // save the file
        const documents = knownFolders.documents();
        const file = documents.getFile('recipes.json');

        file.writeText(JSON.stringify(recipes))
            .then(result => {
                Toast.makeText('Updated recipe file').show();
            }).catch(err => {
                console.log(err);
            });
    }
}

export class Recipe {
    title: string;
    prepTime: string;
    cuisson: string;
    servings: number;
    ingredients: {name: string, qty: string}[];
    steps: string[];
    tags: string[];
}

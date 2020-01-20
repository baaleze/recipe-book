export class Recipe {
    title: string;
    img: string;
    prepTime: string;
    cuisson: string;
    servings: number;
    ingredients: {name: string, qty: string}[];
    steps: string[];
    tags: string[];
}
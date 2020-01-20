import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { RecipeComponent } from "./recipe.component";
import { RecipeService } from "./recipe.service";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
        NativeScriptHttpClientModule,
        NativeScriptFormsModule
    ],
    declarations: [
        HomeComponent,
        RecipeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        RecipeService
    ]
})
export class HomeModule { }

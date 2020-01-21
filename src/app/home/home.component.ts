import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { SearchBar } from "tns-core-modules/ui/search-bar";

@Component({
    selector: 'Home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit {

    baseUrl: string;

    filterTags: string[] = [];
    allTags: string[] = [];
    filterSearch: string = '';
    recipesFiltered: Recipe[];
    
    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
    @ViewChild(SearchBar, { static: false }) public searchBar: SearchBar;


    constructor(
        private recipeService: RecipeService,
        private _changeDetectionRef: ChangeDetectorRef) {
        this.baseUrl = recipeService.baseUrl;
    }

    ngOnInit(): void {
        this.refreshList();
    }

    ngAfterViewInit() {
        this._changeDetectionRef.detectChanges();
    }

    changeSearch(search: SearchBar) {
        this.filterSearch = search.text;
        this.refreshList();
    }

    checkTag(tag: string, checked: boolean) {
        if (checked) {
            this.filterTags.push(tag);
        } else {
            this.filterTags.splice(this.filterTags.indexOf(tag), 1);
        }
        this.refreshList();
    }

    clearSearchFocus(search: SearchBar) {
        setTimeout(()=>{
            search.dismissSoftInput();
            search.android.clearFocus();
           }, 10);
    }

    refreshList() {
        this.recipeService.recipesFile().subscribe(r => {
            this.recipesFiltered = r.filter(recipe => this.isFiltered(recipe));
            if (this.allTags.length === 0) {
                // generate tags
                r.forEach(recipe => {
                    recipe.tags.forEach(t => {
                        if (this.allTags.indexOf(t) === -1) {
                            this.allTags.push(t);
                        }
                    })
                });
            }
            this._changeDetectionRef.detectChanges();
        });
    }

    isFiltered(recipe: Recipe): boolean {
        const matchTags = this.filterTags.length === 0 || this.filterTags.some(tag => recipe.tags.indexOf(tag) !== -1);
        const matchSearch = this.filterSearch === '' || recipe.title.search(new RegExp(this.filterSearch, "gi")) !== -1;
        return matchSearch && matchTags;
    }
    
}



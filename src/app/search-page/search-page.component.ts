import { Component } from '@angular/core';
import { StackoverflowService } from '../services/stackoverflow.service';
import { Observable } from 'rxjs/Observable';

@Component({
 selector: 'search-page',
 templateUrl: `search-page.component.html`,
 styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {
    public searchStr: string = '';
    public response: Observable<any>;

    constructor(private stackoverflowService: StackoverflowService) {}
}
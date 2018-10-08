import { Component, ChangeDetectorRef } from '@angular/core';
import { StackoverflowService } from '../services/stackoverflow.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { QueryFunction } from '../questions-table/model/query-function';
import { slideInAnimation } from '../animations';

@Component({
 selector: 'search-result-page',
 templateUrl: `search-result-page.component.html`,
 styleUrls: ['./search-result-page.component.css'],
 animations: [slideInAnimation]
})
export class SearchResultPageComponent {
    public searchStr: string;
    public response: Observable<any>;
    public getQuestions: QueryFunction;

    constructor(private changeDetector: ChangeDetectorRef, private route: ActivatedRoute, private stackoverflowService: StackoverflowService) {
        this.getQuestions = this.getQuestionsInternal.bind(this);
    }

    private getQuestionsInternal(page: number, sortBy: string, sortDir: string) : Observable<any> {
        return this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.searchStr = params.get('id');
                this.changeDetector.detectChanges();
                return this.stackoverflowService.search(this.searchStr, page, sortBy, sortDir);
            })
          );
    }

    public getAnimationData(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
      }
}
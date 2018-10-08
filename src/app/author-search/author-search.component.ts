import { Component, ChangeDetectorRef } from '@angular/core';
import { StackoverflowService } from '../services/stackoverflow.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap, tap } from 'rxjs/operators';
import { QueryFunction } from '../questions-table/model/query-function';

@Component({
 selector: 'author-search',
 templateUrl: `author-search.component.html`,
 styleUrls: ['./author-search.component.css']
})
export class AuthorSearchComponent {
    public userName: string;
    public response: Observable<any>;
    public getQuestions: QueryFunction;

    constructor(private changeDetector: ChangeDetectorRef, private route: ActivatedRoute, private stackoverflowService: StackoverflowService) {
        this.getQuestions = this.getQuestionsInternal.bind(this);
    }

    private getQuestionsInternal(page: number, sortBy: string, sortDir: string) : Observable<any> {
        return this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                let userId = +params.get('id');
                return this.stackoverflowService.searchByAuthor(userId, page, sortBy, sortDir);
            }),
            tap(res => {
                this.userName = res.length == 0 ? "" : res[0].owner.display_name;
                this.changeDetector.detectChanges();
            })
          );
    }
}
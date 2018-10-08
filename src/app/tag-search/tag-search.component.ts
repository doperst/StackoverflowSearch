import { Component, ChangeDetectorRef } from '@angular/core';
import { StackoverflowService } from '../services/stackoverflow.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { QueryFunction } from '../questions-table/model/query-function';

@Component({
 selector: 'tag-search',
 templateUrl: `tag-search.component.html`,
 styleUrls: ['./tag-search.component.css']
})
export class TagSearchComponent {
    public tagId: string;
    public response: Observable<any>;
    public getQuestions: QueryFunction;

    constructor(private changeDetector: ChangeDetectorRef, private route: ActivatedRoute, private stackoverflowService: StackoverflowService) {
        this.getQuestions = this.getQuestionsInternal.bind(this);
    }

    private getQuestionsInternal(page: number, sortBy: string, sortDir: string) : Observable<any> {
        return this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.tagId = params.get('id');
                this.changeDetector.detectChanges();
                return this.stackoverflowService.searchByTag(this.tagId, page, sortBy, sortDir);
            })
          );
    }
}
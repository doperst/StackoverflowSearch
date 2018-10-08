import { Component } from '@angular/core';
import { StackoverflowService } from '../services/stackoverflow.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';

@Component({
 selector: 'answers-page',
 templateUrl: `answers-page.component.html`,
 styleUrls: ['./answers-page.component.css']
})
export class AnswersPageComponent {
    public response: Observable<any>;

    constructor(private route: ActivatedRoute, private stackoverflowService: StackoverflowService) {
        this.response = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                let questionId = +params.get('id');
                return this.stackoverflowService.getAnswers(questionId);
            })
          );
    }
}
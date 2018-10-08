import { Component, Input, OnInit } from '@angular/core';
import { SelectOption } from './model/select-option';
import { Observable } from 'rxjs';
import { QueryFunction } from './model/query-function';

@Component({
 selector: 'questions-table',
 templateUrl: `questions-table.component.html`,
 styleUrls: ['./questions-table.component.css']
})
export class QuestionsTableComponent implements OnInit {
    @Input() public allowSubNavigation: boolean = true;
    @Input() public queryFunction: QueryFunction;

    public questions: Observable<any>;
    public page: number = 1;

    public sortByOptions: SelectOption[] = [
        new SelectOption("Активность", "activity"),
        new SelectOption("Голоса", "votes"),
        new SelectOption("Дата создания", "creation"),
        new SelectOption("Релевантность", "relevance")
    ];

    public sortDirOptions: SelectOption[] = [
        new SelectOption("По убыванию", "desc"),
        new SelectOption("По возростанию", "asc")
    ];

    public selectedByOption = this.sortByOptions[0].Value;
    public selectedDirOption = this.sortDirOptions[0].Value;

    public ngOnInit() {
        this.getQuestions();
    }

    public nextPage() {
        ++this.page;
        this.getQuestions();
    }

    public previousPage() {
        --this.page;
        this.getQuestions();
    }

    public sortChanged() {
        this.page = 1;
        this.getQuestions();
    }

    private getQuestions() {
        this.questions = this.queryFunction(this.page, this.selectedByOption, this.selectedDirOption);
    }
}
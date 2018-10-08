import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class StackoverflowService {
    private readonly apiUrl = "https://api.stackexchange.com/2.2/";
    private readonly apiSearchUrl = `${this.apiUrl}search/advanced?site=stackoverflow`;

    constructor(private httpClient: HttpClient) {
    }
    
    public search(searchStr: string, page: number, sortBy: string, sortDir: string): Observable<any> {
        return this.httpClient.get<any>(`${this.apiSearchUrl}&title=${searchStr}&page=${page}&sort=${sortBy}&order=${sortDir}`).map(res => res.items);
    }

    public searchByAuthor(userId: number, page: number, sortBy: string, sortDir: string): Observable<any> {
        return this.httpClient.get<any>(`${this.apiSearchUrl}&user=${userId}&page=${page}&sort=${sortBy}&order=${sortDir}`).map(res => res.items);
    }

    public searchByTag(tagId: string, page: number, sortBy: string, sortDir: string): Observable<any> {
        return this.httpClient.get<any>(`${this.apiSearchUrl}&tagged=${tagId}&page=${page}&sort=${sortBy}&order=${sortDir}`).map(res => res.items);
    }

    public getAnswers(questionId: number): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}questions/${questionId}?order=desc&sort=activity&site=stackoverflow&filter=!-*jbN-o8P3E5`).map(res => res.items[0]);
    }
}
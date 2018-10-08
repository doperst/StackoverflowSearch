import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { StackoverflowService } from './services/stackoverflow.service';

import { SearchPageComponent } from './search-page/search-page.component';
import { SearchResultPageComponent } from './search-result-page/search-result-page.component';
import { QuestionsTableComponent } from './questions-table/questions-table.component';
import { AuthorSearchComponent } from './author-search/author-search.component';
import { TagSearchComponent } from './tag-search/tag-search.component';
import { AnswersPageComponent } from './answers-page/answers-page.component';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
bootstrap: [ AppComponent ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        AuthModule,
        AppRoutingModule
    ],
    declarations: [ 
        AppComponent,
        SearchPageComponent,
        SearchResultPageComponent,
        QuestionsTableComponent,
        AuthorSearchComponent,
        TagSearchComponent,
        AnswersPageComponent,
    ],
    providers: [StackoverflowService]
})
export class AppModule {
}
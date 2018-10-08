import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SearchPageComponent } from "./search-page/search-page.component";
import { SearchResultPageComponent } from "./search-result-page/search-result-page.component";
import { AuthorSearchComponent } from "./author-search/author-search.component";
import { TagSearchComponent } from "./tag-search/tag-search.component";
import { AnswersPageComponent } from "./answers-page/answers-page.component";
import { AuthGuard } from "./auth/auth.guard";

const appRoutes: Routes = [
  { path: 'search', component: SearchPageComponent, canActivate: [AuthGuard] },
  { 
      path: 'search-result/:id', 
      component: SearchResultPageComponent,
      canActivate: [AuthGuard],
      children: [
          {
              path: '',
              canActivateChild: [AuthGuard],
              children: [
                  {
                      path: 'author/:id',
                      component: AuthorSearchComponent,
                      data: { animation: 'author' }
                  },
                  {
                      path: 'tag/:id',
                      component: TagSearchComponent,
                      data: { animation: 'tag' }
                  }
              ]
          }
      ]
  },
  { path: 'answers/:id', component: AnswersPageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/search' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
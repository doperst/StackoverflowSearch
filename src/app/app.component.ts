import { Component } from '@angular/core';
import { StackoverflowService } from './services/stackoverflow.service';
import { Observable } from 'rxjs/Observable';

@Component({
 selector: 'my-app',
 templateUrl: `app.component.html`,
 styleUrls: ['./app.component.css']
})
export class AppComponent{
   public response: Observable<any>;

   constructor(private echoService: StackoverflowService) {}
}
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-2';
  urlPath:string = 'recipes'
  onNavigate(feature:string){
    this.urlPath = feature

  }
}

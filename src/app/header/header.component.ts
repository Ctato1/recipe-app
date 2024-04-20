import {Component} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService) {
  }

  onStoreRecipes() {
    this.dataStorageService.storeRecipes();
  }
}

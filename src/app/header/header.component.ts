import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  private userSub!:Subscription;
  constructor(private dataStorageService: DataStorageService,private authService: AuthService) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user
    })
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onStoreRecipes() {
    this.dataStorageService.storeRecipes();
  }

  onFetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
  onLogout(){
    this.authService.logout();
  }
}

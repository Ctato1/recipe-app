import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
// router
import {AppRoutingModule} from './app-routing.module';
import {StoreModule} from "@ngrx/store";
// components
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';

// directives

// services



import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";
import {ShoppingListReducer} from "./shopping-list/store/shopping-list.reducer";



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    // @ts-ignore
    StoreModule.forRoot({shoppingList:ShoppingListReducer}),
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}

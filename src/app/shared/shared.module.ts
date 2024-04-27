import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {DropdownDirective} from "./dropdown.directive";
import {AlertComponent} from "./alert/alert.component";
import {AuthCheckModule} from "./auth-check.module";

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    DropdownDirective,
    AlertComponent
  ],
  // AuthCheckModule if we want to add headers or params every request - I don't know
  imports: [CommonModule],
  exports: [
    LoadingSpinnerComponent,
    DropdownDirective,
    AlertComponent,
    CommonModule
  ]
})
export class SharedModule {

}

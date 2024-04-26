import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AuthResponseData, AuthService} from "./auth.service";


@Component({
  selector: 'app-auth',
  templateUrl: "./auth.component.html",

})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password)
    } else {
      authObs = this.authService.signup(email, password)
    }
    authObs.subscribe((resData) => {
      this.error = null;
      this.isLoading = false;
      this.router.navigate(['/recipes'])
    }, errorMessage => {
      this.isLoading = false;
      this.error = errorMessage;
      console.log(errorMessage)
    });

    form.reset();
  }
  onHandleError(){
    this.error = null;
  }
}

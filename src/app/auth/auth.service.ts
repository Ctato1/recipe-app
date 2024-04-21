import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, throwError} from "rxjs";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCXoNmmE1xQaGugAynzojezWA9eM8egQl8',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    ).pipe(catchError(errorRes => {
      let errorMessage = "Unknown error";
      console.log(errorRes)
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exist';
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'Something went wrong';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = 'Try later';
          break;
        case 'INVALID_EMAIL':
          errorMessage = 'Email is invalid';
          break;
        case 'WEAK_PASSWORD : Password should be at least 6 characters':
          errorMessage = 'Password should be at least 6 characters';
          break;

      }
      return throwError(errorMessage)
    }))
  }
}

import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {User} from "./user.model";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null)

  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCXoNmmE1xQaGugAynzojezWA9eM8egQl8',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }))
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCXoNmmE1xQaGugAynzojezWA9eM8egQl8',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }))
  }

  private handleAuthentication(email: string, localId: string, idToken: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, localId, idToken, expirationDate)
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage: string = "Unknown error"
    console.log(errorRes)
    // if (!errorRes.error || !errorRes.error.error) {
    //   return throwError(errorMessage);
    // }
    switch (errorRes.error.error.message) {
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Wrong credentials'
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Wrong password'
        break;
      case 'USER_DISABLED':
        errorMessage = 'You are blocked'
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
        errorMessage = 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
        break;
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
  }
}

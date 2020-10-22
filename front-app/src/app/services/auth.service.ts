import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiBackUrl

  private _user: any;
  private _authStatus$: BehaviorSubject<{ user: any, state: string, isConnected: boolean }> = new BehaviorSubject({ user: null, state: 'anonyme', isConnected: false })


  private _jwtToken: string
  public get jwtToken() {
    if (this._jwtToken == null) {
      return JSON.parse(sessionStorage.getItem('jwtToken'))
    }
    return this._jwtToken
  }

  public set jwtToken(token) {
    this._jwtToken = token
    sessionStorage.setItem('jwtToken', JSON.stringify(token))
  }



  constructor(
    private http: HttpClient
  ) { }


  initApp() {
    return new Observable(observer => {
      if (this.jwtToken) {
        return this.self().subscribe((res: any) => {
          if (res) {
            this._setConnected(res)
            observer.next()
          }
        }, err => {
          this.signOut()
          observer.next()
        })
      }
      observer.next()
    })


  }

  getUser() {
    return this._user
  }


  public login(email: string, password: string) {
    return this.http.post(this.apiUrl + '/auth/login', { email, password }).pipe(map((res: any) => {
      if (res.jwtToken) {
        this.jwtToken = res.jwtToken
        delete res.jwtToken
      }
      if (res.user) {
        this._setConnected(res.user)
        console.log("123", this.getAuthStatus().value.state)
      }
      return res
    }))
  }

  self() {
    return this.http.get(this.apiUrl + '/users')
  }


  private _setConnected(user) {
    if (this._authStatus$.value.state !== 'connected') {
      this._user = user
      this._authStatus$.next({ user, state: 'connected', isConnected: true })
    }
  }

  signOut() {
    sessionStorage.removeItem('jwtToken')
    this._authStatus$.next({ user: null, state: 'anonyme', isConnected: false })
  }

  getAuthStatus() {
    return this._authStatus$
  }

}

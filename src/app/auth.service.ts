import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authClient: boolean = false;
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(
    private router: Router,
    private http: HttpClient) {
  }
  async checkAuthenticated() {
    this.isAuthenticated.next(this.authClient);
    return this.authClient;
  }

  async login(username: string, password: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    var body = { "user": username, "pass": password }
    var data = await this.http.post<any>('http://localhost:3000/login', body, { headers: headers }).toPromise()
    if (!data.status) {
      throw Error('Error al iniciar sesión');
    }
    this.authClient = true;
    this.isAuthenticated.next(true);
    this.router.navigate(['notes'])


  }
  async logout(redirect: string) {
    try {
      this.authClient = false;
      this.isAuthenticated.next(false);
      this.router.navigate([redirect]);
    } catch (err) {
      console.error(err);
    }
  }
}
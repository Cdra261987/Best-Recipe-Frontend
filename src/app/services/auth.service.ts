import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLogged = new BehaviorSubject<boolean>(false);

  login(email: string, password: string): Observable<User | null> {
    const user = JSON.parse(localStorage.getItem('user') as string) as User;
    if (user.email === email && user.password === password) {
      this.isLogged.next(true);
      return of(user);
    } else return of(null);
  }

  register(user: User): Observable<void> {
    this.isLogged.next(true);
    return of(localStorage.setItem('user', JSON.stringify(user))); //Save user in localStorage
  }

  registerAdmin(user: User): Observable<void> {
    return of(localStorage.setItem('admin', JSON.stringify(user))); //Save user in localStorage
  }
}

import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   isUserLoggedIn: boolean = false;

   login(userName: string, password: string) {
    this.isUserLoggedIn = userName === 'admin@eventsbooking.com' && password === 'eventsbookingadmin';
    localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false"); 

    return of(this.isUserLoggedIn).pipe(
      delay(1000),
      tap(val => { 
        console.log("Is User Authentication is successful: " + val); 
      })
    );
   }

   logout(): void {
    this.isUserLoggedIn = false;
    localStorage.removeItem('isUserLoggedIn'); 
   }

   constructor() { }
}
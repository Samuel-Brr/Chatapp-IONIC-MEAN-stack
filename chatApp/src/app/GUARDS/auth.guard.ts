import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { ApiService } from '../SERVICES/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {


  constructor(private router: Router, private api: ApiService){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


     return this.checkAuth();

  }

  checkAuth(){
    return this.api.checkUserSession()
    .pipe(
      map(res => res? true: this.router.parseUrl('/connexion'))
    );
  }
}

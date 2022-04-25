import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../SERVICES/api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  constructor(private api: ApiService, private router: Router){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.checkAdmin();

    }


    checkAdmin(){
     if(this.api.getUser() === '626682f4fa8b7172b8fe5eac'){
       return true;
     }else {return this.router.navigate(['/registration']);}
   }


}

/* eslint-disable radix */
/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class AuthService {

  constructor() { }

//   {
//     "headers": {
//         "normalizedNames": {},
//         "lazyUpdate": null
//     },
//     "status": 200,
//     "statusText": "OK",
//     "url": "http://localhost:3000/chats/connexion",
//     "ok": true,
//     "type": 4,
//     "body": {
//         "success": true,
//         "accesToken": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjY0MmIzMDRjMTA3NjRjZWE1ZTVjYzEiLCJpYXQiOjE2NTA3NjM0Nzc3NzUsImV4cCI6MTY1MDc2MzU2NDE3NX0.p-qBhTHdUc6IsC5KjSAAn_Bv_iMdeDwbWVtLWQE5vHRHD_i7CoS6uzKym5eGuU5lUexzzRV9PriwMtcwN6sAbBsnlWYcCu51TBq8DK3xaDzcTGW4TZdymzNnzjUjMo6lVDLX4BjwPGAt159fTKkuxgytIhZh6YglG6TUnNjRN1Uk-k0rzuvORO18Ad4QCyaBxIMejCqFqNPwxHwt_Mirq_wOrIQo6ssouu76Fe0SHAEIpLIECoc3mpNsdHGz6MVByp9FF2SjtxzS8yfSYhMAnujEiqeyOjOGJflmKZMTO-wPEvho6f8jF33V2JfDmngPCCPKYaZnIBWH3iHySFL4xhRKvmG4Zt74eVbqK07hfUdvaB0il377YuJvC9JeMv-_Afp_zTOwdZVVJQ8rTEZ5MvNls1aSEm1DTlyH2XOG8ekV2H5WWDBkj72zIo-lsDqCp7owIxlcQ8g1iMe1LubhW9Rhvc7sQIks10a4T1vem4fytCtiuxr6UXYH8fWsUXdFWssrw8ZVeq8_L7uroo2j66K6w_gAGMuhD_PUWOJBJfwuc5NloI26EbJ6qLYUxGCnhrO22cIXxHnMOLTEfGHaH_zGU6flTJF-Gy-2Eu1aB-U7air-bDUZJQd8lV44LxB_TJvN8DoC1Ic55yFeHl0UwHF9pIdw2Yj4djzOnYSxr2A",
//         "expiresIn": "1d"
//     }
// }

setLocalStorage(responseObj) {

  // Adds the expiration time defined on the JWT to the current moment
  const expiresAt = moment().add(Number.parseInt(responseObj.body.expiresIn), 'days');

  localStorage.setItem('user_id', responseObj.body.user_id);
  localStorage.setItem('id_token', responseObj.body.accesToken);
  localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
}

logout() {
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
  localStorage.removeItem('user');
  localStorage.removeItem('user_id');
}

public isLoggedIn() {
  return moment().isBefore(this.getExpiration(), 'second');
}

isLoggedOut() {
  return !this.isLoggedIn();
}

getExpiration() {
  const expiration = localStorage.getItem('expires_at');
  if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  } else {
      return moment();
  }
}

}

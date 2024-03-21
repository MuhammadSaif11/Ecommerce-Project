import { inject } from '@angular/core';
import { UserAuthService } from '../shared/services/user-auth.service';
import { UserService } from '../shared/services/user.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

export const canActivate = (route:ActivatedRouteSnapshot) => {
  const userAuthService: UserAuthService = inject(UserAuthService);
  const userService: UserService = inject(UserService);
  const router: Router = inject(Router);
  if (userAuthService.getToken() != null) {
    let roles:string[] = route.data['roles'];
    if (roles != null && roles.length > 0) {
      const match = userService.isMatch(roles);
      if (match) {
        return true;
      }else{
        router.navigate(['/forbidden']);
        return false;
      }
    } else {
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};

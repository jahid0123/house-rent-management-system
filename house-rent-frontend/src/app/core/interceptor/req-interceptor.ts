import { HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "../service/auth/auth.service";
import { inject } from "@angular/core";


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Skip adding Authorization header for login and register endpoints
  const isAuthRequest =
    req.url.includes('/api/auth/login') || req.url.includes('/api/auth/register') || req.url.includes('/api/user/all/posted/property');

  if (isAuthRequest) {
    return next(req);
  }

  // Get token from AuthService
  const token = localStorage.getItem('token');

  // Add Authorization header if token exists
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  // Proceed without modification if no token
  return next(req);
};

// export interface ReqInterceptor {
// }

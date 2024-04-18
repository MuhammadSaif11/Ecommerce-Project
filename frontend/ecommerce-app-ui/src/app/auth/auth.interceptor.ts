import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { UserAuthService } from "../shared/services/user-auth.service";
import { inject } from "@angular/core";
import { Router } from "@angular/router";

export class AuthInterceptor implements HttpInterceptor{
    private userAuthService:UserAuthService = inject(UserAuthService);
    private router:Router = inject(Router);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.headers.get("No-Auth") === "True"){
            return next.handle(req.clone());
        }

        const token = this.userAuthService.getToken();
        const modifiedReq = this.addToken(req,token);
        return next.handle(modifiedReq).pipe(
            catchError((err:HttpErrorResponse) =>{
                console.log(err.status)
                if (err.status === 401 || err.error.message === 'JWT TOKEN EXPIRED') {
                    this.userAuthService.clear()
                    this.router.navigate(['/login']);
                }
                else if (err.status === 403) {
                    this.router.navigate(['/forbidden']);
                }
                console.log(err)
                return throwError(() => new Error("something went wrong"));
            }
        ));
    }

    private addToken = (req: HttpRequest<any>,token:string) => {
        return req.clone({
            setHeaders: {
                Authorization:`Bearer ${token}`
            }
        })
    }
    
}
import { Role } from "./Role.model";



export class JwtToken {
    public get roles(): Role[] {
        return this._roles;
    }
    public set roles(value: Role[]) {
        this._roles = value;
    }
    public get lastname(): string {
        return this._lastname;
    }
    public set lastname(value: string) {
        this._lastname = value;
    }
    public get firstname(): string {
        return this._firstname;
    }
    public set firstname(value: string) {
        this._firstname = value;
    }
    public get token(): string {
        return this._token;
    }
    public set token(value: string) {
        this._token = value;
    }

    constructor(private _token: string, private _firstname: string,
        private _lastname: string,private _roles: Role[]){
    }
}
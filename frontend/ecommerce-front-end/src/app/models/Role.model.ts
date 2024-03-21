export class Role{
    public get roleDescription(): string {
        return this._roleDescription;
    }
    public set roleDescription(value: string) {
        this._roleDescription = value;
    }
    public get roleName(): string {
        return this._roleName;
    }
    public set roleName(value: string) {
        this._roleName = value;
    }
    constructor(private _roleName: string,private _roleDescription: string){}

}
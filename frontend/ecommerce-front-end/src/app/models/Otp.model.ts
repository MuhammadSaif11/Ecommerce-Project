export class Otp{
    public get setCode(): string {
        return this.code;
    }
    public set setCode(value: string) {
        this.code = value;
    }
    public get getEmail(): string {
        return this.email;
    }
    public set setEmail(value: string) {
        this.email = value;
    }
    constructor(private email?: string, private code?: string) {}

}
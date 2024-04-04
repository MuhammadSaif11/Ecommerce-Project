export class CustomError{
    public get message(): string {
        return this._message;
    }
    public set message(value: string) {
        this._message = value;
    }
    public get status(): number {
        return this._status;
    }
    public set status(value: number) {
        this._status = value;
    }
    public get timestamp(): number {
        return this._timestamp;
    }
    public set timestamp(value: number) {
        this._timestamp = value;
    }
    constructor(private _message: string, private _status: number, private _timestamp: number){}
}
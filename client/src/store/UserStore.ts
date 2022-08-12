import {makeAutoObservable} from "mobx";
import {IDevice} from "./DeviceStore";

export interface IUser {
    email: string,
    exp: number,
    iat: number,
    id:number,
    role: string,
}

export default class UserStore {
    private _isAuth: boolean;
    private _user: IUser;
    private _basket: IDevice[];

    constructor() {
        this._isAuth = false;
        this._user = {} as IUser;
        this._basket = [];
        makeAutoObservable(this)
    }

    setIsAuth(bool: boolean): void {
        this._isAuth = bool;
    }

    setUser(user: IUser): void {
        this._user = user;
    }

    addToBasket(device: IDevice): void {
        this._basket.push(device);
    }

    removeFromBasket(id: number): void {
        this._basket = this._basket.filter(device => device.id !== id);
    }

    setBasket(basket: IDevice[]):void {
        this._basket = basket;
    }

    get isAuth(): boolean {
        return this._isAuth;
    }

    get isAdmin(): boolean {
        return this._user.role === 'ADMIN';
    }

    get user(): object {
        return this._user;
    }

    get basket(): IDevice[] {
        return this._basket;
    }
}
import {$host, $authHost} from "./index";
import jwtDecode from "jwt-decode";
import {IUser} from '../store/UserStore';


interface IRegistration {
    (
        email: string,
        password: string
    ): Promise<IUser>
}

interface ILogin extends IRegistration {};

export const registration: IRegistration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'});
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const login: ILogin = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password});
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}
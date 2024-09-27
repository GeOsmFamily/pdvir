import type { SignInValues, SignUpValues } from "@/models/interfaces/auth/AuthenticationsValues";
import { useUserStore } from "@/stores/userStore";
import axios, { type AxiosResponse } from "axios";


export class AuthenticationService {
    static async signIn(values: SignInValues): Promise<AxiosResponse> {
        return axios.post('https://puc.local/auth', JSON.stringify(values), {
            headers: { 'Content-Type': 'application/json' }
        })
    }

    static async signUp(values: SignUpValues): Promise<AxiosResponse> {
        return axios.post('https://puc.local/api/users', JSON.stringify(values), { headers: { 'Content-Type': 'application/ld+json' } })
    }
}
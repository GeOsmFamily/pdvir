import type { SignInValues, SignUpValues } from "@/models/interfaces/auth/AuthenticationsValues";
import { useUserStore } from "@/stores/userStore";
import axios, { type AxiosResponse } from "axios";


export class AuthenticationService {
    static async signIn(values: SignInValues): Promise<AxiosResponse> {
        return axios.post('https://api.puc.local/auth', JSON.stringify(values), {headers: {'Content-Type': 'application/json'}})
    }

    static async signUp(values: SignUpValues): Promise<AxiosResponse> {
        return axios.post('https://api.puc.local/api/users', JSON.stringify(values), {headers: {'Content-Type': 'application/ld+json'}})
    }

    static async getAuthenticatedUser(token: string): Promise<AxiosResponse> {
        return axios.get('https://api.puc.local/api/users/me', { headers:  {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/ld+json'
          }
        })
    }
}
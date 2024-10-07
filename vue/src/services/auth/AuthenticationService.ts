import type { SignInValues, SignUpValues } from "@/models/interfaces/auth/AuthenticationsValues";
import type { User } from "@/models/interfaces/auth/User";
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

    static async getAuthenticatedUser(): Promise<AxiosResponse<User>> {
        return axios.get('https://puc.local/api/users/me', { headers:  {'accept': 'application/ld+json'}})
    }

    static async patchUser(values: Partial<User>, userID: number): Promise<AxiosResponse> {
        return axios.patch(`https://puc.local/api/users/${userID}`, JSON.stringify(values), { headers: { 'Content-Type': 'application/merge-patch+json' } })
    }
}
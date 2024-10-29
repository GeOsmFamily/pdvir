import type { SignInValues, SignUpValues } from "@/models/interfaces/auth/AuthenticationsValues";
import type { User } from "@/models/interfaces/auth/User";
import { apiClient } from '@/assets/plugins/axios'
import type { AxiosResponse } from "axios";


export class AuthenticationService {
    static async signIn(values: SignInValues): Promise<AxiosResponse> {
        return apiClient.post('/auth', JSON.stringify(values), {
            headers: { 'Content-Type': 'application/json' }
        })
    }

    static async signUp(values: SignUpValues): Promise<AxiosResponse> {
        return apiClient.post('/api/users', JSON.stringify(values), { headers: { 'Content-Type': 'application/ld+json' } })
    }

    static async createUser(values: Partial<User>): Promise<AxiosResponse> {
        return apiClient.post('/api/users', JSON.stringify(values), { headers: { 'Content-Type': 'application/ld+json' } })
    }

    static async getAuthenticatedUser(): Promise<AxiosResponse<User>> {
        return apiClient.get('/api/users/me', { headers:  {'accept': 'application/ld+json'}})
    }

    static async patchUser(values: Partial<User>, userID: number): Promise<AxiosResponse> {
        return apiClient.patch(`/api/users/${userID}`, JSON.stringify(values), { headers: { 'Content-Type': 'application/merge-patch+json' } })
    }
}

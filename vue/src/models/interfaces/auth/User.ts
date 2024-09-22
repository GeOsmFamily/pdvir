import type { UserRoles } from "@/models/enums/auth/UserRoles"

export interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    roles: UserRoles[]
    requestedRoles: UserRoles[]
    isValidated: boolean
}
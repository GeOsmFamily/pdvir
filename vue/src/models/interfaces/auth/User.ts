import type { UserRoles } from "@/models/enums/auth/UserRoles"

export interface User {
    id: number
    firstName: string
    lastName: string
    organisation: string
    position: string
    phoneNumber: string
    email: string
    roles: UserRoles[]
    requestedRoles: UserRoles[]
    isValidated: boolean
}
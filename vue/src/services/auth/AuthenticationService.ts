import { useUserStore } from "@/stores/userStore";
import axios from "axios";


export class AuthenticationService {
    static async signIn(values: any) {
        try {
            const result = await axios.post('https://api.puc.local/auth', JSON.stringify(values), {headers: {'Content-Type': 'application/json'}})
            if (result.status === 200) useUserStore().signInSuccess()
            else useUserStore().errorWhileSignInOrSignUp = true
        } catch (error) {
            console.log(error)//TODO: Send to Sentry
            useUserStore().errorWhileSignInOrSignUp = true
        }      

        console.log(document.cookie.split("; "))
    }

    static async signUp(values: any) {
        const data = JSON.stringify({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            plainPassword: values.password
        })
        try {
            const result = await axios.post('https://api.puc.local/api/users', data, {headers: {'Content-Type': 'application/ld+json'}})
            if (result.status === 201) {
                useUserStore().signUpSuccess()
            }
        } catch (error) {
            if ((error as any).status === 409) {
                useUserStore().errorWhileSignInOrSignUp = true
                alert("Cet email est déjà utilisé")
            }
            console.log(error)//TODO: Send to Sentry
        }
        
        // else {
        //     if (result.status === 409) {
        //         useUserStore().errorWhileSignInOrSignUp = true
        //         alert("Cet email est déjà utilisé")
        //     }
        //     alert("Error in registration")
        // }
    }
}
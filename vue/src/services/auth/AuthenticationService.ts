export class AuthenticationService {
    static signIn(values: any) {
        fetch('https://api.puc.local/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(response => {
          console.log(response)
          console.log(response.headers.getSetCookie());
            if (!response.ok) {
                throw new Error('Auth failed');
            }
            if (response.status === 204) {
                return "Login Success";
            }
            return response.json(); 
        })
        .then(data => {
            console.log('Result:', data);
            console.log(document.cookie.split("; "))
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}
import { makeRequest } from "@/service/api/requestMaker"
import ApiUrls from "@/service/api/urls"

class AuthService{
    static async signupUser(email, username, password){
        try{
            const response = await makeRequest(ApiUrls.signup, {
                body: {
                    'email': email,
                    'username': username,
                    'password': password
                }
            })

            localStorage.setItem('userIdHash', response.user_id_hash)
            localStorage.setItem('token', response.token)
            localStorage.setItem('isAdmin', response.is_admin)
            localStorage.setItem('detailsExist', response.details_exist)

            return { success: true, message: "Signup successful" };
        }
        catch (e) {
            return { success: false, message: e };
        }
    }

    static async loginUser(username, password){
        try {
            const response = await makeRequest(ApiUrls.login, {
                body: {
                    'username': username,
                    'password': password
                }
            })

            localStorage.setItem('userIdHash', response.user_id_hash)
            localStorage.setItem('token', response.token)
            localStorage.setItem('isAdmin', response.is_admin)
            localStorage.setItem('detailsExist', response.details_exist)

            return { success: true, message: "Login successful" };
        }
        catch (e) {
            return { success: false, message: e };
        }
    }


    
}

export default AuthService;
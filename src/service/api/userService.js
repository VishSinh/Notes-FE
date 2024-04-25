import { makeRequest } from '@/service/api/requestMaker';
import ApiUrls from '@/service/api/urls'

class UserService {
    static async getOwnDetails() {
        try {
            const response = await makeRequest(ApiUrls.getOwnDetails, {})

            return { success: true, message: response };
        }
        catch (e) {
            return { success: false, message: e };
        }
    }

    static async getUserDetails(toFindUserIdHash) {
        try {
            const response = await makeRequest(ApiUrls.getOwnDetails, { body: { 'to_find_user_id_hash': toFindUserIdHash } })

            return { success: true, message: response };
        }
        catch (e) {
            return { success: false, message: e };
        }
    }

    static async saveUserDetails(name, age, bio) {
        try {
            const response = await makeRequest(ApiUrls.saveUserDetails, {
                body: {
                    'name': name,
                    'age': age,
                    'bio': bio
                }
            })

            

            localStorage.setItem("detailsExist", "true");

            return { success: true, message: "User details saved successfully" };
        }
        catch (e) {
            return { success: false, message: e };
        }
    }

    static async promoteUser(toPromoteUserIdHash) {
        try {
            console.log("Promoting user with id hash: " + toPromoteUserIdHash)
            const response = await makeRequest(ApiUrls.promoteUser, { body: { 'to_promote_user_id_hash': toPromoteUserIdHash } })

            return { success: true, message: response };
        }
        catch (e) {
            return { success: false, message: e };
        }
    }

    static async fetchActivityLogs() {
        try {
            const response = await makeRequest(ApiUrls.fetchActivityLogs, {})

            return { success: true, message: response.activities };
        }
        catch (e) {
            return { success: false, message: e };
        }
    }
}

export default UserService;
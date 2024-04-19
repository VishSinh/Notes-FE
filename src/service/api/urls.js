const url = 'http://localhost:8080/api';

class ApiUrls {
    // Auth
    static get signup() { return `${url}/auth/signup`; }
    static get login() { return `${url}/auth/login`; }

    // User
    static get saveUserDetails() { return `${url}/user/details/save`; }
    static get getOwnDetails() { return `${url}/user/details/get`; }
    static get promoteUser() { return `${url}/user/promote`; }
    static get fetchActivityLogs() { return `${url}/user/logs`; }

    // Notes
    static get fetchNotes() { return `${url}/notes/fetch`; }
    static get fetchOwnNotes() { return `${url}/notes/fetch/own`; }
    static get createNote() { return `${url}/notes/create`; }
    static get deleteNote() { return `${url}/notes/delete`; }
    static get editNote() { return `${url}/notes/edit`; }
}

export default ApiUrls;

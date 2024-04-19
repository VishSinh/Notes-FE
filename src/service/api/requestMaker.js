export const makeRequest = async (url, { body, ...options } = {}) => {
    try {
        const token = localStorage.getItem('token');
        const userIdHash = localStorage.getItem('userIdHash');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        };

        const jsonBody = JSON.stringify({ ...body, 'user_id_hash': userIdHash });

        const requestOptions = {
            ...options,
            method: 'POST',
            headers: {
                ...options.headers,
                ...headers
            },
            body: jsonBody
        };

        const response = await fetch(url, requestOptions);
        const parsedResponse = await response.json();
        
        console.log({
            'url': url,
            'res': parsedResponse,
            'req': jsonBody,
        });

        if (!parsedResponse.success) {
            throw new Error(parsedResponse.message);
        }

        return parsedResponse.data;
    }
    catch (e) {
        alert(e);
        console.error(e);
        throw new Error(e);
    }
};

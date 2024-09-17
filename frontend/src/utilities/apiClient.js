import axios from 'axios';

const removeSuffixSlash = (endpoint) => {
    if (endpoint.endsWith('/')){
        endpoint = endpoint.slice(-1);
    }
    return endpoint;
}

const removePrefixSlash = (endpoint) => {
    if (endpoint.startsWith('/')){
        endpoint = endpoint.slice(1);
    }
    return endpoint;
}
class RunningAPI {

    constructor() {
        this.token = localStorage.getItem('token');
        this.base_url = 'http://localhost:8000/api';
    }

    async getData(endpoint) {
        endpoint = removeSuffixSlash(endpoint);
        endpoint = removePrefixSlash(endpoint);
        var response;
        try {
            response = await  axios.get(`${this.base_url}/${endpoint}`, {
                headers: { 'Authorization': `Token ${this.token}` }
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return null;
            } else {
                return null;
            }
        }
    }
    
}

export default RunningAPI;

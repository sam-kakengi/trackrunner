import axios from 'axios';

/**
 * removeSuffixSlash removes the suffix slash from the endpoint
 * @param {string} endpoint The endpoint to remove the suffix slash from
 * @returns {string} The endpoint without the suffix slash
 * */
const removeSuffixSlash = (endpoint) => {
    if (endpoint.endsWith('/')){
        endpoint = endpoint.slice(-1);
    }
    return endpoint;
}

/**
 * removePrefixSlash removes the prefix slash from the endpoint
 * @param {string} endpoint The endpoint to remove the prefix slash from
 * @returns {string} The endpoint without the prefix slash
 **/
const removePrefixSlash = (endpoint) => {
    if (endpoint.startsWith('/')){
        endpoint = endpoint.slice(1);
    }
    return endpoint;
}
class RunningAPI {

    constructor() {
        this.token = localStorage.getItem('token');
        this.base_url = 'http://127.0.0.1:8000/api';
    }

    /**
     * sendRequest sends a request to the API
     * @param {string} method The method of the request
     * @param {string} endpoint The endpoint to send the request to
     * @param {JSON} data The data to send with the request
     * @returns {JSON} The data from the API
     **/
    async sendRequest(method, endpoint, data = null) {
        endpoint = removePrefixSlash(endpoint);
        endpoint = removeSuffixSlash(endpoint);
        try {
            const response = await axios({
                method: method,
                url: `${this.base_url}/${endpoint}`,
                headers: { 'Authorization': `Token ${this.token}` },
                data: data
            });
            if (response.status >= 200 && response.status < 300) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }
    /**
     * getData fetches data from the API
     * @param {string} endpoint The endpoint to fetch data from
     * @returns {JSON} The data from the API
     */
    async getData(endpoint) {
        return this.sendRequest('GET', endpoint);
    }

}

export default RunningAPI;

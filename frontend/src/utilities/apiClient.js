import axios from 'axios'

/**
 * removeSuffixSlash removes the suffix slash from the endpoint
 * @param {string} endpoint The endpoint to remove the suffix slash from
 * @returns {string} The endpoint without the suffix slash
 * */
const removeSuffixSlash = (endpoint) => {
    if (endpoint.endsWith('/')){
        endpoint = endpoint.slice(0, -1)
    }
    return endpoint
}


/**
 * removePrefixSlash removes the prefix slash from the endpoint
 * @param {string} endpoint The endpoint to remove the prefix slash from
 * @returns {string} The endpoint without the prefix slash
 **/
const removePrefixSlash = (endpoint) => {
    if (endpoint.startsWith('/')){
        endpoint = endpoint.slice(1)
    }
    return endpoint
}


class RunningAPI {

    constructor() {
        this.token = localStorage.getItem('token')
        this.base_url = 'http://127.0.0.1:8000/api'
    }

    /**
     * ensureSuffixSlash adds a trailing slash to the endpoint if it doesn't already have one
     * @param {string} endpoint The endpoint to ensure has a trailing slash
     * @returns {string} The endpoint with a guaranteed trailing slash
     */
    ensureSuffixSlash(endpoint) {
        return endpoint.endsWith('/') ? endpoint : `${endpoint}/`
    }

    /**
     * sendRequest sends a request to the API
     * @param {string} method The method of the request
     * @param {string} endpoint The endpoint to send the request to
     * @param {JSON} data The data to send with the request
     * @returns {JSON} The data from the API
     **/
    async sendRequest(method, endpoint, data = null, raw = false) {
        endpoint = removePrefixSlash(endpoint)
        endpoint = removeSuffixSlash(endpoint)
        try {
            const response = await axios({
                method: method,
                url: `${this.base_url}/${endpoint}`,
                headers: { 'Authorization': `Token ${this.token}` },
                data: data
            });
            if (raw) {
                return response
            }
            if (response.status >= 200 && response.status < 300) {
                return response.data;
            } else {
                return null
            }
        } catch (error) {
            return null
        }
    }

    async sendPatchRequest(method, endpoint, data = null, raw = false) {
        endpoint = removePrefixSlash(endpoint)
        endpoint = this.ensureSuffixSlash(endpoint) 
        try {
            const response = await axios({
                method: method,
                url: `${this.base_url}/${endpoint}`,
                headers: { 
                    'Authorization': `Token ${this.token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            })
            console.log(`${method} request to ${this.base_url}/${endpoint}`, response)
            if (raw) {
                return response
            }
            if (response.status >= 200 && response.status < 300) {
                return response.data
            } else {
                console.warn(`Request failed with status: ${response.status}`)
                return null
            }
            } catch (error) {
                console.error('An error occurred during the API request')
                throw new Error('Failed to complete the request. Please try again later.')
            }
    }
    
    
    /**
     * getData fetches data from the API
     * @param {string} endpoint The endpoint to fetch data from
     * @returns {JSON} The data from the API
     */
    async getData(endpoint) {
        return this.sendRequest('GET', endpoint)
    }

    /**
     * postData sends data to the API
     * @param {string} endpoint The endpoint to send data to
     * @param {JSON} data The data to send
     * @returns {JSON} The data from the API
     */
    async postData(endpoint, data) {
        return this.sendRequest('POST', endpoint, data)
    }

    /**
     * sendDjangoRequest sends a request to a Django endpoint, ensuring a trailing slash
     * @param {string} method The HTTP method for the request
     * @param {string} endpoint The endpoint for the request (will have trailing slash added if missing)
     * @param {object} data The data to send with the request (optional)
     * @param {boolean} raw Whether to return the raw response (optional)
     * @returns {Promise<object>} The response data from the API
     */
    async sendDjangoRequest(method, endpoint, data = null, raw = false) {
        endpoint = removePrefixSlash(endpoint)
        endpoint = this.ensureSuffixSlash(endpoint)
        return this.sendRequest(method, endpoint, data, raw)
    }

    /**
     * patchDjangoData updates data in the API, ensuring a trailing slash for Django
     * @param {string} endpoint The endpoint to patch data with
     * @param {object} data The data to update
     * @returns {Promise<object>} The data from the API
     */
    async patchDjangoData(endpoint, data) {
        endpoint = this.ensureSuffixSlash(endpoint)
        return this.sendPatchRequest('PATCH', endpoint, data)
    }




    /**
     * patchData updates data in the API
     * @param {string} endpoint The endpoint to patch data with
     * @param {JSON} data The data to update
     * @returns {JSON} The data from the API
     */
    async patchData(endpoint, data) {
        return this.sendRequest('PATCH', endpoint, data)
    }

}

export default RunningAPI

import {envConfig} from "../config/envConfig";

let fetchApiInstance = null;

function json(response) {
    return response.json()
}

class FetchApi {
    /*
    * Method for requesting fetch query from server
    * @param: url

    * @return: Promise<FetchResult>
     */
    get = (url) => {
         return fetch(`${envConfig.serverFetchUrl}${url}`)
            .then(json);
    };

    /*
    * Method for requesting graphQL mutation from server
    * @param: url (fetch query object)
    * @param: body (fetch query object)
    *   action: String
    *
    * @return: Promise<FetchResult>
     */
    post = (url, body) => {
        const httpOptions = Object.assign({method:'POST', body, url});
        return this.request(httpOptions)
            .then(json);
    };

    request = (options) => {
        const config = {
            method: options.method,
            body: JSON.stringify(options.body),
            credentials: envConfig.credentialsModeFetch,
            headers: {
                "Content-Type": "application/json"
            }
        };
        return fetch(`${envConfig.serverFetchUrl}${options.url}`, config)
    };
}

function getFetchApiInstance() {
    if (!fetchApiInstance) {
        fetchApiInstance = new FetchApi();
    }
    return fetchApiInstance;
}

export default getFetchApiInstance();
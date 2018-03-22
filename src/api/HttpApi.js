import {envConfig} from "../config/envConfig";

let fetchApiInstance = null;

function json(response) {
    return response.json()
}

class FetchApi {
    /*
    * Method for requesting fetch query from server
    * @param: OPTIONS

    * @return: Promise<FetchResult>
     */
    get = (url) => {
         return fetch(`${envConfig.serverFetchUrl}${url}`)
            .then(json);
    };

    /*
    * Method for requesting graphQL mutation from server
    * @param: OPTIONS (fetch query object)
    *   action: String
    *
    * @return: Promise<FetchResult>
     */
    post = (options) => {
        const httpOptions = Object.assign({method:'POST', body:options});
        return this.request(httpOptions);
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
        return fetch(envConfig.serverFetchUrl, config);
    };
}

function getFetchApiInstance() {
    if (!fetchApiInstance) {
        fetchApiInstance = new FetchApi();
    }
    return fetchApiInstance;
}

export default getFetchApiInstance();
/**
 * @description This file contains all the http request methods
 * @method post for adding data
 * @method put for updating data
 */
const axios = require('axios')
class ApiCall {
    // axios post method for posting data
    post=(data) => {
          return axios.post(data.url, data.input)
    }

    postWithHeader=(data) => {
        return axios.post(data.url, data.input,{ headers: data.headers})
    }
    // axios put method for updating data
    put= (data) => {
          return axios.put(data.url, data.input,{ headers: data.headers})
    }

    // axios get method for retrieving data
    get= (data) => {
        return axios.get(data.url)
    }
}

module.exports = new ApiCall()
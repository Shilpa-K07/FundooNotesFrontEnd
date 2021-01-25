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
    put= (data) => {alert('api')
          return axios.put(data.url, data.input,{ headers: data.headers})
    }

    // axios get method for retrieving data
    get= (data) => {
        return axios.get(data.url,{ headers: data.headers})
    }

    // axios delete method for soft deleting data
    delete= (data) => {
        return axios.delete(data.url,{ headers: data.headers})
    }
}

module.exports = new ApiCall()
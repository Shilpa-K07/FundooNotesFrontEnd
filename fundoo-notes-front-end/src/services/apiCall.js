/**
 * @description This file contains all the http request methods
 * @method post for adding data
 * @method put for updating data
 */
const axios = require('axios')
class ApiCall {
    // axios post method for posting data
    post= (data) => {
        return axios({
            method: 'POST',
            url: data.url,
            data: data.input,
            headers: data.headers
          })
    }

    // axios put method for updating data
    put= (data) => {
        return axios({
            method: 'PUT',
            url: data.url,
            data: data.input,
            headers: data.headers
          })
    }
}

module.exports = new ApiCall()
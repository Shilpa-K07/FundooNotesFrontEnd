/*************************************************************************
* Purpose : to call APIs
*
* @file : sessionStorage.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 14/01/2021
*
**************************************************************************/
const axios = require('axios')
class ApiCall {
    // axios post method for posting data
    post=(data) => {
          return axios.post(data.url, data.input)
    }

    postWithHeader=(data) => {
        return axios.post(data.url, data.input, { headers: data.headers })
    }

    // axios put method for updating data
    put= (data) => {
          return axios.put(data.url, data.input, { headers: data.headers })
    }

    // axios get method for retrieving data
    get= (data) => {
        return axios.get(data.url, { headers: data.headers })
    }

    // axios delete method for soft deleting data
    delete= (data) => {
        return axios.delete(data.url, { headers: data.headers })
    }
}

module.exports = new ApiCall()

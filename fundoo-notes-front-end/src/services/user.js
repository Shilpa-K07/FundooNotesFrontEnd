/**
 * @description This file is for integrating UI with APIs
 * @method userRegistration is for integrating registration UI with registration API
 * @method userLogin is for integrating login UI with login API
 */
const axios = require('axios')
class Registration {
  
  userRegistration = (userInput) => {
    const URL = "http://localhost:3000/registration"
    return axios({
      method: 'POST',
      url: URL,
      data: userInput,
      headers: { 'Content-Type': 'application/json'}
    })
  }

  userLogin = (userInput) => {
    const URL = "http://localhost:3000/login"
    return axios({
      method: 'POST',
      url: URL,
      data: userInput,
      headers: { 'Content-Type': 'application/json'}
    })
  }

  userEmailVerification = (userInput) => {
    const URL = "http://localhost:3000/verifyEmail"
    return axios({
      method: 'POST',
      url: URL,
      data: userInput,
      headers: { 'Content-Type': 'application/json'}
    })
  }
  userPasswordReset = (userInput) => {
    const URL = "http://localhost:3000/forgot-password"
    return axios({
      method: 'POST',
      url: URL,
      data: userInput,
      headers: { 'Content-Type': 'application/json'}
    })
  }
}
module.exports = new Registration()

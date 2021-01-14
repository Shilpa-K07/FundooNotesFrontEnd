/**
 * @description This file is for integrating UI with APIs
 * @method userRegistration is for integrating registration UI with registration API
 * @method userLogin is for integrating login UI with login API
 */
const axios = require('axios')
class User {
  
  userRegistration = (userInput) => {
    const URL = process.env.VUE_APP_REGISTRATION
    return axios({
      method: 'POST',
      url: URL,
      data: userInput,
      headers: { 'Content-Type': 'application/json'}
    })
  }

  userLogin = (userInput) => {
    const URL =  process.env.VUE_APP_LOGIN
    return axios({
      method: 'POST',
      url: URL,
      data: userInput,
      headers: { 'Content-Type': 'application/json'}
    })
  }

  userEmailVerification = (userInput) => {
    const URL =process.env.VUE_APP_VERIFYEMAIL
    return axios({
      method: 'POST',
      url: URL,
      data: userInput,
      headers: { 'Content-Type': 'application/json'}
    })
  }
  userForgotPasword = (userInput) => {
    const URL = process.env.VUE_APP_FORGOTPASSWORD
    return axios({
      method: 'POST',
      url: URL,
      data: userInput,
      headers: { 'Content-Type': 'application/json'}
    })
  }
  userPasswordReset = (userInput) => {
    const URL =process.env.VUE_APP_RESETPASSWORD
    return axios({
      method: 'PUT',
      url: URL,
      data: userInput,
      headers: { 'Content-Type': 'application/json', 'token':userInput.token}
    })
  }
  userAccountActivate = (userInput) => {
    const URL =process.env.VUE_APP_ACTIVATEACCOUNT
    return axios({
      method: 'PUT',
      url: URL,
      headers: { 'Content-Type': 'application/json', 'token':userInput.token}
    })
  }
}
module.exports = new User()

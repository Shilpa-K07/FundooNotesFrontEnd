/**
 * @description This file is for integrating UI with APIs
 * @method userRegistration is for integrating registration UI with registration API
 * @method userLogin is for integrating login UI with login API
 */
//const axios = require('axios')
const apiCall = require('../services/apiCall')
class User {
  userRegistration = (userInput) => {
    const data = {
      input: userInput,
      url: process.env.VUE_APP_REGISTRATION,
    /*   headers: { 'Content-Type': 'application/json'} */
    }
    return apiCall.post(data)
  }

  userLogin = (userInput) => {
    const data = {
      input: userInput,
      url: process.env.VUE_APP_LOGIN,
    }
    return apiCall.post(data)
  }

  userEmailVerification = (userInput) => {
    const data = {
      input: userInput,
      url: process.env.VUE_APP_VERIFYEMAIL,
      /* headers: { 'Content-Type': 'application/json'} */
    }
    return apiCall.post(data)
  }
  userForgotPasword = (userInput) => {
    const data = {
      input: userInput,
      url: process.env.VUE_APP_FORGOTPASSWORD,
     /*  headers: { 'Content-Type': 'application/json'} */
    }
    return apiCall.post(data)
  }
  userPasswordReset = (userInput) => {
    const data = {
      input: userInput,
      url: process.env.VUE_APP_RESETPASSWORD,
      headers: { 'Content-Type': 'application/json', 'token':userInput.token}
    }
    return apiCall.put(data)
  }
  userAccountActivate = (userInput) => {
    const data = {
      input: userInput,
      url: process.env.VUE_APP_ACTIVATEACCOUNT,
      headers: { 'Content-Type': 'application/json', 'token':userInput.token}
    }
    return apiCall.put(data)
  }

  createNote = (noteInput) => {
    const data = {
      input: noteInput,
      url: process.env.VUE_APP_NOTE,
      headers: { 'Content-Type': 'application/json',  'token': sessionStorage.token },
     /*  withCredentials: true */
    }
    return apiCall.postWithHeader(data)
  }

  getNotes = () => {
    const data = {
      url: process.env.VUE_APP_NOTE
     /*  headers: { 'Content-Type': 'application/json'}, */
      /* withCredentials: true */
    }
    return apiCall.get(data)
  }
}
module.exports = new User()

/**
 * @description This file is for integrating UI with APIs
 * @method userRegistration is for integrating registration UI with registration API
 * @method userLogin is for integrating login UI with login API
 */
//const axios = require('axios')
const apiCall = require('../services/apiCall')
const headers = require('./sessionStorage')
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
      headers: headers
     /*  withCredentials: true */
    }
    return apiCall.postWithHeader(data)
  }

  updateNote = (noteInput, noteId) => {
    const data = {
      input: noteInput,
      url: process.env.VUE_APP_NOTE+"/"+noteId,
     /*  headers: { 'Content-Type': 'application/json',  'token': sessionStorage.token }, */
      headers:headers
    }
    return apiCall.put(data)
  }

  softDeleteNote = (noteId) => {
    const data = {
      url: process.env.VUE_APP_NOTE+"/"+noteId,
     /*  headers: { 'Content-Type': 'application/json',  'token': sessionStorage.token }, */
      headers:headers
    }
    return apiCall.delete(data)
  }

  hardDeleteNote = (noteId) => {
    const data = {
      url: process.env.VUE_APP_DELETENOTE+"/"+noteId,
     /*  headers: { 'Content-Type': 'application/json',  'token': sessionStorage.token }, */
     headers:headers
    }
    return apiCall.delete(data)
  }

  getNotes = () => {
    const data = {
      url: process.env.VUE_APP_NOTE,
     /*  headers: { 'Content-Type': 'application/json',  'token': sessionStorage.token }, */
     headers:headers
    }
    return apiCall.get(data)
  }
  getLabels = () => {
    const data = {
      url: process.env.VUE_APP_LABELSBYUSER,
     headers:headers
    }
    return apiCall.get(data)
  }
  createLabel = (labelData) => {
    const data = {
      input: labelData,
      url: process.env.VUE_APP_LABELS,
     headers:headers
    }
    return apiCall.postWithHeader(data)
  }
  updateLabel = (labelData, labelId) => {
    const data = {
      input: labelData,
      url: process.env.VUE_APP_LABELS+"/"+labelId,
       headers:headers
    }
    return apiCall.put(data)
  }
  deleteLabel = (labelId) => {
    const data = {
      url: process.env.VUE_APP_LABELS+"/"+labelId,
     headers:headers
    }
    return apiCall.delete(data)
  }
  addLabelToNote = (labelId, noteId) => {
    const data = {
      input: labelId,
      url: process.env.VUE_APP_ADDLABELTONOTE+"/"+noteId,
       headers:headers
    }
    return apiCall.put(data)
  }
  getNotesByLabel = (labelId) => {
    const data = {
    url: process.env.VUE_APP_NOTEBYLABEL+"/"+labelId,
    headers:headers
    }
    return apiCall.get(data)
  }
  removeLabelFromNote = (labelId, noteId) => {
    const data = {
      input: labelId,
      url: process.env.VUE_APP_REMOVELABELFROMNOTE+"/"+noteId,
      headers:headers
    }
    return apiCall.put(data)
  }
}
module.exports = new User()

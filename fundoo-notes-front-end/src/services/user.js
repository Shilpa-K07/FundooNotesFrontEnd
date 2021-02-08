/*************************************************************************
* Purpose : to integrate UI with APIs
*
* @file : user.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 09/01/2021
*
**************************************************************************/
const apiCall = require('../services/apiCall');
const headers = require('./sessionStorage');
class User {
  userRegistration = (userInput) => {
    const data = {
      input: userInput,
      url: process.env.VUE_APP_BASEURL + '/registration'
    };
    return apiCall.post(data);
  }

  userLogin = (userInput) => {
    const data = {
      input: userInput,
      url: process.env.VUE_APP_BASEURL + '/login'
    };
    return apiCall.post(data);
  }

  userEmailVerification = (userInput) => {
    const data = {
      input: userInput,
      url: process.env.VUE_APP_BASEURL + '/verifyEmail'
    };
    return apiCall.post(data);
  }

  userForgotPasword = (userInput) => {
    const data = {
      input: userInput,
      url: process.env.VUE_APP_BASEURL + '/forgot-password'
    };
    return apiCall.post(data);
  }

  userPasswordReset = (userInput) => {
    const data = {
      input: userInput,
      url: process.env.VUE_APP_BASEURL + '/reset-password',
      headers: { 'Content-Type': 'application/json', token: userInput.token }
    };
    return apiCall.put(data);
  }

  userAccountActivate = (userInput) => {
    const data = {
      input: userInput,
      url: process.env.VUE_APP_BASEURL + '/activateAccount',
      headers: { 'Content-Type': 'application/json', token: userInput.token }
    };
    return apiCall.put(data);
  }

  createNote = (noteInput) => {
    const data = {
      input: noteInput,
      url: process.env.VUE_APP_BASEURL + '/notes',
      headers: headers
    };
    return apiCall.postWithHeader(data);
  }

  updateNote = (noteInput, noteId) => {
    const data = {
      input: noteInput,
      url: process.env.VUE_APP_BASEURL + '/notes' + noteId,
      headers: headers
    };
    return apiCall.put(data);
  }

  softDeleteNote = (noteId) => {
    const data = {
      url: process.env.VUE_APP_BASEURL + '/notes' + noteId,
      headers: headers
    };
    return apiCall.delete(data);
  }

  restoreNote = (noteId) => {
    const data = {
      url: process.env.VUE_APP_BASEURL + '/restoreNote' + noteId,
      headers: headers
    };
    return apiCall.put(data);
  }

  hardDeleteNote = (noteId) => {
    const data = {
      url: process.env.VUE_APP_BASEURL + '/notes-h-delete' + noteId,
     headers: headers
    };
    return apiCall.delete(data);
  }

  getNotes = () => {
    const data = {
      url: process.env.VUE_APP_BASEURL + '/notes',
     headers: headers
    };
    return apiCall.get(data);
  }

  getLabels = () => {
    const data = {
      url: process.env.VUE_APP_BASEURL + '/labelsByUser',
     headers: headers
    };
    return apiCall.get(data);
  }

  createLabel = (labelData) => {
    const data = {
      input: labelData,
      url: process.env.VUE_APP_BASEURL + '/labels',
     headers: headers
    };
    return apiCall.postWithHeader(data);
  }

  updateLabel = (labelData, labelId) => {
    const data = {
      input: labelData,
      url: process.env.VUE_APP_BASEURL + '/labels' + labelId,
       headers: headers
    };
    return apiCall.put(data);
  }

  deleteLabel = (labelId) => {
    const data = {
      url: process.env.VUE_APP_BASEURL + '/labels' + labelId,
     headers: headers
    };
    return apiCall.delete(data);
  }

  addLabelToNote = (labelId, noteId) => {
    const data = {
      input: labelId,
      url: process.env.VUE_APP_BASEURL + '/addLabelToNote' + noteId,
       headers: headers
    };
    return apiCall.put(data);
  }

  getNotesByLabel = (labelId) => {
    const data = {
    url: process.env.VUE_APP_BASEURL + '/notesByLabel' + labelId,
    headers: headers
    };
    return apiCall.get(data);
  }

  removeLabelFromNote = (labelId, noteId) => {
    const data = {
      input: labelId,
      url: process.env.VUE_APP_BASEURL + '/removeLabelFromNote' + noteId,
      headers: headers
    };
    return apiCall.put(data);
  }
}
module.exports = new User();

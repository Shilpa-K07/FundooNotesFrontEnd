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

  userLogin = (userInput) => {console.log("userInput: "+userInput)
    const URL = "http://localhost:3000/login"
    return axios({
      method: 'POST',
      url: URL,
      data: userInput,
      headers: { 'Content-Type': 'application/json'}
    })
  }
}
module.exports = new Registration()

const axios = require('axios')
class Registration {
  register = (userInput) => {
    const URL = "http://localhost:3000/registration"
    return axios({
      method: 'POST',
      url: URL,
      data: userInput
    })
  }
}
module.exports = new Registration()

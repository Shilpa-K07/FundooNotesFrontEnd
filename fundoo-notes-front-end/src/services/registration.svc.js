 const axios = require('axios')
 class Registration{
 register = (userInput) => {console.log("inside API")
 console.log("data: "+userInput)
    const URL = "http://localhost:3000/registration"
    const options = {
        url: URL,
        method: 'POST',
        data: userInput,
        mode: 'cors',
        crossdomain: true,
        headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
    }
    axios(options)
    .then(response => {console.log(response.data)
    alert("Success")
    if(!response.data){
        alert("Email existss")
    }})
   /*  axios.post(URL, userInput)
      .then(response => console.log(response));
    } */
    .catch(error => console.log(error))
}
}
module.exports = new Registration()

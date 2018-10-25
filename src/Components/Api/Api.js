export default class Api {

    //User login method. Also receives bearer token to interact with restricted parts of API
    userLogIn = (username, password) => {
       return fetch("http://localhost:50110",{
            method: "POST",
            headers: {
                contentType: "application/json"
            },
            body: {
                Username: username,
                Password: password
            }
        }).then(response => response.json())
    }

}
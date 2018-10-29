class Api {

    //User login method. Also receives bearer token to interact with restricted parts of API
    userLogIn = (username, password) => {
       return fetch("http://localhost:5555/api/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Username: username,
                Password: password
            })
        }).then(response => response.text())
    }

    userRegister = (username, password, firstName,lastName) => {
        return fetch("http://localhost:5555/api/token",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Username: username,
                Password: password,
                FirstName: firstName,
                LastName: lastName
            })
        }).then(response => response.text())
    }

    userDetails = (token) => {
        return fetch("http://localhost:5555/api/user", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("loginToken")}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
    }

    getAllChatrooms = (token) => {
        return fetch("http://localhost:5555/api/chatroom",{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        }).then(res => res.json())
    }

}

const api = new Api()
export default api
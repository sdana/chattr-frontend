const ipAddr = "https://chattrapi.azurewebsites.net"
class Api {


    //User login method. Also receives bearer token to interact with restricted parts of API
    userLogIn = (username, password) => {
       return fetch(`${ipAddr}/api/login`,{
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
        return fetch(`${ipAddr}/api/token`,{
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
        return fetch(`${ipAddr}/api/user`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("loginToken")}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
    }

    editUser = (token, userEdits, userId) => {
        return fetch(`${ipAddr}/api/user/${userId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userEdits)
        })
    }

    getAllChatrooms = (token) => {
        return fetch(`${ipAddr}/api/chatroom`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        }).then(res => res.json())
    }

    getPreviousChatroomMessages = (token, chatroomName) => {
        return fetch(`${ipAddr}/api/message`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                chatroomName: chatroomName
            }
        }).then(res => res.json())
    }

    writeMessageToDb = (message, chatName, userId, token) => {
        return fetch(`${ipAddr}/api/message`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': "application/json",
                'Accept': "application/json"
            },
            body: JSON.stringify({
                MessageText: message,
                ChatroomName: chatName,
                UserId: userId
            })
        }).then(e => e.json()).catch(err => console.log(err))
    }

    createChatRoom = (token, roomName, userId) => {
        return fetch(`${ipAddr}/api/chatroom`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Title: roomName,
                userId: userId
            })
        }).then(res => res.json())
    }

    deleteChatRoom = (token, chatId) => {
        return fetch(`${ipAddr}/api/chatroom/${chatId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(res => res.json())
    }

}

const api = new Api()
export default api
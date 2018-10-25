import React, {Component} from "react"
import api from "../Api/Api"

export default class MainPage extends Component {

    state = {
        user: {
            username: ""
        }
    }

    getUserDetails = () => {
        api.userDetails(sessionStorage.getItem("loginToken")).then(res => console.log(res))
    }

    render(){
        this.getUserDetails()

        return (
            <h1>HEllo world</h1>
        )
    }
}
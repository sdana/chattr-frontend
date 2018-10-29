import React, {Component} from "react"
import api from "../Api/Api"

export default class MainPage extends Component {

    state = {
        user: {}
    }

    componentDidMount() {
        this.getUserDetails()
    }
    
    getUserDetails = () => {
        api.userDetails(sessionStorage.getItem("loginToken")).then(user => this.setState({user: user}))
    }

    render(){

        return (
            <React.Fragment>
                <h1>Welcome to Chattr {this.state.user.email}</h1>
            </React.Fragment>
        )
    }
}
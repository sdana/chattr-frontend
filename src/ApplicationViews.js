import React, { Component } from 'react'
import {Route} from "react-router-dom"
import Login from "./Components/Login/Login"
import Register from "./Components/Login/Register"
import MainPage from "./Components/MainPage/MainPage"

export default class ApplicationViews extends Component {

    isAuthenticated = () => {
        return sessionStorage.getItem("loginToken")
    }
    
    render(){
        if (!this.isAuthenticated()){
            return (
                <React.Fragment>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/register" component={Register} />
                </React.Fragment>
            )
        }
        else {
            return (
                <Route exact path="/" component={MainPage} />
            )
        }

    }
}
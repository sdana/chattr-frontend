import React, { Component } from 'react'
import {Route} from "react-router-dom"
import Login from "./Components/Login/Login"
import MainPage from "./Components/MainPage/MainPage"

export default class ApplicationViews extends Component {

    isAuthenticated = () => {
        return sessionStorage.getItem("loginToken")
    }
    
    render(){
        if (!this.isAuthenticated()){
            return (
                <Route path="/" component={Login} />
            )
        }
        else {
            return (
                <Route exact path="/" component={MainPage} />
            )
        }

    }
}
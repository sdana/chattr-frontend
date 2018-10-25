import React, { Component } from 'react'
import {Route} from "react-router-dom"
import api from "./Components/Api/Api"
import Login from "./Components/Login/Login"
import MainPage from "./Components/MainPage/MainPage"

export default class ApplicationViews extends Component {

    isAuthenticated = () => {
        return sessionStorage.getItem("loginToken")
    }
    
    render(){
        switch (sessionStorage.getItem("loginToken")) {
            default: 
                return (
                    <Route path="/" component={Login} />
                )

            case false:
                return (
                    <Route path="/" component={Login} />
                )
            
            case true:
                    return (
                        <Route exact path="/" component={MainPage} />
                    )

        }

    }
}
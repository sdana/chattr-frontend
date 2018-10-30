import React, { Component } from 'react';
import './Chatroom.css';
import Button from "@material-ui/core/Button"
import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr"

export default class Chatroom extends Component {

    state = {
        message: []
    }

    componentDidMount = () => {
        const userToken = sessionStorage.getItem("loginToken")
        const hubConnection = new HubConnectionBuilder()
        .withUrl("http://localhost:5555/Hubs/ChatHub")
        .configureLogging(LogLevel.Information)
        .build();
        this.setState({ hubConnection }, () => {
            this.state.hubConnection
            .start()
            .then(() => console.log('Connection started!'))
            .catch(err => console.log('Error while establishing connection :('));
        
        });
    }



    render(){
        return(
            <div id="main">
                <div id="message-box">
                <ul>
                    {this.state.message.map(message => {return <li>{message}</li>})}
                </ul>
            </div>
        <form onSubmit={(e) => {this.setState({messageField: ""}); this.sendMessage(e)}}><input id="messageField" autoComplete="off" type="text" placeholder="message" value={this.state.messageField} onInput={e => this.handleFieldChange(e)}></input><Button variant="text" color="primary" type="submit">Send</Button></form>
      </div>

        )
    }
}
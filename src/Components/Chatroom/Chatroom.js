import React, { Component } from 'react';
import './Chatroom.css';
import api from "../Api/Api"
import PreviousMessages from "./PreviousMessages"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"

export default class Chatroom extends Component {

    state = {
        messages: [],
        messageField: "",
    }

      handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
      }

      componentDidMount = () => {
        const userToken = sessionStorage.getItem("loginToken")
        // api.getPreviousChatroomMessages(userToken, this.props.currentChatroom).then(res => this.setState({previousMessages: res}))
      }


    render(){

        return(
            <div id="main">
                <div id="message-box">
                <ul>
                <PreviousMessages messages={this.props.previousMessages} />
                    
                    {this.props.messages.map((message,index) => {return <li key={index}>{message}</li>})}
                </ul>
            </div>
        <form onSubmit={(e) => {
            e.preventDefault() 
            if(this.state.messageField === ""){
                alert("Message can not be blank")
                return
            }
            else {
            this.props.sendMessage(e, this.state.messageField)
            this.setState({messageField: ""})
            }
                }}>
                <input id="messageField" autofocus autoComplete="off" type="text" placeholder="message" value={this.state.messageField} onInput={e => this.handleFieldChange(e)}></input>
                <Button variant="text" color="primary" type="submit">Send</Button></form>
      </div>

        )
    }
}
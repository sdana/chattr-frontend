import React, { Component } from 'react';
import './Chatroom.css';
import PreviousMessages from "./PreviousMessages"
import Button from "@material-ui/core/Button"

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

    render(){

        return(
            <div id="main">
                <div id="message-box">
                <ul>
                {(this.props.previousMessages) ? <PreviousMessages messages={this.props.previousMessages} /> : null}
                    {this.props.messages.map((message,index) => {return <li key={index}>{message}</li>})}
                </ul>
            </div>
        <form onSubmit={(e) => {this.setState({messageField: ""}); this.props.sendMessage(e, this.state.messageField)}}><input id="messageField" autoComplete="off" type="text" placeholder="message" value={this.state.messageField} onInput={e => this.handleFieldChange(e)}></input><Button variant="text" color="primary" type="submit">Send</Button></form>
      </div>

        )
    }
}
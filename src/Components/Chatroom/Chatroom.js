import React, { Component } from 'react';
import './Chatroom.css';
import PreviousMessages from "./PreviousMessages"
import Typography from "@material-ui/core/Typography"
import AccountCircle from "@material-ui/icons/AccountCircle"
import Avatar from "@material-ui/core/Avatar"
import Paper from "@material-ui/core/Paper"
import 'typeface-roboto';

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
            <Paper elevation="2" square="true">
            <div id="main">
                <div id="message-box">
                <ul>
                <PreviousMessages messages={this.props.previousMessages} />
                    {this.props.messages.map((message,index) => {
                        return <li key={index}><div style={{display:'inline-flex',justifyContent:'flex-start'}}>
                            {(message.avatar !== "null" || message.avatar === "") 
                            ? <Avatar src={message.avatar} /> 
                            : <AccountCircle style={{height:40,width:40}}/>}
                            <Typography variant="h6" color="inherit">{message.user}: {message.message}</Typography>
                            </div>
                        </li>}
                    )}
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
                <input 
                    id="messageField" 
                    autoFocus 
                    autoComplete="off" 
                    type="text" 
                    placeholder="message" 
                    value={this.state.messageField} 
                    style={{paddingLeft:10, width:'99.3%'}}
                    onInput={e => this.handleFieldChange(e)}>
                </input>
                </form>
      </div>
      </Paper>
        )
    }
}
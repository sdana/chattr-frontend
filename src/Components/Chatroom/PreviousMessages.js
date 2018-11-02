import React from "react"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';

const classes = {
    avatar: {
        display: "inline-block"
    }
}

const PopulateChatroomList = (props) => {


    return (
        <React.Fragment>
            {(props.messages) 
                ? props.messages.map((message, index) => 
                    <li className={classes.avatar} key={index}>{
                        (message.user.avatarUrl) 
                        ? <Avatar src={message.user.avatarUrl}/> 
                        : <AccountCircle />}
                        <Typography color="inherit" variant="h6">{message.user.firstName} {message.user.lastName}: {message.messageText}</Typography>
                        </li>) 
                : null}
        </React.Fragment>
    )
}

export default withStyles(classes)(PopulateChatroomList)

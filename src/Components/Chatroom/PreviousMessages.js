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
                    <li className={classes.avatar} key={index}><div style={{display:'inline-flex', justifyContent:'flex-start'}}>{
                        (message.user.avatarUrl) 
                        ? <Avatar src={message.user.avatarUrl}/> 
                        : <AccountCircle style={{height:40,width:40}}/>}
                        <Typography color="inherit" variant="h6">{message.user.firstName} {message.user.lastName}: {message.messageText}</Typography>
                        </div>
                        </li>) 
                : null}
        </React.Fragment>
    )
}

export default withStyles(classes)(PopulateChatroomList)

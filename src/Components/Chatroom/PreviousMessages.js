import React from "react"
import Avatar from "@material-ui/core/Avatar"

const PopulateChatroomList = (props) => {


    return (
        <React.Fragment>
            {(props.messages) ? props.messages.map((message, index) => <li><Avatar src={message.user.avatarUrl}/> {message.user.firstName} {message.user.lastName}: {message.messageText}</li>) : null}
        </React.Fragment>
    )
}

export default PopulateChatroomList

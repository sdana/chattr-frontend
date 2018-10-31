import React from "react"

const PopulateChatroomList = (props) => {


    return (
        <React.Fragment>
            {(props.messages) ? props.messages.map((message, index) => <li>{message.user.firstName} {message.user.lastName}: {message.messageText}</li>) : null}
        </React.Fragment>
    )
}

export default PopulateChatroomList

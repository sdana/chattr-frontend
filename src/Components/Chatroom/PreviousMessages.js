import React, { Component } from "react"


const classes = {
    list: {
        width: 250,
      }
}

const PopulateChatroomList = (props) => {
     return (   
        <div>
           {for (let message in props.previousMessages){
               <li>{message.messageText}</li>
           }} 
      </div>
        )
    }

    export default PopulateChatroomList

import React, { Component } from "react"
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Add from "@material-ui/icons/Add"
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

const classes = {
    list: {
        width: 250,
      }
}

const PopulateChatroomList = (props) => {
     return (   
        <div className={classes.list}>
            <List>
                {props.chatrooms.map((text, index) => (
                <div key={index}>
                    <ListItem button key={text} onClick={() => this.toggleDrawer(false)}>
                    <ListItemText primary={text.title} />
                    <IconButton><Add /></IconButton>
                    </ListItem>
                    </div>
          ))}
        </List>
      </div>
        )
    }

    export default withStyles(classes)(PopulateChatroomList)

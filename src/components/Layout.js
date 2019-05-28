import React, { memo } from "react";
import { useState } from "react";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import Add from "@material-ui/icons/Add"
import ListAlt from "@material-ui/icons/ListAlt"

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

function Layout(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const classes = useStyles();

  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setMenuOpen(open);
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem text key={'title'}>
            <ListItemText primary={'My Lists'} />
        </ListItem>
        <Divider/>
        {(props.lists).map((text, index) => (
          <ListItem 
            button key={index}
            onClick={() => props.switchPage(index)}
          >
            <ListItemIcon>
              <ListAlt/>
            </ListItemIcon>
            <ListItemText primary={"List " + index} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button 
          key={'newList'}
          onClick={props.onNewList}
        >
            <ListItemIcon>
                <Add/>
            </ListItemIcon>
            <ListItemText primary={'New List'} />
          </ListItem>
      </List>
    </div>
  );

  return (
    <Paper
      elevation={0}
      style={{ padding: 0, margin: 0, backgroundColor: "#fafafa" }}
    >
      <AppBar color="primary" position="static" style={{ height: 64 }}>
        <Toolbar style={{ height: 64 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Menu"
            onClick={() => {
              setMenuOpen(!menuOpen);
              toggleDrawer(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography color="inherit">Stuart's Todo App</Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={menuOpen} onClose={toggleDrawer(false)}>
        {sideList("left")}
      </Drawer>
      {props.children}
    </Paper>
  );
}

export default memo(Layout);

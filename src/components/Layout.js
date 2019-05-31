import React, { memo } from "react";
import { useState } from "react";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import Add from "@material-ui/icons/Add";
import ListAlt from "@material-ui/icons/ListAlt";
import Edit from "@material-ui/icons/Edit";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
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

const useStylesPaper = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    width: "50%",
    margin: "auto",
    marginTop: 15,
    marginBottom: 15,
    textAlign: "center"
  }
}));

function Layout(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const classes = useStyles();
  const classesPaper = useStylesPaper();

  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

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
        <ListItem text key={"title"}>
          <ListItemText primary={"My Lists"} />
        </ListItem>
        <Divider />
        {props.lists.map((text, index) => (
          <ListItem
            button
            key={index}
            onClick={() => props.switchPage(index)}
            selected={props.selectedIndex === index ? true : false}
          >
            <ListItemIcon>
              <ListAlt />
            </ListItemIcon>
            <ListItemText primary={props.lists[index].name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button key={"newList"} onClick={props.onNewList}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary={"New List"} />
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Rename</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To rename this list, please enter your new title below and press
            rename.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="renameTF"
            label="New List Title"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.renameList(document.getElementById("renameTF").value);
              handleClose();
            }}
            color="primary"
          >
            Rename
          </Button>
        </DialogActions>
      </Dialog>

      <Paper className={classesPaper.root}>
        <div>
          <IconButton onClick={handleClickOpen} display="inline">
            <Edit />
          </IconButton>
          <Typography variant="h1" display="inline">
            {props.lists[props.selectedIndex].name}
          </Typography>
        </div>
      </Paper>
      {props.children}
    </Paper>
  );
}

export default memo(Layout);

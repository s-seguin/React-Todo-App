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
import Delete from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  btnStyles: {
    textAlign: "center"
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

  const [openRenameDialog, setRenameOpen] = React.useState(false);
  const [openDeleteDialog, setDeleteOpen] = React.useState(false);

  function handleRenameOpen() {
    setRenameOpen(true);
  }

  function handleRenameClose() {
    setRenameOpen(false);
  }

  function handleDeleteOpen() {
    setDeleteOpen(true);
  }

  function handleDeleteClose() {
    setDeleteOpen(false);
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
        open={openRenameDialog}
        onClose={handleRenameClose}
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
          <Button onClick={handleRenameClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.renameList(document.getElementById("renameTF").value);
              handleRenameClose();
            }}
            color="primary"
          >
            Rename
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete List</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this list? You will not be able to
            recover it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.deletePage();
              handleDeleteClose();
            }}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Paper className={classesPaper.root}>
        <div>
          <Typography variant="h1" display="inline">
            {props.lists[props.selectedIndex].name}
          </Typography>
        </div>
      </Paper>
      <div className={classes.btnStyles}>
        <IconButton onClick={handleRenameOpen} display="inline">
          <Edit />
        </IconButton>
        <IconButton onClick={handleDeleteOpen} display="inline">
          <Delete />
        </IconButton>
      </div>
      {props.children}
    </Paper>
  );
}

export default memo(Layout);

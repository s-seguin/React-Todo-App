import React, { memo } from "react";
import { useState } from "react";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu"
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, Divider } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });

function Layout(props) {
    const [menuOpen, setMenuOpen] = useState(false);

    const classes = useStyles();
 

  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
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
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

    const fullList = side => (
        <div
          className={classes.fullList}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
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
            //className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => {
                console.log('Menu press');
                setMenuOpen(!menuOpen);
                toggleDrawer(true);

            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography color="inherit">TODO App</Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={menuOpen} onClose={toggleDrawer(false)}>
        {sideList('left')}
      </Drawer>      {props.children}
    </Paper>
  );
}

export default memo(Layout);

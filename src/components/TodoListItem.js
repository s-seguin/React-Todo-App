import React, {memo} from 'react';
import { ListItem, Checkbox, ListItemText, ListItemSecondaryAction, IconButton} from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

function TodoListItem(props) {
    return (
        <ListItem divider={props.divider}>
            <Checkbox
                onClick={props.onCheckBoxToggle}
                checked={props.checked}
                disableRipple
            />
            <ListItemText primary={props.text} />
            <ListItemSecondaryAction>
                <IconButton aria-label="Delete Todo" onClick={props.onButtonClick}>
                    <DeleteOutlined/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
    
}

export default memo(TodoListItem);
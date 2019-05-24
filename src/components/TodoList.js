import React, {memo} from 'react';
import { Paper, List } from '@material-ui/core';
import TodoListItem from './TodoListItem';

function TodoList(props){
    return (
        <div>
            {props.items.length > 0 && (
                <Paper style={{margin: 16}}>
                    <List style={{overflow:'scroll'}}>
                        {props.items.map(
                            (todo, idx) => (
                                <TodoListItem
                                    //{...todo}
                                    text={todo.inputValue}
                                    key={`TodoItem.${idx}`}
                                    divider={idx !== props.items.length - 1}
                                    onButtonClick={() => props.onItemRemove(idx)}
                                    oCheckBoxToggle={() => props.onItemCheck(idx)}
                                />
                            )
                        )}
                    </List>
                </Paper>
            )}
        </div>
    );
}

export default memo(TodoList);
import React, { memo } from "react";
import { Paper, List } from "@material-ui/core";
import TodoListItem from "./TodoListItem";

function TodoList(props) {
  return (
    <div>
      {props.items.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List>
            {props.items.map((todo, idx) => (
              <TodoListItem
                text={todo.inputValue}
                key={`TodoItem.${idx}`}
                checked={todo.checked}
                divider={idx !== props.items.length - 1}
                onButtonClick={() => props.onItemRemove(idx)}
                onCheckBoxToggle={() => props.onItemCheck(idx)}
              />
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
}

export default memo(TodoList);

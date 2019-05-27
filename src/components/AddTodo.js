import React, {memo} from 'react';
import { Paper, Grid, TextField, Button } from '@material-ui/core';

function AddTodo(props) {
    return (
        <Paper style={{ margin: 16, padding: 16 }}>
            <Grid container>
                <Grid xs={9} md={11} item style={{ paddingRight: 16 }}>
                    <TextField
                        placeholder="Enter your todo"
                        value={props.inputValue}
                        onChange={props.onInputChange}
                        onKeyPress={props.onInputKeyPress}
                        fullWidth
                   />
                </Grid>
                <Grid xs={3} md={1} item>
                    <Button
                        fullWidth
                        color="secondary"
                        variant="outlined"
                        onClick={props.onButtonClick}
                    >
                        Add
                    </Button>

                </Grid>
            </Grid>
        </Paper>
    );
}


export default memo(AddTodo);
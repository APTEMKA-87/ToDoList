import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';

type AddItemFormPropsType ={
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }
    const addItem = () => {
        const trimedTitle = title.trim()
        if (trimedTitle) {
            props.addItem(trimedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    return (
        <div>
            <TextField
                variant={'outlined'}
                label={'Title'}
                error={error}
                helperText={error && 'Title is required!'}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddItem}
            />
            <IconButton onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
}

export default AddItemForm
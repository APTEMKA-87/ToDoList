import React, {useState, KeyboardEvent, ChangeEvent} from 'react';

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
            <input
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddItem}
                className={ error ? "error" : ""}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={"error-message"}>Title is required!</div>}
        </div>
    )
}

export default AddItemForm
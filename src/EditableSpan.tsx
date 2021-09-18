import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    editMode: boolean
}

export function EditableSpan(props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const activeEditMode = () => setEditMode(true)
    const activeViewMode = () => setEditMode(false)
const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        ? <input value={title} onChange={onChangeTitleHandler} onBlur={activeViewMode} autoFocus/>
        : <span onDoubleClick={activeEditMode}>{props.title}</span>
}
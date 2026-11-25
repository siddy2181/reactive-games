import { useState } from 'react'

export default function WordInput({ maxLen, onSubmit, onChange, disabled, type = 'text', style }) {
    const [value, setValue] = useState('')

    function update(next) {
        setValue(next)
        if (onChange) onChange(next)
    }

    function handleChange(e) {
        update(e.target.value.toLowerCase().replace(/[^a-z]/g, ''))
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && onSubmit(value)) update('')
    }

    return (
        <input
            type={type}
            maxLength={maxLen}
            name="word"
            value={value}
            disabled={disabled}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            style={style}
        />
    )
}

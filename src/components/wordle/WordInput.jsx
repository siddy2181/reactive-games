import { useState } from 'react'

export default function WordInput({ maxLen, onSubmit, disabled, type = 'text' }) {
    const [value, setValue] = useState('')

    function handleChange(e) {
        setValue(e.target.value.toLowerCase().replace(/[^a-z]/g, ''))
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && value.length === maxLen) {
            if (onSubmit(value)) setValue('')
        }
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
        />
    )
}

import { useState } from 'react'
import Keypad from './Keypad.jsx'
import WordInput from './WordInput.jsx'
import validWords from './words.js'

const WORD_LENGTH = 5
const MAX_GUESSES = 6
const COLORS = { green: '#6aaa64', yellow: '#c9b458', gray: '#787c7e' }

function scoreGuess(guess, word) {
    const result = Array(guess.length).fill('gray')
    const remaining = {}

    // first pass: exact matches are green, count the word's unmatched letters
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === word[i]) result[i] = 'green'
        else remaining[word[i]] = (remaining[word[i]] || 0) + 1
    }
    // second pass: right letter, wrong spot is yellow while unmatched copies remain
    for (let i = 0; i < guess.length; i++) {
        if (result[i] === 'green') continue
        if (remaining[guess[i]] > 0) {
            result[i] = 'yellow'
            remaining[guess[i]]--
        }
    }
    return result
}

export default function Wordle() {
    const [guesses, setGuesses] = useState([])
    const [word, setWord] = useState(null)
    const [error, setError] = useState('')
    const [current, setCurrent] = useState('')

    const won = guesses.some((g) => g.letters === word)
    const lost = !won && guesses.length >= MAX_GUESSES
    const gameOver = won || lost

    // letters that are not in the word at all
    const used = guesses.flatMap((g) =>
        g.letters.split('').filter((_, i) => g.result[i] === 'gray')
    )

    function handleSetWord(letters) {
        if(letters.length < 5) {
            console.log("letters.length", letters)
            setError('Enter a 5 letter word')
            return false
        }
        else if (!validWords.has(letters)) {
            setError('Not in word list')
            return false
        }

        setError('')
        setWord(letters)
        return true
    }

    function handleSubmit(letters) {
        if (!validWords.has(letters)) {
            setError('Not in word list')
            return false
        }
        setError('')
        setGuesses([...guesses, { letters, result: scoreGuess(letters, word) }])
        return true
    }

    if (word === null) {
        return (
            <div style={{ display: 'grid', justifyItems: 'center', gap: '16px' }}>
                <p>Player 1: enter a {WORD_LENGTH}-letter secret word, </p>
                {error && <p>{error}</p>}
                <WordInput maxLen={WORD_LENGTH} onSubmit={handleSetWord} type="text" />
            </div>
        )
    }

    return (
        <div style={{ display: 'grid', justifyItems: 'center', gap: '16px' }}>
            <div style={{ display: 'grid', gap: '6px', position: 'relative' }}>
                {Array.from({ length: MAX_GUESSES }, (_, row) => (
                    <div key={row} style={{ display: 'flex', gap: '6px' }}>
                        {Array.from({ length: WORD_LENGTH }, (_, col) => {
                            const guess = guesses[row]
                            const typing = row === guesses.length && !gameOver
                            return (
                                <span
                                    key={col}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '52px',
                                        height: '52px',
                                        border: typing && col < current.length ? '2px solid #878a8c' : '2px solid #d3d6da',
                                        background: guess ? COLORS[guess.result[col]] : 'transparent',
                                        color: guess ? '#fff' : 'inherit',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    {guess ? guess.letters[col] : typing ? current[col] : ''}
                                </span>
                            )
                        })}
                    </div>
                ))}
                {/* invisible input laid over the grid: tapping the grid opens the mobile keyboard */}
                <WordInput
                    maxLen={WORD_LENGTH}
                    onSubmit={handleSubmit}
                    onChange={setCurrent}
                    disabled={gameOver}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, fontSize: '16px', cursor: 'pointer' }}
                />
            </div>

            {error && <p>{error}</p>}
            {won && <p>You won!</p>}
            {lost && <p>Out of guesses. The word was {word.toUpperCase()}.</p>}

            <Keypad used={used} />
        </div>
    )
}

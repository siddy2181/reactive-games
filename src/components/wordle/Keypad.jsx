export default function Keypad({ used }) {
    const qwerty = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    ]
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            {qwerty.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                    {row.map((char) => (
                        <span
                            key={char}
                            className="cell"
                            data-char={char}
                            style={{
                                opacity: used.includes(char) ? 0.3 : 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40px',
                                height: '52px',
                                borderRadius: '6px',
                                background: '#d3d6da',
                                color: '#111',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    )
}

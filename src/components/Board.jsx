import { useState } from "react";
import Square from "./Square";

function calculateWinner(gameBoard) {
        const indexes = [
            [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
        ]

        for(let i=0; i<indexes.length;i++) {
            const [a,b,c] = indexes[i]
            if(gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]){
                return gameBoard[a]
            }
        }
           return null

    } 
export default function Board() {
    const [gameBoard, updateGameBoard] = useState(Array(9).fill(null))
    const [isXNext,setXNext] = useState(true)

    const winner = calculateWinner(gameBoard)
    const isDraw = !winner && gameBoard.every(Boolean)
    function handleClick(i){
        if(gameBoard[i] || calculateWinner(gameBoard)) return;
        const nextMove = gameBoard.slice()
        if(isXNext){
            nextMove[i] = 'X'    
        } else {
            nextMove[i] = 'O'
        }
        setXNext(!isXNext)
        updateGameBoard(nextMove)
    }
    let status;
    if (winner) status = `${winner} wins this round!!`
    else if(isDraw) status = `This round is draw!!`
    else status = `${isXNext? 'X': 'O'} is Next`

    return (
        <div>
         <h2 className="status">{status}</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,80px)', gridTemplateRows: 'repeat(3,80px)'}}>
        {gameBoard.map((sq,idx) => <Square key={idx} type= {sq} onSquareClicked={() => handleClick(idx)}/>)}
        </div>
        </div>
    
)
}
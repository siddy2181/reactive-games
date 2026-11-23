export default function Square({type, onSquareClicked}) {
    return <button className="square" onClick={onSquareClicked}>{type}</button>
}
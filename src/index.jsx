import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import Board from "./components/Board.jsx";

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(<Board />);

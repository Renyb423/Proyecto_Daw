import { useState } from 'react'
import './App.css'
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRoutes.jsx";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
        <AppRouter />
    </>
  )
}

export default App

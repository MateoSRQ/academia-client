import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./pages/app"
import Login from "./pages/login"
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom"
import { useUsuarioStore } from "./store/usuario"

const PrivateRoute = ({ children }: any) => {
    const app = useUsuarioStore()
    if (app.username === null) {
        return <Navigate to="/login" />
    } else {
        return children
    }
}

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/app"
                    element={
                        <PrivateRoute>
                            <App />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
)

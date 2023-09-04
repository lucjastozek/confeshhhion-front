import { useEffect, useState } from "react";
import "./App.css";
import Register from "./Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Login";
import axios from "axios";
import ConfessionsList from "./ConfessionsList";
export interface ConfessionProps {
    id: number;
    text: string;
}
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        Boolean(localStorage.getItem("isLoggedIn"))
    );
    const [confessions, setConfesssions] = useState<ConfessionProps[]>([]);

    useEffect(() => {
        async function fetchConfessions() {
            const response = await axios.get(
                "https://confeshhhion.onrender.com/confessions"
            );

            setConfesssions(response.data);
        }

        fetchConfessions();
    }, [confessions]);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        isLoggedIn ? (
                            <h1>SIEMA</h1>
                        ) : (
                            <Register setIsLoggedIn={setIsLoggedIn} />
                        )
                    }
                >
                    <Route
                        path="*"
                        element={<h1>nie ma takiej strony byku</h1>}
                    />
                </Route>
                <Route
                    path="/register"
                    element={<Register setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route
                    path="/login"
                    element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route
                    path="/confessions"
                    element={
                        isLoggedIn ? (
                            <ConfessionsList confessions={confessions} />
                        ) : (
                            <h2>Log in to see confessions</h2>
                        )
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
